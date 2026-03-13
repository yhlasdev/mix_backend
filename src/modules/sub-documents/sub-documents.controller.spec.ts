import { Test, TestingModule } from '@nestjs/testing';
import { SubDocumentsController } from './sub-documents.controller';
import { SubDocumentsService } from './sub-documents.service';

describe('SubDocumentsController', () => {
  let controller: SubDocumentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubDocumentsController],
      providers: [SubDocumentsService],
    }).compile();

    controller = module.get<SubDocumentsController>(SubDocumentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
