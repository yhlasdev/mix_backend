import { PartialType } from '@nestjs/swagger';
import { CreateTblDocumentDto } from './create-tbl-document.dto';

export class UpdateTblDocumentDto extends PartialType(CreateTblDocumentDto) {}
