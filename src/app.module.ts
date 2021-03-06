import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PrimeTimeModule } from './primetime/primetime.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(), PrimeTimeModule, AuthModule],
  controllers: [],
})

export class AppModule { }
