import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollaboratorEntity } from './entities/collaborator.entity';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';

@Injectable()
export class CollaboratorService {
  constructor(
    @InjectRepository(CollaboratorEntity)
    private collaboratorRepository: Repository<CollaboratorEntity>,
  ) {}

  async createNewCollaborator(
    collaboratorData: CreateCollaboratorDto,
  ): Promise<CollaboratorEntity> {
    try {
      const collaborator = this.collaboratorRepository.create(collaboratorData);
      return await this.collaboratorRepository.save(collaborator);
    } catch (error) {
      throw error;
    }
  }

  async getAllCollaborators(): Promise<CollaboratorEntity[]> {
    return await this.collaboratorRepository.find();
  }

  async getCollaboratorByEmail(
    collaboratorEmail,
  ): Promise<CollaboratorEntity | null> {
    return await this.collaboratorRepository.findOne(collaboratorEmail);
  }

  async updateCollaborator(
    collaboratorEmail,
    collaboratorData: Partial<UpdateCollaboratorDto>,
  ): Promise<CollaboratorEntity | null> {
    await this.collaboratorRepository.update(
      collaboratorEmail,
      collaboratorData,
    );
    return this.getCollaboratorByEmail(collaboratorEmail);
  }

  async deleteCollaborator(collaboratorId: string): Promise<void> {
    await this.collaboratorRepository.delete(collaboratorId);
  }
}
