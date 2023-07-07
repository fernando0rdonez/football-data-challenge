import { Injectable } from '@nestjs/common';
import { FootballDataProvider } from '../../providers/football-data/football-data.provider';
import { CompetitionResponse } from 'src/providers/data.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Competition } from './competition.entity';
import { Repository } from 'typeorm';
import { TeamsService } from '../teams/teams.service';

@Injectable()
export class CompetitionsService {
  constructor(
    private footbalDataProvider: FootballDataProvider,
    @InjectRepository(Competition)
    private competitionRepository: Repository<Competition>,
    private teamService: TeamsService,
  ) {}
  async importLeague(leageCode: string) {
    const { teams, competition: competitionData }: CompetitionResponse =
      await this.footbalDataProvider.getLeague(leageCode);

    const competitionDto = { ...competitionData, areaName: teams[0].area.name };
    const competition = await this.competitionRepository.save(competitionDto);
    await this.teamService.createFromArray(teams, competition);

    return { message: `This action import a #${leageCode} league` };
  }
}
