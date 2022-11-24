/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  constructor(@InjectRepository(Book) private bookService: Repository<Book>) {}

  findAll(): Promise<Book[]> {
    return this.bookService.find({ 
      relations: ['aut_id', 'edi_id', 'gen_id'],
      order:{boo_title: 'ASC'}
     });
  }

  findAllFilter(): Promise<Book[]> {
    return this.bookService.find({
      where: {
        boo_borrowingSt: false,
      },
      relations: ['aut_id', 'edi_id', 'gen_id'],
      order:{boo_title: 'ASC'}
    });
  }

  findAllNoAssociated(): Promise<Book[]> {
    return this.bookService.find({
      where: {
        boo_borrowingSt: false,
      },
      relations: ['aut_id', 'edi_id', 'gen_id'],
      order:{boo_title: 'ASC'},
      take: 10
    });
  }

  findAllFilterByISBN(isbn: number): Promise<Book[]>{
    return this.bookService.find({
      where: {
        boo_ISBN: (isbn),
        boo_borrowingSt: false,
      },
      relations: ['aut_id', 'edi_id', 'gen_id'],
    })
  }

  async findAllFilterByAuthor(author: string): Promise<Book[]>{
    return await this.bookService.find({
      where: [{
        boo_borrowingSt: false,
        aut_id : {
          aut_name: Like(`%${author}%`)
        },
      },
      {
        aut_id : {
          aut_surname: Like(`%${author}%`)
        },
      }],
      relations: ['aut_id', 'edi_id', 'gen_id'],
      order:{boo_title: 'ASC'}
    })
  }

  async findAllFilterByGender(gender: string): Promise<Book[]>{
    return await this.bookService.find({
      where: {
        boo_borrowingSt: false,
        gen_id: {
          gen_name: Like(`%${gender}%`),
        },
      },
      relations: ['aut_id', 'edi_id', 'gen_id'],
      order:{boo_title: 'ASC'}
    })
  }

  findAllFilterByTitle(title: string): Promise<Book[]>{
    //const books = this.bookService.createQueryBuilder("book").where("book.boo_title= :title", {title: title}).getMany();
    return this.bookService.find({
      where: {
        boo_borrowingSt: false,
        boo_title: Like(`%${title}%`),
      },
      relations: ['aut_id', 'edi_id', 'gen_id'],
      order:{boo_title: 'ASC'}
    })
  }

  findAllFilterId(id: number): Promise<Book[]> {
    return this.bookService.find({
      where: {
        boo_borrowingSt: false,
        assId: id,
      },
      relations: ['aut_id', 'edi_id', 'gen_id'],
      order:{boo_title: 'ASC'}
    });
  }

  findAllFilterIdBorrowings(id: number): Promise<Book[]> {
    return this.bookService.find({
      where: {
        assId: id,
        boo_borrowingSt: true,

      },
      relations: ['aut_id', 'edi_id', 'gen_id'],
      order:{boo_title: 'ASC'}
    });
  }

  findById(id: number) {
    return this.bookService.find({
      where: {
        boo_id: id
      },
      relations: ['aut_id', 'edi_id', 'gen_id', 'ass_id'],
      order:{boo_title: 'ASC'}
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