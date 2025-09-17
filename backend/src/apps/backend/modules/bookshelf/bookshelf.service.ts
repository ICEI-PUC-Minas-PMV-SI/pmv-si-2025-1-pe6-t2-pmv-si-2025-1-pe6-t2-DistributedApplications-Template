import { Injectable } from '@nestjs/common';
import { BookshelfRepository } from './bookshelf.repository';
import { BookshelfItem } from './bookshelf.schema';
import { UpdateBookshelfItemDto } from './dto/update.bookshelf.dto';

@Injectable()
export class BookshelfService {
  constructor(private readonly bookshelfRepository: BookshelfRepository) {}

  async create(bookshelfItem: BookshelfItem): Promise<BookshelfItem> {
    return this.bookshelfRepository.create(bookshelfItem);
  }

  async findAll(): Promise<BookshelfItem[]> {
    return this.bookshelfRepository.findAll();
  }

  async findByUserId(userId: string): Promise<BookshelfItem[]> {
    return this.bookshelfRepository.findByUserId(userId);
  }

  async update(id: string, updateDto: UpdateBookshelfItemDto): Promise<BookshelfItem> {
    return this.bookshelfRepository.update(id, updateDto);
  }

  async delete(id: string): Promise<BookshelfItem> {
    return this.bookshelfRepository.delete(id);
  }
}