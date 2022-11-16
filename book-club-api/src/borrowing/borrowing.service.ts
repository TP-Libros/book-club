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

  findAllByAssId(id: number): Promise<Borrowing[]> {
    return this.borrowingService.findBy({
      ass_id: id,
    });
  }

  findById(id: number) {
    return this.borrowingService.findOneBy({ bor_id: id });
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
