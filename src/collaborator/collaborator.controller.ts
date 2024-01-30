import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';

@Controller('collaborator')
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) {}

  @Post()
  create(@Body() createCollaboratorDto: CreateCollaboratorDto) {
    return this.collaboratorService.createCollaborator(createCollaboratorDto);
  }

  @Get()
  findAll() {
    return this.collaboratorService.findAllCollaborators();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collaboratorService.findCollaboratorById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCollaboratorDto: UpdateCollaboratorDto,
  ) {
    return this.collaboratorService.updateCollaborator(
      id,
      updateCollaboratorDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collaboratorService.deleteCollaborator(id);
  }
}
