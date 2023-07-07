import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';
import { TeamsService } from './teams.service';
import { Team } from './team.entity';
import { Player } from '../players/player.entity';

@Resolver(() => Team)
export class TeamsResolver {
  constructor(private readonly teamsService: TeamsService) {}

  @Query(() => [Team], { name: 'team' })
  team(@Args('teamName', { type: () => String }) teamName: string) {
    return this.teamsService.findByName(teamName);
  }

  @Query(() => [Team], { name: 'teamCompetition' })
  teamCompetition(@Args('idLeague', { type: () => Int }) idLeague: number) {
    return this.teamsService.findByLeagueId(idLeague);
  }

  @ResolveField(() => [Player])
  players(@Parent() team: Team) {
    return this.teamsService.players(team.id);
  }
}
