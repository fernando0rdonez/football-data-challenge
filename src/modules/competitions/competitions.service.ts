import { Injectable, Logger } from '@nestjs/common';
import { FootballDataProvider } from '../../providers/football-data/football-data.provider';
import {
  CompetitionTeamsResponse,
  CompetitionResponse,
} from 'src/providers/data.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Competition } from './competition.entity';
import { Repository } from 'typeorm';
import { TeamsService } from '../teams/teams.service';
import { PlayersService } from '../players/players.service';
import { NotFountException } from '../../common/exceptions/not-found';

@Injectable()
export class CompetitionsService {
  private readonly logger = new Logger('Competition');
  constructor(
    private footbalDataProvider: FootballDataProvider,
    @InjectRepository(Competition)
    private competitionRepository: Repository<Competition>,
    private teamService: TeamsService,
    private playersService: PlayersService,
  ) {}
  async importLeague(leageCode: string) {
    const { area }: CompetitionResponse =
      await this.footbalDataProvider.getLeague(leageCode);

    const { teams, competition: competitionData }: CompetitionTeamsResponse =
      await this.footbalDataProvider.getLeagueTeams(leageCode);

    const competitionDto = { ...competitionData, areaName: area.name };
    const competition = await this.competitionRepository.save(competitionDto);
    await this.teamService.createFromArray(teams, competition);

    return { message: `This action import a league with code #${leageCode} ` };
  }

  async findByleagueCode(leageCode: string) {
    const league = await this.competitionRepository.findOne({
      where: { code: leageCode },
      relations: ['teams'],
    });
    const teamIds = league.teams.map((team) => team.id);
    return this.playersService.findByTeamId(teamIds);
  }

  async getCompetition(leageCode: string): Promise<Competition> {
    const competition = await this.competitionRepository.findOne({
      where: { code: leageCode },
    });
    this.logger.log(`After search a competition by code ${leageCode}`);
    if (!competition) {
      throw new NotFountException('Competition');
    }
    return competition;
  }
}
