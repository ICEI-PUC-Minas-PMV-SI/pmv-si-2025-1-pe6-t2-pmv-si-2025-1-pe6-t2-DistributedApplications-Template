import { Injectable } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { Notification } from './notification.schema';

@Injectable()
export class NotificationService {
  constructor(private readonly repo: NotificationRepository) {}

  create(notification: Notification): Promise<Notification> {
    return this.repo.create(notification);
  }

  findAll(): Promise<Notification[]> {
    return this.repo.findAll();
  }

  findByReceiverId(userId: string): Promise<Notification[]> {
    return this.repo.findByReceiverId(userId);
  }

  update(id: string): Promise<Notification> {
    return this.repo.update(id);
  }

  delete(id: string): Promise<Notification> {
    return this.repo.delete(id);
  }
}