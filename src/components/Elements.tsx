'use client';

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
import { ColumnDef } from '@tanstack/react-table';
import { sortBy, filterBy } from '@/lib/array';
import { useState } from 'react';
import {
  getElementShirt,
  getElementStat,
  getElementStats,
  getElementTeam,
  getElementType,
} from '@/data/helpers';
import { FPLBoostrapStatic, FPLElement } from '@/data/models';

export const defaultViewedBy = 'all'; // All players
export const defaultSortedBy = 'total_points'; // Total points

export const getData = (elements: FPLElement[], sortedBy: string, viewedBy: string) => {
  let data = elements;
  switch (viewedBy) {
    case 'all':
      break;
    case 'watchlist':
      data = filterBy(data, 'id', []);
      break;
    default:
      const [viewedByCol, viewedByVal] = viewedBy.split('-');
      data = filterBy(data, viewedByCol, parseInt(viewedByVal));
      break;
  }
  data = sortBy(data, sortedBy);
  return data;
};

export const getColumns = (bootstrap_static: FPLBoostrapStatic, sortedBy: string) => {
  const columns: ColumnDef<FPLElement>[] = [
    {
      accessorKey: 'web_name',
      header: 'Player',
      cell: ({ row }) => {
        const element = row.original;
        const element_type = getElementType(bootstrap_static.element_types, element)!;
        const team = getElementTeam(bootstrap_static.teams, element)!;
        const element_shirt = getElementShirt(element)!;
        // {/* 75% chance of playing */}
        // <svg
        //         xmlns='http://www.w3.org/2000/svg'
        //         width='21'
        //         height='19'
        //         viewBox='0 0 21 19'
        //         copnr='75'
        //         className='ElementStatus__StyledStatus-sc-1bs5tgy-1 eeXjjA'
        //       >
        //         <title>75% chance of playing</title>
        //         <path
        //           // fill='currentColor'
        //           d='M20.7588154,16.1639512 L12.2281283,0.988998469 C11.879948,0.378360845 11.2183513,0 10.4998191,0 C9.78128692,0 9.11969017,0.378360845 8.77150994,0.988998469 L0.240822794,16.1639512 C-0.0919261004,16.7567989 -0.0793835139,17.4770055 0.275542057,18.0585846 C0.629499774,18.6401876 1.27376405,18.9979533 1.9691369,18.9999129 L19.0053273,18.9999129 C19.7055147,19.0063793 20.357507,18.6523673 20.7182051,18.0688941 C21.0789032,17.485421 21.0943345,16.7605391 20.7587117,16.1639512 L20.7588154,16.1639512 Z'
        //         ></path>
        //         <path
        //           fill='currentColor'
        //           d='M10.4998191,17.0817658 C10.1005303,17.0817658 9.73983219,16.8485635 9.5874447,16.4898532 C9.43409676,16.1311524 9.51896909,15.7190817 9.80155504,15.4446556 C10.084141,15.1702295 10.5085076,15.087825 10.8778966,15.2367406 C11.2472857,15.3847163 11.4874466,15.73498 11.4874466,16.1227154 C11.4874466,16.3774574 11.3832838,16.6209548 11.1981029,16.8007727 C11.012922,16.9805906 10.762174,17.0817442 10.4998413,17.0817442 L10.4998191,17.0817658 Z M12.3390363,6.77220598 L11.5964066,13.2456505 C11.5308247,13.7860393 11.0601616,14.1934347 10.4998191,14.1934347 C9.93947659,14.1934347 9.46880862,13.7860393 9.40323163,13.2456505 L8.66060187,6.77220598 C8.62298893,6.4678342 8.72136182,6.16156835 8.93162544,5.93305576 C9.14187672,5.70360092 9.44278522,5.5724849 9.75913987,5.57341497 L11.2405477,5.57341497 C11.5568777,5.57248346 11.857801,5.70360092 12.0680622,5.93305576 C12.2783134,6.16157315 12.3766888,6.4678342 12.3390857,6.77220598 L12.3390363,6.77220598 Z'
        //         ></path>
        //       </svg>
        return (
          <>
            <div className='inline-flex items-center gap-2'>
              <svg xmlns='http://www.w3.org/2000/svg' width='6' height='13' viewBox='0 0 6 13'>
                <path
                  d='M2.22454008,4.81004082 C2.04454008,5.29122857 1.86734808,5.7178898 1.72391208,6.156 C1.26547608,7.55608163 0.79016808,8.95126531 0.37907208,10.3661633 C0.14141208,11.1840857 0.47704128,11.7369796 1.18250808,11.838 C1.43938008,11.8748302 1.71688008,11.8733951 1.96813608,11.8150408 C3.51877608,11.4548694 4.20733608,10.1739796 4.91521608,8.91887755 C4.76334408,9.03175959 4.64147208,9.17573878 4.51255608,9.31301633 C4.11552408,9.7358449 3.67396008,10.0969714 3.12319608,10.2887878 C3.03319608,10.3198788 2.89960008,10.305529 2.82272808,10.2548278 C2.78194728,10.228042 2.80397808,10.0725869 2.8269468,9.98313796 C2.8569468,9.86451551 2.9160096,9.75306857 2.9624148,9.63827265 C3.5652228,8.14782367 4.1759748,6.66080327 4.7638548,5.16410939 C4.865574,4.90486041 4.9325988,4.59873796 4.9058868,4.32609306 C4.8566676,3.82768898 4.3424508,3.47564816 3.7124508,3.48904408 C2.0769708,3.52348286 0.8985708,4.35097469 0.0595308,5.74002367 C0.0285936,5.79120367 0.0285936,5.86151633 0,5.98253388 C0.698436,5.45686041 1.27548,4.82070122 2.22468,4.81018286 L2.22454008,4.81004082 Z M5.82634008,1.5717551 C5.82634008,2.43941633 5.13680808,3.14302041 4.28602008,3.14302041 C3.43571208,3.14302041 2.74618008,2.43941633 2.74618008,1.5717551 C2.74618008,0.703616327 3.43571208,0 4.28602008,0 C5.13679608,0 5.82634008,0.703604082 5.82634008,1.5717551'
                  transform='translate(0 .5)'
                ></path>
              </svg>
              <Image src={element_shirt} alt='Player shirt' width={24} height={32} />
              <div className='grid grid-cols-1 grid-rows-2'>
                <strong className='w-80'>{row.getValue('web_name')}</strong>
                <span>
                  {element_type.singular_name_short} {team.short_name}
                </span>
              </div>
            </div>
          </>
        );
      },
    },
    {
      accessorKey: 'now_cost',
      header: 'Cost',
      cell: ({ row }) => {
        return parseInt(row.getValue('now_cost')) / 10;
      },
    },
    {
      accessorKey: 'selected_by_percent',
      header: ({ column }) => {
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
      accessorKey: 'form',
      header: 'Form',
    },
    {
      accessorKey: 'total_points',
      header: ({ column }) => {
        const element_stat = getElementStat(bootstrap_static.element_stats, column.id)!;
        return (
          <div className='underline decoration-dotted' title={element_stat.label}>
            {element_stat.short_name}
          </div>
        );
      },
    },
  ];
  // if sortedBy amongst above columns, then no extra column
  // const sortedByIsAlreadyPresent = columns.find((column: ColumnDef<FPLElement>) => sortedBy === column.id);
  // console.log(`sortedBy: ${sortedBy}; sortedByIsAlreadyPresent: ${JSON.stringify(sortedByIsAlreadyPresent)}`);
  const sortedByIsAlreadyPresent = ['now_cost', 'selected_by_percent', 'form', 'total_points'].find(
    (column: string) => sortedBy === column
  );
  if (!sortedByIsAlreadyPresent) {
    const element_stat = getElementStat(bootstrap_static.element_stats, sortedBy)!;
    columns.push({
      accessorKey: sortedBy,
      header: () => (
        <div className='underline decoration-dotted' title={element_stat.label}>
          **
        </div>
      ),
    });
  }
  return columns;
};

export function Elements({ bootstrap_static }: { bootstrap_static: FPLBoostrapStatic }) {
  const [viewedBy, setViewedBy] = useState(defaultViewedBy);
  const [sortedBy, setSortedBy] = useState(defaultSortedBy);

  const columns = getColumns(bootstrap_static, sortedBy);
  const data = getData(bootstrap_static.elements, sortedBy, viewedBy);
  // TODO: Customize PageSize.
  //
  // TODO: Scroll Area for <SelectContent> ?
  // https://ui.shadcn.com/docs/components/scroll-area
  //
  // TODO: Tooltip instead of title for <DataTable> header ?
  // https://ui.shadcn.com/docs/components/tooltip
  return (
    <>
      <div className='flex justify-center gap-5 py-3'>
        <Select onValueChange={setViewedBy} defaultValue={defaultViewedBy}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='All players' />
          </SelectTrigger>
          <SelectContent className='h-[300px] overflow-y-auto'>
            <SelectGroup>
              <SelectLabel>Global</SelectLabel>
              <SelectItem key='all' value='all'>
                All players
              </SelectItem>
              <SelectItem key='watchlist' value='watchlist'>
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
      <div className='mx-auto flex justify-center py-3'>
        <DataTable columns={columns} data={data} noRowsMessage='0 players shown' />
      </div>
    </>
  );
}
