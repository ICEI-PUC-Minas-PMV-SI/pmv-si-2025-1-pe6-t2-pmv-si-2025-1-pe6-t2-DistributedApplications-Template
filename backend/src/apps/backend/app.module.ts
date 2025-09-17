import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from './config/database.config';
import { UsersModule } from './modules/users/users.module';
import { BooksModule } from './modules/books/books.module';
import { ReviewsModule } from './modules/reviews/review.module';
import { BookshelfItemModule } from './modules/bookshelf/bookshelf.module';
import { NotificationModule } from './modules/notifications/notification.module';
import { ExchangeRequestModule } from './modules/exchange-request/exchange.request.module';
import { AuthModule } from './modules/authentication/auth.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://bibliotecaadmin:tco9fQGQZJqX2SHy@biblioteca-digital.esdzaig.mongodb.net/?retryWrites=true&w=majority&appName=biblioteca-digital'), // Default connection for local testing
    /* ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
      envFilePath: '.env',
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('database.uri');
        console.log('Mongo URI from env:', uri);
        return {
          uri,
        };
      },
    }), */
    UsersModule,
    BooksModule,
    ReviewsModule,
    BookshelfItemModule,
    NotificationModule,
    ExchangeRequestModule,
    AuthModule
  ],
})
export class AppModule {}
