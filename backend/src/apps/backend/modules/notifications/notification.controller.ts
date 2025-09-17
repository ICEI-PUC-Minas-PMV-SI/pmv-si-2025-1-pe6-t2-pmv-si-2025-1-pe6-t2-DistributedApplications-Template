import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './notification.schema';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @Post()
  create(@Body() body: Notification): Promise<Notification> {
    return this.service.create(body);
  }

  @Get('receiver/:userId')
  findByReceiverId(@Param('userId') userId: string): Promise<Notification[]> {
    return this.service.findByReceiverId(userId);
  }

  @Put(':id')
  update(@Param('id') id: string): Promise<Notification> {
    return this.service.update(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Notification> {
    return this.service.delete(id);
  }
}