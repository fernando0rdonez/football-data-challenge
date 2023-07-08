
# Backend test

## Installation
You can rename the file ```env.template``` to ```.env```
```bash
$ npm install
```

## Running the app

```bash
# run database container 
$ docker compose up -d 

# development
$ npm run start

```

## Test

```bash
# unit tests
$ npm run test
```
# Decision making
## - Framework
  The first decision was choosing to implement this using NestJS. I prefer NestJS because it provides a clear structure to follow and allows us to easily reuse code through the implementation of modules. Additionally, it offers a wide range of tools for different purposes. Another important factor in choosing this framework is that it makes the code more readable and understandable for other people, thanks to its clear structure.
  ### - Why npm 
  I chose npm in NestJS because it is widely used and supported by the Node.js community. npm is the default package manager and offers many ready-to-use packages and tools for easier development in NestJS. It provides a user-friendly command-line interface and extensive documentation, making it easy to manage dependencies and scripts.
  
## - Data Base
  For this decision, it was not difficult to choose a relational database. It is advisable to use a SQL database when your data structure does not change frequently, and one of the important aspects is that the many-to-many relationship is better handled in a SQL database.
### - TypeOrm
  I use ```TypeORM```  provides an object-relational mapping for databases, allowing data manipulation and query writing using a more readable syntax also has features like entity relationships, and data validation, enhancing development efficiency and maintainability.

  I can easily set up relationships like this without having to create a specific pivot table
  ```TypeScript
  @ManyToMany(() => Team, (team) => team.competitions)
  @JoinTable({
    name: 'competition_team',
    joinColumn: {
      name: 'competition_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'team_id',
      referencedColumnName: 'id',
    },
  })
  @Field(() => [Team], {
    nullable: true,
    description: 'List of teams that belongs to the competitions',
  })
  teams?: Team[];
  ```

## - Rate-limit 
  We are using the ```ThrottlerModule```, which is a tool provided by Nestjs and is easy to implement. I believe it is the best option for this project. I had to create a custom guard decorator called ```GqlThrottlerGuard``` to handle the limit in the specific mutation.

  ```TypeScript
  @Mutation(() => ResponseImport)
  @UseGuards(GqlThrottlerGuard)
  importLeague(@Args('leagueCode', { type: () => String }) leagueCode: string)
  ```
 

## - Graphql   
  I use the ```GraphQLModule``` to work with GraphQL in NestJs, specifically configuring it for the use of a code-first approach. 
  ```TypeScript 
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  ```

  Something remarkable is that in GraphQL, we can use a complete resolver as a resolved field of another resolver. This enables code reuse and promotes modularity in our application
```TypeScript
  /// In CompetitionResolver

  @ResolveField(() => [Team])
  teams(@Parent() competition: Competition) {
    return this.teamResolver.teamCompetition(competition.id);
  }
```

### - Football Provider
  I created a provider called ```FootballDataProvider``` to fetch data from the REST API. Creating a provider allows us to work with modules, reuse code, and facilitate testing. If in the future we decide to fetch data from a different API, we can easily change or create another provider.



## Stay in touch

- Author - [Fernando Ordoñez](https://www.linkedin.com/in/fernando0rdonez)
- Twitter - [@fernando0rdonez](https://twitter.com/fernando0rdonez)
