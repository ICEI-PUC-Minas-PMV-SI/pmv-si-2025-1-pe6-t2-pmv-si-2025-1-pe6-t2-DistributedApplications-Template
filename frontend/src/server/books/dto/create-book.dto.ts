
import { BookCondition, ExchangeStatus } from '@/types';

export class CreateBookDto {
  title: string;
  author: string;
  coverUrl?: string;
  description?: string;
  edition?: string;
  condition?: BookCondition;
  publishYear?: number;
  isbn?: string;
  genres: string[];
  exchangeStatus?: ExchangeStatus;
}
