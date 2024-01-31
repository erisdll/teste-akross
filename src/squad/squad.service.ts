import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateSquadDto } from './dto/create-squad.dto';
import { UpdateSquadDto } from './dto/update-squad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Squad } from './entities/squad.entity';
import { Repository } from 'typeorm';
import { CollaboratorService } from 'src/collaborator/collaborator.service';

@Injectable()
export class SquadService {
  constructor(
    @InjectRepository(Squad)
    private readonly squadRepository: Repository<Squad>,
    @Inject(forwardRef(() => CollaboratorService))
    private readonly collaboratorService: CollaboratorService,
  ) {}

  async createSquad(createSquadDto: CreateSquadDto): Promise<Squad> {
    const squadToSave = this.squadRepository.create(createSquadDto);
    return await this.squadRepository.save(squadToSave);
  }

  async findAllSquads(): Promise<Squad[]> {
    return await this.squadRepository.find();
  }

  async findOneSquad(id: number): Promise<Squad | null> {
    const squad = await this.squadRepository.findOne({ where: { id } });
    return squad;
  }

  async updateSquad(
    id: number,
    updateSquadDto: UpdateSquadDto,
  ): Promise<Squad | null> {
    await this.squadRepository.update(id, updateSquadDto);
    return await this.squadRepository.findOneBy({ id });
  }

  async removeSquad(id: number): Promise<void> {
    await this.squadRepository.delete(id);
  }
}
