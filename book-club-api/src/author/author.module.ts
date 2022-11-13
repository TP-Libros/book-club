import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { Author } from './author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
