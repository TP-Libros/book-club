import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Book } from './book.entity';
import { BookService } from './book.service';

@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @ApiNotFoundResponse({ description: 'No book found for ID' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })

  @Get('catalogo/')
  findAllFilter(){
    return this.bookService.findAllFilter();
  }

  @Get('myBooks/:id')
  findAllFilterId(@Param('id') id: number){
    return this.bookService.findAllFilterId(id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bookService.findById(id);
  }

  @Post()
  create(@Body() body: Book) {
    return this.bookService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: Book) {
    return this.bookService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.bookService.remove(id);
  }
}
