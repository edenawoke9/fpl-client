import React from 'react';
import { TeamCard } from '@/components/TeamCard';
import { FPLTeam } from '@/data/models';

export function TeamCards({ teams }: { teams: FPLTeam[] }) {
  return (
    <div className='grid grid-cols-5 gap-5'>
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  );
}
