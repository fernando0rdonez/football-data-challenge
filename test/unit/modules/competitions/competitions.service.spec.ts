import { Test, TestingModule } from '@nestjs/testing';
import { CompetitionsService } from '../../../../src/modules/competitions/competitions.service';
import { FootballDataProvider } from '../../../../src/providers/football-data/football-data.provider';
import { Repository } from 'typeorm';
import { Competition } from '../../../../src/modules/competitions/competition.entity';
import { TeamsService } from '../../../../src/modules/teams/teams.service';
import { PlayersService } from '../../../../src/modules/players/players.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  areaNetWork,
  mockCompetition,
  mockTeam,
  mockTeamCreated,
  player,
} from '../../../mock-data';
import { NotFountException } from '../../../../src/common/exceptions/not-found';

describe('CompetitionsService', () => {
  let service: CompetitionsService;
  let footballDataProvider: FootballDataProvider;
  let competitionRepository: Repository<Competition>;
  let teamsService: TeamsService;
  let playersService: PlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompetitionsService,
        {
          provide: FootballDataProvider,
          useFactory: () => ({
            getLeague: jest.fn(() =>
              Promise.resolve({ ...mockCompetition, area: areaNetWork }),
            ),
            getLeagueTeams: jest.fn(() =>
              Promise.resolve({
                teams: [mockTeam, mockTeam],
                competition: mockCompetition,
              }),
            ),
          }),
        },
        {
          provide: TeamsService,
          useFactory: () => ({
            createFromArray: jest.fn(),
          }),
        },
        {
          provide: PlayersService,
          useFactory: () => ({
            findByTeamId: jest.fn(),
          }),
        },
        {
          provide: getRepositoryToken(Competition),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CompetitionsService>(CompetitionsService);
    footballDataProvider =
      module.get<FootballDataProvider>(FootballDataProvider);
    competitionRepository = module.get<Repository<Competition>>(
      getRepositoryToken(Competition),
    );
    teamsService = module.get<TeamsService>(TeamsService);
    playersService = module.get<PlayersService>(PlayersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('importLeague', () => {
    it('should import a league and return a message', async () => {
      const leagueCode = 'PL';

      const competitionDto = {
        ...mockCompetition,
        areaName: areaNetWork.name,
      };

      jest
        .spyOn(competitionRepository, 'save')
        .mockResolvedValueOnce(mockCompetition);
      jest
        .spyOn(teamsService, 'createFromArray')
        .mockResolvedValueOnce(Promise.resolve(''));

      const result = await service.importLeague(leagueCode);

      expect(footballDataProvider.getLeague).toHaveBeenCalledWith(leagueCode);
      expect(footballDataProvider.getLeagueTeams).toHaveBeenCalledWith(
        leagueCode,
      );
      expect(competitionRepository.save).toHaveBeenCalledWith(competitionDto);
      expect(teamsService.createFromArray).toHaveBeenCalledWith(
        [mockTeam, mockTeam],
        mockCompetition,
      );
      expect(result).toEqual({
        message: `This action import a league with code #${leagueCode} `,
      });
    });
  });

  describe('findByleagueCode', () => {
    it('should find players by league code', async () => {
      const leagueCode = 'PL';
      const league = {
        ...mockCompetition,
        teams: [mockTeamCreated, mockTeamCreated],
      };
      const teamIds = league.teams.map((team) => team.id);
      const expectedPlayers = [player, player];

      jest
        .spyOn(competitionRepository, 'findOne')
        .mockResolvedValueOnce(league);
      jest
        .spyOn(playersService, 'findByTeamId')
        .mockResolvedValueOnce(expectedPlayers);

      const result = await service.findByleagueCode(leagueCode);

      expect(competitionRepository.findOne).toHaveBeenCalledWith({
        where: { code: leagueCode },
        relations: ['teams'],
      });
      expect(playersService.findByTeamId).toHaveBeenCalledWith(teamIds);
      expect(result).toEqual(expectedPlayers);
    });
  });

  describe('getCompetition', () => {
    it('should find a competition by league code', async () => {
      const leagueCode = 'PL';

      jest
        .spyOn(competitionRepository, 'findOne')
        .mockResolvedValueOnce(mockCompetition);

      const result = await service.getCompetition(leagueCode);

      expect(competitionRepository.findOne).toHaveBeenCalledWith({
        where: { code: leagueCode },
      });
      expect(result).toEqual(mockCompetition);
    });

    it('should throw NotFoundException if competition is not found', async () => {
      const leagueCode = 'example';

      jest
        .spyOn(competitionRepository, 'findOne')
        .mockResolvedValueOnce(undefined);

      await expect(service.getCompetition(leagueCode)).rejects.toThrowError(
        NotFountException,
      );
      expect(competitionRepository.findOne).toHaveBeenCalledWith({
        where: { code: leagueCode },
      });
    });
  });
});
