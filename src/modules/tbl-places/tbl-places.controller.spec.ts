import { Test, TestingModule } from '@nestjs/testing';
import { TblPlacesController } from './tbl-places.controller';
import { TblPlacesService } from './tbl-places.service';

describe('TblPlacesController', () => {
  let controller: TblPlacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TblPlacesController],
      providers: [TblPlacesService],
    }).compile();

    controller = module.get<TblPlacesController>(TblPlacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
