import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './book.entity';
import { Borrowing } from 'src/borrowing/borrowing.entity';
import { BorrowingService } from 'src/borrowing/borrowing.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Borrowing])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
