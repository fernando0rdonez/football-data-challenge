import { Test, TestingModule } from '@nestjs/testing';
import { TeamsResolver } from '../../../src/modules/teams/teams.resolver';
import { TeamsService } from '../../../src/modules/teams/teams.service';

describe('TeamsResolver', () => {
  let resolver: TeamsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamsResolver, TeamsService],
    }).compile();

    resolver = module.get<TeamsResolver>(TeamsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
