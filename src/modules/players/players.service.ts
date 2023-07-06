import { Injectable } from '@nestjs/common';
import { CreatePlayerInput } from './dto/create-player.input';

@Injectable()
export class PlayersService {
  create(createPlayerInput: CreatePlayerInput) {
    return 'This action adds a new player ';
  }

  findByleagueCode(leageCode: string) {
    return `This action find Player by givin #${leageCode} `;
  }
}
