
import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    try {
      const result = await this.authService.login(loginDto);
      response.cookie('jwt', result.access_token, { httpOnly: true });
      return response.json({ user: result.user });
    } catch (error) {
      return response.status(401).json({ message: error.message });
    }
  }

  @Post('logout')
  async logout(@Res() response: Response) {
    response.clearCookie('jwt');
    return response.json({ message: 'Logged out successfully' });
  }
}
