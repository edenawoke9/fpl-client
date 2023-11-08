/*

TODO: Tooltip instead of title for <DataTable> header ?
https://ui.shadcn.com/docs/components/tooltip

*/
'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';
import { DataTable } from '@/components/ui/data-table';
import { Column, ColumnDef } from '@tanstack/react-table';
import { filterBy } from '@/lib/array';
import { getElementShirt, getElementStat, getElementStats, getElementTeam, getElementType } from '@/data/helpers';
import { FPLBoostrapStatic, FPLElement } from '@/data/models';
import { ElementStatusIcon } from './ElementStatus';

export const viewAllPlayers = 'all_players';
export const viewWatchList = 'watchlist';
export const defaultViewedBy = viewAllPlayers;
export const defaultSortedBy = 'total_points';

export const getData = (elements: FPLElement[], sortedBy: string, viewedBy: string) => {
  let data = elements;
  switch (viewedBy) {
    case viewAllPlayers:
      break;
    case viewWatchList:
      data = filterBy(data, 'id', []); // TODO: Get list of element.id's from FPLEntry
      break;
    default:
      const [viewedByCol, viewedByVal] = viewedBy.split('-');
      data = filterBy(data, viewedByCol, parseInt(viewedByVal));
      break;
  }
  return data;
};

export const getColumns = (bootstrap_static: FPLBoostrapStatic, sortedBy: string) => {
  const setSortingDesc = (column: Column<FPLElement, unknown>) => {
    switch (column.getIsSorted()) {
      case 'desc':
        break; // Nothing to do
      default:
        column.toggleSorting(true);
        break;
    }
  };

  const columns: ColumnDef<FPLElement>[] = [
    {
      id: 'web_name',
      accessorKey: 'web_name',
      enableSorting: false,
      enableHiding: false,
      header: 'Player',
      cell: ({ row }) => {
        const element = row.original;
        return (
          <div className='inline-flex items-center gap-2'>
            <ElementStatusIcon element={element} />
            <Image src={getElementShirt(element)} alt='Player shirt' width={24} height={32} />
            <div className='grid grid-cols-1 grid-rows-2'>
              <strong className='w-80'>{row.getValue('web_name')}</strong>
              <span>
                {getElementType(bootstrap_static.element_types, element).singular_name_short}{' '}
                {getElementTeam(bootstrap_static.teams, element).short_name}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      id: 'now_cost',
      accessorKey: 'now_cost',
      enableHiding: false,
      header: ({ column }) => {
        if (column.id === sortedBy) setSortingDesc(column);
        return <div>Cost</div>;
      },
      cell: ({ row }) => {
        return parseInt(row.getValue('now_cost')) / 10;
      },
    },
    {
      id: 'selected_by_percent',
      accessorKey: 'selected_by_percent',
      enableHiding: false,
      header: ({ column }) => {
        if (column.id === sortedBy) setSortingDesc(column);
        const element_stat = getElementStat(bootstrap_static.element_stats, column.id)!;
        return (
          <div className='underline decoration-dotted' title={element_stat.label}>
            {element_stat.short_name}
          </div>
        );
      },
      cell: ({ row }) => {
        const sel = parseInt(row.getValue('selected_by_percent'));
        return `${sel}%`;
      },
    },
    {
      id: 'form',
      accessorKey: 'form',
      enableHiding: false,
      header: ({ column }) => {
        if (column.id === sortedBy) setSortingDesc(column);
        return <div>Form</div>;
      },
    },
    {
      id: 'total_points',
      accessorKey: 'total_points',
      enableHiding: false,
      header: ({ column }) => {
        if (column.id === sortedBy) setSortingDesc(column);
        const element_stat = getElementStat(bootstrap_static.element_stats, column.id)!;
        return (
          <div className='underline decoration-dotted' title={element_stat.label}>
            {element_stat.short_name}
          </div>
        );
      },
    },
  ];

  // Extra column if sortedBy is not amongst above
  const defaultColumns = columns.map((column) => column.id);
  const defaultColumn = defaultColumns.find((column) => sortedBy === column);
  if (!defaultColumn) {
    const element_stat = getElementStat(bootstrap_static.element_stats, sortedBy)!;
    columns.push({
      id: element_stat.name,
      accessorKey: element_stat.name,
      header: ({ column }) => {
        setSortingDesc(column);
        return (
          <div className='underline decoration-dotted' title={element_stat.label}>
            **
          </div>
        );
      },
    });
  }

  return columns;
};

export function Elements({ bootstrap_static }: { bootstrap_static: FPLBoostrapStatic }) {
  const [viewedBy, setViewedBy] = useState(defaultViewedBy);
  const [sortedBy, setSortedBy] = useState(defaultSortedBy);

  const columns = getColumns(bootstrap_static, sortedBy);
  const data = getData(bootstrap_static.elements, sortedBy, viewedBy);

  return (
    <>
      <div className='flex justify-center gap-5 py-3'>
        <div>
          <span className='p-1 text-sm'>View</span>
          <Select onValueChange={setViewedBy} defaultValue={defaultViewedBy}>
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
                {bootstrap_static.element_types.map((element_type) => (
                  <SelectItem key={element_type.id} value={`element_type-${element_type.id}`}>
                    {element_type.plural_name}
                  </SelectItem>
                ))}
                <SelectLabel>By Team</SelectLabel>
                {bootstrap_static.teams.map((team) => (
                  <SelectItem key={team.id} value={`team-${team.id}`}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <span className='p-1 text-sm'>Sorted by</span>
          <Select onValueChange={setSortedBy} defaultValue={defaultSortedBy}>
            <SelectTrigger className='w-[200px]'>
              <SelectValue placeholder='Sorted by' />
            </SelectTrigger>
            <SelectContent className='h-[300px] overflow-y-auto'>
              {getElementStats(bootstrap_static.element_stats).map((element_stat, i) => (
                <SelectItem key={element_stat.name} value={element_stat.name}>
                  {element_stat.option_name ? element_stat.option_name : element_stat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='mx-auto flex justify-center py-3'>
        <DataTable columns={columns} data={data} object='player' />
      </div>
    </>
  );
}
