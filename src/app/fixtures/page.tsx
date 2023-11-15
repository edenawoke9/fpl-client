import useStore from '@/store';
import { Event } from '@/components/Event';
import { fetchBootstrapStatic, fetchFixtures } from '@/data/endpoints';
import { getCurrentEvent } from '@/data/helpers';

export default async function Page() {
  const bootstrap_static = await fetchBootstrapStatic();

  useStore.setState({ bootstrap_static: bootstrap_static });

  const currEvent = useStore.getState().getCurrentEvent();
  const currFixtures = await fetchFixtures(currEvent.id);

  return (
    <main>
      <h2>Fixtures & Results</h2>
      <Event
        teams={bootstrap_static.teams}
        events={bootstrap_static.events}
        fetchEventFixtures={fetchFixtures}
        defaultEvent={currEvent}
        defaultFixtures={currFixtures}
      />
    </main>
  );
}
