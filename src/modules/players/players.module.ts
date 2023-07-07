import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersResolver } from './players.resolver';
import { Player } from './player.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  providers: [PlayersResolver, PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}
