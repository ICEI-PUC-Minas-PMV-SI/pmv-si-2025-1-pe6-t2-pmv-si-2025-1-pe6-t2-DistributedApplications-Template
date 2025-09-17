
import { Controller, Get, Post, Put, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  findAll(): Book[] {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Book {
    return this.booksService.findOne(id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string): Book[] {
    return this.booksService.findByOwnerId(userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createBookDto: CreateBookDto, @Request() req): Book {
    const ownerId = req.user?.id || '1'; // Fallback for testing
    return this.booksService.create(createBookDto, ownerId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto): Book {
    return this.booksService.update(id, updateBookDto);
  }

  @Patch(':id/exchange-status')
  @UseGuards(JwtAuthGuard)
  updateExchangeStatus(
    @Param('id') id: string, 
    @Body('exchangeStatus') exchangeStatus: string
  ): Book {
    return this.booksService.updateExchangeStatus(id, exchangeStatus);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string): void {
    return this.booksService.remove(id);
  }
}
