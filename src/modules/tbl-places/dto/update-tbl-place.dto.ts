import { PartialType } from '@nestjs/swagger';
import { CreateTblPlaceDto } from './create-tbl-place.dto';

export class UpdateTblPlaceDto extends PartialType(CreateTblPlaceDto) {}
