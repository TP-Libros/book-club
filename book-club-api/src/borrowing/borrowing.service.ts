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
    return this.borrowingService.find();
  }
  //TODO: find by composed primary key
  findAllByAssId(id: number): Promise<Borrowing[]> {
    return this.borrowingService.findBy({
      ass_id: id,
    });
  }

  create(body: any) {
    const newBorrowing = this.borrowingService.create(body);
    return this.borrowingService.save(newBorrowing);
  }

  //TODO: find by composed primary key
  async update(id: number, body: Borrowing) {
    const borrowing = await this.borrowingService.findOneBy({
      ass_id: id,
      bor_from_date: body.bor_from_date,
      bor_to_date: body.bor_to_date,
    });
    this.borrowingService.merge(borrowing, body);
    return this.borrowingService.save(borrowing);
  }

  async remove(id: number) {
    await this.borrowingService.delete(id);
    return true;
  }
}
