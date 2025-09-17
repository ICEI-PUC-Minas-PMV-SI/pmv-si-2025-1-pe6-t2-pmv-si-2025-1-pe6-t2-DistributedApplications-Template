import { ObjectId, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { NotificationType } from "./notification.type.enum";
import { ApiProperty } from '@nestjs/swagger';

export type NotificationSchema = Notification & Document;

@Schema({ timestamps: true })
export class Notification {

  @ApiProperty({ example: '60d5f484b3c8a2b8f4e4e4e4' })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  senderId: ObjectId;

  @ApiProperty({ example: '60d5f484b3c8a2b8f4e4e4e4' })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  receiverId: ObjectId;

  @ApiProperty({ example: 'Solicitação de troca' })
  @Prop({ required: true, enum: NotificationType })
  type: NotificationType;

  @ApiProperty({ example: 'Você recebeu uma nova solicitação de troca.' })
  @Prop({ required: true })
  message: string;

  @ApiProperty({ example: '60d5f484b3c8a2b8f4e4e4e4' })
  @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
  bookId: ObjectId;

  @ApiProperty({ example: false })
  @Prop({ default: false })
  isRead: boolean;

  @Prop()
  createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);