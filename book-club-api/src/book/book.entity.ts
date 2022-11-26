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

  @Column({ name: 'aut_id' })
  autId: number;

  @ManyToOne(() => Author, { nullable: false })
  /*, (author) => author.aut_id, { onDelete: 'SET NULL' })*/
  @JoinColumn({ name: 'aut_id' })
  aut_id: Author;

  @Column({ name: 'edi_id' })
  ediId: number;

  @ManyToOne(() => Editorial, (editorial) => editorial.edi_id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'edi_id' })
  edi_id: Editorial;

  @Column({ name: 'gen_id' })
  genId: number;

  @ManyToOne(() => Gender, (gender) => gender.gen_id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'gen_id' })
  gen_id: Gender;

  @Column()
  boo_yearEdition: number;

  @Column({ nullable: true })
  boo_synopsis: string;

  @Column({ type: 'text' })
  boo_imagePath: string;

  @Column({ name: 'ass_id' })
  assId: number;

  @ManyToOne(() => Associated, (associated) => associated.ass_id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'ass_id' })
  ass_id: number;
}
