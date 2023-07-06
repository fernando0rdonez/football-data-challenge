import { Module } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { CompetitionsResolver } from './competitions.resolver';
import { FootBallDataModule } from '../../providers/football-data/football-data.module';

@Module({
  imports: [FootBallDataModule],
  providers: [CompetitionsResolver, CompetitionsService],
})
export class CompetitionsModule {}
