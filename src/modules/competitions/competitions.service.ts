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
    this.logger.log(`Starting to getting the data for the league ${leageCode}`);
    const { area }: CompetitionResponse =
      await this.footbalDataProvider.getLeague(leageCode);

    const { teams, competition: competitionData }: CompetitionTeamsResponse =
      await this.footbalDataProvider.getLeagueTeams(leageCode);

    const competitionDto = { ...competitionData, areaName: area.name };
    const competition = await this.competitionRepository.save(competitionDto);

    this.logger.log(`Starting to save teams for the league ${leageCode}`);
    await this.teamService.createFromArray(teams, competition);
    this.logger.log(`Import finish. League: ${leageCode}`);

    return { message: `This action import a league with code #${leageCode} ` };
  }

  async findByleagueCode(leageCode: string) {
    this.logger.log(`Starting to searh teams for the league ${leageCode}`);
    try {
      const league = await this.competitionRepository.findOne({
        where: { code: leageCode },
        relations: ['teams'],
      });
      const teamIds = league.teams.map((team) => team.id);
      return this.playersService.findByTeamId(teamIds);
    } catch (error) {
      return new NotFountException('Competition');
    }
  }

  async getCompetition(leageCode: string): Promise<Competition> {
    this.logger.log(`Search a competition by code ${leageCode}`);
    const competition = await this.competitionRepository.findOne({
      where: { code: leageCode },
    });
    if (!competition) {
      throw new NotFountException('Competition');
    }
    return competition;
  }
}
