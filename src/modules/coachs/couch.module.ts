import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Coach } from './coach.entity';
import { CouchsService } from './couch.service';

@Module({
  imports: [TypeOrmModule.forFeature([Coach])],
  providers: [CouchsService],
  exports: [CouchsService],
})
export class CouchsModule {}
