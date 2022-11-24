import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Editorial } from './editorial.entity';

@Injectable()
export class EditorialService {
  constructor(
    @InjectRepository(Editorial)
    private editorialService: Repository<Editorial>,
  ) {}
  create(body: any) {
    const newEditorial = this.editorialService.create(body);
    return this.editorialService.save(newEditorial);
  }

  findAll(): Promise<Editorial[]> {
    return this.editorialService.find();
  }

  findOneById(id: number) {
    return this.editorialService.findOneBy({ edi_id: id });
  }

  findOneBy(name: string) {
    return this.editorialService.find({
      where: { edi_name: Like(`%${name}%`) },
    });
  }

  async update(id: number, updateEditorial: Editorial) {
    const editorial = await this.editorialService.findOneBy({ edi_id: id });
    this.editorialService.merge(editorial, updateEditorial);
    return this.editorialService.save(editorial);
  }

  async remove(id: number) {
    await this.editorialService.delete(id);
    return true;
  }
}
