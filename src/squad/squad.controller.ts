import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SquadService } from './squad.service';
import { CreateSquadDto } from './dto/create-squad.dto';
import { UpdateSquadDto } from './dto/update-squad.dto';

@Controller('squad')
export class SquadController {
  constructor(private readonly squadService: SquadService) {}

  @Post()
  create(@Body() createSquadDto: CreateSquadDto) {
    return this.squadService.create(createSquadDto);
  }

  @Get()
  findAll() {
    return this.squadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.squadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSquadDto: UpdateSquadDto) {
    return this.squadService.update(+id, updateSquadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.squadService.remove(+id);
  }
}
