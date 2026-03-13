import { Module } from '@nestjs/common';
import { TblDocumentsService } from './tbl-documents.service';
import { TblDocumentsController } from './tbl-documents.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TblDocument } from './entities/tbl-document.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([TblDocument, User])],
  controllers: [TblDocumentsController],
  providers: [TblDocumentsService],
})
export class TblDocumentsModule { }
