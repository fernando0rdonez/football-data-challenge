import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Competition {
  @Field(() => Int, { description: 'id of the competition' })
  id: number;

  @Field(() => String, { description: 'Name of the competition' })
  name: string;

  @Field(() => String, { description: 'Code of the competition' })
  code: string;

  @Field(() => String, {
    description: 'Name of the area that the competition belongs',
  })
  areaName: string;

  // @Field(() => [Team], {
  //   description: 'List of teams that belongs to the competitions',
  // })
  // teams: Team[];
}
