'use client';

import * as React from 'react';
import useStore from '@/store';
import Image from 'next/image';
import { FPLElement } from '@/data/models';
import { filterBy } from '@/lib/array';
import { ColumnDef, SortingState, VisibilityState } from '@tanstack/react-table';
import { PlayersAvailabilityDataTable, defaultSortedBy } from '@/components/PlayersAvailabilityDataTable';
import { PlayerDialog } from '@/components/PlayerDialog';
import { PlayerStatus } from '@/components/PlayerStatus';
import { PlayerListItem } from '@/components/PlayerListItem';

function getData() {
  // const data: FPLElement[] = filterBy(useStore.getState().getElements(), 'chance_of_playing_next_round', [0, 25, 50, 75]);
  const data: FPLElement[] = filterBy(useStore.getState().getElements(), 'status', ['i', 'd', 's']);
  return data;
}

function getColumns() {
  // console.log(`return all columns... (getColumns)`);
  let sortingState: SortingState = [
    {
      desc: true,
      id: defaultSortedBy,
    },
  ];
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
      id: 'news',
      accessorKey: 'news',
      header: 'News',
    },
    {
      id: 'news_added',
      accessorKey: 'news_added',
      header: 'Most recently added',
    },
    {
      id: 'chance_of_playing_next_round',
      accessorKey: 'chance_of_playing_next_round',
      header: 'Chance of playing',
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
    news_added: false,
    chance_of_playing_next_round: false,
    id: false,
    element_type: false,
    team: false,
  };

  return {
    columns: columns,
    sortingState: sortingState,
    visibilityState: visibilityState,
  };
}

export function PlayersAvailability() {
  return <PlayersAvailabilityDataTable data={getData()} {...getColumns()} />;
}
