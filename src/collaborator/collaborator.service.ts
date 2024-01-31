import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collaborator } from './entities/collaborator.entity';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
import { Squad } from 'src/squad/entities/squad.entity';
import { SquadService } from 'src/squad/squad.service';

@Injectable()
export class CollaboratorService {
  constructor(
    @InjectRepository(Collaborator)
    private readonly collaboratorRepository: Repository<Collaborator>,
    @Inject(forwardRef(() => SquadService))
    private readonly squadService: SquadService,
  ) {}

  async createCollaborator(
    collaboratorDto: CreateCollaboratorDto,
  ): Promise<Collaborator> {
    if (collaboratorDto.email) {
      const emailInUse = await this.collaboratorRepository.findOneBy({
        email: collaboratorDto.email,
      });
      if (emailInUse) {
        throw new ConflictException('Email is already in use!');
      }
    }

    let squad: Squad | undefined;
    if (collaboratorDto.squad) {
      squad = await this.squadService.findOneSquad(collaboratorDto.squad);
      if (!squad) {
        throw new BadRequestException('Squad does not exist!');
      }
    }

    const collaboratorToSave = this.collaboratorRepository.create({
      ...collaboratorDto,
      squad: squad,
    });
    return await this.collaboratorRepository.save(collaboratorToSave);
  }

  async findAllCollaborators(): Promise<Collaborator[]> {
    return this.collaboratorRepository
      .createQueryBuilder('collaborator')
      .select([
        'collaborator.id',
        'collaborator.firstName',
        'collaborator.lastName',
        'collaborator.email',
        'collaborator.role',
        'squad.id',
        'squad.squadName',
      ])
      .leftJoin('collaborator.squad', 'squad')
      .getMany();
  }
  async findOneCollaborator(
    collaboratorId: string,
  ): Promise<Collaborator | null> {
    return this.collaboratorRepository
      .createQueryBuilder('collaborator')
      .select([
        'collaborator.id',
        'collaborator.firstName',
        'collaborator.lastName',
        'collaborator.email',
        'collaborator.role',
        'squad.id',
        'squad.squadName',
      ])
      .leftJoin('collaborator.squad', 'squad')
      .where('collaborator.id = :id', { id: collaboratorId })
      .getOne();
  }

  async updateCollaborator(
    collaboratorId: string,
    collaboratorDto: UpdateCollaboratorDto,
  ): Promise<Collaborator> {
    if (collaboratorDto.email) {
      const emailInUse = await this.collaboratorRepository.findOneBy({
        email: collaboratorDto.email,
      });
      if (emailInUse) {
        throw new ConflictException('Email is already in use!');
      }
    }

    let squad: Squad | undefined;
    if (collaboratorDto.squad) {
      squad = await this.squadService.findOneSquad(collaboratorDto.squad);
      if (!squad) {
        throw new BadRequestException('Referenced squad does not exist');
      }
    }

    const existingCollaborator = await this.findOneCollaborator(collaboratorId);
    if (!existingCollaborator) {
      throw new NotFoundException('Collaborator not found');
    }

    await this.collaboratorRepository.update(collaboratorId, {
      ...collaboratorDto,
      squad: squad,
    });

    return this.findOneCollaborator(collaboratorId);
  }

  async deleteCollaborator(collaboratorId: string): Promise<void> {
    await this.collaboratorRepository.delete(collaboratorId);
  }
}
