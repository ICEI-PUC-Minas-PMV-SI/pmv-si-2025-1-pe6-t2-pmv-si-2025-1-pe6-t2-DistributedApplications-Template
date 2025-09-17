
import { BookCondition, ExchangeStatus } from '@/types';
import { User } from '../../users/entities/user.entity';
import { Review } from '../../reviews/entities/review.entity';
import { ExchangeRequest } from '../../exchange/entities/exchange-request.entity';
import { BookshelfItem } from '../../bookshelf/entities/bookshelf-item.entity';

// Simplified entity for student project
export class Book {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  description?: string;
  edition?: string;
  condition?: BookCondition;
  publishYear?: number;
  isbn?: string;
  genres: string[];
  ownerId: string;
  owner?: User;
  createdAt: Date;
  exchangeStatus: ExchangeStatus;
  reviews?: Review[];
  exchangeRequests?: ExchangeRequest[];
  bookshelfItems?: BookshelfItem[];
}
