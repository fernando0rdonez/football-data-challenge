import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CompetitionsService } from './competitions.service';
import { Competition } from './entities/competition.entity';

@Resolver(() => Competition)
export class CompetitionsResolver {
  constructor(private readonly competitionsService: CompetitionsService) {}

  @Mutation(() => Competition)
  importLeague(@Args('leagueCode', { type: () => String }) leagueCode: string) {
    return this.competitionsService.importLeague(leagueCode);
  }
}
