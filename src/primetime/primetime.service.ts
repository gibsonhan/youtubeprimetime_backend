import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePrimeTimeDto, GetPrimeTimesFilterDto, UpdatePrimeTimeDto } from './primetime.dto';
import { PrimeTimeRepository } from './dto/primetime.repository';
import { PrimeTime } from './dto/primetime.entity'
import { User } from 'src/auth/user.entity';

@Injectable()
export class PrimeTimeService {
    constructor(
        @InjectRepository(PrimeTimeRepository)
        private primetimeRepository: PrimeTimeRepository,
    ) { }

    getPrimeTimes(@Query() filterDto: GetPrimeTimesFilterDto, user: User): Promise<any> {
        return this.primetimeRepository.getPrimetimes(filterDto, user)
    }

    async getPrimeTimeBy(id: string, user: User): Promise<PrimeTime> {
        const found = await this.primetimeRepository.findOne({ where: { id, user } });

        if (!found) {
            throw new NotFoundException(`Task with ID "${id} not found`)
        }

        return found
    }

    async createPrimeTime(createPrimeTimeDto: CreatePrimeTimeDto, user: User): Promise<any> {
        return this.primetimeRepository.createPrimeTime(createPrimeTimeDto, user)
    }

    async deletePrimeTimeBy(id: string, user: User): Promise<void> {
        const result = await this.primetimeRepository.delete(id)
        if (result.affected === 0) {
            throw new NotFoundException(`PrimeTime with ID "${id}" not found`);
        }
    }

    async updatePrimeTime(updatePrimeTimeDto: UpdatePrimeTimeDto): Promise<any> {
        return this.primetimeRepository.updatePrimeTime(updatePrimeTimeDto)
    }
}