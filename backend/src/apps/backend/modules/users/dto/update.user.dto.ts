import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'João Melo',
  })
  @IsOptional()
  @IsString()
  name?: string;
}
