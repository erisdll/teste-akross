import { Module } from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';
import { CollaboratorController } from './collaborator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collaborator } from './entities/collaborator.entity';
import { SquadModule } from 'src/squad/squad.module';
/**
 * Module defining the Collaborator-related components.
 * Uses NestJS decorators for module configuration and dependency injection.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Collaborator]), SquadModule],
  controllers: [CollaboratorController],
  providers: [CollaboratorService],
  exports: [CollaboratorService],
})
export class CollaboratorModule {}
