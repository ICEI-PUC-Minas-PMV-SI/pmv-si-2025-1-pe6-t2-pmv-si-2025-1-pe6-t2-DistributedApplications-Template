import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookService } from './books.service';
import { BookController } from './book.controller';
import { Book, BookSchema } from './book.schema';
import { BooksRepository } from './books.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])],
  controllers: [BookController],
  providers: [BookService, BooksRepository],
  exports: [BookService],
})
export class BooksModule {}