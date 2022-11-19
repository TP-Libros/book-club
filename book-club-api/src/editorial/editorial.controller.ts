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
/*import { CreateEditorialDto } from './dto/create-editorial.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';*/

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
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.editorialService.findOneBy(+id);
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
