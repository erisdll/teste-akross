import { IsString } from 'class-validator';

export class CreateSquadDto {
  @IsString()
  readonly squadName: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly attributions: string;

  @IsString()
  readonly project: string;
}
