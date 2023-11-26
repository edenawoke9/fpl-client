'use client';

import * as React from 'react';
import useStore from '@/store';
import Image from 'next/image';
import { leFilter } from '@/lib/data-table-filter-functions';
import { FPLElement } from '@/data/models';
import { mapPropertyValues } from '@/lib/array';
import { ColumnDef, SortingState, VisibilityState } from '@tanstack/react-table';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { PlayersStatisticsDataTable, defaultSortedBy } from '@/components/PlayersStatisticsDataTable';
import { PlayerDialog } from '@/components/PlayerDialog';
import { PlayerStatus } from '@/components/PlayerStatus';
import { PlayerListItem } from '@/components/PlayerListItem';

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
        return (
          <PlayerDialog element={row.original}>
            <PlayerStatus element={row.original} />
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
        return (
          <PlayerDialog element={row.original}>
            <PlayerListItem element={row.original} />
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
                <span>{element_stat.label}</span>
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
                <span>{element_stat.label}</span>
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
                    <span>{element_stat.label}</span>
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
