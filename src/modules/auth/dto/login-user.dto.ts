import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginUserDto {
    @ApiProperty()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({ description: ' user password' })
    @IsNotEmpty()
    password: string;
}
