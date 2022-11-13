import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { Author } from './author.entity';

@Controller('Author')
export class AuthorController {
  constructor(private readonly AuthorService: AuthorService) {}

  @Post()
  create(@Body() createAuthor: Author) {
    return this.AuthorService.create(createAuthor);
  }

  @Get()
  findAll() {
    return this.AuthorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.AuthorService.findOneBy(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthor: Author) {
    return this.AuthorService.update(+id, updateAuthor);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.AuthorService.remove(+id);
  }
}
