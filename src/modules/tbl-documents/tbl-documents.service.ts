import { Injectable } from '@nestjs/common';
import { CreateTblDocumentDto } from './dto/create-tbl-document.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TblDocument } from './entities/tbl-document.entity';
import { errorResponse, successResponse } from 'src/helpers/responseFunctions';
import { HttpStatuses } from 'src/helpers/httpStatuses.enum';
import { User } from '../user/entities/user.entity';
import { TblPlace } from '../tbl-places/entities/tbl-place.entity';

@Injectable()
export class TblDocumentsService {
  constructor(
    @InjectModel(TblDocument) private documentModel: typeof TblDocument,
    @InjectModel(User) private userModel: typeof User,
  ) { }

  async create(createTblDocumentDto: CreateTblDocumentDto) {
    try {

      const newDocument = await this.documentModel.create(createTblDocumentDto as any);
      return successResponse(HttpStatuses.CREATED, newDocument, 'document created successfully');

    } catch (error: any) {
      return errorResponse(HttpStatuses.INTERNAL_SERVER_ERROR, error);
    }
  }

  async findAll(user_guid: string) {
    try {
      const existUser = await this.userModel.findOne({ where: { guid: user_guid }, attributes: ['place_id'] });
      /* if (!existUser || existUser.place_id !== 1) return errorResponse(HttpStatuses.FORBIDDEN, 'user not found or user is not admin');
 */
      const allDocuments = await this.documentModel.findAll({
        include: [
          {
            model: TblPlace,
            as: 'place',
            attributes: ['name']
          }
        ]
      });

      return successResponse(HttpStatuses.OK, allDocuments, 'documents fetched successfully');

    } catch (error: any) {
      return errorResponse(HttpStatuses.INTERNAL_SERVER_ERROR, error);
    }
  }

  async getDocumentByGuid(document_guid: string) {
    try {

      const documentByGuid = await this.documentModel.findOne({
        where: { guid: document_guid },
        include: [
          {
            model: TblPlace,
            as: 'place',
            attributes: ['name']
          }
        ]
      });

      return successResponse(HttpStatuses.OK, documentByGuid, 'document fetched successfully');

    } catch (error: any) {
      return errorResponse(HttpStatuses.INTERNAL_SERVER_ERROR, 'document get failed');
    }
  }

  async findAllDocumentsByPlaceId(user_guid: string) {
    try {

      const existUser = await this.userModel.findOne({ where: { guid: user_guid }, attributes: ['place_id'] });

      /*       if (!existUser || existUser.place_id !== id) return errorResponse(HttpStatuses.FORBIDDEN, 'user not found or user invalid')
       */
      const allDocumentsForPlaceId = await this.documentModel.findAll({
        where: { place_id: existUser?.place_id },
        include: [
          {
            model: TblPlace,
            as: 'place'
          }
        ]
      });
      return successResponse(HttpStatuses.OK, allDocumentsForPlaceId, 'documents fetched successfully');

    } catch (error: any) {
      return errorResponse(HttpStatuses.INTERNAL_SERVER_ERROR, error);
    }
  }
}
