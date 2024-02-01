import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsNumber, IsOptional } from 'class-validator';

/**
 * @class CreateCollaboratorDto
 * Data transfer object for creating a new Collaborator.
 * All properties are validated via global pipes and documented in Swagger.
 */
export class CreateCollaboratorDto {
  /**
   * @property
   * First name of the collaborator.
   */
  @IsString()
  @ApiProperty()
  readonly firstName: string;
  /**
   * @property
   * Last name of the collaborator.
   */
  @IsString()
  @ApiProperty()
  readonly lastName: string;
  /**
   * @property
   * Email address of the collaborator.
   */
  @IsEmail()
  @ApiProperty()
  readonly email: string;
  /**
   * @property
   * Role of the collaborator.
   */
  @IsString()
  @ApiProperty()
  readonly role: string;
  /**
   * @property
   * Squad ID to which the collaborator belongs (optional).
   */
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  readonly squad: number;
}
