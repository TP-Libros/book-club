import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Associated } from './associated.entity';

@Injectable()
export class AssociatedService {
  constructor(
    @InjectRepository(Associated)
    private associatedService: Repository<Associated>,
  ) {}
  create(body: any) {
    const newAssociated = this.associatedService.create(body);
    return this.associatedService.save(newAssociated);
  }

  findAll(): Promise<Associated[]> {
    return this.associatedService.find();
  }

  findOneBy(id: number) {
    return this.associatedService.findOneBy({ ass_id: id });
  }

  async update(id: number, updateAssociated: Associated) {
    const associated = await this.associatedService.findOneBy({ ass_id: id });
    this.associatedService.merge(associated, updateAssociated);
    return this.associatedService.save(associated);
  }

  async remove(id: number) {
    await this.associatedService.delete(id);
    return true;
  }
}
