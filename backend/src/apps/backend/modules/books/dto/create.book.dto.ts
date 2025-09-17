import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class CreateBookDto {
    @ApiProperty({
      example: 'The Great Gatsby',
    })
    title: string;
    @ApiProperty({
      example: 'F. Scott Fitzgerald',
    })
    author: string;
    @ApiProperty({
      example: 'https://example.com/cover.jpg',
    })
    coverUrl?: string;
    @ApiProperty({
      example: "A story about the American dream...",
    })
    description?: string;
    @ApiProperty({
      example: '1st Edition',
    })
    edition: string;
    @ApiProperty({
      example: 1925,
    })
    publishYear: number;

    @ApiProperty({
      example: 'Novo',
    })
    condition: string;
    @ApiProperty({
      example: '60d5f484b3c8a2b8f4e4e4e4',
    })
    @IsMongoId()
    owner?: string;
}