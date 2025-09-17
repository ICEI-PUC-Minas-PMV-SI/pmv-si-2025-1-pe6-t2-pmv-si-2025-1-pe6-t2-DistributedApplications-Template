import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto {
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
}