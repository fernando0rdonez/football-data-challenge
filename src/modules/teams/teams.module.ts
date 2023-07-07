import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsResolver } from './teams.resolver';
import { Team } from './team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  exports: [TeamsService],
  providers: [TeamsResolver, TeamsService],
})
export class TeamsModule {}
