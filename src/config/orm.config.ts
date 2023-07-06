import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
config();

export const getConnectionData: TypeOrmModuleOptions = {
  type: 'postgres',
  name: 'footballdata',
  host: process.env.TYPEORM_HOST.toString(),
  port: parseInt(process.env.TYPEORM_PORT.toString(), 10),
  username: process.env.TYPEORM_USERNAME.toString(),
  password: process.env.TYPEORM_PASSWORD.toString(),
  database: process.env.TYPEORM_DATABASE.toString(),
  synchronize: false,
  migrationsRun: false,
  logging: true,
  entities: [__dirname + '/../module/**/*.entity.[tj]s'],
  migrations: [__dirname + '/../module/migration/**/*.[tj]s'],
};
