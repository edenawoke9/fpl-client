'use client';

import React from 'react';
import Image from 'next/image';
import Date from '@/components/Date';
import { TableCell, TableRow } from './ui/table';
import { FPLFixture, FPLTeam } from '@/data/models';
import { getTeam, getTeamBadge } from '@/data/helpers';
import { Separator } from '@/components/ui/separator';

export function EventFixture({ fixture, teams }: { fixture: FPLFixture; teams: FPLTeam[] }) {
  const team_h = getTeam(teams, fixture.team_h);
  const team_a = getTeam(teams, fixture.team_a);

  return (
    <TableRow key={fixture.id}>
      <TableCell className='text-right'>{team_h.name}</TableCell>
      <TableCell>
        <Image src={getTeamBadge(team_h)} alt={team_h.short_name} width={40} height={40} priority />
      </TableCell>
      <TableCell className=''>
        {fixture.started ? (
          <div className='item-center flex h-8 w-12 flex-nowrap justify-center rounded-sm bg-slate-800 p-2 text-xs text-white'>
            <div>{fixture.team_h_score}</div>
            <Separator className='px mx-2' orientation='vertical' />
            <div>{fixture.team_a_score}</div>
          </div>
        ) : (
          <div className='text-middle rounded-sm border p-2'>
            <Date dateISO={fixture.kickoff_time!} layout='kk:mm' />
          </div>
        )}
      </TableCell>
      <TableCell>
        <Image src={getTeamBadge(team_a)} alt={team_a.short_name} width={40} height={40} priority />
      </TableCell>
      <TableCell className='text-left'>{team_a.name}</TableCell>
    </TableRow>
  );
}
