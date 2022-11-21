import {} from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gender {
  @PrimaryGeneratedColumn()
  gen_id: number;

  @Column()
  gen_name: string;
}
