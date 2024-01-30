import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { Collaborator } from '../entities/collaborator.entity';

export class CreateCollaboratorDto extends Collaborator {
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly role: string;

  @IsNotEmpty()
  @IsNumber()
  readonly squad: number;
}
