import { Module } from '@nestjs/common';
import { GenderService } from './gender.service';
import { GenderController } from './gender.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gender } from './gender.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gender])],

  controllers: [GenderController],
  providers: [GenderService],
})
export class GenderModule {}
