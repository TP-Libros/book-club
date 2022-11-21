import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorService: Repository<Author>,
  ) {}
  create(body: any) {
    const newAuthor = this.authorService.create(body);
    return this.authorService.save(newAuthor);
  }

  findAll(): Promise<Author[]> {
    return this.authorService.find();
  }

  findOneById(id: number) {
    return this.authorService.findOneBy({ aut_id: id });
  }

  findOneBy(name: string) {
    return this.authorService.findOneBy({ aut_name: name });
  }

  async update(id: number, updateAuthor: Author) {
    const author = await this.authorService.findOneBy({ aut_id: id });
    this.authorService.merge(author, updateAuthor);
    return this.authorService.save(author);
  }

  async remove(id: number) {
    await this.authorService.delete(id);
    return true;
  }
}
