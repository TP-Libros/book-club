/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  constructor(@InjectRepository(Book) private bookService: Repository<Book>) {}

  findAll(): Promise<Book[]> {
    return this.bookService.find({ relations: ['aut_id', 'edi_id', 'gen_id'] });
  }

  findAllFilter(): Promise<Book[]> {
    return this.bookService.find({
      where: {
        boo_borrowingSt: false,
      },
      relations: ['aut_id', 'edi_id', 'gen_id'],
    });
  }

  findAllFilterByISBN(isbn: number): Promise<Book[]>{
    return this.bookService.find({
      where: {
        boo_ISBN: (isbn),
      },
      relations: ['aut_id', 'edi_id', 'gen_id'],
    })
  }

  async findAllFilterByAuthor(author: string): Promise<Book[]>{
    return await this.bookService.find({
      where: [{
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
    })
  }

  async findAllFilterByGender(gender: string): Promise<Book[]>{
    return await this.bookService.find({
      where: {
        gen_id: {
          gen_name: Like(`%${gender}%`),
        },
      },
      relations: ['aut_id', 'edi_id', 'gen_id'],
    })
  }

  findAllFilterByTitle(title: string): Promise<Book[]>{
    //const books = this.bookService.createQueryBuilder("book").where("book.boo_title= :title", {title: title}).getMany();
    return this.bookService.find({
      where: {
        boo_title: Like(`%${title}%`),
      },
      relations: ['aut_id', 'edi_id', 'gen_id'],
    })
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