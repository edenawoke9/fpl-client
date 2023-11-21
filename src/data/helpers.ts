import {
  FPLEvent,
  FPLTeam,
  FPLElement,
  FPLElementStat,
  FPLElementType,
  FPLFixture,
  FPLEntry,
  maxEvent,
} from '@/data/models';
// import { urlExists } from '@/lib/resources';

const getElement = (elements: FPLElement[], id: number) => {
  if (id < 1) return elements[0];
  return elements.find((element: FPLElement) => id === element.id);
};

const searchElements = (elements: FPLElement[], search: string) => {
  const match = elements.filter((element) => element.web_name.includes(search)); // web_name === "*search*" ?
  if (match) return match;
  return [] as FPLElement[];
};

const getElementType = (element_types: FPLElementType[], element: FPLElement) => {
  return element_types[element.element_type - 1];
};

const getElementStatsExtra = () => {
  const data: FPLElementStat[] = [
    {
      name: 'total_points',
      label: 'Total points',
      short_name: 'Pts.',
    },
    {
      name: 'event_points',
      label: 'Round points',
    },
    {
      name: 'now_cost',
      label: 'Price',
      short_name: 'Cost',
    },
    {
      name: 'selected_by_percent',
      label: 'Selected by %',
      short_name: 'Sel.',
      option_name: 'Team selected by %',
    },
    {
      name: 'form',
      label: 'Form',
    },
    {
      name: 'dreamteam_count',
      label: 'Times in Dream Team',
    },
    // {
    //   name: 'in_dreamteam',
    //   label: 'In Dream Team (round)',
    // },
    {
      name: 'value_form',
      label: 'Value (form)',
    },
    {
      name: 'value_season',
      label: 'Value (season)',
    },
    {
      name: 'points_per_game',
      label: 'Points per match',
    },
    {
      name: 'transfers_in',
      label: 'Transfers in',
    },
    {
      name: 'transfers_out',
      label: 'Transfers out',
    },
    {
      name: 'transfers_in_event',
      label: 'Transfers in (round)',
    },
    {
      name: 'transfers_out_event',
      label: 'Transfers out (round)',
    },
    {
      name: 'cost_change_start',
      label: 'Price rise',
    },
    {
      name: 'cost_change_start_fall',
      label: 'Price fall',
    },
    {
      name: 'cost_change_event',
      label: 'Price rise (round)',
    },
    {
      name: 'cost_change_event_fall',
      label: 'Price fall (round)',
    },
    {
      name: 'ep_this',
      label: 'Expected Points (round)',
      option_name: 'xP (round)',
    },
    {
      name: 'ep_next',
      label: 'Expected Points (next)',
      option_name: 'xP (next)',
    },
    // {
    //   name: 'expected_goals_per_90',
    //   label: 'Expected Goals (per match)',
    //   option_name: 'xG (per match)',
    // },
    // {
    //   name: 'expected_assists_per_90',
    //   label: 'Expected Assists (per match)',
    //   option_name: 'xA (per match)',
    // },
    // {
    //   name: 'expected_goal_involvements_per_90',
    //   label: 'Expected Goal Involvements (per match)',
    //   option_name: 'xGI (per match)',
    // },
    // {
    //   name: 'expected_goals_conceded_per_90',
    //   label: 'Expected Goal Conceded (per match)',
    //   option_name: 'xGC (per match)',
    // },
    // Other FPLElementStatValues?:
    //   {
    //     "chance_of_playing_next_round": null,
    //     "chance_of_playing_this_round": null,
    //     "news": "",
    //     "news_added": null,
    //     "special": false,
    //     "status": "a",
    //     "influence_rank": 1,
    //     "influence_rank_type": 1,
    //     "creativity_rank": 16,
    //     "creativity_rank_type": 12,
    //     "threat_rank": 2,
    //     "threat_rank_type": 1,
    //     "ict_index_rank": 1,
    //     "ict_index_rank_type": 1,
    //     "corners_and_indirect_freekicks_order": null,
    //     "corners_and_indirect_freekicks_text": "",
    //     "direct_freekicks_order": null,
    //     "direct_freekicks_text": "",
    //     "penalties_order": 2,
    //     "penalties_text": "",
    //     "saves_per_90": 0.0,
    //     "goals_conceded_per_90": 0.93,
    //     "now_cost_rank": 2,
    //     "now_cost_rank_type": 1,
    //     "form_rank": 2,
    //     "form_rank_type": 1,
    //     "points_per_game_rank": 1,
    //     "points_per_game_rank_type": 1,
    //     "selected_rank": 4,
    //     "selected_rank_type": 2,
    //     "starts_per_90": 1.05,
    //     "clean_sheets_per_90": 0.23
    // },
  ];
  return data;
};

const getElementStats = (element_stats: FPLElementStat[]) => {
  const data = getElementStatsExtra();
  for (const i in element_stats) {
    let element_stat = element_stats[i];
    switch (element_stat.name) {
      case 'starts':
        element_stat.option_name = 'Starts';
        break;
      case 'expected_goals':
        element_stat.option_name = 'xG (Total)';
        break;
      case 'expected_assists':
        element_stat.option_name = 'xA (Total)';
        break;
      case 'expected_goal_involvements':
        element_stat.option_name = 'xGI (Total)';
        break;
      case 'expected_goals_conceded':
        element_stat.option_name = 'xGC (Total)';
        break;
    }
    data.push(element_stat);
  }
  return data;
};

const getElementStat = (element_stats: FPLElementStat[], name: string) => {
  return getElementStats(element_stats).find((element_stat: FPLElementStat) => name === element_stat.name);
};

const getElementAvailabilities = () => {
  const data: FPLElementStat[] = [
    {
      name: 'news_added',
      label: 'Most recently added',
    },
    {
      name: 'chance_of_playing_next_round',
      label: 'Chance of playing',
      ascending: true,
    },
  ];
  return data;
};

const getElementAvailability = (name: string) => {
  return getElementAvailabilities().find((element_stat: FPLElementStat) => name === element_stat.name);
};

const getElementTeam = (teams: FPLTeam[], element: FPLElement) => {
  return teams[element.team - 1];
};

const getElementShirt = (element: FPLElement) => {
  // Example: "Enock Agyei" MID
  // "team_code": 90 => "https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_90-110.png"
  let code = `${element.team_code}`;
  if (element?.element_type == 1) code = code.concat('_1'); // GKP
  return `https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_${code}-66.webp`;
};

const getElementPhoto = (element: FPLElement) => {
  // Example: "Mohamed Salah" MID
  // "code": 118748 => "https://resources.premierleague.com/premierleague/photos/players/250x250/p118748.png"
  const url = `https://resources.premierleague.com/premierleague/photos/players/250x250/p${element.code}.png`;
  // return urlExists(url) ? url : getElementShirt(element);
  return url;
};

const getTeam = (teams: FPLTeam[], id: number) => {
  if (id < 1) return teams[0];
  return teams[id - 1];
};

const getTeamBadge = (team: FPLTeam) => {
  // Example: "Liverpool"
  // "code": 14 => "https://resources.premierleague.com/premierleague/badges/70/t14.png"
  return `https://resources.premierleague.com/premierleague/badges/70/t${team.code}.png`;
};

const getEvent = (events: FPLEvent[], id: number) => {
  // if ( ! id < nextEvent() )
  //     throw new Error( `gameweek_nr (${id}) - must be in the past` );
  if (id < 1) return events[0];
  return events[id - 1];
};

const getEventFixtures = (fixtures: FPLFixture[], event: number) => {
  return fixtures.filter((fixture: FPLFixture) => fixture.event === event);
};

const getEntryRegionFlag = (entry: FPLEntry) => {
  // National Flag:
  // https://fantasy.premierleague.com/img/flags/FR.gif
  //
  // Full List of Regions available at:
  // https://users.premierleague.com/users/manage/personal
  return `https://fantasy.premierleague.com/img/flags/${entry.player_region_iso_code_short}.gif`;
};

const getEntryFavoriteTeamBadge = (teams: FPLTeam[], entry: FPLEntry) => {
  // General PL Fan
  // https://users.premierleague.com/users/manage/preferences
  if (!entry.favourite_team)
    return `data:image/png;base64,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`;
  const team = getTeam(teams, entry.favourite_team);
  return getTeamBadge(team);
};

const getCurrentEvent = (events: FPLEvent[]) => {
  let event = events.find((event) => !event.finished);
  if (!event) event = getEvent(events, maxEvent); // End of season
  return event;
};

const getElementBackground = () => {
  return 'https://www.premierleague.com/resources/rebrand/v7.131.3/i/elements/backgrounds/primary-bg.svg';
};

const getElementBackgroundGraphic = () => {
  return 'https://www.premierleague.com/resources/rebrand/v7.131.3/i/elements/backgrounds/primary-graphic.svg';
};

export {
  searchElements,
  getElement,
  getElementType,
  getElementStatsExtra,
  getElementStats,
  getElementStat,
  getElementAvailabilities,
  getElementAvailability,
  getElementTeam,
  getElementShirt,
  getElementPhoto,
  getTeam,
  getTeamBadge,
  getEvent,
  getEventFixtures,
  getEntryRegionFlag,
  getEntryFavoriteTeamBadge,
  getCurrentEvent,
  getElementBackground,
  getElementBackgroundGraphic,
};
