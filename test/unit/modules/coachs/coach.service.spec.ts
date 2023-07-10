import { Test, TestingModule } from '@nestjs/testing';

import { Coach } from '../../../../src/modules/coachs/coach.entity';
import { In, Repository } from 'typeorm';
import { CoachsService } from '../../../../src/modules/coachs/coach.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { couchData } from '../../../mock-data';

describe('CoachsService', () => {
  let service: CoachsService;
  let coachRepository: Repository<Coach>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoachsService,
        {
          provide: getRepositoryToken(Coach),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CoachsService>(CoachsService);
    coachRepository = module.get<Repository<Coach>>(getRepositoryToken(Coach));
  });

  describe('create a coach', () => {
    it('should save a return a couach', async () => {
      jest
        .spyOn(coachRepository, 'save')
        .mockImplementation(
          jest.fn(() => Promise.resolve({ ...couchData, idRequired: 1 })),
        );

      const result = await service.saveCouch(couchData);

      expect(coachRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual({ ...couchData, idRequired: 1 });
    });
  });

  describe('Find coachs ', () => {
    it('should find players by team ids', async () => {
      const teamIds = [1, 2];
      const expectedPlayers: Coach[] = [{ ...couchData, idRequired: 1 }];

      jest
        .spyOn(coachRepository, 'find')
        .mockResolvedValueOnce(expectedPlayers);

      const result = await service.getByTeam(teamIds);

      expect(coachRepository.find).toHaveBeenCalledWith({
        where: { team: { id: In(teamIds) } },
      });
      expect(result).toEqual(expectedPlayers);
    });
  });
});
