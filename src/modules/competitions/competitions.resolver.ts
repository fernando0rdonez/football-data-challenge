import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CompetitionsService } from './competitions.service';
import { Competition, ResponseImport } from './competition.entity';

@Resolver(() => Competition)
export class CompetitionsResolver {
  constructor(private readonly competitionsService: CompetitionsService) {}

  @Mutation(() => ResponseImport)
  importLeague(@Args('leagueCode', { type: () => String }) leagueCode: string) {
    return this.competitionsService.importLeague(leagueCode);
  }
}
