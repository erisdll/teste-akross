import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSquadDto {
  @IsString()
  @ApiProperty()
  readonly squadName: string;

  @IsString()
  @ApiProperty()
  readonly attributions: string;

  @IsString()
  @ApiProperty()
  readonly project: string;
}
