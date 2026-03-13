import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class CreateSubDocumentDto {
    
    @ApiProperty({ description: 'document_guid' })
    @IsNotEmpty()
    document_guid: string;

    @ApiProperty({ description: 'description' })
    @IsNotEmpty()
    description: string;
}
