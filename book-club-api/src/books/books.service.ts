import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private booksService: Repository<Book>) {}

  findAll(): Promise<Book[]> {
    return this.booksService.find();
  }

  findById(id: number) {
    return this.booksService.findOneBy({ boo_id: id });
  }

  create(body: any) {
    const newBook = this.booksService.create(body);
    return this.booksService.save(newBook);
  }

  async update(id: number, body: any) {
    const book = await this.booksService.findOneBy({ boo_id: id });
    this.booksService.merge(book, body);
    return this.booksService.save(book);
  }

  async remove(id: number) {
    await this.booksService.delete(id);
    return true;
  }
}
