import { Module } from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { BorrowingController } from './borrowing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrowing } from './borrowing.entity';
import { Book } from 'src/book/book.entity';
import { BookService } from 'src/book/book.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Borrowing, Book]),
    // TypeOrmModule.forFeature([Book]),
  ],
  controllers: [BorrowingController],
  providers: [BorrowingService, BookService],
})
export class BorrowingModule {}
