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
import { CollaboratorService } from './collaborator.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';

@Controller('collaborators')
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) {}

  @Post()
  async create(@Body() createCollaboratorDto: CreateCollaboratorDto) {
    try {
      const newCollaborator = await this.collaboratorService.createCollaborator(
        createCollaboratorDto,
      );
      return {
        message: `Collaborator ${newCollaborator.firstName} was created successfully`,
        data: newCollaborator,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to create collaborator!',
        error.message,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const collaborators =
        await this.collaboratorService.findAllCollaborators();
      return { success: true, data: collaborators };
    } catch (error) {
      throw new NotFoundException('Failed to find any collaborators!');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const collaborator =
        await this.collaboratorService.findOneCollaborator(id);
      return { data: collaborator };
    } catch (error) {
      throw new NotFoundException('Collaborator not found!');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCollaboratorDto: UpdateCollaboratorDto,
  ) {
    try {
      const updated = await this.collaboratorService.updateCollaborator(
        id,
        updateCollaboratorDto,
      );
      return {
        message: `Collaborator ${updated.firstName} was updated successfully`,
        data: updated,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to update collaborator!',
        error.message,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.collaboratorService.removeCollaborator(id);
      return {
        message: `The collaborator was deleted successfully`,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to delete collaborator!',
        error.message,
      );
    }
  }
}
