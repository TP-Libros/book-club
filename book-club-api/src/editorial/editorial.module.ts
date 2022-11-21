import { Module } from '@nestjs/common';
import { EditorialService } from './editorial.service';
import { EditorialController } from './editorial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Editorial } from './editorial.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Editorial])],

  controllers: [EditorialController],
  providers: [EditorialService],
})
export class EditorialModule {}
