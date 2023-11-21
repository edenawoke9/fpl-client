/* types Definitions */

type FPLEvent = {
  id: number;
  name: string;
  deadline_time: string; // datetime
  average_entry_score: number;
  finished: boolean;
  data_checked: boolean;
  highest_scoring_entry: number | null;
  deadline_time_epoch: number;
  deadline_time_game_offset: number;
  highest_score: number | null;
  is_previous: boolean;
  is_current: boolean;
  is_next: boolean;
  cup_leagues_created: boolean;
  h2h_ko_matches_created: boolean;
  chip_plays: any;
  most_selected: number | null;
  most_transferred_in: number | null;
  top_element: number | null;
  top_element_info: any;
  transfers_made: number;
  most_captained: number | null;
  most_vice_captained: number | null;
};

type FPLEventLive = {
  elements: FPLEventLiveElement[];
};

type FPLEventLiveElement = {
  id: number;
  stats: FPLElementStatValues[];
  explain: FPLEventLiveElementExplain[];
};

type FPLEventLiveElementExplain = {
  fixture: number;
  stats: FPLEventLiveElementExplainStat[];
};

type FPLEventLiveElementExplainStat = {
  identifier: string;
  points: number;
  value: number;
};

type FPLTeam = {
  code: number;
  draw: number;
  form: null;
  id: number;
  loss: number;
  name: string;
  played: number;
  points: number;
  position: number;
  short_name: string;
  strength: number;
  team_division: null;
  unavailable: boolean;
  win: number;
  strength_overall_home: number;
  strength_overall_away: number;
  strength_attack_home: number;
  strength_attack_away: number;
  strength_defence_home: number;
  strength_defence_away: number;
  pulse_id: number;
  // Extension
  badge?: string;
};

type FPLElementStatValues = {
  minutes: number;
  goals_scored: number;
  assists: number;
  clean_sheets: number;
  goals_conceded: number;
  own_goals: number;
  penalties_saved: number;
  penalties_missed: number;
  yellow_cards: number;
  red_cards: number;
  saves: number;
  bonus: number;
  bps: number;
  influence: string; // float
  creativity: string; // float
  threat: string; // float
  ict_index: string; // float
  starts: number;
  expected_goals: string; // float
  expected_assists: string; // float
  expected_goal_involvements: string; // float
  expected_goals_conceded: string; // float
  total_points: number;
  in_dreamteam?: boolean;
};

type FPLElement = FPLElementStatValues & {
  chance_of_playing_next_round: number;
  chance_of_playing_this_round: number;
  code: number;
  cost_change_event: number;
  cost_change_event_fall: number;
  cost_change_start: number;
  cost_change_start_fall: number;
  dreamteam_count: number;
  element_type: number;
  ep_next: string; // float
  ep_this: string; // float
  event_points: number;
  first_name: string;
  form: string; // float
  id: number;
  news: string;
  news_added: string; // datetime
  now_cost: number;
  photo: string;
  points_per_game: string; // float
  second_name: string;
  selected_by_percent: string; // float
  special: boolean;
  squad_number: null;
  status: string;
  team: number;
  team_code: number;
  transfers_in: number;
  transfers_in_event: number;
  transfers_out: number;
  transfers_out_event: number;
  value_form: string; // float
  value_season: string; // float
  web_name: string;
  influence_rank: number;
  influence_rank_type: number;
  creativity_rank: number;
  creativity_rank_type: number;
  threat_rank: number;
  threat_rank_type: number;
  ict_index_rank: number;
  ict_index_rank_type: number;
  corners_and_indirect_freekicks_order: number | null;
  corners_and_indirect_freekicks_text: string;
  direct_freekicks_order: number | null;
  direct_freekicks_text: string;
  penalties_order: number | null;
  penalties_text: string;
  expected_goals_per_90: number;
  saves_per_90: number;
  expected_assists_per_90: number;
  expected_goal_involvements_per_90: number;
  expected_goals_conceded_per_90: number;
  goals_conceded_per_90: number;
  now_cost_rank: number;
  now_cost_rank_type: number;
  form_rank: number;
  form_rank_type: number;
  points_per_game_rank: number;
  points_per_game_rank_type: number;
  selected_rank: number;
  selected_rank_type: number;
  starts_per_90: number;
  clean_sheets_per_90: number;
  // Extension
  // photo?: string; // Already exists => Overwrite during look up.
  shirt?: string;
};

type FPLElementStat = {
  label: string; // column-header tooltip
  name: string;
  // Extension
  // redirect?: string; // TODO: display a different 'label' when selected
  // filter?: any[]; // TODO: custom filter to overwrite default viewedBy behavior
  // hidden?: boolean; // TODO: shouldn't be shown in the 'Sorted by' list
  short_name?: string; // column-header display
  option_name?: string; // dropdown-menu option
  ascending?: boolean; // TODO: sorting 'asc' when value is true, else default is 'desc'
};

type FPLElementStatus = {
  src: string;
  width: number;
  height: number;
  title: string;
  // class?: string;
};

type FPLElementType = {
  id: number;
  plural_name: string;
  plural_name_short: string;
  singular_name: string;
  singular_name_short: string;
  squad_select: number;
  squad_min_play: number;
  squad_max_play: number;
  ui_shirt_specific: boolean;
  sub_positions_locked: number[];
  element_count: number;
};

type FPLElementSummary = {
  fixtures: FPLElementSummaryFixture[];
  history: FPLElementSummaryHistory[];
  history_past: FPLElementSummaryHistoryPast[];
};

type FPLElementSummaryFixture = FPLFixtureBase & {
  event_name: string;
  is_home: boolean;
  difficulty: number;
};

type FPLElementSummaryHistory = FPLElementStatValues & {
  element: number;
  fixture: number;
  opponent_team: number;
  was_home: boolean;
  kickoff_time: string; // datetime
  team_h_score: number;
  team_a_score: number;
  round: number;
  value: number;
  transfers_balance: number;
  selected: number;
  transfers_in: number;
  transfers_out: number;
};

type FPLElementSummaryHistoryPast = FPLElementStatValues & {
  season_name: string;
  element_code: number;
  start_cost: number;
  end_cost: number;
};

type FPLBoostrapStatic = {
  events: FPLEvent[];
  game_settings: FPLBootstrapStaticGameSettings;
  phases: FPLBootstrapStaticPhases[];
  teams: FPLTeam[];
  total_players: number; // fantasy managers
  elements: FPLElement[]; // football players
  element_stats: FPLElementStat[];
  element_types: FPLElementType[];
};

type FPLBootstrapStaticGameSettings = {
  league_join_private_max: number;
  league_join_public_max: number;
  league_max_size_public_classic: number;
  league_max_size_public_h2h: number;
  league_max_size_private_h2h: number;
  league_max_ko_rounds_private_h2h: number;
  league_prefix_public: string;
  league_points_h2h_win: number;
  league_points_h2h_lose: number;
  league_points_h2h_draw: number;
  league_ko_first_instead_of_random: boolean;
  cup_start_event_id: any; // TODO null
  cup_stop_event_id: any; // TODO null
  cup_qualifying_method: any; // TODO null
  cup_type: any; // TODO null
  squad_squadplay: number;
  squad_squadsize: number;
  squad_team_limit: number;
  squad_total_spend: number;
  ui_currency_multiplier: number;
  ui_use_special_shirts: boolean;
  ui_special_shirt_exclusions: any; // TODO []
  stats_form_days: number;
  sys_vice_captain_enabled: boolean;
  transfers_cap: number;
  transfers_sell_on_fee: number; // float
  league_h2h_tiebreak_stats: string[]; // ['+goals_scored', '-goals_conceded']
  timezone: string;
}; // TODO

type FPLBootstrapStaticPhases = {
  id: number;
  name: string;
  start_event: number;
  stop_event: number;
};

type FPLFixtureBase = {
  code: number;
  event: number | null;
  finished: boolean;
  id: number;
  kickoff_time: string | null; // datetime
  minutes: number;
  provisional_start_time: boolean;
  started: boolean | null;
  team_a: number;
  team_a_score: number | null;
  team_h: number;
  team_h_score: number | null;
};

type FPLFixture = FPLFixtureBase & {
  finished_provisional: boolean;
  stats: FPLFixtureStat[];
  team_h_difficulty: number;
  team_a_difficulty: number;
  pulse_id: number;
};

type FPLFixtureStat = {
  identifier: string;
  a: FPLFixtureStatElement[];
  h: FPLFixtureStatElement[];
};

type FPLFixtureStatElement = {
  value: number;
  element: number;
};

type FPLEntry = {
  id: number;
  joined_time: string; // datetime
  started_event: number;
  favourite_team: number | null;
  player_first_name: string;
  player_last_name: string;
  player_region_id: number;
  player_region_name: string;
  player_region_iso_code_short: string;
  player_region_iso_code_long: string;
  summary_overall_points: number;
  summary_overall_rank: number;
  summary_event_points: number;
  summary_event_rank: number;
  current_event: number;
  leagues: FPLEntryLeagues;
  name: string;
  name_change_blocked: boolean;
  kit: string; // JSON
  last_deadline_bank: number;
  last_deadline_value: number;
  last_deadline_total_transfers: number;
};

type FPLEntryLeagues = {
  classic: FPLEntryLeagueClassic[];
  h2h: any; // TODO []
  cup: FPLEntryLeagueCup;
  cup_matches: any; // TODO null
}; // TODO

type FPLEntryLeagueClassic = {
  id: number;
  name: string;
  short_name: string;
  created: string; // datetime
  closed: boolean;
  rank: number | null;
  max_entries: number | null;
  league_type: string;
  scoring: string;
  admin_entry: boolean | null;
  start_event: number;
  entry_can_leave: boolean;
  entry_can_admin: boolean;
  entry_can_invite: boolean;
  has_cup: true;
  cup_league: boolean | null;
  cup_qualified: boolean | null;
  entry_rank: number;
  entry_last_rank: number;
};

type FPLEntryLeagueCup = {
  matches: any; // TODO []
  status: FPLEntryLeagueCupStatus;
  cup_league: any; // TODO null
}; // TODO

type FPLEntryLeagueCupStatus = {
  qualification_event: any; // TODO null;
  qualification_numbers: any; // TODO null;
  qualification_rank: any; // TODO null;
  qualification_state: any; // TODO null;
}; // TODO

type FPLEntryTransfer = {
  element_in: number;
  element_in_cost: number;
  element_out: number;
  element_out_cost: number;
  entry: number;
  event: number;
  time: string; // datetime
};

type FPLEntryEventPicks = {
  active_chip: string | null;
  automatic_subs: FPLEntryEventPicksAutomaticSub[];
  entry_history: FPLEntryEventPicksEntryHistory;
  picks: FPLEntryEventPick[];
};

type FPLEntryEventPicksAutomaticSub = {
  entry: number;
  element_in: number;
  element_out: number;
  event: number;
};

type FPLEntryEventPicksEntryHistory = {
  event: number;
  points: number;
  total_points: number;
  rank: number;
  rank_sort: number;
  overall_rank: number;
  bank: number;
  value: number;
  event_transfers: number;
  event_transfers_cost: number;
  points_on_bench: number;
};

type FPLEntryEventPick = {
  element: number;
  position: number;
  multiplier: number;
  is_captain: boolean;
  is_vice_captain: boolean;
};

type FPLEntryHistory = {
  current: FPLEntryHistoryCurrent[];
  past: FPLEntryHistoryPast[];
  chips: FPLEntryHistoryChip[];
};

type FPLEntryHistoryCurrent = {
  event: number;
  points: number;
  total_points: number;
  rank: number;
  rank_sort: number;
  overall_rank: number;
  bank: number;
  value: number;
  event_transfers: number;
  event_transfers_cost: number;
  points_on_bench: number;
};

type FPLEntryHistoryPast = {
  season_name: string;
  total_points: number;
  rank: number;
};

type FPLEntryHistoryChip = {
  name: string;
  time: string; // datetime
  event: number;
};

type FPLLeaguesClassicStandings = {
  new_entries: FPLLeaguesClassicNewEntries;
  last_updated_data: string; // datetime
  league: FPLLeaguesClassicLeague;
  standings: FPLLeaguesClassicStanding[];
};

type FPLLeaguesClassicNewEntries = {
  has_next: boolean;
  page: number;
  results: any; // TODO: []
}; // TODO

type FPLLeaguesClassicLeague = {
  id: number;
  name: string;
  created: string; // datetime
  closed: boolean;
  max_entries: any; // TODO: null
  league_type: string;
  scoring: string;
  admin_entry: number;
  start_event: number;
  code_privacy: string;
  has_cup: boolean;
  cup_league: number | null;
  rank: any; // TODO: null
}; // TODO

type FPLLeaguesClassicStanding = {
  has_next: boolean;
  page: number;
  results: FPLLeaguesClassicStandingResult[];
};

type FPLLeaguesClassicStandingResult = {
  id: number;
  event_total: number;
  player_name: string;
  rank: number;
  last_rank: number;
  rank_sort: number;
  total: number;
  entry: number;
  entry_name: string;
};

export type {
  FPLEvent,
  FPLEventLive,
  FPLEventLiveElement,
  FPLEventLiveElementExplain,
  FPLEventLiveElementExplainStat,
  FPLTeam,
  FPLElement,
  FPLElementStat,
  FPLElementStatValues,
  FPLElementStatus,
  FPLElementType,
  FPLElementSummary,
  FPLElementSummaryFixture,
  FPLElementSummaryHistory,
  FPLElementSummaryHistoryPast,
  FPLBoostrapStatic,
  FPLBootstrapStaticGameSettings,
  FPLBootstrapStaticPhases,
  FPLFixture,
  FPLFixtureStat,
  FPLFixtureStatElement,
  FPLEntry,
  FPLEntryLeagues,
  FPLEntryLeagueClassic,
  FPLEntryTransfer,
  FPLEntryEventPicks,
  FPLEntryEventPicksAutomaticSub,
  FPLEntryEventPicksEntryHistory,
  FPLEntryEventPick,
  FPLEntryHistory,
  FPLEntryHistoryCurrent,
  FPLEntryHistoryPast,
  FPLEntryHistoryChip,
  FPLLeaguesClassicStandings,
};

/* Model Supplements 

element.chance_of_playing_next_round
  0:   0% chance of playing
  25:  25% chance of playing
  50:  50% chance of playing
  75:  75% chance of playing
  100: 100% chance of playing

element.status
  "a": available   (100% | null chance of playing)
  "i": injured     (0% chance of playing until return date)
  "d": doubtfull   (25% chance of playing)
                   (50% chance of playing)
                   (75% chance of playing)
  "u": Unavailable (0% chance of playing until transfer back to PL)
  "s": Suspended   (0% chance of playing until back from suspension)

*/

const FPLElementStatuses: {
  [index: number]: FPLElementStatus;
} = {
  0: {
    src: '/images/players/status-000.svg',
    width: 20,
    height: 20,
    title: 'Unlikely to play',
  },
  25: {
    src: '/images/players/status-025.svg',
    width: 20,
    height: 20,
    title: '25% chance of playing',
  },
  50: {
    src: '/images/players/status-050.svg',
    width: 20,
    height: 20,
    title: '50% chance of playing',
  },
  75: {
    src: '/images/players/status-075.svg',
    width: 20,
    height: 20,
    title: '75% chance of playing',
    // class: 'm-auto block fill-yellow-400 text-black', // instead of style="fill: rgb(255, 230, 91); color: rgb(47, 47, 47); display: block; margin: auto;"
  },
  100: {
    src: '/images/players/status-100.svg',
    width: 6,
    height: 13,
    title: '',
  },
};

export { FPLElementStatuses };

/* Initial states */

const [minEvent, maxEvent] = [1, 38];
const zeroFetched: boolean = false;
const zeroEntry: FPLEntry = {
  id: 0,
  joined_time: '',
  started_event: 0,
  favourite_team: null,
  player_first_name: '',
  player_last_name: '',
  player_region_id: 0,
  player_region_name: '',
  player_region_iso_code_short: '',
  player_region_iso_code_long: '',
  summary_overall_points: 0,
  summary_overall_rank: 0,
  summary_event_points: 0,
  summary_event_rank: 0,
  current_event: 0,
  leagues: {
    classic: [],
    h2h: [],
    cup: {
      matches: [],
      status: {
        qualification_event: null,
        qualification_numbers: null,
        qualification_rank: null,
        qualification_state: null,
      },
      cup_league: null,
    },
    cup_matches: [],
  },
  name: '',
  name_change_blocked: false,
  kit: '',
  last_deadline_bank: 0,
  last_deadline_value: 0,
  last_deadline_total_transfers: 0,
};
const zeroFixtures: FPLFixture[] = [];
const zeroElementSummary: FPLElementSummary = {
  fixtures: [],
  history: [],
  history_past: [],
};
const zeroEventLive: FPLEventLive = {
  elements: [],
};
const zeroEntryEventPicks: FPLEntryEventPicks = {
  active_chip: null,
  automatic_subs: [],
  entry_history: {
    event: 0,
    points: 0,
    total_points: 0,
    rank: 0,
    rank_sort: 0,
    overall_rank: 0,
    bank: 0,
    value: 0,
    event_transfers: 0,
    event_transfers_cost: 0,
    points_on_bench: 0,
  },
  picks: [],
};
const zeroEntryHistory: FPLEntryHistory = {
  current: [],
  past: [],
  chips: [],
};
const zeroLeaguesClassicStandings: FPLLeaguesClassicStandings = {
  new_entries: {
    has_next: false,
    page: 0,
    results: [],
  },
  last_updated_data: '',
  league: {
    id: 0,
    name: '',
    created: '',
    closed: false,
    max_entries: null,
    league_type: '',
    scoring: '',
    admin_entry: 0,
    start_event: 0,
    code_privacy: '',
    has_cup: false,
    cup_league: null,
    rank: null,
  },
  standings: [],
};
const zeroEntryTransfers: FPLEntryTransfer[] = [];
const zeroBootstrapStatic: FPLBoostrapStatic = {
  events: [],
  game_settings: {
    league_join_private_max: 0,
    league_join_public_max: 0,
    league_max_size_public_classic: 0,
    league_max_size_public_h2h: 0,
    league_max_size_private_h2h: 0,
    league_max_ko_rounds_private_h2h: 0,
    league_prefix_public: '',
    league_points_h2h_win: 0,
    league_points_h2h_lose: 0,
    league_points_h2h_draw: 0,
    league_ko_first_instead_of_random: false,
    cup_start_event_id: null,
    cup_stop_event_id: null,
    cup_qualifying_method: null,
    cup_type: null,
    squad_squadplay: 0,
    squad_squadsize: 0,
    squad_team_limit: 0,
    squad_total_spend: 0,
    ui_currency_multiplier: 0,
    ui_use_special_shirts: false,
    ui_special_shirt_exclusions: [],
    stats_form_days: 0,
    sys_vice_captain_enabled: false,
    transfers_cap: 0,
    transfers_sell_on_fee: 0,
    league_h2h_tiebreak_stats: ['+goals_scored', '-goals_conceded'],
    timezone: '',
  },
  phases: [],
  teams: [],
  total_players: 0, // fantasy managers
  elements: [], // football players
  element_stats: [],
  element_types: [],
};

export {
  minEvent,
  maxEvent,
  zeroFetched,
  zeroEntry,
  zeroFixtures,
  zeroBootstrapStatic,
  zeroElementSummary,
  zeroEventLive,
  zeroEntryEventPicks,
  zeroEntryHistory,
  zeroEntryTransfers,
  zeroLeaguesClassicStandings,
};
