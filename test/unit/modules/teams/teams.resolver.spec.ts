import { Test, TestingModule } from '@nestjs/testing';
import { TeamsResolver } from '../../../../src/modules/teams/teams.resolver';
import { TeamsService } from '../../../../src/modules/teams/teams.service';
import { Team } from '../../../../src/modules/teams/team.entity';
import { mockTeam, mockTeamCreated, player } from '../../../mock-data';
import { Player } from '../../../../src/modules/players/player.entity';

describe('TeamsResolver', () => {
  let resolver: TeamsResolver;
  let teamsService: TeamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamsResolver,
        {
          provide: TeamsService,
          useFactory: () => ({
            findByLeagueId: jest.fn(),
            findByName: jest.fn(),
            players: jest.fn(),
          }),
        },
      ],
    }).compile();

    resolver = module.get<TeamsResolver>(TeamsResolver);
    teamsService = module.get<TeamsService>(TeamsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('team', () => {
    it('should call teamsService.findByName with the given team name', async () => {
      const teamName = 'Juventus';
      const expectedTeams: Team[] = [mockTeamCreated, mockTeamCreated];

      jest
        .spyOn(teamsService, 'findByName')
        .mockResolvedValueOnce(expectedTeams);

      const result = await resolver.team(teamName);

      expect(teamsService.findByName).toHaveBeenCalledWith(teamName);
      expect(result).toEqual(expectedTeams);
    });
  });

  describe('teamCompetition', () => {
    it('should call teamsService.findByLeagueId with the given league id', async () => {
      const idLeague = 1;
      const expectedTeams: Team[] = [mockTeamCreated, mockTeamCreated];

      jest
        .spyOn(teamsService, 'findByLeagueId')
        .mockResolvedValueOnce(expectedTeams);

      const result = await resolver.teamCompetition(idLeague);

      expect(teamsService.findByLeagueId).toHaveBeenCalledWith(idLeague);
      expect(result).toEqual(expectedTeams);
    });
  });

  describe('players', () => {
    it('should call teamsService.players with the team id from the parent', async () => {
      const expectedPlayers: Player[] = [player, player];

      jest
        .spyOn(teamsService, 'players')
        .mockResolvedValueOnce(expectedPlayers);

      const result = await resolver.players(mockTeam);

      expect(teamsService.players).toHaveBeenCalledWith(mockTeam.id);
      expect(result).toEqual(expectedPlayers);
    });
  });
});
