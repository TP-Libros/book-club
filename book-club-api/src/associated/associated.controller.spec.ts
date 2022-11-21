import { Test, TestingModule } from '@nestjs/testing';
import { AssociatedController } from './associated.controller';

describe('AssociatedController', () => {
  let controller: AssociatedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociatedController],
    }).compile();

    controller = module.get<AssociatedController>(AssociatedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
