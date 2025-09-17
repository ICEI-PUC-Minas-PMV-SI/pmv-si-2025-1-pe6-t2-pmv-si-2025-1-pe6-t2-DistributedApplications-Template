
import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  // Mock database for demonstration purposes
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
    },
    {
      id: '2',
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      description: 'A lone astronaut must save the earth from disaster.',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/91uwocAMtSL.jpg',
      genres: ['sci-fi', 'adventure'],
      ownerId: '1',
      createdAt: new Date('2023-02-10'),
      exchangeStatus: 'available',
    }
  ];

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: string): Book {
    const book = this.books.find(book => book.id === id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  findByOwnerId(ownerId: string): Book[] {
    return this.books.filter(book => book.ownerId === ownerId);
  }

  create(createBookDto: CreateBookDto, ownerId: string): Book {
    const newBook: Book = {
      id: uuidv4(),
      ...createBookDto,
      ownerId,
      createdAt: new Date(),
      exchangeStatus: createBookDto.exchangeStatus || 'available',
    };

    this.books.push(newBook);
    return newBook;
  }

  update(id: string, updateBookDto: UpdateBookDto): Book {
    const index = this.books.findIndex(book => book.id === id);
    
    if (index === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    const updatedBook = {
      ...this.books[index],
      ...updateBookDto,
    };

    this.books[index] = updatedBook;
    return updatedBook;
  }

  updateExchangeStatus(id: string, exchangeStatus: string): Book {
    const index = this.books.findIndex(book => book.id === id);
    
    if (index === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    this.books[index] = {
      ...this.books[index],
      exchangeStatus,
    };

    return this.books[index];
  }

  remove(id: string): void {
    const index = this.books.findIndex(book => book.id === id);
    
    if (index === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    this.books.splice(index, 1);
  }
}
