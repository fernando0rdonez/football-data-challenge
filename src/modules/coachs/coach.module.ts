import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Coach } from './coach.entity';
import { CoachsService } from './coach.service';

@Module({
  imports: [TypeOrmModule.forFeature([Coach])],
  providers: [CoachsService],
  exports: [CoachsService],
})
export class CoachsModule {}
