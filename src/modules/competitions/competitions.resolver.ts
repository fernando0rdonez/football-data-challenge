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
import { Team } from '../teams/team.entity';
import { TeamsResolver } from '../teams/teams.resolver';
import { UseGuards } from '@nestjs/common';
import { GqlThrottlerGuard } from '../../common/guards/gql-throttle.guard';

@Resolver(() => Competition)
export class CompetitionsResolver {
  constructor(
    private readonly competitionsService: CompetitionsService,
    private teamResolver: TeamsResolver,
  ) {}

  @Mutation(() => ResponseImport)
  @UseGuards(GqlThrottlerGuard)
  importLeague(@Args('leagueCode', { type: () => String }) leagueCode: string) {
    return this.competitionsService.importLeague(leagueCode);
  }

  @Query(() => [Player], { name: 'players' })
  players(
    @Args('leagueCode', { type: () => String }) leageCode: string,
    @Args('teamName', { type: () => String, nullable: true }) teamName?: string,
  ) {
    return this.competitionsService.findByleagueCode(leageCode, teamName);
  }

  @ResolveField(() => [Team])
  teams(@Parent() competition: Competition) {
    return this.teamResolver.teamCompetition(competition.id);
  }

  @Query(() => Competition, { name: 'competition' })
  competition(@Args('leagueCode', { type: () => String }) leageCode: string) {
    return this.competitionsService.getCompetition(leageCode);
  }
}
