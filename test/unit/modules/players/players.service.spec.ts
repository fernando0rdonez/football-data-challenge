import { Test, TestingModule } from '@nestjs/testing';
import { PlayersService } from '../../../../src/modules/players/players.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from '../../../../src/modules/players/player.entity';
import { player, mockTeamCreated, mockCreatePlayer } from '../../../mock-data';
import { CreatePlayerInput } from '../../../../src/modules/players/dto/create-player.input';

describe('PlayersService', () => {
  let service: PlayersService;
  let playerRepository: Repository<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayersService,
        {
          provide: getRepositoryToken(Player),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PlayersService>(PlayersService);
    playerRepository = module.get<Repository<Player>>(
      getRepositoryToken(Player),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createFromArray', () => {
    it('should save multiple players and return void', async () => {
      const inputCreateArray: CreatePlayerInput[] = [
        mockCreatePlayer,
        mockCreatePlayer,
      ];

      jest
        .spyOn(playerRepository, 'save')
        .mockImplementation(jest.fn(() => Promise.resolve(player)));

      await service.createFromArray(inputCreateArray, mockTeamCreated);

      expect(playerRepository.save).toHaveBeenCalledTimes(
        inputCreateArray.length,
      );
    });
  });

  describe('savePlayer', () => {
    it('should save a player and return the saved player', async () => {
      jest
        .spyOn(playerRepository, 'save')
        .mockResolvedValueOnce(mockCreatePlayer);

      const result = await service.savePlayer(player);

      expect(playerRepository.save).toHaveBeenCalledWith(player);
      expect(result).toBe(mockCreatePlayer);
    });
  });

  describe('findByTeamId', () => {
    it('should find players by team ids', async () => {
      const teamIds = [1, 2, 3];
      const expectedPlayers: Player[] = [mockCreatePlayer, mockCreatePlayer];

      const queryBuilder = {
        leftJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValueOnce(expectedPlayers),
      };

      jest
        .spyOn(playerRepository, 'createQueryBuilder')
        .mockReturnValue(queryBuilder as any);

      const result = await service.findByTeamId(teamIds);

      expect(playerRepository.createQueryBuilder).toHaveBeenCalledWith(
        'player',
      );
      expect(queryBuilder.leftJoin).toHaveBeenCalledWith('player.team', 'team');
      expect(queryBuilder.where).toHaveBeenCalledWith(
        'team.id IN (:...teamIds)',
        { teamIds },
      );
      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual(expectedPlayers);
    });
  });
});
