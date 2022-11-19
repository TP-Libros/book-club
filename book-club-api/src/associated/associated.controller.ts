import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AssociatedService } from './associated.service';

@Controller('associated')
export class AssociatedController {
  constructor(private readonly associatedService: AssociatedService) {}

  @Get()
  findAll() {
    return this.associatedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.associatedService.findOneBy(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.associatedService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.associatedService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.associatedService.remove(id);
  }
}
