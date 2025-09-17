import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({
    example: 'senhaAntiga123',
    description: 'Senha atual do usuário',
  })
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    example: 'novaSenhaSegura456',
    description: 'Nova senha do usuário (mínimo 8 caracteres)',
  })
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}