import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookshelfItem, BookshelfItemSchema } from './bookshelf.schema';
import { BookshelfService } from './bookshelf.service';
import { BookshelfRepository } from './bookshelf.repository';
import { BookshelfController } from './bookshelf.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: BookshelfItem.name, schema: BookshelfItemSchema }])],
  controllers: [BookshelfController],
  providers: [BookshelfService, BookshelfRepository],
  exports: [BookshelfService],
})
export class BookshelfItemModule {}