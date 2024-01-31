import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { SquadService } from './squad.service';
import { CreateSquadDto } from './dto/create-squad.dto';
import { UpdateSquadDto } from './dto/update-squad.dto';

@Controller('squads')
export class SquadController {
  constructor(private readonly squadService: SquadService) {}

  @Post()
  create(@Body() createSquadDTO: CreateSquadDto) {
    return this.squadService.createSquad(createSquadDTO);
  }

  @Get()
  findAll() {
    return this.squadService.findAllSquads();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const squad = this.squadService.findOneSquad(+id);
    if (!squad) {
      throw new NotFoundException(`Squad with ID ${id} not found`);
    }
    return squad;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSquadDTO: UpdateSquadDto) {
    return this.squadService.updateSquad(+id, updateSquadDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.squadService.removeSquad(+id);
  }
}
