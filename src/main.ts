import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import * as express from 'express';
import * as morgan from 'morgan';
import { envs } from './config/envs';
import { CORS, APP_NAME } from './constants';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

  app.use(morgan('dev'));

  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ extended: true, limit: '2000mb' }));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors(CORS);

  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.setGlobalPrefix('api');

  app.getHttpAdapter().get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  await app.listen(envs.port, '0.0.0.0');

  logger.log(`${APP_NAME} running on port ${envs.port}`);
  logger.log(`Ultima Actualización: "01 Ago 2025"`);
}
bootstrap();
