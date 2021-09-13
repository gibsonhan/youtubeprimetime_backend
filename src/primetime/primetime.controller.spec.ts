import { Test, TestingModule } from '@nestjs/testing';
import { PrimeTimeController } from './primetime.controller';

describe('PrimeTimeController', () => {
  let controller: PrimeTimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrimeTimeController],
    }).compile();

    controller = module.get<PrimeTimeController>(PrimeTimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
