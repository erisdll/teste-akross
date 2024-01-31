import { IsString, IsEmail, IsNumber, IsOptional } from 'class-validator';

export class CreateCollaboratorDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly role: string;

  @IsNumber()
  @IsOptional()
  readonly squad: number;
}
