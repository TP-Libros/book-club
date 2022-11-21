import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssociatedController } from './associated.controller';
import { Associated } from './associated.entity';
import { AssociatedService } from './associated.service';

@Module({
  imports: [TypeOrmModule.forFeature([Associated])],
  controllers: [AssociatedController],
  providers: [AssociatedService],
})
export class AssociatedModule {}
