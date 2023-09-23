import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import { CORS } from './config/cors';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(CORS);
  app.setGlobalPrefix('api');
  app.use(morgan('dev'));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));

  console.info(`Server listening on ${await app.getUrl()}`);
}
bootstrap();
