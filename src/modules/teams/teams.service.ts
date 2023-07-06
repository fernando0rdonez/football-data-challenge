import { Injectable } from '@nestjs/common';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';

@Injectable()
export class TeamsService {
  create(createTeamInput: CreateTeamInput) {
    return 'This action adds a new team';
  }

  findByName(teamName: string) {
    return `This action returns a team by #${teamName} `;
  }

  update(id: number, updateTeamInput: UpdateTeamInput) {
    return `This action updates a #${id} team`;
  }
}
