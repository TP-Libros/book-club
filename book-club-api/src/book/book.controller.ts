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

  @Get()
  findAll() {
    return this.bookService.findAll();
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
  @Get('catalogo/')
  findAllFilter() {
    return this.bookService.findAllFilter();
  }

  @UseGuards(JwtAuthGuard)
  @Get('myBooks/:id')
  findAllFilterId(@Param('id') id: number) {
    return this.bookService.findAllFilterId(id);
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
