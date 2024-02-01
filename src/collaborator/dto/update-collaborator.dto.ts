import { PartialType } from '@nestjs/mapped-types';
import { CreateCollaboratorDto } from './create-collaborator.dto';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * @class UpdateCollaboratorDto
 * Data transfer object for updating a Collaborator.
 * Extends the PartialType of CreateCollaboratorDto to allow partial updates.
 * All properties are validated via global pipes and documented in Swagger.
 */
export class UpdateCollaboratorDto extends PartialType(CreateCollaboratorDto) {
  /**
   * @property
   * Updated first name of the collaborator (optional).
   */
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly firstName: string;
  /**
   * @property
   * Updated last name of the collaborator (optional).
   */
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly lastName: string;
  /**
   * @property
   * Updated email address of the collaborator (optional).
   */
  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional()
  readonly email: string;
  /**
   * @property
   * Updated role of the collaborator (optional).
   */
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly role: string;
  /**
   * @property
   * Updated squad ID to which the collaborator belongs (optional).
   */
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  readonly squad?: number;
}
