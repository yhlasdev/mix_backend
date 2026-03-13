import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './entities/message.entity';
import { errorResponse, successResponse } from 'src/helpers/responseFunctions';
import { HttpStatuses } from 'src/helpers/httpStatuses.enum';
import { TblDocument } from '../tbl-documents/entities/tbl-document.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MessagesService {

  constructor(
    @InjectModel(Message) private messageModel: typeof Message,
    @InjectModel(TblDocument) private documentModel: typeof TblDocument
  ) { }

  async create(user_guid: string, createMessageDto: CreateMessageDto) {
    try {

      console.log('this-user-------', user_guid)

      const createMessage = await this.messageModel.create({ ...createMessageDto, user_guid } as any);
      return successResponse(HttpStatuses.CREATED, createMessage, 'message create successfully');

    } catch (error: any) {
      return errorResponse(HttpStatuses.INTERNAL_SERVER_ERROR, error);
    }
  }

  async findAllMessages(document_guid: string) {
    try {

      const existDocument = await this.documentModel.findOne({
        where: { guid: document_guid },
      });
      if (!existDocument) return errorResponse(HttpStatuses.NOT_FOUND, 'document not found');

      const documentForMessages = await this.messageModel.findAll({
        where: { document_guid },
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['phone', 'place_id']
          }
        ],
        order: [['createdAt', 'ASC']]
      });
      return successResponse(HttpStatuses.OK, documentForMessages, 'messages fetched successfully');

    } catch (error: any) {
      return errorResponse(HttpStatuses.INTERNAL_SERVER_ERROR, error);
    }
  }

}
