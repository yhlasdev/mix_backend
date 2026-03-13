import { Module } from '@nestjs/common';
import { TblPlacesService } from './tbl-places.service';
import { TblPlacesController } from './tbl-places.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TblPlace } from './entities/tbl-place.entity';

@Module({
  imports: [SequelizeModule.forFeature([TblPlace])],
  controllers: [TblPlacesController],
  providers: [TblPlacesService],
})
export class TblPlacesModule { }
