import { Row } from '@tanstack/react-table';

// Is less than or equal to ('le' or <=)
export function leFilter<TData>(row: Row<TData>, columnId: string, value: any, addMeta: (meta: any) => void) {
  const cost = row.getValue(columnId) as number;
  return cost <= parseInt(value);
}

/* FilterFn 

// TanStack React Table v8 - Part 8 - FILTERS indepth, Filter Function, Accessor and Cell Functions
// https://www.youtube.com/watch?v=lY6qDbomVnk

// Filter Functions
// https://tanstack.com/table/v8/docs/api/features/filters#filter-functions
// Example:
    {
      id: 'id',
      accessorKey: 'id',
      header: 'Player ID',
      filterFn: `equals`,
    },

// Using Filter Functions
// https://tanstack.com/table/v8/docs/api/features/filters#using-filter-functions

export type FilterFn<TData extends AnyData> = {
  (
    row: Row<TData>, 
    columnId: string, 
    filterValue: any, 
    addMeta: (meta: any) => void
  ): boolean;
  resolveFilterValue?: TransformFilterValueFn<TData>;
  autoRemove?: ColumnFilterAutoRemoveTestFn<TData>;
  addMeta?: (meta?: any) => void;
};

export type TransformFilterValueFn<TData extends AnyData> = (
  value: any, 
  column?: Column<TData>
) => unknown;

export type ColumnFilterAutoRemoveTestFn<TData extends AnyData> = (
  value: any, 
  column?: Column<TData>
) => boolean;

export type CustomFilterFns<TData extends AnyData> = Record<
  string, 
  FilterFn<TData>
>;

// Example: 

import { rankItem } from '@tanstack/match-sorter-utils';

export const fuzzyFilter = (row: Row<FPLElement>, columnId: string, value: any, addMeta: (meta: any) => void) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the ranking info
  addMeta(itemRank);

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

*/
