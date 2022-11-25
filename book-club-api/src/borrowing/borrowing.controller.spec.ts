import { Test, TestingModule } from '@nestjs/testing';
import { BorrowingController } from './borrowing.controller';

describe('BorrowingController', () => {
  let controller: BorrowingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BorrowingController],
    }).compile();

    controller = module.get<BorrowingController>(BorrowingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
