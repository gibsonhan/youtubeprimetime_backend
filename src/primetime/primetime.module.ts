import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrimeTimeRepository } from './dto/primetime.repository';
import { PrimeTimeController } from './primetime.controller';
import { PrimeTimeService } from './primetime.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([PrimeTimeRepository])
    ],
    controllers: [PrimeTimeController],
    providers: [PrimeTimeService],
})

export class PrimeTimeModule { }