import { Test, TestingModule } from '@nestjs/testing';
import { HandsController } from './hands.controller';

describe('HandsController', () => {
  let controller: HandsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HandsController],
    }).compile();

    controller = module.get<HandsController>(HandsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
