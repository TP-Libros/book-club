<<<<<<< HEAD
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

 /*@Get(':id')
  findOne(@Param('id') id: number) {
    return this.associatedService.findOneBy(id);
  }*/

  @Get(':userName')
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
=======
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
  findOne(@Param('id') id: number) {
    return this.associatedService.findOneBy(id);
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
>>>>>>> 015ba636adfeb0a5e9cb358382b7cbabbf894586
