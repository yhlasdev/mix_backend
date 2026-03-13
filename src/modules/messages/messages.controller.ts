import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("Messages")
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }


  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearerAuth')
  @Post('/createMessage')
  create(
    @Req() req: any,
    @Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(req.user.guid, createMessageDto);
  }


  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearerAuth')
  @Get('/getMessages/:document_guid')
  findAllMessages(@Param('document_guid') document_guid: string) {
    return this.messagesService.findAllMessages(document_guid);
  }

}
