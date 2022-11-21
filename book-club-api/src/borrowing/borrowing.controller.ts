import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Borrowing } from './borrowing.entity';
import { BorrowingService } from './borrowing.service';

@ApiTags('borrowing')
@Controller('borrowing')
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @Post()
  create(@Body() createBorrowing: Borrowing) {
    return this.borrowingService.create(createBorrowing);
  }

  @Get()
  findAll() {
    return this.borrowingService.findAll();
  }

  @ApiNotFoundResponse({ description: 'No borrowing found for ID' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.borrowingService.findById(+id);
  }

  @Get(':id')
  findAllByAssId(@Param('id') id: string) {
    return this.borrowingService.findAllByAssId(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBorrowing: Borrowing) {
    return this.borrowingService.update(+id, updateBorrowing);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.borrowingService.remove(+id);
  }
}
