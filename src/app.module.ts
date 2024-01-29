import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SquadsModule } from './squads/squads.module';
import { CompanyModule } from './collaborator/company/company.module';
import { CollaboratorModule } from './collaborator/collaborator.module';
import { CollaboratorModule } from './collaborator/collaborator.module';
import { SquadModule } from './squad/squad.module';
import { CompanyModule } from './company/company.module';
import { SquadModule } from './squad/squad.module';
import { CollaboratorModule } from './collaborator/collaborator.module';

@Module({
  imports: [SquadsModule, CompanyModule, CollaboratorModule, SquadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
