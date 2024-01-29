import { Test, TestingModule } from '@nestjs/testing';
import { SquadController } from './squad.controller';
import { SquadService } from './squad.service';

describe('SquadController', () => {
  let controller: SquadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SquadController],
      providers: [SquadService],
    }).compile();

    controller = module.get<SquadController>(SquadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
