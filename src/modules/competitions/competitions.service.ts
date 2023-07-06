import { Injectable } from '@nestjs/common';

@Injectable()
export class CompetitionsService {
  importLeague(leageCode: string) {
    return `This action import a #${leageCode} league`;
  }
}
