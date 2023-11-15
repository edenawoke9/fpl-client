'use client';

import React from 'react';
import { EventFixture } from './EventFixture';
import { Table, TableBody } from '@/components/ui/table';
import { FPLFixture, FPLTeam } from '@/data/models';

export async function EventFixtures({
  teams,
  fixtures,
}: {
  teams: FPLTeam[];
  fixtures: FPLFixture[];
}) {
  return (
    <Table className='w-70 flex justify-center'>
      <TableBody>
        {fixtures.map((fixture: any) => (
          <EventFixture key={fixture.id} fixture={fixture} teams={teams} />
        ))}
      </TableBody>
    </Table>
  );
}
