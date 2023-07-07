import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CompetitionsService } from './competitions.service';
import { Competition, ResponseImport } from './competition.entity';
import { Player } from '../players/player.entity';

@Resolver(() => Competition)
export class CompetitionsResolver {
  constructor(private readonly competitionsService: CompetitionsService) {}

  @Mutation(() => ResponseImport)
  importLeague(@Args('leagueCode', { type: () => String }) leagueCode: string) {
    return this.competitionsService.importLeague(leagueCode);
  }

  @Query(() => [Player], { name: 'players' })
  players(@Args('leagueCode', { type: () => String }) leageCode: string) {
    return this.competitionsService.findByleagueCode(leageCode);
  }

  @ResolveField(() => [Player], { name: 'players' })
  squad(@Parent() competition: Competition) {
    return this.competitionsService.findByleagueCode(competition.code);
  }
}
