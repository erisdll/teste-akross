import { IsString } from 'class-validator';

export class CreateSquadDto {
  @IsString()
  readonly squadName: string;

  @IsString()
  readonly attributions: string;
}
