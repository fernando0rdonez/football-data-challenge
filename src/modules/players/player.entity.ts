import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Team } from '../teams/team.entity';

@Entity()
@ObjectType()
export class Player {
  @PrimaryColumn()
  @Field(() => Int, { description: `Player's id` })
  id: number;

  @Column({ nullable: true })
  @Field(() => String, { description: 'Name of the player', nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field(() => String, {
    description: 'Position of the player',
    nullable: true,
  })
  position: string;

  @Column({ name: 'date_birth', nullable: true })
  @Field(() => String, { description: 'Date of birth day', nullable: true })
  dateOfBirth: string;

  @Column({ nullable: true })
  @Field(() => String, {
    description: 'Nationality of the player',
    nullable: true,
  })
  nationality: string;

  @ManyToOne(() => Team, (team) => team.players, { nullable: true })
  @JoinColumn({ name: 'team_id' })
  @Field(() => Team, {
    nullable: true,
    description: 'Team that the player belong',
  })
  team?: Team;
}
