import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerInput } from './dto/create-player.input';
import { Player } from './player.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from '../teams/team.entity';
import { CouchsService } from '../coachs/couch.service';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger('PlayersService');

  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    private couchService: CouchsService,
  ) {}
  async createFromArray(inputCreateArray: CreatePlayerInput[], team: Team) {
    this.logger.log(`Starting to save players into db for team ${team.name}`);

    const teamsPromises = inputCreateArray.map((input) => {
      return this.savePlayer({
        ...input,
        team: team,
      });
    });
    await Promise.all(teamsPromises);

    this.logger.log(`Players stored for the team: ${team.name}`);
  }

  savePlayer(input: CreatePlayerInput) {
    return this.playerRepository.save(input);
  }

  async findByTeamId(teamIds: number[]) {
    this.logger.log(`Searching for players by teamId ${teamIds}`);
    const response = await this.playerRepository.find({
      where: { team: { id: In(teamIds) } },
    });

    if (response.length > 0) return response;
    this.logger.log(`there are not player for given team's ids ${teamIds}`);
    return this.couchService.getByTeam(teamIds);
  }
}
