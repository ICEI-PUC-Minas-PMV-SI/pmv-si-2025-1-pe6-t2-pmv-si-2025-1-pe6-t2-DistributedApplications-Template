import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Document, ObjectId, Types } from 'mongoose';
import { BookCondition } from './book.condition.enum';
import { ApiProperty } from '@nestjs/swagger';

export type BookDocument = Book & Document;

@Schema({ timestamps: true })
export class Book {
  @Prop({type: Types.ObjectId, auto: true })
  id: ObjectId;

  @ApiProperty({ example: 'Alice in wonderland' })
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Lewis Carroll' })
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty({ example: 'https://example.com/cover.jpg' })
  coverUrl?: string;

  @ApiProperty({ example: "It's a book about..." })
  description?: string;

  @ApiProperty({ example: '1st Edition' })
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  edition: string;

  @ApiProperty({ example: '1997' })
  @Prop({ required: true })
  @IsNumber()
  publishYear: number;

  @ApiProperty({ example: 'NOVO' })
  @Prop({ required: true, enum: BookCondition })
  condition: BookCondition;

  @ApiProperty({ example: '60d5f484b3c8a2b8f4e4e4e4' })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: Types.ObjectId;

  @ApiProperty({ example: '60d5f484b3c8a2b8f4e4e4e4' })
  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  interestedUsers: Types.ObjectId[];

  @ApiProperty({ example: '60d5f484b3c8a2b8f4e4e4e4' })
  @Prop([{ type: Types.ObjectId, ref: 'Review' }])
  reviews: Types.ObjectId[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
