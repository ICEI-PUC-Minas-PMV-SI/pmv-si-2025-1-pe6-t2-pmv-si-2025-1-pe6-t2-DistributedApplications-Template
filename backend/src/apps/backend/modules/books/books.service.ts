import { Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { CreateBookDto } from './dto/create.book.dto';
import { UpdateBookDto } from './dto/update.book.dto';
import { ObjectId } from 'mongoose';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BooksRepository) {}

  create(createBookDto: CreateBookDto) {
    return this.bookRepository.create(createBookDto);
  }

  findAll() {
    return this.bookRepository.findAll();
  }

  findById(id: string) {
    return this.bookRepository.findById(id);
  }

  findByOwnerId(ownerId: string) {
    return this.bookRepository.findByOwnerId(ownerId);
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return this.bookRepository.update(id, updateBookDto);
  }

  delete(id: string) {
    return this.bookRepository.delete(id);
  }
}
