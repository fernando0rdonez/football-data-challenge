import { Module } from '@nestjs/common';
import { LeagueModule } from './league/league.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ,
    LeagueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
