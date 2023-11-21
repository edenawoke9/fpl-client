import { Row } from '@tanstack/react-table';

/**
 * DataTable filter function designed to hide any row where a given column exceeds the numerical value max.
 *
 * NOTE: 'le' stands for operator <= or 'less than or equal to'.
 * @param {Object} row Data table row object.
 * @param {string} columnId Id of data table column object to filter by.
 * @param {any} max Value to filter with.
 * @param {void} addMeta Available but unused function here.
 * @returns true if column value is less than or equal to max.
 */
export function leFilter<TData>(row: Row<TData>, columnId: string, max: any, addMeta: (meta: any) => void): boolean {
  const cost = row.getValue(columnId) as number;
  return cost <= parseInt(max);
}
