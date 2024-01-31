import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { SquadService } from './squad.service';
import { CreateSquadDto } from './dto/create-squad.dto';
import { UpdateSquadDto } from './dto/update-squad.dto';

@Controller('squads')
export class SquadController {
  constructor(private readonly squadService: SquadService) {}

  @Post()
  async create(@Body() createSquadDTO: CreateSquadDto) {
    try {
      const newSquad = await this.squadService.createSquad(createSquadDTO);
      return {
        message: `Squad ${newSquad.squadName} was created successfully`,
        data: newSquad,
      };
    } catch (error) {
      throw new BadRequestException('Failed to create squad!', error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      const squads = await this.squadService.findAllSquads();
      return { data: squads };
    } catch (error) {
      throw new NotFoundException('Failed to find any collaborators!');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const squad = await this.squadService.findOneSquad(id);
      return squad;
    } catch (error) {
      throw new NotFoundException(`Squad with ID ${id} was not found`);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateSquadDTO: UpdateSquadDto,
  ) {
    try {
      const updatedSquad = await this.squadService.updateSquad(
        id,
        updateSquadDTO,
      );
      return {
        message: `Squad ${updatedSquad.squadName} was updated successfully`,
        data: updatedSquad,
      };
    } catch (error) {
      throw new BadRequestException('Failed to update squad!', error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.squadService.removeSquad(id);
      return {
        message: `The squad was deleted successfully!`,
      };
    } catch (error) {
      throw new BadRequestException('Failed to delete squad!', error.message);
    }
  }
}
