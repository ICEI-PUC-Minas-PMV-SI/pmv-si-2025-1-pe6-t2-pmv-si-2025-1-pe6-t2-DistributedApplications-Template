import { Injectable } from '@nestjs/common';
import { ExchangeRequestRepository } from './exchange.request.repository';
import { ExchangeRequest } from './exchange.request.schema';

@Injectable()
export class ExchangeRequestService {
  constructor(private readonly repo: ExchangeRequestRepository) {}

  create(data: ExchangeRequest): Promise<ExchangeRequest> {
    return this.repo.create(data);
  }

  findAll(): Promise<ExchangeRequest[]> {
    return this.repo.findAll();
  }

  findById(id: string): Promise<ExchangeRequest> {
    return this.repo.findById(id);
  }

  update(id: string, data: ExchangeRequest): Promise<ExchangeRequest> {
    return this.repo.update(id, data);
  }

  delete(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}