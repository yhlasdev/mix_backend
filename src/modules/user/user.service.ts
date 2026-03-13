import { Injectable } from '@nestjs/common';
import { errorResponse, successResponse } from 'src/helpers/responseFunctions';
import { HttpStatuses } from 'src/helpers/httpStatuses.enum';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { TblPlace } from '../tbl-places/entities/tbl-place.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User) private userModel: typeof User
  ) { }


  async findAllUsers() {
    try {

      const allUsers = await this.userModel.findAll({
        attributes: ['phone'],
        include: [
          {
            model: TblPlace,
            as: 'place',
            attributes: ['name']
          }
        ]
      });

      return successResponse(HttpStatuses.OK, allUsers, 'users fetched successfully');

    } catch (error: any) {
      return errorResponse(HttpStatuses.INTERNAL_SERVER_ERROR, error);
    }
  }

  async remove(user_guid: string) {
    try {

      const existUser = await this.userModel.findOne({ where: { guid: user_guid } });
      if (!existUser) return errorResponse(HttpStatuses.NOT_FOUND, 'user not found');
      await existUser.destroy();
      return successResponse(HttpStatuses.OK, '', 'user delete successfully');

    } catch (error: any) {
      return errorResponse(HttpStatuses.INTERNAL_SERVER_ERROR, error);
    }
  }

}
