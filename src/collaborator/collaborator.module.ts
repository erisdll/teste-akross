import { Module } from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';
import { CollaboratorController } from './collaborator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollaboratorEntity } from './entities/collaborator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CollaboratorEntity])],
  controllers: [CollaboratorController],
  providers: [CollaboratorService],
})
export class CollaboratorModule {}
