import {} from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Editorial {
  @PrimaryGeneratedColumn()
  edi_id: number;

  @Column()
  edi_name: string;

}
