import { Resolver, Query, Args } from '@nestjs/graphql';
import { TeamsService } from './teams.service';
import { Team } from './team.entity';

@Resolver(() => Team)
export class TeamsResolver {
  constructor(private readonly teamsService: TeamsService) {}

  @Query(() => Team, { name: 'team' })
  findOne(@Args('teamName', { type: () => String }) teamName: string) {
    return this.teamsService.findByName(teamName);
  }
}
