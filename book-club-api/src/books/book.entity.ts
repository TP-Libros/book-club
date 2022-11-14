import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  // @Column()
  // aut_id: Autor;

  // @Column()
  //  edi_id: Editorial;

  // @Column()
  // gen_id: Genero;

  @Column()
  boo_yearEdition: number;

  @Column({ nullable: false })
  boo_synopsis: string;

  @Column()
  boo_imagePath: string;

  @Column()
  ass_id: number;
}
