/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Borrowing } from './borrowing.entity';

@Injectable()
export class BorrowingService {
  constructor(
    @InjectRepository(Borrowing)
    private borrowingService: Repository<Borrowing>,
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
        bor_devolution_date: null,
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
        bor_devolution_date: null,
      },
    });
  }

  async createBorrowing(body: Borrowing) {	
    const [ result, quantity ] = await this.findCountAssId(body.assId);

    if( Number(quantity) < 5){
      const newBorrowing = this.borrowingService.create(body);
      return this.borrowingService.save(newBorrowing);
    }
    throw new BadRequestException('Excede la cantidad máxima de libros tomados en prestamo.');
              
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
