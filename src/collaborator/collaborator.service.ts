import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
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
    const squadExists = await this.squadService.findSquadById(
      collaboratorDto.squad,
    );
    if (collaboratorDto.squad && !squadExists) {
      throw new BadRequestException('Referenced squad does not exist');
    }
    const collaboratorToSave =
      this.collaboratorRepository.create(collaboratorDto);
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
    const EmailInUse = await this.collaboratorRepository.findOne({
      where: { email: collaboratorDto.email },
    });
    if (collaboratorDto.email && EmailInUse) {
      throw new ConflictException('Email is already in use!');
    }

    const squadExists = await this.squadService.findSquadById(
      collaboratorDto.squad,
    );
    if (collaboratorDto.squad && !squadExists) {
      throw new BadRequestException('Referenced squad does not exist');
    }

    await this.collaboratorRepository.update(collaboratorId, collaboratorDto);
    return this.findCollaboratorById(collaboratorId);
  }

  async deleteCollaborator(collaboratorId: string): Promise<void> {
    await this.collaboratorRepository.delete(collaboratorId);
  }
}
