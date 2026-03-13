import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTblDocumentDto {
    @ApiProperty({ example: 1, description: 'ID of the place' })
    @IsNotEmpty()
    place_id: number;

    @ApiProperty({ description: 'Owner name' })
    @IsNotEmpty()
    documentOwner_name: string;

    @ApiProperty({ description: 'Owner surname' })
    @IsNotEmpty()
    documentOwner_surname: string;

    @ApiPropertyOptional({ description: 'Owner patronymic' })
    documentOwner_patronymic?: string;

    @ApiProperty({ description: 'Content of document' })
    @IsNotEmpty()
    content: string;

    @ApiProperty({ description: 'Owner address' })
    @IsNotEmpty()
    documentOwner_address: string;

    @ApiProperty({ description: 'Due date of document', example: '2026-03-20T00:00:00Z' })
    @IsNotEmpty()
    dueDate: Date;
}