import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EditorialService } from './editorial.service';
import { Editorial } from './editorial.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('editorial')
@Controller('editorial')
export class EditorialController {
  constructor(private readonly editorialService: EditorialService) {}

  @Post()
  create(@Body() createEditorial: Editorial) {
    return this.editorialService.create(createEditorial);
  }

  @Get()
  findAll() {
    return this.editorialService.findAll();
  }

  @ApiNotFoundResponse({ description: 'No editorial found for ID' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  /* @Get(':id')
  findOne(@Param('id') id: string): Promise<Editorial> {
    return this.editorialService.findOneById(+id);
  }*/
  @Get('name/:name')
  findOneBy(@Param('name') name: string) {
    return this.editorialService.findOneBy(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEditorial: Editorial) {
    return this.editorialService.update(+id, updateEditorial);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.editorialService.remove(+id);
  }
}
