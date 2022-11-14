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
/*import { CreateEditorialDto } from './dto/create-editorial.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';*/

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
