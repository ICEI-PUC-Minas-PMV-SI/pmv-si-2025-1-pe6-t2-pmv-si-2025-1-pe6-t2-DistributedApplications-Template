import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './notification.schema';

@Injectable()
export class NotificationRepository {
  constructor(@InjectModel(Notification.name) private model: Model<Notification>) {}

  async create(notification: Partial<Notification>): Promise<Notification> {
    return new this.model(notification).save();
  }

  async findAll(): Promise<Notification[]> {
    return this.model.find().populate('senderId').populate('receiverId').exec();
  }

  async findByReceiverId(userId: string): Promise<Notification[]> {
    return this.model.find({ receiverId: userId }).populate('senderId').exec();
  }

  async update(id: string): Promise<Notification> {
    const updatedNotification = await this.model.findByIdAndUpdate(id, { isRead: true }, { new: true }).exec();
    if (!updatedNotification) {
      throw new Error(`Notificação não encontraddad`);
    }
    return updatedNotification;
  }

  async delete(id: string): Promise<Notification> {
    const deletedNotification = await this.model.findByIdAndDelete(id).exec();
    if (!deletedNotification) {
      throw new Error(`Notificação ão encontrada`);
    }
    return deletedNotification;
  }
}