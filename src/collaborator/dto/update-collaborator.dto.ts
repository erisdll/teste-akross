import { PartialType } from '@nestjs/mapped-types';
import { CreateCollaboratorDto } from './create-collaborator.dto';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCollaboratorDto extends PartialType(CreateCollaboratorDto) {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly firstName: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly lastName: string;

  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional()
  readonly email: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly role: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  readonly squad?: number;
}
