import { Injectable } from '@nestjs/common';
import { CreateSquadDto } from './dto/create-squad.dto';
import { UpdateSquadDto } from './dto/update-squad.dto';

@Injectable()
export class SquadService {
  create(createSquadDto: CreateSquadDto) {
    return 'This action adds a new squad';
  }

  findAll() {
    return `This action returns all squad`;
  }

  findOne(id: number) {
    return `This action returns a #${id} squad`;
  }

  update(id: number, updateSquadDto: UpdateSquadDto) {
    return `This action updates a #${id} squad`;
  }

  remove(id: number) {
    return `This action removes a #${id} squad`;
  }
}
