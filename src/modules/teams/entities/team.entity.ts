import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Team {
  @Field(() => Int, { description: `team's id` })
  id: number;

  @Field(() => String, { description: 'Name of the team' })
  name: string;

  @Field(() => String, { description: 'tla of the team' })
  tla: string;

  @Field(() => String, { description: 'short Name of the team' })
  shortName: string;

  @Field(() => String, { description: `Area's Name of the team` })
  areaName: string;

  @Field(() => String, { description: 'Address of the team' })
  address: string;

  // @Field(() => [Player], {
  //   description: 'Player of the team',
  // })
  // players: Player[];
}
