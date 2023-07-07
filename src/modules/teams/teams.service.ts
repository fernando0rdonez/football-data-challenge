import { Injectable } from '@nestjs/common';
import { CreateTeamDto, CreateTeamImport } from './dto/create-team.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { Competition } from '../competitions/competition.entity';
import { PlayersService } from '../players/players.service';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    private playerService: PlayersService,
  ) {}
  async createFromArray(
    teamsInput: CreateTeamImport[],
    competition: Competition,
  ) {
    const teamsPromises = teamsInput.map((team) => {
      return this.createTeam(
        {
          ...team,
          areaName: team.area.name,
        },
        competition,
      );
    });
    await Promise.all(teamsPromises);

    return 'This action adds a new team';
  }

  async createTeam(teamsInput: CreateTeamDto, competition: Competition) {
    const team = await this.teamRepository.findOne({
      where: { id: teamsInput.id },
      relations: ['competitions'],
    });

    if (team) {
      if (team.competitions.every((c) => c.id !== competition.id)) {
        team.competitions.push(competition);
        await this.teamRepository.save(team);
      }
    } else {
      const newTeam = this.teamRepository.create(teamsInput);
      newTeam.competitions = [competition];
      await this.teamRepository.save(newTeam);

      this.playerService.createFromArray(teamsInput.squad, newTeam);
    }
  }
  findByName(teamName: string) {
    return `This action returns a team by #${teamName} `;
  }
}
