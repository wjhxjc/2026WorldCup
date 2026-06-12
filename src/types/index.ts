export interface Team {
  id: string
  name: string
  nameEn: string
  flag: string
  group: string
  fifaRank: number
  eloScore: number
  worldCupTitles: number
  worldCupAppearances: number
  bestResult: string
  recentForm: string
  squadValue: string
  confederation: string
  nickname: string
  coach: string
}

export interface TeamStats {
  attack: number
  defense: number
  midfield: number
  speed: number
  experience: number
  stamina: number
}

export interface TeamDetail extends Team {
  stats: TeamStats
  players: Player[]
  history: WorldCupHistory[]
}

export interface Player {
  name: string
  nameEn: string
  position: string
  age: number
  club: string
  goals: number
  caps: number
  isStar: boolean
}

export interface WorldCupHistory {
  year: number
  result: string
  host: string
}

export interface Ranking {
  teamId: string
  fifaRank: number
  eloScore: number
  winProbability: number
  groupAdvanceProb: number
  finalProb: number
  semiFinalProb: number
}

export interface Match {
  id: string
  stage: 'group' | 'r16' | 'qf' | 'sf' | 'final' | 'third'
  group?: string
  homeTeam: string
  awayTeam: string
  date: string
  venue: string
  homeScore?: number
  awayScore?: number
  status: 'upcoming' | 'live' | 'finished'
}

export interface GroupStanding {
  teamId: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  points: number
}

export interface VoteData {
  teamId: string
  count: number
}
