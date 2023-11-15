import useStore from '@/store';
import { TeamCards } from '@/components/TeamCards';
import { fetchBootstrapStatic } from '@/data/endpoints';

export default async function Page() {
  const bootstrap_static = await fetchBootstrapStatic();

  useStore.setState({ bootstrap_static: bootstrap_static });

  return (
    <main>
      <h2>Clubs</h2>
      <TeamCards teams={bootstrap_static.teams} />
    </main>
  );
}
