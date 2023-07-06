import { Test, TestingModule } from '@nestjs/testing';
import { CompetitionsResolver } from '../../../src/modules/competitions/competitions.resolver';
import { CompetitionsService } from '../../../src/modules/competitions/competitions.service';

describe('CompetitionsResolver', () => {
  let resolver: CompetitionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompetitionsResolver, CompetitionsService],
    }).compile();

    resolver = module.get<CompetitionsResolver>(CompetitionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
