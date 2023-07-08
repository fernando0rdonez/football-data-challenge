import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, of } from 'rxjs';
import { FootballDataProvider } from '../../../src/providers/football-data/football-data.provider';
import { mockCompetition, areaNetWork } from '../../mock-data';

describe('FootballDataProvider', () => {
  let provider: FootballDataProvider;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FootballDataProvider,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(() => of({})),
          },
        },
      ],
    }).compile();

    provider = module.get<FootballDataProvider>(FootballDataProvider);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('getLeagueTeams', () => {
    it('should call fetchData with the correct URL and return the response', async () => {
      const leagueName = 'PL';
      const url = `${process.env.DATA_PROVIDER_URL}/v4/competitions/${leagueName}/teams`;
      const expectedResponse = {
        // Define your test data here
      };

      const fetchDataSpy = jest
        .spyOn(provider, 'fetchData')
        .mockResolvedValue(expectedResponse);

      const result = await provider.getLeagueTeams(leagueName);

      expect(fetchDataSpy).toHaveBeenCalledWith(url);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('getLeague', () => {
    it('should call fetchData with the correct URL and return the response', async () => {
      const leagueName = 'PL';
      const url = `${process.env.DATA_PROVIDER_URL}/v4/competitions/${leagueName}`;
      const expectedResponse = {
        ...mockCompetition,
        area: areaNetWork,
      };
      const fetchDataSpy = jest
        .spyOn(provider, 'fetchData')
        .mockResolvedValue(expectedResponse);

      const result = await provider.getLeague(leagueName);

      expect(fetchDataSpy).toHaveBeenCalledWith(url);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('fetchData', () => {
    it('should make an HTTP GET request with the correct headers and return the response data', async () => {
      const url = process.env.DATA_PROVIDER_URL;
      const token = process.env.X_TOKEN;
      const responseData = {
        team: [],
      };

      const httpGetSpy = jest
        .spyOn(httpService, 'get')
        .mockImplementation(jest.fn(() => of(responseData)) as any);

      await provider['fetchData'](url);

      expect(httpGetSpy).toHaveBeenCalledWith(url, {
        headers: { 'X-Auth-Token': token },
      });
    });
  });
});
