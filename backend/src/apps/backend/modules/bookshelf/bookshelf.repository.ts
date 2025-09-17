import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookshelfItem, BookshelfItemDocument } from './bookshelf.schema';
import { UpdateBookshelfItemDto } from './dto/update.bookshelf.dto';

@Injectable()
export class BookshelfRepository {
  constructor(@InjectModel(BookshelfItem.name) private bookshelfModel: Model<BookshelfItemDocument>) {}

  async create(item: BookshelfItem): Promise<BookshelfItem> {
    return new this.bookshelfModel(item).save();
  }

  async update(id: string, updateBookshelfItemDto: UpdateBookshelfItemDto): Promise<BookshelfItem> {
    const updatedItem = await this.bookshelfModel.findByIdAndUpdate(id, updateBookshelfItemDto, { new: true }).exec();
    if (!updatedItem) {
      throw new Error(`Item da estante não encontrado.`);
    }
    return updatedItem;
  }

  async delete(id: string): Promise<BookshelfItem> {
    const deletedItem = await this.bookshelfModel.findByIdAndDelete(id).exec();
    if (!deletedItem) {
      throw new Error(`Item da estante não encontrado.`);
    }
    return deletedItem;
  }

  async findAll(): Promise<BookshelfItem[]> {
    return this.bookshelfModel.find().populate('userId').populate('bookId').exec();
  }

  async findByUserId(userId: string): Promise<BookshelfItem[]> {
    return this.bookshelfModel.find({ userId }).populate('userId').populate('bookId').exec();
  }
}