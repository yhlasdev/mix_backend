import { Test, TestingModule } from '@nestjs/testing';
import { TblDocumentsController } from './tbl-documents.controller';
import { TblDocumentsService } from './tbl-documents.service';

describe('TblDocumentsController', () => {
  let controller: TblDocumentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TblDocumentsController],
      providers: [TblDocumentsService],
    }).compile();

    controller = module.get<TblDocumentsController>(TblDocumentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
