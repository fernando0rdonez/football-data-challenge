import { CreateTeamImport } from '../src/modules/teams/dto/create-team.input';
import { Competition } from 'src/modules/competitions/competition.entity';
import { Area } from 'src/providers/data.interface';
import { Player } from '../src/modules/players/player.entity';
import { Team } from 'src/modules/teams/team.entity';

export const areaNetWork: Area = {
  id: 1,
  name: 'mock-area',
  code: 'mock-code',
  flag: 'mock-flag',
};

export const player: Player = {
  id: 1,
  name: 'mock-name',
  position: 'mock-position',
  dateOfBirth: 'mock-dateOfBirth',
  nationality: 'mock-nationality',
};

export const createInput: CreateTeamImport = {
  id: 1,
  name: 'mock-name',
  tla: 'mock-tla',
  shortName: 'mock-shortName',
  areaName: 'mock-area',
  address: 'mock-address',
  squad: [player],
  area: areaNetWork,
};

export const mockCompetition: Competition = {
  id: 1,
  name: 'mock-name',
  code: 'mock-code',
  areaName: 'mock-area',
};

export const mockTeam: Team = {
  id: 1,
  name: 'mock-name',
  tla: 'mock-tla',
  shortName: 'mock-shortName',
  areaName: 'mock-area',
  address: 'mock-address',
};

export const mockTeamCreated: Team = {
  id: 1,
  name: 'mock-name',
  tla: 'mock-tla',
  shortName: 'mock-shortName',
  areaName: 'mock-area',
  address: 'mock-address',
  competitions: [mockCompetition],
};

export const teamsInput: CreateTeamImport[] = [createInput, createInput];

export const mockCreatePlayer: Player = {
  id: 1,
  name: 'mock-name',
  position: 'mock-position',
  dateOfBirth: 'mock-dateOfBirth',
  nationality: 'mock-nationality',
  team: mockTeam,
};
