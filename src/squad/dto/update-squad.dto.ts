import { PartialType } from '@nestjs/mapped-types';
import { CreateSquadDto } from './create-squad.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSquadDto extends PartialType(CreateSquadDto) {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly squadName: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly description: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly project: string;
}
