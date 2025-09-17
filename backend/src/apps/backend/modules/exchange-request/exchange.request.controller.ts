import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ExchangeRequest } from './exchange.request.schema';
import { ExchangeRequestService } from './exchange.request.service';

@Controller('exchange-requests')
export class ExchangeRequestController {
  constructor(private readonly service: ExchangeRequestService) {}

  @Post()
  create(@Body() data: ExchangeRequest): Promise<ExchangeRequest> {
    return this.service.create(data);
  }

  @Get()
  findAll(): Promise<ExchangeRequest[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<ExchangeRequest> {
    return this.service.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: ExchangeRequest): Promise<ExchangeRequest> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }
}