import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
/**
 * @class CreateSquadDto
 * Data transfer object for creating a new Squad.
 * All properties are validated via global pipes and documented in Swagger.
 */
export class CreateSquadDto {
  /**
   * @property
   * Name of the squad.
   */
  @IsString()
  @ApiProperty()
  readonly squadName: string;
  /**
   * @property
   * Description of the squad.
   */
  @IsString()
  @ApiProperty()
  readonly description: string;
  /**
   * @property
   * Project associated with the squad.
   */
  @IsString()
  @ApiProperty()
  readonly project: string;
}
