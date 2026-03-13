import { ApiProperty } from "@nestjs/swagger";


export class CreateTblPlaceDto {
    @ApiProperty({ description: 'place id' })
    id: number;

    @ApiProperty({ description: 'place name', example: 'Turkmenistanyn mejlisi' })
    name: string;
}
