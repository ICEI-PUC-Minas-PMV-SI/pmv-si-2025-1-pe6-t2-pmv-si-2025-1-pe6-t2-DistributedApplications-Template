import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class AuthDto {
    @ApiProperty({
        example: 'user',
    })
    @IsEmail()
    email: string;
    @ApiProperty({
        example: 'password',
    })
    password: string;
}