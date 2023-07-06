import { Resolver, Query, Args } from '@nestjs/graphql';
import { PlayersService } from './players.service';
import { Player } from './entities/player.entity';

@Resolver(() => Player)
export class PlayersResolver {
  constructor(private readonly playersService: PlayersService) {}

  @Query(() => Player, { name: 'player' })
  players(@Args('leagueCode', { type: () => String }) leageCode: string) {
    return this.playersService.findByleagueCode(leageCode);
  }
}
