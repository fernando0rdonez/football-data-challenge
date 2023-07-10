import { Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from '../teams/team.entity';

@Entity()
export class Coach {
  @PrimaryGeneratedColumn()
  idRequired: number;

  @Column({ nullable: true })
  @Field(() => Int, { description: `Couch's id`, nullable: true })
  id?: number;

  @Column({ nullable: true })
  @Field(() => String, { description: 'Name of the player', nullable: true })
  name?: string;

  @Column({ nullable: true, default: 'couch' })
  @Field(() => String, {
    description: 'Position of the player',
    nullable: true,
  })
  position?: string;

  @Column({ name: 'date_birth', nullable: true })
  @Field(() => String, { description: 'Date of birth day', nullable: true })
  dateOfBirth?: string;

  @Column({ nullable: true })
  @Field(() => String, {
    description: 'Nationality of the coach',
    nullable: true,
  })
  nationality?: string;

  @OneToOne(() => Team)
  @JoinColumn({ name: 'team_id' })
  @Field(() => Team, {
    nullable: true,
    description: 'Team that the player belong',
  })
  team?: Team;
}
