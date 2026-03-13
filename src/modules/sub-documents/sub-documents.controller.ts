import { Controller, Get, Post, Body, Param, UseGuards, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { SubDocumentsService } from './sub-documents.service';
import { CreateSubDocumentDto } from './dto/create-sub-document.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs/promises';
import { extname, join } from 'path';
import { CreateSubDocumentPropertyDto } from './dto/create-sub-document-property.dto';


@ApiTags('SubDocuments')
@Controller('sub-documents')
export class SubDocumentsController {
  constructor(private readonly subDocumentsService: SubDocumentsService) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearerAuth')
  @ApiBody({ type: CreateSubDocumentPropertyDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('subDocumentFile'))
  @Post('/createSubDocument')
  async create(@UploadedFile() file: Express.Multer.File, @Body() createSubDocumentDto: CreateSubDocumentDto) {

    if (!file) {
      throw new BadRequestException('image upload failure');
    }

    fs.mkdir(join(process.cwd(), 'uploads'), { recursive: true });

    const imageTypes = ['jpg', 'webp', 'jpeg', 'gif', 'png'];

    const baseName = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const fileType = extname(file.originalname).slice(1);
    const fileName = `${baseName}.${imageTypes.includes(fileType) ? 'webp' : fileType}`;
    const filePath = join(process.cwd(), 'uploads', fileName);
    const webPath = `/uploads/${fileName}`;

    await fs.writeFile(filePath, file.buffer);

    return this.subDocumentsService.create(fileType, webPath, createSubDocumentDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearerAuth')
  @Get('/subdocuments/:document_guid')
  findByDocumentGuid(@Param('document_guid') document_guid: string) {
    return this.subDocumentsService.findByDocumentGuid(document_guid);
  }

}
