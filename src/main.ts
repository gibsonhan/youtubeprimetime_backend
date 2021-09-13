import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(3001);
}

bootstrap()