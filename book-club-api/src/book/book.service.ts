import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Borrowing } from 'src/borrowing/borrowing.entity';
import { ILike, IsNull, Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookService: Repository<Book>,
    @InjectRepository(Borrowing)
    private borrowingAuxService: Repository<Borrowing>,
  ) {}

  findAllFilterCatalogue(): Promise<Book[]> {
    return this.bookService.find({
      where: {
        boo_borrowingSt: false,
      },
      relations: ['aut_id', 'edi_id', 'gen_id'],
      order: { boo_title: 'ASC' },
    });
  }

  // findAll(): Promise<Book[]> {
  //   return this.bookService.find({
  //     relations: ['aut_id', 'edi_id', 'gen_id'],
  //     order:{boo_title: 'ASC'}
  //   });
  // }

  findAllNoAssociated(): Promise<Book[]> {
    return this.bookService.find({
      where: {
        boo_borrowingSt: false,
      },
      relations: ['aut_id', 'edi_id', 'gen_id'],
      order: { boo_title: 'ASC' },
      take: 10,
    });
  }

  findAllFilterByISBN(isbn: number): Promise<Book[]> {
    return this.bookService.find({
      where: {
        boo_ISBN: isbn,
        boo_borrowingSt: false,
      },
      relations: ['aut_id', 'edi_id', 'gen_id'],
    });
  }

  async findAllFilterByAuthor(author: string): Promise<Book[]> {
    return await this.bookService.find({
      where: [
        {
          boo_borrowingSt: false,
          aut_id: {
            aut_name: ILike(`%${author}%`),
          },
        },
        {
          aut_id: {
            aut_surname: ILike(`%${author}%`),
          },
        },
      ],
      relations: ['aut_id', 'edi_id', 'gen_id'],
      order: { boo_title: 'ASC' },
    });
  }

  async findAllFilterByGender(gender: string): Promise<Book[]> {
    return await this.bookService.find({
      where: {
        boo_borrowingSt: false,
        gen_id: {
          gen_name: ILike(`%${gender}%`),
        },
      },
      relations: ['aut_id', 'edi_id', 'gen_id'],
      order: { boo_title: 'ASC' },
    });
  }

  findAllFilterByTitle(title: string): Promise<Book[]> {
    //const books = this.bookService.createQueryBuilder("book").where("book.boo_title= :title", {title: title}).getMany();
    return this.bookService.find({
      where: {
        boo_borrowingSt: false,
        boo_title: ILike(`%${title}%`),
      },
      relations: ['aut_id', 'edi_id', 'gen_id'],
      order: { boo_title: 'ASC' },
    });
  }

  async findAllFilterId(id: number) {
    const book: Book[] = await this.bookService.find({
      where: {
        // boo_borrowingSt: false,
        assId: id,
      },
      relations: ['aut_id', 'edi_id', 'gen_id', 'ass_id'],
      order: { boo_title: 'ASC' },
    });
    const borrowings: Borrowing[] = await this.borrowingAuxService.find({
      where: {
        bor_devolution_date: IsNull(),
      },
      relations: ['ass_id'],
    });

    const data = [{ book: book, borrowing: borrowings }];
    return data;
  }

  findAllFilterIdBorrowings(id: number): Promise<Book[]> {
    return this.bookService.find({
      where: {
        assId: id,
        boo_borrowingSt: true,
      },
      relations: ['aut_id', 'edi_id', 'gen_id'],
      order: { boo_title: 'ASC' },
    });
  }

  async findById(id: number) {
    const book = await this.bookService.find({
      where: {
        boo_id: id,
      },
      relations: ['aut_id', 'edi_id', 'gen_id', 'ass_id'],
      order: { boo_title: 'ASC' },
    });

    const borrowing = await this.borrowingAuxService.find({
      where: {
        booId: book[0].boo_id,
        bor_devolution_date: IsNull(),
      },
      relations: ['ass_id'],
      order: { bor_id: 'ASC' },
    });
    const data = [{ book: book[0], borrowing: borrowing }];
    return data;
  }

  findAllBorrowedBooks() {
    return this.bookService.find({
      where: {
        boo_borrowingSt: true,
      },
      relations: ['aut_id', 'edi_id', 'gen_id', 'ass_id'],
      order: { boo_title: 'ASC' },
    });
  }

  findByIdAvailable(id: number) {
    return this.bookService.find({
      where: {
        boo_id: id,
        boo_borrowingSt: false,
      },
      relations: ['aut_id', 'edi_id', 'gen_id', 'ass_id'],
      order: { boo_title: 'ASC' },
    });
  }

  async updateBook(id: number, body: any) {
    // if(this.findByIdAvailable(id) != null ){
    // if(body.boo_borrowingSt == false){
    body = { ...body, boo_borrowingSt: true };
    return this.update(id, body);
    // }
    // return null;
  }

  async updateReturnedBook(id: number, body: any) {
    // if(this.findByIdAvailable(id) != null ){
    // if(body.boo_borrowingSt == true){
    body = { ...body, boo_borrowingSt: false };
    return this.update(id, body);
    // }
    // return null;
  }

  async deleteBook(id: number) {
    if (this.findByIdAvailable(id) != null) {
      return this.remove(id);
    }
    throw new BadRequestException(
      'No se puede modificar el registro, el libro esta prestado.',
    );
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
