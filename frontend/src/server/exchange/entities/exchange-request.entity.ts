
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { RequestStatus } from '@/types';
import { User } from '../../users/entities/user.entity';
import { Book } from '../../books/entities/book.entity';

@Entity()
export class ExchangeRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  requesterId: string;

  @ManyToOne(() => User, (user) => user.sentRequests)
  @JoinColumn({ name: 'requesterId' })
  requester: User;

  @Column()
  ownerId: string;

  @ManyToOne(() => User, (user) => user.receivedRequests)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column()
  bookId: string;

  @ManyToOne(() => Book, (book) => book.exchangeRequests)
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @Column({
    type: 'enum',
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
    default: 'pending',
  })
  status: RequestStatus;

  @Column({ nullable: true })
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
