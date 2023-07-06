import { Injectable } from '@nestjs/common';
import { FootballDataProvider } from '../../providers/football-data/football-data.provider';
import { CompetitionResponse } from 'src/providers/data.interface';

@Injectable()
export class CompetitionsService {
  constructor(private footbalDataProvider: FootballDataProvider) {}
  async importLeague(leageCode: string) {
    const { teams, competition }: CompetitionResponse =
      await this.footbalDataProvider.getLeague(leageCode);
    return { message: `This action import a #${leageCode} league` };
  }
}
