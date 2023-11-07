import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Loading() {
  return (
    <main>
      <h2>Clubs</h2>
      <div className='grid grid-cols-5 gap-5'>
        {Array(20)
          .fill(0)
          .map((i) => (
            <Card key='{i}' className='flex flex-col justify-between'>
              <CardHeader>
                <CardTitle className='flex justify-center'>
                  <Skeleton className='h-5 w-20' />
                </CardTitle>
                <CardDescription className='flex justify-between p-1'>
                  <Skeleton className='w-30 h-5' />
                </CardDescription>
              </CardHeader>
              <CardContent className='flex justify-center'>
                <Skeleton className='h-[70px] w-[70px] rounded-full' />
              </CardContent>
              <CardFooter className='flex justify-center'>
                <Skeleton className='h-5 w-20' />
              </CardFooter>
            </Card>
          ))}
      </div>
    </main>
  );
}
