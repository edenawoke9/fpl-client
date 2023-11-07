import React from 'react';
import Image from 'next/image';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { FPLTeam } from '@/data/models';
import { getTeamBadge } from '@/data/helpers';

export function TeamCard({ team }: { team: FPLTeam }) {
  return (
    <Card key='{team.id}' className='flex flex-col justify-between'>
      <CardHeader>
        <CardTitle className='flex justify-center'>{team.name}</CardTitle>
        <CardDescription className='flex justify-between p-1'>
          {team.short_name}
          <span
          // className='bg-strength-1 text-strength-1-foreground px-1'
          // className={`bg-strength-${team.strength} text-strength-${team.strength}-foreground px-1`}
          >
            {team.strength}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className='flex justify-center'>
        <Image
          className=''
          src={getTeamBadge(team)}
          alt={team.short_name}
          width={70}
          height={70}
          priority
        />
      </CardContent>
      <CardFooter className='flex justify-center'>{'⭐️'.repeat(team.strength)}</CardFooter>
    </Card>
  );
}
