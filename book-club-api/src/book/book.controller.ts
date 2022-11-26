/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Book } from './book.entity';
import { BookService } from './book.service';

@ApiBearerAuth()
@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  /*@Get()
  findAll(/*@Query('aut_name') author?: string,
  @Query('gen_name') gender?: string,
  @Query('edi_name') editorial?: string) {
    return this.bookService.findAll(author, gender, editorial);
  }*/



  @Get('catalogueNoAssociated/')
  findAllNoAssociated() {
    return this.bookService.findAllNoAssociated();
  }

  @UseGuards(JwtAuthGuard)
  @Get('borrowed/')
  findAllBorrowedBooks() {
    return this.bookService.findAllBorrowedBooks();
  }

  @Get('filter/isbn/:boo_isbn')
  findAllFilterByISBN(@Param('boo_isbn') isbn: number) {
    return this.bookService.findAllFilterByISBN(isbn);
  }

  @Get('filter/author/:boo_author')
  findAllFilterByAuthor(@Param('boo_author') author: string) {
    return this.bookService.findAllFilterByAuthor(author);
  }

  @Get('filter/gender/:boo_gender')
  findAllFilterByGender(@Param('boo_gender') gender: string) {
    return this.bookService.findAllFilterByGender(gender);
  }

  @Get('filter/title/:boo_title')
  findAllFilterByTitle(@Param('boo_title') title: string) {
    return this.bookService.findAllFilterByTitle(title);
  }

  @ApiNotFoundResponse({ description: 'No book found for ID' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bookService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  findAllFilter() {
    return this.bookService.findAllFilterCatalogue();
  }



  @UseGuards(JwtAuthGuard)
  @Get('myBooks/:id')
  findAllFilterId(@Param('id') id: number) {
    return this.bookService.findAllFilterId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('myBooksborrowings/:id')
  findAllFilterIdBorrowings(@Param('id') id: number) {
    return this.bookService.findAllFilterIdBorrowings(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: Book) {
    return this.bookService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() body: Book) {
    return this.bookService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.bookService.remove(id);
  }
}
