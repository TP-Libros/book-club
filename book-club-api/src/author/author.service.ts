import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private AuthorService: Repository<Author>,
  ) {}
  create(body: any) {
    const newAuthor = this.AuthorService.create(body);
    return this.AuthorService.save(newAuthor);
  }

  findAll(): Promise<Author[]> {
    return this.AuthorService.find();
  }

  findOneBy(id: number) {
    return this.AuthorService.findOneBy({ aut_id: id });
  }

  async update(id: number, updateAuthor: Author) {
    const author = await this.AuthorService.findOneBy({ aut_id: id });
    this.AuthorService.merge(author, updateAuthor);
    return this.AuthorService.save(author);
  }

  async remove(id: number) {
    await this.AuthorService.delete(id);
    return true;
  }
}
