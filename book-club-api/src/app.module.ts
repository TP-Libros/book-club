import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EditorialModule } from './editorial/editorial.module';
import { GenderModule } from './gender/gender.module';
import { AuthorModule } from './author/author.module';
import { AssociatedModule } from './associated/associated.module';
import { BorrowingModule } from './borrowing/borrowing.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'babar.db.elephantsql.com',
      port: 5432,
      username: 'wkaegqgr',
      password: 'UsTcBWXk-8znxQEZWx32GEZ7jOwJS_2S',
      database: 'wkaegqgr',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    BooksModule,
    EditorialModule,
    GenderModule,
    AuthorModule,
    AssociatedModule,
    BorrowingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
