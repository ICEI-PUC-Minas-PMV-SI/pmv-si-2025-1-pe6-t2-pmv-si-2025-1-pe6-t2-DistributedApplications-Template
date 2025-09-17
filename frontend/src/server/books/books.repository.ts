
import { Injectable } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BooksRepository {
  // This is a mock repository for demonstration
  // In a real app, this would use TypeORM repository methods
  private books: Book[] = [
    {
      id: '1',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      description: 'Between life and death there is a library, and within that library, the shelves go on forever.',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/81YzHKeWq7L.jpg',
      genres: ['fiction', 'fantasy'],
      ownerId: '1',
      createdAt: new Date('2023-01-15'),
      exchangeStatus: 'available',
    }
  ];

  findAll(): Promise<Book[]> {
    // Simulate async database call
    return Promise.resolve(this.books);
  }

  findOne(id: string): Promise<Book | undefined> {
    const book = this.books.find(book => book.id === id);
    return Promise.resolve(book);
  }

  findByOwnerId(ownerId: string): Promise<Book[]> {
    const userBooks = this.books.filter(book => book.ownerId === ownerId);
    return Promise.resolve(userBooks);
  }

  create(createBookDto: CreateBookDto, ownerId: string): Promise<Book> {
    const newBook: Book = {
      id: uuidv4(),
      ...createBookDto,
      ownerId,
      createdAt: new Date(),
      exchangeStatus: createBookDto.exchangeStatus || 'available',
    };

    this.books.push(newBook);
    return Promise.resolve(newBook);
  }

  update(id: string, updateBookDto: UpdateBookDto): Promise<Book | undefined> {
    const index = this.books.findIndex(book => book.id === id);
    
    if (index === -1) {
      return Promise.resolve(undefined);
    }

    const updatedBook = {
      ...this.books[index],
      ...updateBookDto,
    };

    this.books[index] = updatedBook;
    return Promise.resolve(updatedBook);
  }

  remove(id: string): Promise<boolean> {
    const index = this.books.findIndex(book => book.id === id);
    
    if (index === -1) {
      return Promise.resolve(false);
    }

    this.books.splice(index, 1);
    return Promise.resolve(true);
  }
}
