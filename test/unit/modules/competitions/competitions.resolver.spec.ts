import { Test, TestingModule } from '@nestjs/testing';
import { CompetitionsResolver } from '../../../../src/modules/competitions/competitions.resolver';
import { CompetitionsService } from '../../../../src/modules/competitions/competitions.service';
import { TeamsResolver } from '../../../../src/modules/teams/teams.resolver';
import {
  mockCompetition,
  mockCreatePlayer,
  mockTeamCreated,
} from '../../../mock-data';

describe('CompetitionsResolver', () => {
  let resolver: CompetitionsResolver;
  let competitionsService: CompetitionsService;
  let teamsResolver: TeamsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompetitionsResolver,
        {
          provide: CompetitionsService,
          useFactory: () => ({
            importLeague: jest.fn(),
            findByleagueCode: jest.fn(),
            getCompetition: jest.fn(),
          }),
        },
        {
          provide: TeamsResolver,
          useFactory: () => ({
            teamCompetition: jest.fn(),
          }),
        },
      ],
    }).compile();

    resolver = module.get<CompetitionsResolver>(CompetitionsResolver);
    competitionsService = module.get<CompetitionsService>(CompetitionsService);
    teamsResolver = module.get<TeamsResolver>(TeamsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('importLeague', () => {
    it('should call competitionsService.importLeague with the given league code', async () => {
      const leagueCode = 'PL';
      const expectedResponse = {
        message: `This action import a league with code #${leagueCode} `,
      };

      jest
        .spyOn(competitionsService, 'importLeague')
        .mockResolvedValueOnce(expectedResponse);

      const result = await resolver.importLeague(leagueCode);

      expect(competitionsService.importLeague).toHaveBeenCalledWith(leagueCode);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('players', () => {
    it('should call competitionsService.findByleagueCode with the given league code', async () => {
      const leagueCode = 'example';
      const expectedPlayers = [mockCreatePlayer, mockCreatePlayer];

      jest
        .spyOn(competitionsService, 'findByleagueCode')
        .mockResolvedValueOnce(expectedPlayers);

      const result = await resolver.players(leagueCode);

      expect(competitionsService.findByleagueCode).toHaveBeenCalledWith(
        leagueCode,
      );
      expect(result).toEqual(expectedPlayers);
    });
  });

  describe('teams', () => {
    it('should call teamsResolver.teamCompetition with the competition id from the parent', async () => {
      const expectedTeams = [mockTeamCreated, mockTeamCreated];

      jest
        .spyOn(teamsResolver, 'teamCompetition')
        .mockResolvedValueOnce(expectedTeams);

      const result = await resolver.teams(mockCompetition);

      expect(teamsResolver.teamCompetition).toHaveBeenCalledWith(
        mockCompetition.id,
      );
      expect(result).toEqual(expectedTeams);
    });
  });

  describe('competition', () => {
    it('should call competitionsService.getCompetition with the given league code', async () => {
      const leagueCode = 'example';

      jest
        .spyOn(competitionsService, 'getCompetition')
        .mockResolvedValueOnce(mockCompetition);

      const result = await resolver.competition(leagueCode);

      expect(competitionsService.getCompetition).toHaveBeenCalledWith(
        leagueCode,
      );
      expect(result).toEqual(mockCompetition);
    });
  });
});
