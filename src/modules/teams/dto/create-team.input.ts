import { Area } from 'src/providers/data.interface';
import { Player } from '../../players/player.entity';
import { Coach } from '../../../../src/providers/data.interface';
export class CreateTeamImport {
  id: number;

  name: string;

  tla: string;

  shortName: string;

  areaName?: string;

  address: string;

  squad?: Player[];

  area?: Area;

  coach?: Coach;
}
