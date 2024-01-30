import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollaboratorModule } from './collaborator/collaborator.module';
import { SquadModule } from './squad/squad.module';

@Module({
  imports: [CollaboratorModule, SquadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
