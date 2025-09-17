import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExchangeRequest } from './exchange.request.schema';

@Injectable()
export class ExchangeRequestRepository {
  constructor(@InjectModel(ExchangeRequest.name) private model: Model<ExchangeRequest>) {}

  async create(data: ExchangeRequest): Promise<ExchangeRequest> {
    return this.model.create(data);
  }

  async findAll(): Promise<ExchangeRequest[]> {
    return this.model.find().populate('requesterId ownerId bookId').exec();
  }

  async findById(id: string): Promise<ExchangeRequest> {
    const result = await this.model.findById(id).populate('requesterId ownerId bookId').exec();
    if (!result) {
      throw new Error(`Solicitação de troca não encontrada`);
    }
    return result;
  }

  async update(id: string, data: ExchangeRequest): Promise<ExchangeRequest> {
    const updated = await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updated) {
      throw new Error(`Solicitação de troca não encontrada`);
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}