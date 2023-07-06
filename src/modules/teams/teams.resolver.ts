import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TeamsService } from './teams.service';
import { Team } from './entities/team.entity';
import { CreateTeamInput } from './dto/create-team.input';

@Resolver(() => Team)
export class TeamsResolver {
  constructor(private readonly teamsService: TeamsService) {}

  @Mutation(() => Team)
  createTeam(@Args('createTeamInput') createTeamInput: CreateTeamInput) {
    return this.teamsService.create(createTeamInput);
  }

  @Query(() => Team, { name: 'team' })
  findOne(@Args('teamName', { type: () => String }) teamName: string) {
    return this.teamsService.findByName(teamName);
  }
}
