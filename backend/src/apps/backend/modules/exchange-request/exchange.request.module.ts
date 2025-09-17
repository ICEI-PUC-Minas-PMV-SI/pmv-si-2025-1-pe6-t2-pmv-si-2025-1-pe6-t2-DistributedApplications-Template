import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExchangeRequest, ExchangeRequestSchema } from './exchange.request.schema';
import { ExchangeRequestController } from './exchange.request.controller';
import { ExchangeRequestService } from './exchange.request.service';
import { ExchangeRequestRepository } from './exchange.request.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: ExchangeRequest.name, schema: ExchangeRequestSchema }])],
  controllers: [ExchangeRequestController],
  providers: [ExchangeRequestService, ExchangeRequestRepository],
  exports: [ExchangeRequestService],
})
export class ExchangeRequestModule {}