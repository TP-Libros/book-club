import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Repository } from 'typeorm';
import { Associated } from './associated.entity';

@Injectable()
export class AssociatedService {
  constructor(
    @InjectRepository(Associated)
    private associatedService: Repository<Associated>,
  ) {}
  async create(body: Associated) {
    const { ass_password } = body;
    const plainToHash = await hash(ass_password, 10);
    body = { ...body, ass_password: plainToHash };
    const newAssociated = this.associatedService.create(body);
    return this.associatedService.save(newAssociated);
  }

  @UseGuards(JwtAuthGuard)
  findAll(): Promise<Associated[]> {
    return this.associatedService.find();
  }

  findOneById(id: number) {
    return this.associatedService.findOneBy({ ass_id: id });
  }

  findOneBy(userName: string) {
    return this.associatedService.findOneBy({ ass_userName: userName });
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
