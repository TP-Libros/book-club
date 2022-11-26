/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Borrowing } from './borrowing.entity';
import { BookService } from 'src/book/book.service';

@Injectable()
export class BorrowingService {
  constructor(
    @InjectRepository(Borrowing)
    private borrowingService: Repository<Borrowing>,
    private readonly bookService: BookService
  ) {}

  findAll(): Promise<Borrowing[]> {
    return this.borrowingService.find({
      relations: ['boo_id', 'boo_id.aut_id', 'boo_id.gen_id', 'boo_id.edi_id'],
      order:{bor_id: 'ASC'}
    });
  }

  findAllByAssId(id: number): Promise<Borrowing[]> {
    return this.borrowingService.find({
      where: {
        assId: id,
        bor_devolution_date: IsNull(),
      },
      relations: ['boo_id', 'boo_id.aut_id', 'boo_id.gen_id', 'boo_id.edi_id'],
      order:{bor_id: 'ASC'}
    });
  }

  findById(id: number) {
    return this.borrowingService.find({
      where: {
        bor_id: id,
      },
      relations: ['boo_id', 'boo_id.aut_id', 'boo_id.gen_id', 'boo_id.edi_id'],
    
    });
  }

  findCountAssId(id: number) {
    return this.borrowingService.findAndCount({
      where: {
        assId: id,
        bor_devolution_date: IsNull(),
      },
    });
  }

  async createBorrowing(body: Borrowing) {	
    const [ result, quantity ] = await this.findCountAssId(body.assId);
    if( Number(quantity) >= 5){
      throw new BadRequestException('Excede la cantidad máxima de libros tomados en prestamo.');
    }
    try{
      const book = await this.bookService.findByIdAvailable(body.booId);
      const newBorrowing = await this.borrowingService.create(body);
      await this.bookService.updateBook(body.booId, book);
      return await this.borrowingService.save(newBorrowing);
    }catch(BadRequestException){}
    throw new BadRequestException('No se puede modificar el registro, el libro esta prestado.');
  }				
  
  async returnBorrowing(id: number){
    let borrowing = await this.borrowingService.findOneBy({
      bor_id: id,
    });
    const date: Date = new Date();
    borrowing.bor_devolution_date = date;
    // body = {...body, bor_devolution_date: date}
    const book = this.bookService.findById(borrowing.booId);
    this.bookService.updateReturnedBook(borrowing.booId, book);
    return this.update(borrowing.bor_id, borrowing);
  }
							
  create(body: any) {
    const newBorrowing = this.borrowingService.create(body);
    return this.borrowingService.save(newBorrowing);
  }

  async update(id: number, body: Borrowing) {
    const borrowing = await this.borrowingService.findOneBy({
      bor_id: id,
    });
    this.borrowingService.merge(borrowing, body);
    return this.borrowingService.save(borrowing);
  }

  async remove(id: number) {
    await this.borrowingService.delete(id);
    return true;
  }
}
