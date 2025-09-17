import { IsEnum, IsOptional } from 'class-validator';
import { ReadStatus } from '../read.status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookshelfItemDto {
  @ApiProperty({
    example: 'LIDO',
  })
  @IsOptional()
  @IsEnum(ReadStatus, { message: 'Status inválido.' })
  status: ReadStatus;
}