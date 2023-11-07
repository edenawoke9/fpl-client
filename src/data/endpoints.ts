/* FPL Endpoints 

Fantasy Premier League

Resources

A Complete Guide to the Fantasy Premier League (FPL) API
https://www.game-change.co.uk/2023/02/10/a-complete-guide-to-the-fantasy-premier-league-fpl-api/

FPL APIs Explained
https://www.oliverlooney.com/blogs/FPL-APIs-Explained

Fantasy Premier League API Endpoints: A Detailed Guide
https://medium.com/@frenzelts/fantasy-premier-league-api-endpoints-a-detailed-guide-acbd5598eb19

https://fantasy.premierleague.com/api/fixtures?future=1
https://fantasy.premierleague.com/api/event-status/
https://fantasy.premierleague.com/api/me/
https://fantasy.premierleague.com/api/my-team/{manager_id}/
https://fantasy.premierleague.com/api/dream-team/8/
https://fantasy.premierleague.com/api/team/set-piece-notes/
https://fantasy.premierleague.com/api/stats/most-valuable-teams/

*/
'use server';

import {
  FPLEventLive,
  FPLElementSummary,
  FPLBoostrapStatic,
  FPLFixture,
  FPLEntry,
  FPLEntryTransfer,
  FPLEntryEventPicks,
  FPLEntryHistory,
  FPLLeaguesClassicStandings,
} from '@/data/models';
import {
  minEvent,
  maxEvent,
  zeroEntry,
  zeroFixtures,
  zeroBootstrapStatic,
  zeroElementSummary,
  zeroEventLive,
  zeroEntryTransfers,
  zeroEntryEventPicks,
  zeroEntryHistory,
  zeroLeaguesClassicStandings,
} from '@/data/models';

async function fetchEndpoint(endpoint: string, zeroData?: any) {
  const empty = zeroData ? zeroData : undefined;
  if (!endpoint) return empty;
  if (process.env.THROTTLE === 'true') {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
  let data = empty;
  const url = 'https://fantasy.premierleague.com/api/' + endpoint;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`could not fetch fantasy.premierleague.com data from ${endpoint} (${res.status})`, {
        cause: { status: res.status },
      });
    } else {
      data = res.json();
    }
  } catch (err) {
    // switch (err.cause.status) {
    // case 404: break;
    // case 403: break;
    // }
  }
  return data;
}

async function fetchBootstrapStatic(): Promise<FPLBoostrapStatic> {
  return await fetchEndpoint('bootstrap-static/', zeroBootstrapStatic);
}

async function fetchFixtures(event?: number): Promise<FPLFixture[]> {
  const empty = zeroFixtures;
  let endpoint = 'fixtures/';
  if (event) {
    if (event >= minEvent && event <= maxEvent) endpoint = `fixtures?event=${event}`;
  }
  return await fetchEndpoint(endpoint, empty);
}

async function fetchElementSummary(element: number): Promise<FPLElementSummary> {
  const empty = zeroElementSummary;
  if (element === 0) return empty;
  return await fetchEndpoint(`element-summary/${element}/`, empty);
}

async function fetchEventLive(gw: number): Promise<FPLEventLive> {
  const empty = zeroEventLive;
  if (gw < 1 && gw > 38) return empty;
  return await fetchEndpoint(`event/${gw}/live/`, empty);
}

async function fetchEntry(entry: number): Promise<FPLEntry> {
  const empty = zeroEntry;
  if (entry === 0) return empty;
  return await fetchEndpoint(`entry/${entry}/`, empty);
}

async function fetchEntryTransfers(entry: number): Promise<FPLEntryTransfer[]> {
  const empty = zeroEntryTransfers;
  if (entry === 0) return empty;
  return await fetchEndpoint(`entry/${entry}/transfers/`, empty);
}

async function fetchEntryEventPicks(entry: number, gw: number): Promise<FPLEntryEventPicks> {
  const empty = zeroEntryEventPicks;
  if (entry === 0) return empty;
  if (gw < 1 && gw > 38) return empty;
  return await fetchEndpoint(`entry/${entry}/event/${gw}/picks/`, empty);
}

async function fetchEntryHistory(entry: number): Promise<FPLEntryHistory> {
  const empty = zeroEntryHistory;
  if (entry === 0) return empty;
  return await fetchEndpoint(`entry/${entry}/history/`, empty);
}

async function fetchLeaguesClassicStandings(league: number, page?: number): Promise<FPLLeaguesClassicStandings> {
  const empty = zeroLeaguesClassicStandings;
  if (league === 0) return empty;
  let endpoint = `leagues-classic/${league}/standings/`;
  if (page && page > 0) endpoint += `?page_standings=${page}`;
  return await fetchEndpoint(endpoint, empty);
}

export {
  fetchBootstrapStatic,
  fetchFixtures,
  fetchElementSummary,
  fetchEventLive,
  fetchEntry,
  fetchEntryTransfers,
  fetchEntryEventPicks,
  fetchEntryHistory,
  fetchLeaguesClassicStandings,
};
