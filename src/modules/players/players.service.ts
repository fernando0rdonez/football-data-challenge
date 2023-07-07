import { Injectable } from '@nestjs/common';
import { CreatePlayerInput } from './dto/create-player.input';
import { Player } from './player.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from '../teams/team.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}
  async createFromArray(inputCreateArray: CreatePlayerInput[], team: Team) {
    const teamsPromises = inputCreateArray.map((input) => {
      return this.savePlayer({
        ...input,
        team: team,
      });
    });
    await Promise.all(teamsPromises);
  }

  savePlayer(input: CreatePlayerInput) {
    return this.playerRepository.save(input);
  }

  findByleagueCode(leageCode: string) {
    return `This action find Player by givin #${leageCode} `;
  }
}
