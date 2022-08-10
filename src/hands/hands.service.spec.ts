import { Test, TestingModule } from '@nestjs/testing';
import { HandsService } from './hands.service';

describe('HandsService', () => {
  let service: HandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HandsService],
    }).compile();

    service = module.get<HandsService>(HandsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
