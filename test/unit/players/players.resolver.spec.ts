import { Test, TestingModule } from '@nestjs/testing';
import { PlayersResolver } from '../../../src/modules/players/players.resolver';
import { PlayersService } from '../../../src/modules/players/players.service';

describe('PlayersResolver', () => {
  let resolver: PlayersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayersResolver, PlayersService],
    }).compile();

    resolver = module.get<PlayersResolver>(PlayersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
