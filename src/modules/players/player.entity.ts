import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Team } from 'src/modules/teams/team.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Player {
  @PrimaryColumn()
  @Field(() => Int, { description: `Player's id` })
  id: number;

  @Column()
  @Field(() => String, { description: 'Name of the player' })
  name: string;

  @Column()
  @Field(() => String, { description: 'Position of the player' })
  position: string;

  @Column({ name: 'date_birth' })
  @Field(() => String, { description: 'Date of birth day' })
  dateOfBirth: string;

  @Column()
  @Field(() => String, { description: 'Nationality of the player' })
  nationality: string;

  @ManyToOne(() => Team, (team) => team.players, { nullable: true })
  @JoinColumn({ name: 'team_id' })
  @Field(() => Team, {
    nullable: true,
    description: 'Team that the player belong',
  })
  team?: Team;
}
