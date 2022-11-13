import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EditorialModule } from './editorial/editorial.module';
import { GenderModule } from './gender/gender.module';
import { AuthorModule } from './author/author.module';

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
    EditorialModule,
    GenderModule,
    AuthorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
