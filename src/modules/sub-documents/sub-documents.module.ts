import { Module } from '@nestjs/common';
import { SubDocumentsService } from './sub-documents.service';
import { SubDocumentsController } from './sub-documents.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubDocument } from './entities/sub-document.entity';
import { TblDocument } from '../tbl-documents/entities/tbl-document.entity';

@Module({
  imports: [SequelizeModule.forFeature([SubDocument, TblDocument])],
  controllers: [SubDocumentsController],
  providers: [SubDocumentsService],
})
export class SubDocumentsModule { }
