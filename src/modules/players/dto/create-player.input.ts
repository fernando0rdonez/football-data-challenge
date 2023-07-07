import { InputType } from '@nestjs/graphql';
import { Team } from '../../teams/team.entity';

@InputType()
export class CreatePlayerInput {
  id: number;

  name: string;

  position: string;

  dateOfBirth: string;

  nationality: string;

  team?: Team;
}
