import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collaborator } from './entities/collaborator.entity';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
import { Squad } from 'src/squad/entities/squad.entity';
import { SquadService } from 'src/squad/squad.service';
import { ICollaboratorCount } from './interfaces/collaborators.interface';
/**
 * Injectable service handling business logic for Collaborator entities.
 * Utilizes TypeORM decorators for database interactions and NestJS decorators for dependency injection.
 */
@Injectable()
export class CollaboratorService {
  constructor(
    @InjectRepository(Collaborator)
    private readonly collaboratorRepository: Repository<Collaborator>,
    private readonly squadService: SquadService,
  ) {}
  /**
   * Creates a new collaborator, ensuring email uniqueness and (if applicable) squad existence.
   *
   * @param collaboratorDto - Data transfer object for creating a collaborator
   * @returns The created collaborator entity and squad if present.
   */
  async createCollaborator(
    collaboratorDto: CreateCollaboratorDto,
  ): Promise<Collaborator> {
    const emailInUse = await this.collaboratorRepository.findOneBy({
      email: collaboratorDto.email,
    });
    if (emailInUse) {
      throw new ConflictException('This Email is already in use!');
    }

    let squad: Squad | undefined;
    if (collaboratorDto.squad) {
      squad = await this.squadService.findOneSquad(collaboratorDto.squad);
      if (!squad) {
        throw new BadRequestException('The referenced does not exist!');
      }
    }

    const collaboratorToSave = this.collaboratorRepository.create({
      ...collaboratorDto,
      squad: squad,
    });
    await this.collaboratorRepository.save(collaboratorToSave);
    return collaboratorToSave;
  }
  /**
   * Retrieves all collaborators with additional information about their squads.
   *
   * @returns Object containing both collaborators and total count
   */
  async findAllCollaborators(): Promise<ICollaboratorCount> {
    const [collaborators, count] = await this.collaboratorRepository
      .createQueryBuilder('collaborator')
      .leftJoin('collaborator.squad', 'squad')
      .select([
        'collaborator.id',
        'collaborator.firstName',
        'collaborator.lastName',
        'collaborator.email',
        'collaborator.role',
        'squad.id',
        'squad.squadName',
      ])
      .getManyAndCount();
    return { count, collaborators };
  }
  /**
   * Retrieves a specific collaborator by ID with additional information about their squad.
   *
   * @param collaboratorId - ID of the collaborator to retrieve
   * @returns The collaborator entity or null if not found
   */
  async findOneCollaborator(
    collaboratorId: string,
  ): Promise<Collaborator | null> {
    const collaborator = await this.collaboratorRepository
      .createQueryBuilder('collaborator')
      .leftJoin('collaborator.squad', 'squad')
      .where('collaborator.id = :id', { id: collaboratorId })
      .select([
        'collaborator.id',
        'collaborator.firstName',
        'collaborator.lastName',
        'collaborator.email',
        'collaborator.role',
        'squad.id',
        'squad.squadName',
      ])
      .getOne();
    return collaborator;
  }
  /**
   * Updates a specific collaborator by ID, ensuring email uniqueness and squad existence.
   * All DTO params are optional.
   * @param collaboratorId - ID of the collaborator to update
   * @param collaboratorDto - Data transfer object for updating a collaborator
   * @returns The updated collaborator entity
   */
  async updateCollaborator(
    collaboratorId: string,
    collaboratorDto: UpdateCollaboratorDto,
  ): Promise<Collaborator> {
    if (collaboratorDto.email) {
      const emailInUse = await this.collaboratorRepository.findOneBy({
        email: collaboratorDto.email,
      });
      if (emailInUse) {
        throw new Error('Email is already in use!');
      }
    }

    let squad: Squad | undefined;
    if (collaboratorDto.squad) {
      squad = await this.squadService.findOneSquad(collaboratorDto.squad);
      if (!squad) {
        throw new Error('Referenced squad does not exist');
      }
    }

    const existingCollaborator = await this.findOneCollaborator(collaboratorId);
    if (!existingCollaborator) {
      throw new Error('Collaborator not found');
    }

    await this.collaboratorRepository.update(collaboratorId, {
      ...collaboratorDto,
      squad: squad,
    });

    return this.findOneCollaborator(collaboratorId);
  }
  /**
   * Removes a specific collaborator by ID.
   *
   * @param collaboratorId - ID of the collaborator to remove
   */
  async removeCollaborator(collaboratorId: string): Promise<void> {
    await this.collaboratorRepository.delete(collaboratorId);
  }
}
