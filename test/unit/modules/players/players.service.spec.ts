import { Test, TestingModule } from '@nestjs/testing';
import { PlayersService } from '../../../../src/modules/players/players.service';
import { In, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from '../../../../src/modules/players/player.entity';
import { player, mockTeamCreated, mockCreatePlayer } from '../../../mock-data';
import { CreatePlayerInput } from '../../../../src/modules/players/dto/create-player.input';
import { CoachsService } from '../../../../src/modules/coachs/coach.service';

describe('PlayersService', () => {
  let service: PlayersService;
  let coachService: CoachsService;
  let playerRepository: Repository<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayersService,
        {
          provide: getRepositoryToken(Player),
          useClass: Repository,
        },
        {
          provide: CoachsService,
          useFactory: () => ({
            saveCouch: jest.fn(),
            getByTeam: jest.fn(() => Promise.resolve()),
          }),
        },
      ],
    }).compile();

    service = module.get<PlayersService>(PlayersService);
    coachService = module.get<CoachsService>(CoachsService);
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
      const teamIds = [1, 2];
      const expectedPlayers: Player[] = [mockCreatePlayer, mockCreatePlayer];

      jest
        .spyOn(playerRepository, 'find')
        .mockResolvedValueOnce(expectedPlayers);

      const result = await service.findByTeamId(teamIds);

      expect(playerRepository.find).toHaveBeenCalledWith({
        where: { team: { id: In(teamIds) } },
      });
      expect(result).toEqual(expectedPlayers);
    });

    it('should return coach by team ids', async () => {
      const teamIds = [1, 2];
      const expectedPlayers: Player[] = [];

      jest
        .spyOn(playerRepository, 'find')
        .mockResolvedValueOnce(expectedPlayers);

      await service.findByTeamId(teamIds);

      expect(playerRepository.find).toHaveBeenCalledWith({
        where: { team: { id: In(teamIds) } },
      });
      expect(coachService.getByTeam).toHaveBeenCalledWith(teamIds);
    });
  });
});
