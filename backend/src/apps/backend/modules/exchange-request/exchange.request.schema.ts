import { Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { RequestStatus } from "./request.status.enum";
import { ApiProperty } from '@nestjs/swagger';

export type ExchangeRequestSchema = ExchangeRequest & Document;

@Schema({ timestamps: true })
export class ExchangeRequest {
  @ApiProperty({ example: '60d5f484b3c8a2b8f4e4e4e4' })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  requesterId: Types.ObjectId;

  @ApiProperty({ example: '60d5f484b3c8a2b8f4e4e4e4' })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  ownerId: Types.ObjectId;

  @ApiProperty({ example: '60d5f484b3c8a2b8f4e4e4e4' })
  @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
  bookId: Types.ObjectId;

  @ApiProperty({ example: 'Pendente' })
  @Prop({ required: true, enum: RequestStatus })
  status: RequestStatus;

  @ApiProperty({ example: 'I would like to exchange this book with you' })
  @Prop()
  message?: string;
}

export const ExchangeRequestSchema = SchemaFactory.createForClass(ExchangeRequest);