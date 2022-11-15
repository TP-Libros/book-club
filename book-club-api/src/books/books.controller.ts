import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.booksService.findById(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.booksService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.booksService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.booksService.remove(id);
  }
}
