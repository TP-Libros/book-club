import {} from '@nestjs/swagger';
import { Associated } from 'src/associated/associated.entity';
import { Book } from 'src/book/book.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Borrowing {
  @PrimaryGeneratedColumn()
  bor_id: number;

  @ManyToOne(() => Book, (book) => book.boo_ISBN)
  @JoinColumn({ name: 'boo_ISBN' })
  boo_ISBN: number;

  @Column({ name: 'bor_from_date', type: 'timestamptz' })
  bor_from_date: Date;

  @Column({ name: 'bor_to_date', type: 'timestamptz' })
  bor_to_date: Date;

  @Column({ name: 'bor_devolution_date', type: 'timestamptz', nullable: true })
  bor_devolution_date: Date;

  @ManyToOne(() => Associated, (associated) => associated.ass_id)
  @JoinColumn({ name: 'ass_id' })
  ass_id: number;
}
