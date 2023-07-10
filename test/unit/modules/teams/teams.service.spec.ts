import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { TeamsService } from '../../../../src/modules/teams/teams.service';
import { PlayersService } from '../../../../src/modules/players/players.service';
import { Team } from '../../../../src/modules/teams/team.entity';
import { CoachsService } from '../../../../src/modules/coachs/coach.service';
import {
  createInput,
  mockCompetition,
  player,
  mockTeamCreated,
  teamsInput,
} from '../../../mock-data';

describe('TeamsService', () => {
  let service: TeamsService;
  let teamRepository: Repository<Team>;
  let playersService: PlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamsService,
        {
          provide: PlayersService,
          useFactory: () => ({
            createFromArray: jest.fn(),
            findByTeamId: jest.fn(),
          }),
        },
        {
          provide: getRepositoryToken(Team),
          useClass: Repository,
        },

        {
          provide: CoachsService,
          useFactory: () => ({
            saveCouch: jest.fn(),
            getByTeam: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
    teamRepository = module.get<Repository<Team>>(getRepositoryToken(Team));
    playersService = module.get<PlayersService>(PlayersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('Should create a team from a given array', () => {
    it('should create teams from array and return a message', async () => {
      jest.spyOn(service, 'createTeam').mockImplementation();

      const result = await service.createFromArray(teamsInput, mockCompetition);

      expect(service.createTeam).toHaveBeenCalledTimes(teamsInput.length);
      expect(result).toBe('This action adds a new team');
    });
  });

  describe('createTeam', () => {
    it('should create a new team and add it to the competition if team does not exist', async () => {
      jest.spyOn(teamRepository, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(teamRepository, 'create').mockReturnValueOnce(mockTeamCreated);
      jest.spyOn(teamRepository, 'save').mockResolvedValueOnce(mockTeamCreated);

      jest.spyOn(playersService, 'createFromArray').mockResolvedValueOnce();

      await service.createTeam(createInput, mockCompetition);

      expect(teamRepository.findOne).toHaveBeenCalledWith({
        where: { id: createInput.id },
        relations: ['competitions'],
      });
      expect(teamRepository.create).toHaveBeenCalledWith(createInput);
      expect(teamRepository.save).toHaveBeenCalledWith(mockTeamCreated);
      expect(playersService.createFromArray).toHaveBeenCalledTimes(1);
    });

    it('should add the competition to the existing team if team already exists', async () => {
      const mockCompetition2 = { ...mockCompetition, id: 3 };
      jest
        .spyOn(teamRepository, 'findOne')
        .mockResolvedValueOnce(mockTeamCreated);
      jest.spyOn(teamRepository, 'save').mockResolvedValueOnce(mockTeamCreated);

      await service.createTeam(createInput, mockCompetition2);

      expect(teamRepository.findOne).toHaveBeenCalledWith({
        where: { id: createInput.id },
        relations: ['competitions'],
      });
      expect(mockTeamCreated.competitions).toContain(mockCompetition2);
      expect(teamRepository.save).toHaveBeenCalledWith(mockTeamCreated);
    });
  });

  describe('findByName', () => {
    it('should find teams by name using a like search', async () => {
      const name = 'PL';

      jest
        .spyOn(teamRepository, 'find')
        .mockResolvedValueOnce([mockTeamCreated, mockTeamCreated]);

      const result = await service.findByName(name);

      expect(teamRepository.find).toHaveBeenCalledWith({
        where: { name: Like(`%${name}%`) },
      });
      expect(result).toEqual([mockTeamCreated, mockTeamCreated]);
    });
  });

  describe('players', () => {
    it('should call playersService.findByTeamId with the given team id', async () => {
      const idTeam = 1;

      jest
        .spyOn(playersService, 'findByTeamId')
        .mockResolvedValueOnce([player, player]);

      const result = await service.players(idTeam);

      expect(playersService.findByTeamId).toHaveBeenCalledWith([idTeam]);
      expect(result).toEqual([player, player]);
    });
  });

  describe('findByLeagueId', () => {
    it('should find teams by league id', async () => {
      const leagueId = 1;
      const expectedTeams = [mockTeamCreated, mockTeamCreated];

      const queryBuilder = {
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValueOnce(expectedTeams),
      };

      jest
        .spyOn(teamRepository, 'createQueryBuilder')
        .mockReturnValue(queryBuilder as any);

      const result = await service.findByLeagueId(leagueId);

      expect(teamRepository.createQueryBuilder).toHaveBeenCalledWith('team');
      expect(queryBuilder.innerJoin).toHaveBeenCalledWith(
        'team.competitions',
        'competitions',
      );
      expect(queryBuilder.where).toHaveBeenCalledWith(
        'competitions.id = :leagueId',
        { leagueId },
      );
      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual(expectedTeams);
    });
  });
});
