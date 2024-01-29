import { PartialType } from '@nestjs/mapped-types';
import { CreateSquadDto } from './create-squad.dto';

export class UpdateSquadDto extends PartialType(CreateSquadDto) {}
