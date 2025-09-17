import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module'; // seu módulo de usuários

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'PuCM1n4sl1br4ry-mais-longa-possivel', // chave secreta para assinar o token JWT
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
