import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private booksRepo: Repository<Book>) {}

  findAll(): Promise<Book[]> {
    return this.booksRepo.find();
  }

  findById(id: number) {
    return this.booksRepo.findOneBy({ boo_id: id });
  }

  create(body: any) {
    const newBook = this.booksRepo.create(body);
    return this.booksRepo.save(newBook);
  }

  async update(id: number, body: any) {
    const task = await this.booksRepo.findOneBy({ boo_id: id });
    this.booksRepo.merge(task, body);
    return this.booksRepo.save(task);
  }

  async remove(id: number) {
    await this.booksRepo.delete(id);
    return true;
  }
}
