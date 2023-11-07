import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <main className='grid h-screen place-items-center'>
      <Skeleton className='h-[240px] w-[360px]' />
      <div>
        <Skeleton className='h-5 w-40' />
      </div>
      <div className='grid grid-cols-5 gap-5'>
        {Array(12)
          .fill(0)
          .map((i) => (
            <Card key='{i}' className='flex flex-col justify-between'>
              <CardHeader>
                <CardTitle className='flex justify-start'>
                  <Skeleton className='h-10 w-52' />
                </CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className='flex justify-end'>
                <Skeleton className='h-5 w-20' />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          ))}
      </div>
      <div>
        <Skeleton className='h-5 w-40' />
      </div>
    </main>
  );
}
