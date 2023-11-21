import Image from 'next/image';
import { fetchBootstrapStatic } from '@/data/endpoints';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import useStore from '@/store';

// <span
// // className='bg-strength-1 text-strength-1-foreground px-1'
// // className={`bg-strength-${team.strength} text-strength-${team.strength}-foreground px-1`}
// >
//   {team.strength}
// </span>

export default async function Page() {
  const bootstrap_static = await fetchBootstrapStatic();
  useStore.setState({ bootstrap_static: bootstrap_static });
  return (
    <main>
      <h2>Clubs</h2>
      <div className='grid grid-cols-5 gap-5 py-3'>
        {useStore
          .getState()
          .getTeams()
          .map((team) => (
            <Card key={team.id} className='flex flex-col justify-between'>
              <CardHeader>
                <CardTitle className='flex justify-center'>{team.name}</CardTitle>
                <CardDescription className='flex justify-between p-1'>
                  <span>{team.short_name}</span>
                  <span>{team.strength}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className='flex justify-center'>
                <Image src={useStore.getState().getTeamBadge(team)} alt={team.short_name} width={70} height={70} />
              </CardContent>
              <CardFooter className='flex justify-center'>{'⭐️'.repeat(team.strength)}</CardFooter>
            </Card>
          ))}
      </div>
    </main>
  );
}
