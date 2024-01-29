import { Module } from '@nestjs/common';
import { SquadService } from './squad.service';
import { SquadController } from './squad.controller';

@Module({
  controllers: [SquadController],
  providers: [SquadService],
})
export class SquadModule {}
