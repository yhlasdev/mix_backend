import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TblPlacesService } from './tbl-places.service';
import { CreateTblPlaceDto } from './dto/create-tbl-place.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminRoleGuard } from 'src/guards/admin.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('tbl-places')
export class TblPlacesController {
  constructor(private readonly tblPlacesService: TblPlacesService) { }

  @Post('/addPlace')
  create(@Body() createTblPlaceDto: CreateTblPlaceDto) {
    return this.tblPlacesService.create(createTblPlaceDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearerAuth')
  @Get('/getPlaces')
  findAll() {
    return this.tblPlacesService.findAll();
  }


  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearerAuth')
  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.tblPlacesService.remove(+id);
  }
}
