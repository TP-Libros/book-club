import {} from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Editorial {
  @PrimaryGeneratedColumn()
  edi_id: number;

  @Column()
  edi_name: string;
  /*@OneToMany(() => nombre de la entidad que se va a relacionar Editorial,(nombre de la entidad que se va a relacionar editorial)=> editorial.book,{cascade:true})
  editorial: Editorial[]*/
}
