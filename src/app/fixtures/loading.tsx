import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

export default function Loading() {
  return (
    <main>
      <h2>Fixtures & Results</h2>
      <div className='item-center flex justify-between pt-3 align-middle'>
        <Skeleton className='h-10 w-28 rounded-md' />
        <Skeleton className='h-5 w-64' />
        <Skeleton className='h-10 w-24 rounded-md' />
      </div>
      <Table className='w-70 flex justify-center'>
        <TableBody>
          {Array(10)
            .fill(0)
            .map((i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className='h-10 w-64 justify-end' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-10 w-10 rounded-full' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-10 w-12 rounded-sm p-2' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-10 w-10 rounded-full' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-10 w-64 justify-start' />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </main>
  );
}
