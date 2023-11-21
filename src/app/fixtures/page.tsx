import useStore from '@/store';
import StoreInitializer from '@/components/StoreInitializer';
import { fetchBootstrapStatic, fetchFixtures } from '@/data/endpoints';
import { Event } from '@/components/Event';

export default async function Page() {
  const bootstrap_static = await fetchBootstrapStatic();

  useStore.setState({ bootstrap_static: bootstrap_static });

  const currEvent = useStore.getState().getCurrentEvent();
  const currFixtures = await fetchFixtures(currEvent.id);

  return (
    <main>
      <h2>Fixtures & Results</h2>
      <StoreInitializer bootstrap_static={bootstrap_static} />
      <Event fetchEventFixtures={fetchFixtures} defaultEvent={currEvent} defaultFixtures={currFixtures} />
    </main>
  );
}
