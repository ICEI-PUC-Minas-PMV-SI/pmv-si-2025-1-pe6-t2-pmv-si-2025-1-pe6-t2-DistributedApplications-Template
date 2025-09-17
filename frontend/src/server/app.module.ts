
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';

// Simplified app module for student project
@Module({
  imports: [
    AuthModule,
    UsersModule,
    BooksModule,
  ],
})
export class AppModule {}
