import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PrimeTimeModule } from './primetime/primetime.module';

@Module({
  imports: [TypeOrmModule.forRoot(), PrimeTimeModule],
  controllers: [],
})

export class AppModule { }
