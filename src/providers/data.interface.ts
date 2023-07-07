export interface Area {
  id: number;
  name: string;
  code: string;
  flag: string;
}

export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
}
interface Couch {
  id: number;
  name: string;
  dateOfBirth: string;
  nationality: string;
}

interface Player {
  id: number;
  name: string;
  position: string;
  dateOfBirth: string;
  nationality: string;
}

interface Team {
  area: Area;
  id: number;
  name: string;
  shortName: string;
  tla: string;
  address: string;
  couch: Couch;
  squad: Player[];
}

export interface CompetitionTeamsResponse {
  teams: Team[];
  competition: Competition;
}

export interface CompetitionResponse extends Competition {
  area: Area;
}
