import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Loading() {
  return (
    <main>
      <h2>Statistics</h2>
      <div className='container mx-auto justify-center'>
        <div className='flex justify-center gap-5 py-3'>
          <Skeleton className='h-10 w-[180px]' />
          <Skeleton className='h-10 w-[200px]' />
        </div>
        <div className='mx-auto flex justify-center py-3'>
          <div>
            <div className='rounded-md border'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Skeleton className='h-5 w-24' />
                    </TableHead>
                    <TableHead>
                      <Skeleton className='h-5 w-10' />
                    </TableHead>
                    <TableHead>
                      <Skeleton className='h-5 w-10' />
                    </TableHead>
                    <TableHead>
                      <Skeleton className='h-5 w-10' />
                    </TableHead>
                    <TableHead>
                      <Skeleton className='h-5 w-10' />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array(10)
                    .fill(0)
                    .map((i) => (
                      <TableRow key={`row-${i}`}>
                        <TableCell key={`row-${i}-cell-1`}>
                          <div className='inline-flex items-center gap-2'>
                            <Skeleton className='h-[13px] w-[6px] rounded-full' />
                            <Skeleton className='h-[32px] w-[24px] rounded-full' />
                            <div className='grid grid-cols-1 grid-rows-2'>
                              <Skeleton className='h-5 w-80' />
                              <Skeleton className='h-5 w-20' />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell key={`row-${i}-cell-2`}>
                          <Skeleton className='h-5 w-10' />
                        </TableCell>{' '}
                        <TableCell key={`row-${i}-cell-3`}>
                          <Skeleton className='h-5 w-10' />
                        </TableCell>{' '}
                        <TableCell key={`row-${i}-cell-4`}>
                          <Skeleton className='h-5 w-10' />
                        </TableCell>{' '}
                        <TableCell key={`row-${i}-cell-5`}>
                          <Skeleton className='h-5 w-10' />
                        </TableCell>{' '}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
            <div className='flex items-center justify-end space-x-2 py-4'>
              <Skeleton className='h-9 w-14 rounded-md' />
              <Skeleton className='h-9 w-14 rounded-md' />
              <Skeleton className='h-9 w-14 rounded-md' />
              <Skeleton className='h-9 w-14 rounded-md' />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
