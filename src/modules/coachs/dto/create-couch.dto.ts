import { InputType } from '@nestjs/graphql';
import { Team } from '../../teams/team.entity';
@InputType()
export class CreateCouchInput {
  id?: number;

  name?: string;

  dateOfBirth?: string;

  nationality?: string;

  team?: Team;
}
