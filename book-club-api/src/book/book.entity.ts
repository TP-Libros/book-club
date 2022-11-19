import {} from '@nestjs/swagger';
import { Associated } from 'src/associated/associated.entity';
import { Author } from 'src/author/author.entity';
import { Editorial } from 'src/editorial/editorial.entity';
import { Gender } from 'src/gender/gender.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  boo_id: number;

  @Column({ name: 'boo_ISBN' })
  boo_ISBN: number;

  @Column({ default: false })
  boo_borrowingSt: boolean;

  @Column()
  boo_title: string;

  @ManyToOne(() => Author, (author) => author.aut_id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'aut_id' })
  aut_id: Author;

  @ManyToOne(() => Editorial, (editorial) => editorial.edi_id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'edi_id' })
  edi_id: Editorial;

  @ManyToOne(() => Gender, (gender) => gender.gen_id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'gen_id' })
  gen_id: Gender;

  @Column()
  boo_yearEdition: number;

  @Column({ nullable: true })
  boo_synopsis: string;

  @Column()
  boo_imagePath: string;

  @ManyToOne(() => Associated, (associated) => associated.ass_id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'ass_id' })
  ass_id: number;
}
