'use client';

import * as React from 'react';
import useStore from '@/store';
import Image from 'next/image';
import { FPLElement } from '@/data/models';
import { ColumnDef, SortingState, VisibilityState } from '@tanstack/react-table';
import { PlayersAvailabilityDataTable, defaultSortedBy } from '@/components/PlayersAvailabilityDataTable';
import { PlayerDialog } from '@/components/PlayerDialog';
import { filterBy } from '@/lib/array';

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
            <Image src={useStore.getState().getElementShirt(element)} alt='Player shirt' width={24} height={32} />
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
