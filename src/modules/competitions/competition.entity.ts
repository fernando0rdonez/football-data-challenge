import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Team } from '../teams/team.entity';

@Entity()
@ObjectType()
export class Competition {
  @PrimaryColumn()
  @Field(() => Int, { description: 'id of the competition', nullable: true })
  id: number;

  @Column()
  @Field(() => String, {
    description: 'Name of the competition',
    nullable: true,
  })
  name: string;

  @Column()
  @Field(() => String, {
    description: 'Code of the competition',
    nullable: true,
  })
  code: string;

  @Column({ name: 'area_name' })
  @Field(() => String, {
    description: 'Name of the area that the competition belongs',
    nullable: true,
  })
  areaName: string;

  @ManyToMany(() => Team, (team) => team.competitions)
  @JoinTable({
    name: 'competition_team',
    joinColumn: {
      name: 'competition_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'team_id',
      referencedColumnName: 'id',
    },
  })
  @Field(() => [Team], {
    nullable: true,
    description: 'List of teams that belongs to the competitions',
  })
  teams?: Team[];
}

@ObjectType()
export class ResponseImport {
  @Field(() => String, {
    description: 'Name of the area that the competition belongs',
  })
  message: string;
}
