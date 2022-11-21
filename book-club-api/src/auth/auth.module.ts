import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Associated } from 'src/associated/associated.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Associated])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
