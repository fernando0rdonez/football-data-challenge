import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from './player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouchsModule } from '../coachs/couch.module';

@Module({
  imports: [TypeOrmModule.forFeature([Player]), CouchsModule],
  providers: [PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}
