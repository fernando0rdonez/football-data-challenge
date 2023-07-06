import { Module } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { CompetitionsResolver } from './competitions.resolver';

@Module({
  providers: [CompetitionsResolver, CompetitionsService],
})
export class CompetitionsModule {}
