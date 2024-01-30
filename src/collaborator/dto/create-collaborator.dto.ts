import { IsString, IsEmail, IsOptional, IsDate } from 'class-validator';

export class CreateCollaboratorDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly role: string;

  @IsOptional()
  @IsDate()
  readonly birthDate?: Date;
}
