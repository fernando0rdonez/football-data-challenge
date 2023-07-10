import { Injectable, Logger } from '@nestjs/common';
import { CreateTeamImport } from './dto/create-team.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Team } from './team.entity';
import { Competition } from '../competitions/competition.entity';
import { PlayersService } from '../players/players.service';
import { CoachsService } from '../coachs/coach.service';

@Injectable()
export class TeamsService {
  private readonly logger = new Logger('TeamsService');

  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    private playerService: PlayersService,
    private couchService: CoachsService,
  ) {}
  async createFromArray(
    teamsInput: CreateTeamImport[],
    competition: Competition,
  ) {
    this.logger.log(`Starting to save teams into db`);

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
    this.logger.log(`Process of save teams was completed`);

    return 'This action adds a new team';
  }

  async createTeam(teamsInput: CreateTeamImport, competition: Competition) {
    const team = await this.teamRepository.findOne({
      where: { id: teamsInput.id },
      relations: ['competitions'],
    });

    if (team) {
      if (team.competitions.every((c) => c.id !== competition.id)) {
        team.competitions.push(competition);
        this.logger.log(
          `Team already exist into db is necesary add the new relatioship with the competition`,
        );

        await this.teamRepository.save(team);
      }
    } else {
      const newTeam = this.teamRepository.create(teamsInput);
      newTeam.competitions = [competition];
      await this.teamRepository.save(newTeam);

      const teamDto = { ...teamsInput.coach, team: newTeam };
      this.couchService.saveCouch(teamDto);
      this.playerService.createFromArray(teamsInput.squad, newTeam);
    }
  }

  async findByName(name: string) {
    this.logger.log(`Searching a team by name: ${name}`);

    return this.teamRepository.find({
      where: { name: Like(`%${name}%`) },
    });
  }

  async players(idTeam: number) {
    return this.playerService.findByTeamId([idTeam]);
  }

  async findByLeagueId(leagueId: number) {
    this.logger.log(`Searching a team by league: ${leagueId}`);

    return await this.teamRepository
      .createQueryBuilder('team')
      .innerJoin('team.competitions', 'competitions')
      .where('competitions.id = :leagueId', { leagueId })
      .getMany();
  }
}
