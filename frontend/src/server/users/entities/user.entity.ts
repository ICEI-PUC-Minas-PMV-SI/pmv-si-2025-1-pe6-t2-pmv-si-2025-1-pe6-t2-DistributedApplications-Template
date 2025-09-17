
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { LiteraryPreference } from '@/types';
import { Book } from '../../books/entities/book.entity';
import { BookshelfItem } from '../../bookshelf/entities/bookshelf-item.entity';
import { Review } from '../../reviews/entities/review.entity';
import { ExchangeRequest } from '../../exchange/entities/exchange-request.entity';
import { Notification } from '../../notifications/entities/notification.entity';
import { Message } from '../../messages/entities/message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  photoUrl: string;

  @Column('simple-array')
  preferences: LiteraryPreference[];

  @CreateDateColumn()
  joinDate: Date;

  @OneToMany(() => Book, (book) => book.owner)
  books: Book[];

  @OneToMany(() => BookshelfItem, (bookshelfItem) => bookshelfItem.user)
  bookshelfItems: BookshelfItem[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => ExchangeRequest, (request) => request.requester)
  sentRequests: ExchangeRequest[];

  @OneToMany(() => ExchangeRequest, (request) => request.owner)
  receivedRequests: ExchangeRequest[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message[];

  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages: Message[];
}
