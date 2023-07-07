import { Area } from 'src/providers/data.interface';
import { Player } from '../../players/player.entity';
export class CreateTeamImport {
  id: number;

  name: string;

  tla: string;

  shortName: string;

  areaName?: string;

  address: string;

  squad: Player[];

  area: Area;
}

export class CreateTeamDto {
  id: number;

  name: string;

  tla: string;

  shortName: string;

  areaName?: string;

  address: string;

  squad?: Player[];
}
