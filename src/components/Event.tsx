'use client';

import React, { useState } from 'react';
import Date from '@/components/Date';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FPLEvent, FPLFixture, FPLTeam, minEvent, maxEvent } from '@/data/models';
import { getEvent } from '@/data/helpers';
import { EventFixtures } from '@/components/EventFixtures';

export function Event({
  teams,
  events,
  defaultEvent,
  defaultFixtures,
  fetchEventFixtures,
}: {
  teams: FPLTeam[];
  events: FPLEvent[];
  defaultEvent: FPLEvent;
  defaultFixtures: FPLFixture[];
  fetchEventFixtures: (event?: number) => Promise<FPLFixture[]>;
}) {
  const [currEvent, setCurrEvent] = useState(defaultEvent);
  const [currFixtures, setCurrFixtures] = useState(defaultFixtures);
  const [currEventID, setCurrEventID] = useState(defaultEvent.id);

  const fetchCurrEventFixtures = async (eventID: number) => {
    setCurrEventID(eventID);
    setCurrEvent(getEvent(events, eventID));
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
      <EventFixtures teams={teams} fixtures={currFixtures} />
    </>
  );
}
