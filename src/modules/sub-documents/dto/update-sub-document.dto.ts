import { PartialType } from '@nestjs/swagger';
import { CreateSubDocumentDto } from './create-sub-document.dto';

export class UpdateSubDocumentDto extends PartialType(CreateSubDocumentDto) {}
