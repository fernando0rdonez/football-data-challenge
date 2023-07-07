import { Injectable } from '@nestjs/common';
import { CreatePlayerInput } from './dto/create-player.input';
import { Player } from './player.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}
  create(input: CreatePlayerInput[]) {
    return 'This action adds a new player ';
  }

  findByleagueCode(leageCode: string) {
    return `This action find Player by givin #${leageCode} `;
  }
}
