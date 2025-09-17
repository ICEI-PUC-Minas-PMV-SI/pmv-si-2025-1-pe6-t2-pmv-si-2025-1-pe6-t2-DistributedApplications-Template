import { ObjectId, Types } from "mongoose";
import { ReadStatus } from "./read.status.enum";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from '@nestjs/swagger';

export type BookshelfItemDocument = BookshelfItem & Document;

@Schema({ timestamps: true })
export class BookshelfItem {
    @Prop({type: Types.ObjectId, auto: true })
    id: ObjectId;

    @ApiProperty({ example: '60d5f484b3c8a2b8f4e4e4e4' })
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: string;

    @ApiProperty({ example: '60d5f484b3c8a2b8f4e4e4e4' })
    @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
    bookId: string;

    @ApiProperty({ example: 'LIDO' })
    @Prop({ required: true, enum: ReadStatus })
    status: ReadStatus;
}

export const BookshelfItemSchema = SchemaFactory.createForClass(BookshelfItem);