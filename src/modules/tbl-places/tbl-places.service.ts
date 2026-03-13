import { Injectable } from '@nestjs/common';
import { CreateTblPlaceDto } from './dto/create-tbl-place.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TblPlace } from './entities/tbl-place.entity';
import { errorResponse, successResponse } from 'src/helpers/responseFunctions';
import { HttpStatuses } from 'src/helpers/httpStatuses.enum';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TblPlacesService {

  constructor(
    @InjectModel(TblPlace) private tblPlaceModel: typeof TblPlace
  ) { }

  async create(createTblPlaceDto: CreateTblPlaceDto) {
    try {
      const newPlace = await this.tblPlaceModel.create(createTblPlaceDto as any);
      return successResponse(HttpStatuses.CREATED, newPlace, ' place creation successfully');
    } catch (error: any) {
      return errorResponse(HttpStatuses.INTERNAL_SERVER_ERROR, 'place creation failure')
    }
  }

  async findAll() {
    try {
      const places = await this.tblPlaceModel.findAll();
      return successResponse(HttpStatuses.OK, places, 'places retrieved successfully');
    } catch (error: any) {
      return errorResponse(HttpStatuses.INTERNAL_SERVER_ERROR, 'place creation failure')
    }
  }

  async remove(id: number) {
    try {

      const existPalce = await this.tblPlaceModel.findOne({ where: { id } });
      if (!existPalce) return errorResponse(HttpStatuses.NOT_FOUND, 'place not found');

      await existPalce.destroy();

      return successResponse(HttpStatuses.OK, null, 'place deleted successfully');

    } catch (error: any) {
      return errorResponse(HttpStatuses.INTERNAL_SERVER_ERROR, 'place deletion failure');
    }
  }
}
