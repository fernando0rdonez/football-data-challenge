import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePlayerInput {
  @Field(() => Int, { description: `Player's id` })
  id: number;

  @Field(() => String, { description: 'Name of the player' })
  name: string;

  @Field(() => String, { description: 'Position of the player' })
  position: string;

  @Field(() => String, { description: 'Date of birth day' })
  dateOfBirth: string;

  @Field(() => String, { description: 'Nationality of the player' })
  nationality: string;

  // @Field(() => Team, {
  //   description: 'Team that the player belong',
  // })
  // team: Team;
}
