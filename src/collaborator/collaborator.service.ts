import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collaborator } from './entities/collaborator.entity';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';

@Injectable()
export class CollaboratorService {
  constructor(
    @InjectRepository(Collaborator)
    private collaboratorRepository: Repository<Collaborator>,
  ) {}

  async createCollaborator(
    collaboratorData: CreateCollaboratorDto,
  ): Promise<Collaborator> {
    const collaborator = this.collaboratorRepository.create(collaboratorData);
    return await this.collaboratorRepository.save(collaborator);
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
    collaboratorData: Partial<UpdateCollaboratorDto>,
  ): Promise<Collaborator> {
    await this.collaboratorRepository.update(collaboratorId, collaboratorData);
    return this.findCollaboratorById(collaboratorId);
  }

  async deleteCollaborator(collaboratorId: string): Promise<void> {
    await this.collaboratorRepository.delete(collaboratorId);
  }
}
