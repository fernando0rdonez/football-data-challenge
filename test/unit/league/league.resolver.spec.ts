import { Test, TestingModule } from '@nestjs/testing';
import { LeagueResolver } from '../../../src/league/league.resolver';

describe('LeagueResolver', () => {
  let resolver: LeagueResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeagueResolver],
    }).compile();

    resolver = module.get<LeagueResolver>(LeagueResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
