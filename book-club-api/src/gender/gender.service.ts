import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
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

  findOneId(id: number) {
    return this.genderService.findBy({ gen_id: id });
  }

  findOneBy(name: string) {
    return this.genderService.find({
      where: { gen_name: Like(`%${name}%`) },
    });
  }
  async update(id: number, updateGender: Gender) {
    const gender = await this.genderService.findOneBy({ gen_id: id });
    this.genderService.merge(gender, updateGender);
    return this.genderService.save(gender);
  }

  async remove(id: number) {
    await this.genderService.delete(id);
    return true;
  }
}
