import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GenderService } from './gender.service';
import { Gender } from './gender.entity';

@Controller('gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @Post()
  create(@Body() createGender: Gender) {
    return this.genderService.create(createGender);
  }

  @Get()
  findAll() {
    return this.genderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genderService.findOneBy(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGender: Gender) {
    return this.genderService.update(+id, updateGender);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genderService.remove(+id);
  }
}
