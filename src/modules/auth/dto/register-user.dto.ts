import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { UserType } from "src/enums/fieldEnums";

export class RegisterUserDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({ description: 'user password' })
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: 'user create for role',
        enum: UserType,
        default: UserType.USER,
        example: UserType.USER,
    })
    @IsNotEmpty()
    @IsEnum(UserType)
    role: UserType;

    @ApiProperty({ description: 'place id' })
    @IsNotEmpty()
    place_id: number;
}
