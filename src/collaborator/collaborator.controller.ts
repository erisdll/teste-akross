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
import { ApiParam, ApiTags } from '@nestjs/swagger';
/**
 * Controller handling CRUD operations for collaborators.
 * Uses NestJS decorators for routing and Swagger for API documentation.
 */
@ApiTags('Collaborators')
@Controller('collaborators')
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) {}
  /**
   * Endpoint to create a new collaborator
   *
   * @param createCollaboratorDto
   */
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
  /**
   * Endpoint to retrieve all collaborators
   */
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
  /**
   * Endpoint to retrieve a specific collaborator by ID
   *
   * @param id
   */
  @ApiParam({
    name: 'id',
    description:
      'The UUID of the collaborator (available in get all route response)',
  })
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
  /**
   * Endpoint to update a specific collaborator by ID
   *
   * @param id
   * @param updateCollaboratorDto
   */
  @ApiParam({
    name: 'id',
    description:
      'The UUID of the collaborator (available in get all route response)',
  })
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
  /**
   * Endpoint to delete a specific collaborator by ID
   *
   * @param id
   */
  @ApiParam({
    name: 'id',
    description:
      'The UUID of the collaborator (available in get all route response)',
  })
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
