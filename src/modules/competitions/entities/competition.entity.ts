import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Team } from 'src/modules/teams/entities/team.entity';
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Competition {
  @PrimaryColumn()
  @Field(() => Int, { description: 'id of the competition' })
  id: number;

  @Column()
  @Field(() => String, { description: 'Name of the competition' })
  name: string;

  @Column()
  @Field(() => String, { description: 'Code of the competition' })
  code: string;

  @Column()
  @Field(() => String, {
    description: 'Name of the area that the competition belongs',
  })
  areaName: string;

  @ManyToMany(() => Team, (team) => team.competitions)
  @Field(() => [Team], {
    nullable: true,
    description: 'List of teams that belongs to the competitions',
  })
  teams?: Team[];
}
