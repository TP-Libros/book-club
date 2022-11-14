import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from './gender.entity';

@Injectable()
export class GenderService {
  constructor(
    @InjectRepository(Gender)
    private genderService: Repository<Gender>,
  ) {}
  create(body: any) {
    const newGender = this.genderService.create(body);
    return this.genderService.save(newGender);
  }

  findAll(): Promise<Gender[]> {
    return this.genderService.find();
  }

  findOneBy(id: number) {
    return this.genderService.findOneBy({ gen_id: id });
  }

  async update(id: number, updateGender: Gender) {
    const Gender = await this.genderService.findOneBy({ gen_id: id });
    this.genderService.merge(Gender, updateGender);
    return this.genderService.save(Gender);
  }

  async remove(id: number) {
    await this.genderService.delete(id);
    return true;
  }
}
