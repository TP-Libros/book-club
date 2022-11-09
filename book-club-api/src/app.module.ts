import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { BooksService } from './books/services/books.service';
import dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST /* || babar.db.elephantsql.com*/,
      port: parseInt(process.env.DB_PORT) /* || 5432*/,
      username: process.env.DB_USER /* || 'wkaegqgr'*/,
      password:
        process.env.DB_PASSWORD /*||'UsTcBWXk-8znxQEZWx32GEZ7jOwJS_2S'*/,
      database: process.env.DB_DATABASE /*||'wkaegqgr'*/,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      retryDelay: 3000,
      retryAttempts: 10,
    }),
    BooksModule,
  ],
  controllers: [],
  providers: [BooksService],
})
export class AppModule {}
