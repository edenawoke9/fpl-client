import { Elements } from '@/components/Elements';
import { fetchBootstrapStatic } from '@/data/endpoints';

export default async function Page() {
  const bootstrap_static = await fetchBootstrapStatic();

  return (
    <main>
      <h2>Statistics</h2>
      <div className='container mx-auto justify-center'>
        <Elements bootstrap_static={bootstrap_static} />
      </div>
    </main>
  );
}
