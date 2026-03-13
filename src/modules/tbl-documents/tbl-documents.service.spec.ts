import { Test, TestingModule } from '@nestjs/testing';
import { TblDocumentsService } from './tbl-documents.service';

describe('TblDocumentsService', () => {
  let service: TblDocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TblDocumentsService],
    }).compile();

    service = module.get<TblDocumentsService>(TblDocumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
