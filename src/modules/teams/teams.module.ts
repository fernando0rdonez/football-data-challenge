import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsResolver } from './teams.resolver';
import { Team } from './team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersModule } from '../players/players.module';
import { CouchsModule } from '../coachs/couch.module';

@Module({
  imports: [TypeOrmModule.forFeature([Team]), PlayersModule, CouchsModule],
  exports: [TeamsService, TeamsResolver],
  providers: [TeamsResolver, TeamsService],
})
export class TeamsModule {}
