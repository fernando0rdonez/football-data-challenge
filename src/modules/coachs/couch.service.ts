import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateCouchInput } from './dto/create-couch.dto';
import { Coach } from './coach.entity';

@Injectable()
export class CouchsService {
  private readonly logger = new Logger('PlayersService');

  constructor(
    @InjectRepository(Coach)
    private couchRepository: Repository<Coach>,
  ) {}

  saveCouch(input: CreateCouchInput) {
    this.logger.log(`Saving coach`);
    return this.couchRepository.save(input);
  }

  getByTeam(teamId: number[]) {
    this.logger.log(`Searching for coachs`);
    return this.couchRepository.find({ where: { team: { id: In(teamId) } } });
  }
}
