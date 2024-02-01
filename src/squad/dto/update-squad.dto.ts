import { PartialType } from '@nestjs/mapped-types';
import { CreateSquadDto } from './create-squad.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
/**
 * @class UpdateSquadDto
 * Data transfer object for updating a Squad.
 * Extends the PartialType of CreateSquadDto to allow partial updates.
 * All properties are validated via global pipes and documented in Swagger.
 */
export class UpdateSquadDto extends PartialType(CreateSquadDto) {
  /**
   * @property
   * Updated name of the squad (optional).
   */
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly squadName: string;
  /**
   * @property
   * Updated description of the squad (optional).
   */
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly description: string;
  /**
   * @property
   * Updated project associated with the squad (optional).
   */
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly project: string;
}
