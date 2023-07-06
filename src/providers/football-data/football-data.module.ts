import { HttpModule } from '@nestjs/axios';
import { FootballDataProvider } from './football-data.provider';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  exports: [FootballDataProvider],
  providers: [FootballDataProvider],
})
export class FootBallDataModule {}
