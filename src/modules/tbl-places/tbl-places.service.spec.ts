import { Test, TestingModule } from '@nestjs/testing';
import { TblPlacesService } from './tbl-places.service';

describe('TblPlacesService', () => {
  let service: TblPlacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TblPlacesService],
    }).compile();

    service = module.get<TblPlacesService>(TblPlacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
