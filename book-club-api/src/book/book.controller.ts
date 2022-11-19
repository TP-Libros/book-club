import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bookService.findById(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.bookService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.bookService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.bookService.remove(id);
  }
}
