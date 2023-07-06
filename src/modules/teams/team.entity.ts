import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Player } from 'src/modules/players/player.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { Competition } from '../competitions/competition.entity';

@Entity()
@ObjectType()
export class Team {
  @PrimaryColumn()
  @Field(() => Int, { description: `team's id` })
  id: number;

  @Column()
  @Field(() => String, { description: 'Name of the team' })
  name: string;

  @Column()
  @Field(() => String, { description: 'tla of the team' })
  tla: string;

  @Column()
  @Field(() => String, { description: 'short Name of the team' })
  shortName: string;

  @Column()
  @Field(() => String, { description: `Area's Name of the team` })
  areaName: string;

  @Column()
  @Field(() => String, { description: 'Address of the team' })
  address: string;

  @OneToMany(() => Player, (player) => player.team)
  @Field(() => [Player], {
    description: 'Player of the team',
    nullable: true,
  })
  players?: Player[];

  @ManyToMany(() => Competition)
  @Field(() => [Competition], {
    description: 'Player of the team',
  })
  competitions?: Competition[];
}
