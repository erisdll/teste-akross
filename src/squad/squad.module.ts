import { Module, forwardRef } from '@nestjs/common';
import { SquadService } from './squad.service';
import { SquadController } from './squad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Squad } from './entities/squad.entity';
import { CollaboratorModule } from 'src/collaborator/collaborator.module';
/**
 * Module defining the Collaborator-related components.
 * Uses NestJS decorators for module configuration and dependency injection.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Squad]),
    forwardRef(() => CollaboratorModule),
  ],
  controllers: [SquadController],
  providers: [SquadService],
  exports: [SquadService],
})
export class SquadModule {}
