import { Associated } from 'src/associated/associated.entity';
import { Book } from 'src/books/book.entity';
import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Borrowing {
  @ManyToOne(() => Book, (book) => book.boo_ISBN)
  @Column({ name: 'boo_ISBN' })
  boo_ISBN: number;

  @PrimaryColumn({ name: 'bor_from_date', type: 'timestamptz' })
  bor_from_date: Date;

  @PrimaryColumn({ name: 'bor_to_date', type: 'timestamptz' })
  bor_to_date: Date;

  @Column({ name: 'bor_devolution_date', type: 'timestamptz', nullable: true })
  bor_devolution_date: Date;

  @ManyToOne(() => Associated, (associated) => associated.ass_id)
  @JoinColumn({ name: 'ass_id' })
  ass_id: number;
}
