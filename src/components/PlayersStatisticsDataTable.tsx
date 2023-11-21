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
import { Label } from '@/components/ui/label';
import { filterWithout, filterBy, mapPropertyValues } from '@/lib/array';
// import * as SelectPrimitive from '@radix-ui/react-select';

const objectName = 'player';
const viewWatchList = 'watchlist';
const viewAllPlayers = 'all_players';
const defaultViewedBy = viewAllPlayers;
export const defaultSortedBy = 'total_points';

type PlayersStatisticsDataTableProps = {
  data: FPLElement[];
  initialCosts: number[];
  columns: ColumnDef<FPLElement>[];
  sortingState: SortingState;
  visibilityState: VisibilityState;
  className?: string;
};

export function PlayersStatisticsDataTable({
  data,
  initialCosts,
  columns,
  sortingState,
  visibilityState,
  className,
}: PlayersStatisticsDataTableProps) {
  const [costs, setCosts] = React.useState(initialCosts);
  const [currMaxCost, setCurrMaxCost] = React.useState(initialCosts[0].toString());
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

  /* Debugging with useEffect

  React.useEffect(() => {
    // console.log('mounted: tableStateColumnFilters', table.getState().columnFilters, ' (PlayersStatisticsDataTable)');
    console.log('mounted: PlayersStatisticsDataTable');
    return () =>
      // console.log('un-mounted: tableStateColumnFilters', table.getState().columnFilters, ' (PlayersStatisticsDataTable)');
      console.log('un-mounted: PlayersStatisticsDataTable');
  });

  */

  return (
    <div className={cn('', className)}>
      <div className='flex justify-center gap-5 py-3'>
        <div className=''>
          <Label htmlFor='input-text-search' className='p-1 text-sm'>
            Search
          </Label>
          <Input
            id='input-text-search'
            type='text'
            placeholder='Search for player...'
            size={30}
            onChange={(event) => table.getColumn('web_name')?.setFilterValue(event.target.value)}
          />
        </div>
        <div className=''>
          <Label htmlFor='select-view-by' className='p-1 text-sm'>
            View
          </Label>
          <Select
            onValueChange={(value) => {
              // Reseting previous `viewedBy` related filtering
              let columnFilters = table.getState().columnFilters;
              columnFilters = filterWithout(columnFilters, 'id', ['id', 'element_type', 'team']);
              table.setColumnFilters(columnFilters);
              // Filtering and updating <SelectMaxCost />
              switch (value) {
                case viewAllPlayers:
                  // No filtering...
                  setCosts(initialCosts);
                  setCurrMaxCost(initialCosts[0]?.toString());
                  break;
                case viewWatchList: // TODO: Get list of element.id's from FPLEntry
                  table.getColumn('id')?.setFilterValue(0);
                  setCosts([]);
                  setCurrMaxCost('');
                  break;
                default: // 'element_type-*' and 'team-*'
                  const [columnId, id] = value.split('-');
                  table.getColumn(columnId)?.setFilterValue(parseInt(id));
                  const nextCosts: number[] = mapPropertyValues(filterBy(data, columnId, parseInt(id)), 'now_cost');
                  setCosts(nextCosts);
                  setCurrMaxCost(nextCosts[0]?.toString());
                  break;
              }
            }}
            defaultValue={defaultViewedBy}
          >
            <SelectTrigger id='select-view-by' className='w-[180px]'>
              <SelectValue placeholder='All players' />
            </SelectTrigger>
            <SelectContent className='max-h-80'>
              <SelectGroup>
                <SelectLabel>Global</SelectLabel>
                <SelectItem key={viewAllPlayers} value={viewAllPlayers}>
                  All players
                </SelectItem>
                <SelectItem key={viewWatchList} value={viewWatchList}>
                  Watchlist
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>By Position</SelectLabel>
                {useStore
                  .getState()
                  .getElementTypes()
                  .map((element_type) => (
                    <SelectItem key={element_type.id} value={`element_type-${element_type.id}`}>
                      {element_type.plural_name}
                    </SelectItem>
                  ))}
              </SelectGroup>
              <SelectGroup>
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
          <Label htmlFor='select-sort-by' className='p-1 text-sm'>
            Sorted by
          </Label>
          <Select
            onValueChange={(value) => {
              // Sorting
              table
                .getAllColumns()
                .filter((column) => column.getCanSort() && column.id === value)
                .map((column) => {
                  const element_stat = useStore.getState().getElementStat(column.id);
                  const sort_dir = element_stat?.ascending ? 'asc' : 'desc';
                  if (column.getIsSorted() !== sort_dir) {
                    column.toggleSorting(sort_dir === 'desc'); // true => 'desc'
                  }
                });
              // Visibility
              table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  if (column.id === value) {
                    if (!column.getIsVisible()) column.toggleVisibility(true); // true => show
                  } else {
                    if (column.getIsVisible()) column.toggleVisibility(false); // false => hide
                  }
                });
            }}
            defaultValue={defaultSortedBy}
          >
            <SelectTrigger id='select-sort-by' className='w-[200px]'>
              <SelectValue placeholder='Sorted by' />
            </SelectTrigger>
            <SelectContent className='max-h-80'>
              {useStore
                .getState()
                .getElementStats()
                .map((element_stat) => (
                  <SelectItem key={element_stat.name} value={element_stat.name}>
                    {element_stat.option_name || element_stat.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className=''>
          <Label htmlFor='select-max-cost' className='p-1 text-sm'>
            Max cost
          </Label>
          <Select
            onValueChange={(value) => {
              table.getColumn('now_cost')?.setFilterValue(parseInt(value));
              setCurrMaxCost(value);
            }}
            value={currMaxCost}
          >
            <SelectTrigger id='select-max-cost' className='w-[200px]'>
              <SelectValue placeholder='Set maximum cost' />
            </SelectTrigger>
            <SelectContent className='max-h-80'>
              {costs.map((cost) => (
                <SelectItem key={`cost-${cost}`} value={cost.toString()}>
                  {cost / 10}
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
