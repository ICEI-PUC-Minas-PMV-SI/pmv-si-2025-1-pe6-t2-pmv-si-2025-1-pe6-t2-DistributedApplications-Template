import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
    @Prop({ type: Types.ObjectId, auto: true })
    id: Types.ObjectId;
    
    @ApiProperty({ example: '3' })
    @Prop({ required: true, range: [1, 5] })
    rating: number;

    @ApiProperty({ example: 'This book is amazing!' })
    @Prop()
    comment: string;

    @ApiProperty({ example: '60d5f484b3c8a2b8f4e4e4e4' })
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;

    @ApiProperty({ example: '60d5f484b3c8a2b8f4e4e4e4' })
    @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
    book: Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);