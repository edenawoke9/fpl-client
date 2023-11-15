/*

Select Scrollable: better than overflow?
https://ui.shadcn.com/docs/components/select#scrollable

*/
'use client';

import * as React from 'react';
import useStore from '@/store';
import { cn } from '@/lib/utils';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Table,
} from '@tanstack/react-table';
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';
import { FPLElement } from '@/data/models';
import { DataTableContent } from '@/components/ui/data-table-content';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { filterWithout } from '@/lib/array';

export const objectName = 'player';
export const viewWatchList = 'watchlist';
export const viewAllPlayers = 'all_players';
export const defaultViewedBy = viewAllPlayers;
export const defaultSortedBy = 'news_added';

const setSearchedBy = (table: Table<FPLElement>, searchedBy: string) => {
  // console.log('setSearchedBy...');
  table.getColumn('web_name')?.setFilterValue(searchedBy);
};

const setViewedBy = (table: Table<FPLElement>, viewedBy: string) => {
  // console.log('setViewedBy...');
  //
  // Reseting previous `viewedBy` related filtering only
  //
  let columnFilters = table.getState().columnFilters;
  columnFilters = filterWithout(columnFilters, 'id', ['id', 'element_type', 'team']);
  table.setColumnFilters(columnFilters);
  //
  // Filtering
  //
  switch (viewedBy) {
    case viewAllPlayers: // Nothing to do!
      break;
    case viewWatchList: // TODO: Get list of element.id's from FPLEntry
      table.getColumn('id')?.setFilterValue(0);
      break;
    default: // 'element_type-*' and 'team-*'
      const [columnId, value] = viewedBy.split('-');
      table.getColumn(columnId)?.setFilterValue(parseInt(value));
      break;
  }
};

const setSortedBy = (table: Table<FPLElement>, sortedBy: string) => {
  // console.log('setSortedBy...');
  //
  // Sorting
  //
  table
    .getAllColumns()
    .filter((column) => column.id === sortedBy && column.getCanSort())
    .map((column) => {
      const element_avail = useStore.getState().getElementAvailability(column.id);
      const sort_dir = element_avail?.ascending ? 'asc' : 'desc';
      if (column.getIsSorted() !== sort_dir) {
        column.toggleSorting(sort_dir === 'desc'); // true => 'desc'
      }
    });
};

interface PlayersStatisticsDataTableProps {
  data: FPLElement[];
  columns: ColumnDef<FPLElement>[];
  sortingState: SortingState;
  visibilityState: VisibilityState;
  className?: string;
}

export function PlayersAvailabilityDataTable({
  data,
  columns,
  sortingState,
  visibilityState,
  className,
}: PlayersStatisticsDataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>(sortingState);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(visibilityState);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className={cn('', className)}>
      <div className='flex justify-center gap-5 py-3'>
        <div className=''>
          <Label htmlFor='search' className='p-1 text-sm'>
            Search
          </Label>
          <Input
            id='search'
            type='text'
            onChange={(event) => setSearchedBy(table, event.target.value)}
            placeholder='Search for player...'
            size={30}
          />
        </div>
        <div className=''>
          <span className='p-1 text-sm'>View</span>
          <Select onValueChange={(value) => setViewedBy(table, value)} defaultValue={defaultViewedBy}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='All players' />
            </SelectTrigger>
            <SelectContent className='h-[300px] overflow-y-auto'>
              <SelectGroup>
                <SelectLabel>Global</SelectLabel>
                <SelectItem key={viewAllPlayers} value={viewAllPlayers}>
                  All players
                </SelectItem>
                <SelectItem key={viewWatchList} value={viewWatchList}>
                  Watchlist
                </SelectItem>
                <SelectLabel>By Position</SelectLabel>
                {useStore
                  .getState()
                  .getElementTypes()
                  .map((element_type) => (
                    <SelectItem key={element_type.id} value={`element_type-${element_type.id}`}>
                      {element_type.plural_name}
                    </SelectItem>
                  ))}
                <SelectLabel>By Team</SelectLabel>
                {useStore
                  .getState()
                  .getTeams()
                  .map((team) => (
                    <SelectItem key={team.id} value={`team-${team.id}`}>
                      {team.name}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className=''>
          <span className='p-1 text-sm'>Sorted by</span>
          <Select onValueChange={(value) => setSortedBy(table, value)} defaultValue={defaultSortedBy}>
            <SelectTrigger className='w-[200px]'>
              <SelectValue placeholder='Sorted by' />
            </SelectTrigger>
            <SelectContent>
              {useStore
                .getState()
                .getElementAvailabilities()
                .map((element_avail) => (
                  <SelectItem key={element_avail.name} value={element_avail.name}>
                    {element_avail.option_name || element_avail.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <DataTableContent table={table} objectName={objectName} columnsLength={columns.length} />
      <DataTablePagination table={table} objectName={objectName} />
    </div>
  );
}
