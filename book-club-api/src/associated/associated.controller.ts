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
import { Associated } from './associated.entity';
import { AssociatedService } from './associated.service';

@ApiTags('associated')
@Controller('associated')
export class AssociatedController {
  constructor(private readonly associatedService: AssociatedService) {}

  @Get()
  findAll() {
    return this.associatedService.findAll();
  }

  @ApiNotFoundResponse({ description: 'No associated found for ID' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.associatedService.findOneById(id);
  }

  @Get('name/:userName')
  findOne(@Param('userName') userName: string) {
    return this.associatedService.findOneBy(userName);
  }


  @Post()
  create(@Body() body: Associated) {
    return this.associatedService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: Associated) {
    return this.associatedService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.associatedService.remove(id);
  }
}
