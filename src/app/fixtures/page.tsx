import { Event } from '@/components/Event';
import { fetchBootstrapStatic, fetchFixtures } from '@/data/endpoints';
import { getCurrentEvent } from '@/data/helpers';

export default async function Page() {
  const bootstrap_static = await fetchBootstrapStatic();
  const event = getCurrentEvent(bootstrap_static.events);
  const currFixtures = await fetchFixtures(event.id);

  return (
    <main>
      <h2>Fixtures & Results</h2>
      <Event
        teams={bootstrap_static.teams}
        events={bootstrap_static.events}
        fetchEventFixtures={fetchFixtures}
        defaultEvent={event}
        defaultFixtures={currFixtures}
      />
    </main>
  );
}
