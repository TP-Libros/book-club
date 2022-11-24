/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
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

  /* findAllByAssIdCount(findAllByAssId()){
      this.borrowingService.count(bor_id);*/

  findById(id: number) {
    return this.borrowingService.find({
      where: {
        bor_id: id,
      },
      relations: ['boo_id', 'boo_id.aut_id', 'boo_id.gen_id', 'boo_id.edi_id'],
    
    });
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
