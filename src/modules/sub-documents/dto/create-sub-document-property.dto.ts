import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class CreateSubDocumentPropertyDto {

    @ApiProperty({ description: 'document_guid' })
    @IsNotEmpty()
    document_guid: string;

    @ApiPropertyOptional({ description: 'description' })
    @IsNotEmpty()
    description?: string;

    @ApiPropertyOptional({
        format: 'binary',
        type: 'string',
        description: 'file path'
    })
    subDocumentFile: string;

}
