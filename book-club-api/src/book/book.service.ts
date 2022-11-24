import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  constructor(@InjectRepository(Book) private bookService: Repository<Book>) {}

  findAll(): Promise<Book[]> {
    return this.bookService.find({ relations: ['aut_id', 'edi_id', 'gen_id'] });
  }
  //   find({
  //   relations: ['sizes', 'reviews']
  // });

  findAllFilter(): Promise<Book[]> {
    return this.bookService.find({
      where: {
        boo_borrowingSt: false,
      },
      relations: ['aut_id', 'edi_id', 'gen_id'],
    });
  }

  findAllFilterId(id: number): Promise<Book[]> {
    return this.bookService.find({
      where: {
        assId: id,
      },
      relations: ['aut_id', 'edi_id', 'gen_id'],
    });
  }

  findById(id: number) {
    return this.bookService.find({
      where: {
        boo_id: id
      },
      relations: ['aut_id', 'edi_id', 'gen_id'],
    });
  }

  create(body: any) {
    const newBook = this.bookService.create(body);
    return this.bookService.save(newBook);
  }

  async update(id: number, body: any) {
    const book = await this.bookService.findOneBy({ boo_id: id });
    this.bookService.merge(book, body);
    return this.bookService.save(book);
  }

  async remove(id: number) {
    await this.bookService.delete(id);
    return true;
  }
}