import { Module } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { CompetitionsResolver } from './competitions.resolver';
import { FootBallDataModule } from '../../providers/football-data/football-data.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Competition } from './competition.entity';
import { TeamsModule } from '../teams/teams.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Competition]),
    FootBallDataModule,
    TeamsModule,
  ],
  providers: [CompetitionsResolver, CompetitionsService],
})
export class CompetitionsModule {}
