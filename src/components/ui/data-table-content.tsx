'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { flexRender } from '@tanstack/react-table';
import { Table as ReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DataTableContentProps<TData> {
  table: ReactTable<TData>;
  columnsLength: number;
  objectName?: string;
  className?: string;
}

export function DataTableContent<TData>({
  table,
  columnsLength = 0,
  className,
  objectName,
}: DataTableContentProps<TData>) {
  return (
    <Table className={cn('rounded-md border', className)}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columnsLength} className='h-24 text-center'>
              {objectName ? `0 ${objectName}s shown` : 'No results.'}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
