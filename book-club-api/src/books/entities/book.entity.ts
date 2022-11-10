import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ISBN: number;

  @Column({ default: false })
  borrowingSt: boolean;

  @Column()
  title: string;

  // @Column()
  // autor: Autor;

  // @Column()
  // editorial: Editorial;

  // @Column()
  // genero: Genero;

  @Column({ default: false })
  completed: boolean;

  @Column()
  yearEdition: number;

  @Column()
  synopsis: string;

  @Column()
  imagePath: string;

  @Column()
  associated: number;
}
