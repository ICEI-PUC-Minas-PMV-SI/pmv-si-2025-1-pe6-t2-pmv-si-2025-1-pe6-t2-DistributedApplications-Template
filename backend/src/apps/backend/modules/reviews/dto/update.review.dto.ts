import { IsInt, IsNotEmpty, Max, Min } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReviewDto {
    @ApiProperty({
        example: 5
    })
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;
    
    @ApiProperty({
        example: 'Excelente produto!'
    })
    @IsNotEmpty()
    comment: string;
}