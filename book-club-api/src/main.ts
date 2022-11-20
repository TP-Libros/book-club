import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //for conection from the Front
  app.enableCors();

  //Swagger
  const options = new DocumentBuilder()
    .setTitle('Book Club')
    .setDescription(`The API for Book Club app`)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });
  //EndSwagger

  await app.listen(3000);
}
bootstrap();
