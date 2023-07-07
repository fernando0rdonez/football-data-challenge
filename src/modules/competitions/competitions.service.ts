import { Injectable } from '@nestjs/common';
import { FootballDataProvider } from '../../providers/football-data/football-data.provider';
import { CompetitionResponse } from 'src/providers/data.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Competition } from './competition.entity';
import { Repository } from 'typeorm';
import { TeamsService } from '../teams/teams.service';
import { PlayersService } from '../players/players.service';

@Injectable()
export class CompetitionsService {
  constructor(
    private footbalDataProvider: FootballDataProvider,
    @InjectRepository(Competition)
    private competitionRepository: Repository<Competition>,
    private teamService: TeamsService,
    private playersService: PlayersService,
  ) {}
  async importLeague(leageCode: string) {
    const { teams, competition: competitionData }: CompetitionResponse =
      await this.footbalDataProvider.getLeague(leageCode);

    const competitionDto = { ...competitionData, areaName: teams[0].area.name };
    const competition = await this.competitionRepository.save(competitionDto);
    await this.teamService.createFromArray(teams, competition);

    return { message: `This action import a #${leageCode} league` };
  }

  async findByleagueCode(leageCode: string) {
    const league = await this.competitionRepository.findOne({
      where: { code: leageCode },
      relations: ['teams'],
    });
    const teamIds = league.teams.map((team) => team.id);
    return this.playersService.findByTeamId(teamIds);
  }
}
