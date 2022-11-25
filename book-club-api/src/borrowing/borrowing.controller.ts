/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Borrowing } from './borrowing.entity';
import { BorrowingService } from './borrowing.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('borrowing')
@Controller('borrowing')
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @Post()
  create(@Body() body: Borrowing) {
    return this.borrowingService.createBorrowing(body);
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

  @Get('ass/:id')
  findAllByAssId(@Param('id') id: string) {
    return this.borrowingService.findAllByAssId(+id);
  }

  @Put('returnBorrowing/:id')
  returnBorrowing(@Param('id') id: number){
    return this.borrowingService.returnBorrowing(id);
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
