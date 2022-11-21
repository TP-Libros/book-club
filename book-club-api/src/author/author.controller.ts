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
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('author')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  create(@Body() createAuthor: Author) {
    return this.authorService.create(createAuthor);
  }

  @Get()
  findAll() {
    return this.authorService.findAll();
  }

  @ApiNotFoundResponse({ description: 'No author found for ID' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorService.findOneBy(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthor: Author) {
    return this.authorService.update(+id, updateAuthor);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(+id);
  }
}
