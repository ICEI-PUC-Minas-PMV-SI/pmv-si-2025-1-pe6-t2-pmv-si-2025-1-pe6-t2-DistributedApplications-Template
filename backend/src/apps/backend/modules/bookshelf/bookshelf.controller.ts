import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { BookshelfService } from './bookshelf.service';
import { BookshelfItem } from './bookshelf.schema';
import { UpdateBookshelfItemDto } from './dto/update.bookshelf.dto';

@Controller('bookshelves')
export class BookshelfController {
  constructor(private readonly bookshelfService: BookshelfService) {}

  @Post()
  async create(@Body() bookshelfItem: BookshelfItem): Promise<BookshelfItem> {
    return this.bookshelfService.create(bookshelfItem);
  }

  @Get()
  async findAll(): Promise<BookshelfItem[]> {
    return this.bookshelfService.findAll();
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string): Promise<BookshelfItem[]> {
    return this.bookshelfService.findByUserId(userId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateBookshelfItemDto): Promise<BookshelfItem> {
    return this.bookshelfService.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<BookshelfItem> {
    return this.bookshelfService.delete(id);
  }
}