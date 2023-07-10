import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from './player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachsModule } from '../coachs/coach.module';

@Module({
  imports: [TypeOrmModule.forFeature([Player]), CoachsModule],
  providers: [PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}
