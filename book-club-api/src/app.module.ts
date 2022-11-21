import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EditorialModule } from './editorial/editorial.module';
import { GenderModule } from './gender/gender.module';
import { AuthorModule } from './author/author.module';
import { AssociatedModule } from './associated/associated.module';
import { BorrowingModule } from './borrowing/borrowing.module';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';

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
    BookModule,
    EditorialModule,
    GenderModule,
    AuthorModule,
    AssociatedModule,
    BorrowingModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
