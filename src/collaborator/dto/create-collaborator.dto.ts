import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { Collaborator } from '../entities/collaborator.entity';

export class CreateCollaboratorDto extends Collaborator {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly role: string;

  @IsNotEmpty()
  @IsNumber()
  readonly squadId: number;
}
