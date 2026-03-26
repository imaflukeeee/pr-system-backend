import { Test, TestingModule } from '@nestjs/testing';
import { PrController } from './pr.controller';

describe('PrController', () => {
  let controller: PrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrController],
    }).compile();

    controller = module.get<PrController>(PrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
