'use client';

import React, { useState } from 'react';
import useStore from '@/store';
import Date from '@/components/Date';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FPLEvent, FPLFixture, minEvent, maxEvent } from '@/data/models';
import { EventFixture } from './EventFixture';
import { Table, TableBody } from '@/components/ui/table';

type EventProps = {
  defaultEvent: FPLEvent;
  defaultFixtures: FPLFixture[];
  fetchEventFixtures: (event?: number) => Promise<FPLFixture[]>;
};

export function Event({ defaultEvent, defaultFixtures, fetchEventFixtures }: EventProps) {
  const [currEvent, setCurrEvent] = useState(defaultEvent);
  const [currFixtures, setCurrFixtures] = useState(defaultFixtures);
  const [currEventID, setCurrEventID] = useState(defaultEvent.id);

  const fetchCurrEventFixtures = async (eventID: number) => {
    setCurrEventID(eventID);
    setCurrEvent(useStore.getState().getEvent(eventID));
    setCurrFixtures(await fetchEventFixtures(eventID));
  };

  return (
    <>
      <div className='item-center flex justify-between pt-3 align-middle'>
        {currEventID == minEvent ? (
          <span></span>
        ) : (
          <Button variant='outline' onClick={() => fetchCurrEventFixtures(currEventID - 1)}>
            <ChevronLeft />
            Previous
          </Button>
        )}
        <div className=''>
          {currEvent.name}:{' '}
          <strong>
            <Date dateISO={currEvent.deadline_time} />
          </strong>
        </div>
        {currEventID == maxEvent ? (
          <span></span>
        ) : (
          <Button variant='outline' onClick={() => fetchCurrEventFixtures(currEventID + 1)}>
            Next
            <ChevronRight />
          </Button>
        )}
      </div>
      <Table className='w-70 flex justify-center'>
        <TableBody>
          {currFixtures.map((fixture: any) => (
            <EventFixture key={fixture.id} fixture={fixture} />
          ))}
        </TableBody>
      </Table>
    </>
  );
}
