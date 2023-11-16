'use client';

import * as React from 'react';
import useStore from '@/store';
import Image from 'next/image';
import { FPLElement } from '@/data/models';
import { ColumnDef, SortingState, VisibilityState } from '@tanstack/react-table';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { PlayersStatisticsDataTable, defaultSortedBy } from '@/components/PlayersStatisticsDataTable';
import { PlayerDialog } from '@/components/PlayerDialog';
import { mapPropertyValues } from '@/lib/array';
import { leFilter } from '@/lib/data-dable-filter-functions';

function getData() {
  return useStore.getState().getElements();
}

function getColumns() {
  // console.log(`return all columns... (getColumns)`);
  let sortingState: SortingState = [];
  let columns: ColumnDef<FPLElement>[] = [
    {
      id: 'status',
      accessorKey: 'status',
      enableSorting: false,
      enableHiding: false,
      header: '',
      cell: ({ row }) => {
        const element = row.original;
        const status = useStore.getState().getElementStatus(element);
        return (
          <PlayerDialog element={element} className='w-5 justify-center'>
            <Image
              src={status.src}
              alt={status.title}
              title={status.title}
              width={status.width}
              height={status.height}
            />
          </PlayerDialog>
        );
      },
    },
    {
      id: 'web_name',
      accessorKey: 'web_name',
      enableSorting: false,
      enableHiding: false,
      header: 'Player',
      cell: ({ row }) => {
        const element = row.original;
        return (
          <PlayerDialog element={element} className='gap-2'>
            <Image
              src={useStore.getState().getElementShirt(element)}
              alt='Player shirt'
              width={24}
              height={32}
              priority
            />
            <div className='grid grid-rows-2'>
              <strong className='flex'>{row.getValue('web_name')}</strong>
              <span>
                {useStore.getState().getElementType(element)?.singular_name_short}{' '}
                {useStore.getState().getElementTeam(element).short_name}
              </span>
            </div>
          </PlayerDialog>
        );
      },
    },
    {
      id: 'now_cost',
      accessorKey: 'now_cost',
      enableHiding: false,
      header: 'Cost',
      filterFn: leFilter<FPLElement>,
      cell: ({ row }) => {
        return parseInt(row.getValue('now_cost')) / 10;
      },
    },
    {
      id: 'selected_by_percent',
      accessorKey: 'selected_by_percent',
      enableHiding: false,
      header: ({ column }) => {
        const element_stat = useStore.getState().getElementStat(column.id)!;
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className='underline decoration-dotted'>{element_stat.short_name}</div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{element_stat.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
      header: 'Form',
    },
    {
      id: 'total_points',
      accessorKey: 'total_points',
      enableHiding: false,
      header: ({ column }) => {
        const element_stat = useStore.getState().getElementStat(column.id)!;
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className='underline decoration-dotted'>{element_stat.short_name}</div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{element_stat.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
    {
      id: 'id',
      accessorKey: 'id',
      header: 'Player ID',
      filterFn: `equals`,
    },
    {
      id: 'element_type',
      accessorKey: 'element_type',
      header: 'Type ID',
      filterFn: `equals`,
    },
    {
      id: 'team',
      accessorKey: 'team',
      header: 'Team ID',
      filterFn: `equals`,
    },
  ];
  let visibilityState: VisibilityState = {
    id: false,
    element_type: false,
    team: false,
  };

  const defaultColumns = columns.map((column) => column.id);

  useStore
    .getState()
    .getElementStats()
    .map((element_stat) => {
      const defaultColumn = defaultColumns.find((column) => element_stat.name === column);
      if (defaultColumn) {
        if (element_stat.name === defaultSortedBy) {
          sortingState.push({
            desc: true,
            id: element_stat.name,
          });
        }
      } else {
        columns.push({
          id: element_stat.name,
          accessorKey: element_stat.name,
          header: () => {
            return (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className='underline decoration-dotted'>**</div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{element_stat.label}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          },
        });
        visibilityState[element_stat.name] = false;
      }
    });

  return {
    columns: columns,
    sortingState: sortingState,
    visibilityState: visibilityState,
  };
}

function getCosts() {
  const costs: number[] = mapPropertyValues(getData(), 'now_cost');
  return costs;
}

export function PlayersStatistics() {
  return <PlayersStatisticsDataTable data={getData()} initialCosts={getCosts()} {...getColumns()} />;
}
