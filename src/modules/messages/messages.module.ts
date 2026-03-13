import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './entities/message.entity';
import { TblDocument } from '../tbl-documents/entities/tbl-document.entity';

@Module({
  imports:[SequelizeModule.forFeature([Message,TblDocument])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
