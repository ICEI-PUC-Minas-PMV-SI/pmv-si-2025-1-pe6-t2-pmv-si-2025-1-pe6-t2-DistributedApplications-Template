
import { Controller, Get, Patch, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

// Simplified controller for student project
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  async getProfile(req) {
    // In a real app, this would use JWT to get the user ID
    // For simplicity, we'll just mock it
    const userId = req.user?.id || '1';
    return this.usersService.findById(userId);
  }

  @Patch('profile')
  async updateProfile(req, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user?.id || '1';
    return this.usersService.update(userId, updateUserDto);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
