import { Author } from 'src/author/author.entity';
import { Editorial } from 'src/editorial/editorial.entity';
import { Gender } from 'src/gender/gender.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  boo_id: number;

  @Column()
  boo_ISBN: number;

  @Column({ default: false })
  boo_borrowingSt: boolean;

  @Column()
  boo_title: string;

  @ManyToOne(() => Author, (author) => author.aut_id, { onDelete: 'SET NULL' })
  aut_id: Author;

  @ManyToOne(() => Editorial, (editorial) => editorial.edi_id, {
    onDelete: 'SET NULL',
  })
  edi_id: Editorial;

  @ManyToOne(() => Gender, (gender) => gender.gen_id, { onDelete: 'SET NULL' })
  gen_id: Gender;

  @Column()
  boo_yearEdition: number;

  @Column({ nullable: true })
  boo_synopsis: string;

  @Column()
  boo_imagePath: string;

  // @Column()
  // ass_id: number;
}
