import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TeamsModule } from './modules/teams/teams.module';
import { PlayersModule } from './modules/players/players.module';
import { CompetitionsModule } from './modules/competitions/competitions.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionData } from './config/orm.config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => getConnectionData,
    }),
    TeamsModule,
    PlayersModule,
    CompetitionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
