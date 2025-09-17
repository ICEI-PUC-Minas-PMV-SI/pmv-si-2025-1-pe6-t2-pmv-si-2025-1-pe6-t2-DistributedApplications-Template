
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ReadStatus } from '@/types';
import { User } from '../../users/entities/user.entity';
import { Book } from '../../books/entities/book.entity';

@Entity()
export class BookshelfItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.bookshelfItems)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  bookId: string;

  @ManyToOne(() => Book, (book) => book.bookshelfItems)
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @Column({
    type: 'enum',
    enum: ['read', 'reading', 'want-to-read'],
  })
  status: ReadStatus;

  @CreateDateColumn()
  addedAt: Date;

  @Column({ nullable: true })
  completedAt: Date;

  @Column({ nullable: true })
  notes: string;
}
