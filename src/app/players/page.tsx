import useStore from '@/store';
import StoreInitializer from '@/components/StoreInitializer';
import { fetchBootstrapStatic } from '@/data/endpoints';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlayersStatistics } from '@/components/PlayersStatistics';
import { PlayersAvailability } from '@/components/PlayersAvailability';

export default async function Page() {
  const bootstrap_static = await fetchBootstrapStatic();

  useStore.setState({ bootstrap_static: bootstrap_static });

  return (
    <main>
      <h2>Players</h2>
      <StoreInitializer bootstrap_static={bootstrap_static} />
      <Tabs defaultValue='statistics' className='container w-fit py-3'>
        <TabsList className='container grid w-fit grid-cols-2'>
          <TabsTrigger value='statistics'>Statistics</TabsTrigger>
          <TabsTrigger value='availability'>Availability</TabsTrigger>
        </TabsList>
        <TabsContent value='statistics'>
          <PlayersStatistics />
        </TabsContent>
        <TabsContent value='availability'>
          <PlayersAvailability />
        </TabsContent>
      </Tabs>
    </main>
  );
}
