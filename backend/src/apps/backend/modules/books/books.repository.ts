import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book.schema';
import { CreateBookDto } from './dto/create.book.dto';
import { UpdateBookDto } from './dto/update.book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { BookDocument } from './book.schema';

@Injectable()
export class BooksRepository {
  constructor(@InjectModel(Book.name) private readonly bookModel: Model<BookDocument>) {}

  findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findById(id: string): Promise<Book | undefined> {
    const book = await this.bookModel.findById(id);
    if (!book) throw new NotFoundException('Livro não encontrado.');
    return book;
  }

  findByOwnerId(ownerId: string): Promise<Book[]> {
    return this.bookModel.find({ owner: ownerId }).exec();
  }

  create(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = new this.bookModel(createBookDto);
    return newBook.save();
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book | undefined> {
    const updatedBook  = await this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true }).exec();
    if (!updatedBook) throw new NotFoundException('Livro não encontrado.');
    return updatedBook;
  }

  async delete(id: string): Promise<Book | undefined> {
    const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
    if (!deletedBook) throw new NotFoundException('Livro não encontrado.');
    return deletedBook;
  }
}