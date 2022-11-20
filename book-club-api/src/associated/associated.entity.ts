import {} from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Associated {
  @PrimaryGeneratedColumn()
  ass_id: number;

  @Column()
  ass_userName: string;

  @Column()
  ass_password: string;
}
