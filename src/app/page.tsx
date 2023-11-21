import useStore from '@/store';
import Image from 'next/image';
import Date from '@/components/Date';
import { fetchBootstrapStatic, fetchEntry } from '@/data/endpoints';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default async function Home() {
  const bootstrap_static = await fetchBootstrapStatic();
  const entry = await fetchEntry(parseInt(`${process.env.ENTRY_ID}`));

  useStore.setState({ bootstrap_static: bootstrap_static });

  const event = useStore.getState().getEvent(entry.current_event);

  const stats: {
    id: string;
    title: string;
    content: string;
  }[] = [
    {
      id: 'average_entry_score',
      title: 'Average Points',
      content: `${event.average_entry_score}`,
    },
    {
      id: 'highest_score',
      title: 'Highest Points',
      content: `${event.highest_score}`,
    },
    {
      id: 'transfers_made',
      title: 'Transfers Made',
      content: event.transfers_made.toLocaleString(),
    },
    {
      id: 'most_selected',
      title: 'Most Selected',
      content: useStore.getState().getElement(event.most_selected!)?.web_name || '',
    },
    {
      id: 'most_transferred_in',
      title: 'Most Transferred In',
      content: useStore.getState().getElement(event.most_transferred_in!)?.web_name || '',
    },
    {
      id: 'top_element',
      title: 'Player of the Week',
      content: useStore.getState().getElement(event.top_element!)?.web_name || '',
    },
    {
      id: 'most_captained',
      title: 'Most Captained',
      content: useStore.getState().getElement(event.most_captained!)?.web_name || '',
    },
    {
      id: 'most_vice_captained',
      title: 'Most Vice-Captained',
      content: useStore.getState().getElement(event.most_vice_captained!)?.web_name || '',
    },
    {
      id: 'bboost_played',
      title: 'Bench Boost Played',
      content: event.chip_plays[0].num_played.toLocaleString(),
    },
    {
      id: 'freehit_played',
      title: 'Free Hit Played',
      content: event.chip_plays[1].num_played.toLocaleString(),
    },
    {
      id: 'wildcard_played',
      title: 'Wildcards Played',
      content: event.chip_plays[2].num_played.toLocaleString(),
    },
    {
      id: '3xc_played',
      title: 'Tripe Captain Played',
      content: event.chip_plays[3].num_played.toLocaleString(),
    },
  ];

  return (
    <main className='grid h-screen place-items-center'>
      <Image
        src='https://fantasy.premierleague.com/static/media/player-comp-1-1x.107b14f7.png'
        alt='PL Players'
        width={360}
        height={240}
      />
      <div>
        {event.name}:{' '}
        <strong>
          <Date dateISO={event.deadline_time} />
        </strong>
      </div>
      <div className='grid grid-cols-5 gap-5'>
        {stats.map((stat) => (
          <Card key={stat.id} className='flex flex-col justify-between'>
            <CardHeader>
              <CardTitle className='flex justify-start'>{stat.title}</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className='flex justify-end'>{stat.content}</CardContent>
            <CardFooter></CardFooter>
          </Card>
        ))}
      </div>
      <div>Total: {useStore.getState().bootstrap_static.total_players.toLocaleString()} fantasy managers.</div>
    </main>
  );
}
