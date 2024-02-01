import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateSquadDto } from './dto/create-squad.dto';
import { UpdateSquadDto } from './dto/update-squad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Squad } from './entities/squad.entity';
import { Repository } from 'typeorm';
import { ISquadCount } from './interfaces/squadresponse.interface';
/**
 * Injectable service handling business logic for Squad entities.
 * Utilizes TypeORM decorators for database interactions and NestJS decorators for dependency injection.
 */
@Injectable()
export class SquadService {
  constructor(
    @InjectRepository(Squad)
    private readonly squadRepository: Repository<Squad>,
  ) {}
  /**
   * Creates a new squad, ensuring the squad name is not already in use.
   *
   * @param createSquadDto - Data transfer object for creating a squad
   * @returns The created squad entity
   */
  async createSquad(createSquadDto: CreateSquadDto): Promise<Squad> {
    const nameInUse = await this.squadRepository.findOneBy({
      squadName: createSquadDto.squadName,
    });
    if (nameInUse) {
      throw new ConflictException('This name is already in use!');
    }

    const squadToSave = this.squadRepository.create(createSquadDto);
    return await this.squadRepository.save(squadToSave);
  }
  /**
   * Retrieves all squads.
   *
   * @returns Object containing both squads and total count
   */
  async findAllSquads(): Promise<ISquadCount> {
    const [squads, count] = await this.squadRepository
      .createQueryBuilder('squads')
      .getManyAndCount();
    return { count, squads };
  }
  /**
   * Retrieves a specific squad by ID.
   *
   * @param squadId - ID of the squad to retrieve
   * @returns The squad entity or null if not found
   */
  async findOneSquad(squadId: number): Promise<Squad | null> {
    const squad = await this.squadRepository.findOneBy({ id: squadId });
    return squad;
  }
  /**
   * Retrieves a specific squad by ID with additional information about its collaborators.
   *
   * @param squadId - ID of the squad to retrieve
   * @returns The squad entity or null if not found
   */
  async findSquadWithCollaborators(squadId: number): Promise<Squad | null> {
    const squad = await this.squadRepository
      .createQueryBuilder('squad')
      .leftJoin('squad.collaborators', 'collaborators')
      .where('squad.id = :id', { id: squadId })
      .select([
        'squad.id',
        'squad.squadName',
        'squad.description',
        'squad.project',
        'collaborators.id',
        'collaborators.firstName',
        'collaborators.role',
      ])
      .getOne();
    return squad;
  }
  /**
   * Updates a specific squad by ID.
   *
   * @param squadId - ID of the squad to update
   * @param updateSquadDto - Data transfer object for updating a squad
   * @returns The updated squad entity or null if not found
   */
  async updateSquad(
    squadId: number,
    updateSquadDto: UpdateSquadDto,
  ): Promise<Squad | null> {
    const existingSquad = await this.findOneSquad(squadId);
    if (!existingSquad) {
      throw new NotFoundException('Squad not found!');
    }

    await this.squadRepository.update(squadId, {
      ...updateSquadDto,
    });

    return this.findOneSquad(squadId);
  }
  /**
   * Removes a specific squad by ID.
   *
   * @param squadId - ID of the squad to remove
   */
  async removeSquad(squadId: number): Promise<void> {
    await this.squadRepository.delete(squadId);
  }
}
