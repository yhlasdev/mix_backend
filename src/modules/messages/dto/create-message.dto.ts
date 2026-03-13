import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class CreateMessageDto {

    @ApiProperty({ description: 'document guid' })
    @IsNotEmpty()
    document_guid: string;

    @ApiProperty({ description: 'content ' })
    content: string;
}
