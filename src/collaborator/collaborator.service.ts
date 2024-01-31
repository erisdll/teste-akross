import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collaborator } from './entities/collaborator.entity';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
import { SquadService } from 'src/squad/squad.service';

@Injectable()
export class CollaboratorService {
  constructor(
    @InjectRepository(Collaborator)
    private readonly collaboratorRepository: Repository<Collaborator>,
    private readonly squadService: SquadService,
  ) {}

  async createCollaborator(
    collaboratorDto: CreateCollaboratorDto,
  ): Promise<Collaborator> {
    const squadId = collaboratorDto.squad;

    // Use the SquadService to find the squad by ID
    const squad = await this.squadService.findSquadById(squadId);

    if (!squad) {
      throw new NotFoundException(`Squad with ID ${squadId} not found`);
    }

    // Assign the squad to the collaborator
    const collaboratorToSave = this.collaboratorRepository.create({
      ...collaboratorDto,
    });

    // Save the collaborator
    return await this.collaboratorRepository.save(collaboratorToSave);
  }

  async findAllCollaborators(): Promise<Collaborator[]> {
    return await this.collaboratorRepository.find();
  }

  async findCollaboratorById(
    collaboratorId: string,
  ): Promise<Collaborator | null> {
    return this.collaboratorRepository.findOne({
      where: { id: collaboratorId },
    });
  }

  async updateCollaborator(
    collaboratorId: string,
    collaboratorDto: UpdateCollaboratorDto,
  ): Promise<Collaborator> {
    await this.collaboratorRepository.update(collaboratorId, collaboratorDto);
    return this.findCollaboratorById(collaboratorId);
  }

  async deleteCollaborator(collaboratorId: string): Promise<void> {
    await this.collaboratorRepository.delete(collaboratorId);
  }
}
