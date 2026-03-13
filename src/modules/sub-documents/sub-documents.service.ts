import { Injectable } from '@nestjs/common';
import { CreateSubDocumentDto } from './dto/create-sub-document.dto';
import { InjectModel } from '@nestjs/sequelize';
import { SubDocument } from './entities/sub-document.entity';
import { errorResponse, successResponse } from 'src/helpers/responseFunctions';
import { HttpStatuses } from 'src/helpers/httpStatuses.enum';
import { TblDocument } from '../tbl-documents/entities/tbl-document.entity';

@Injectable()
export class SubDocumentsService {

  constructor(
    @InjectModel(SubDocument) private subDocumentModel: typeof SubDocument,
    @InjectModel(TblDocument) private documentModel: typeof TblDocument,
  ) { }

  async create(fileType: string, webpath: string, createSubDocumentDto: CreateSubDocumentDto) {
    try {

      const { document_guid, description } = createSubDocumentDto;

      const createDocument = {
        document_guid,
        description,
        file_path: webpath,
        file_type: fileType
      }

      const newSubDocument = await this.subDocumentModel.create(createDocument as any);
      return successResponse(HttpStatuses.CREATED, newSubDocument, 'subdocument created successfully');

    } catch (error: any) {
      return errorResponse(HttpStatuses.INTERNAL_SERVER_ERROR, error);
    }
  }

  async findByDocumentGuid(document_guid: string) {
    try {

      const existDocument = await this.documentModel.findOne({ where: { guid: document_guid } });
      if (!existDocument) return errorResponse(HttpStatuses.NOT_FOUND, 'document not found');

      const subdocumentsByDocumentGuid = await this.subDocumentModel.findAll({ where: { document_guid } });
      return successResponse(HttpStatuses.OK, subdocumentsByDocumentGuid, 'subdocuments fetched successfully');

    } catch (error: any) {
      return errorResponse(HttpStatuses.INTERNAL_SERVER_ERROR, error);
    }
  }

}
