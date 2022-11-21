import { Test, TestingModule } from '@nestjs/testing';
import { AssociatedService } from './associated.service';

describe('AssociatedService', () => {
  let service: AssociatedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssociatedService],
    }).compile();

    service = module.get<AssociatedService>(AssociatedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
