import {
  Inject,
  Injectable,
  forwardRef,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateSquadDto } from './dto/create-squad.dto';
import { UpdateSquadDto } from './dto/update-squad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Squad } from './entities/squad.entity';
import { Repository } from 'typeorm';
import { CollaboratorService } from 'src/collaborator/collaborator.service';
import { ISquadCount } from './interfaces/squadresponse.interface';

@Injectable()
export class SquadService {
  constructor(
    @InjectRepository(Squad)
    private readonly squadRepository: Repository<Squad>,
    @Inject(forwardRef(() => CollaboratorService))
    private readonly collaboratorService: CollaboratorService,
  ) {}

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

  async findAllSquads(): Promise<ISquadCount> {
    const [squads, count] = await this.squadRepository
      .createQueryBuilder('squads')
      .getManyAndCount();
    return { count, squads };
  }

  async findOneSquad(id: number): Promise<Squad | null> {
    const squad = await this.squadRepository.findOneByOrFail({ id });
    return squad;
  }

  async findSquadWithCollaborators(id: number): Promise<Squad | null> {
    const squad = await this.squadRepository
      .createQueryBuilder('squad')
      .leftJoin('squad.collaborators', 'collaborators')
      .where('squad.id = :id', { id: id })
      .select([
        'squad.id',
        'squad.squadName',
        'squad.description',
        'squad.project',
        'collaborators.id',
        'collaborators.firstName',
        'collaborators.role',
      ])
      .getOneOrFail();
    return squad;
  }

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

  async removeSquad(id: number): Promise<void> {
    await this.squadRepository.delete(id);
  }
}
