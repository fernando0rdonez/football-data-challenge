import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Competition } from 'src/modules/competitions/competition.entity';
import { Player } from 'src/modules/players/player.entity';
import { Team } from 'src/modules/teams/team.entity';
config();

export const getConnectionData: TypeOrmModuleOptions = {
  type: 'postgres',
  name: 'footballdata',
  host: process.env.TYPEORM_HOST.toString(),
  port: parseInt(process.env.TYPEORM_PORT.toString(), 10),
  username: process.env.TYPEORM_USERNAME.toString(),
  password: process.env.TYPEORM_PASSWORD.toString(),
  database: process.env.TYPEORM_DATABASE.toString(),
  synchronize: true,
  migrationsRun: false,
  logging: false,
  entities: [Competition, Team, Player],
  migrations: [__dirname + '/../module/migration/*.[tj]s'],
};
