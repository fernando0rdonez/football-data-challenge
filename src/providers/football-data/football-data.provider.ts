import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import {
  CompetitionResponse,
  CompetitionTeamsResponse,
} from '../data.interface';

@Injectable()
export class FootballDataProvider {
  private token: string;
  private url: string;
  constructor(private httpService: HttpService) {
    this.token = process.env.X_TOKEN;
    this.url = process.env.DATA_PROVIDER_URL;
  }

  async fetchData<T>(url: string): Promise<T> {
    const headers = { 'X-Auth-Token': this.token };
    const { data: response } = await lastValueFrom(
      this.httpService.get<T>(url, { headers }),
    );
    return response;
  }

  async getLeagueTeams(leagueName: string): Promise<CompetitionTeamsResponse> {
    const url = `${this.url}/v4/competitions/${leagueName}/teams`;
    return this.fetchData<CompetitionTeamsResponse>(url);
  }

  async getLeague(leagueName: string): Promise<CompetitionResponse> {
    const url = `${this.url}/v4/competitions/${leagueName}`;
    return this.fetchData<CompetitionResponse>(url);
  }
}
