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
      const result = await this.collaboratorService.createCollaborator(
        createCollaboratorDto,
      );
      return { success: true, data: result };
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
      throw new NotFoundException('Failed to find collaborators!');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const collaborator =
        await this.collaboratorService.findCollaboratorById(id);
      return { success: true, data: collaborator };
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
      const updatedCollaborator =
        await this.collaboratorService.updateCollaborator(
          id,
          updateCollaboratorDto,
        );
      return { success: true, data: updatedCollaborator };
    } catch (error) {
      throw new BadRequestException(
        'Failed to create collaborator!',
        error.message,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const collaborator =
        await this.collaboratorService.findCollaboratorById(id);
      await this.collaboratorService.deleteCollaborator(id);
      return {
        success: true,
        message: `Collaborator ${collaborator.firstName} was deleted successfully`,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to create collaborator!',
        error.message,
      );
    }
  }
}
