import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { TblDocumentsService } from './tbl-documents.service';
import { CreateTblDocumentDto } from './dto/create-tbl-document.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Documents')
@Controller('tbl-documents')
export class TblDocumentsController {
  constructor(private readonly tblDocumentsService: TblDocumentsService) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearerAuth')
  @Post('/createDocument')
  create(@Body() createTblDocumentDto: CreateTblDocumentDto) {
    return this.tblDocumentsService.create(createTblDocumentDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearerAuth')
  @Get('/get-all-documents')
  findAll(@Req() req: any) {
    return this.tblDocumentsService.findAll(req.user.guid);
  }


  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearerAuth')
  @Get('/documents/:document_guid')
  getDocumentByGuid(@Param('document_guid') document_guid: string) {
    return this.tblDocumentsService.getDocumentByGuid(document_guid)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearerAuth')
  @Get('/documentsByPlace')
  findOne(@Req() req: any) {
    return this.tblDocumentsService.findAllDocumentsByPlaceId(req.user.guid);
  }

}
