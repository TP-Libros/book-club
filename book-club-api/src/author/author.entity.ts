import {} from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  aut_id: number;

  @Column()
  aut_name: string;

  @Column()
  aut_surname: string;
}
