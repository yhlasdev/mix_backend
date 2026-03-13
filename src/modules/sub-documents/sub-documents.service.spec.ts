import { Test, TestingModule } from '@nestjs/testing';
import { SubDocumentsService } from './sub-documents.service';

describe('SubDocumentsService', () => {
  let service: SubDocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubDocumentsService],
    }).compile();

    service = module.get<SubDocumentsService>(SubDocumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
