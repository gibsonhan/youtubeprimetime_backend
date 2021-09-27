import { EntityRepository, Repository } from "typeorm";
import { CreatePrimeTimeDto, GetPrimeTimesFilterDto, UpdatePrimeTimeDto } from "../primetime.dto";
import { PrimeTime } from "./primetime.entity";

@EntityRepository(PrimeTime)
export class PrimeTimeRepository extends Repository<PrimeTime | any>{
    async getPrimetimes(filterDto: GetPrimeTimesFilterDto): Promise<any> {
        const query = this.createQueryBuilder('primetime');

        const primeTimes = await query.getMany()
        return primeTimes
    }

    async createPrimeTime(createPrimeTimeDto: CreatePrimeTimeDto) {
        const {
            //userId,
            title,
            description,
            rank,
            subscriptions,
            //shared
        } = createPrimeTimeDto

        const primeTime = this.create({
            //userId,
            title,
            description,
            rank,
            subscriptions,
            //shared
        });

        await this.save(primeTime)
        return primeTime
    }

    async updatePrimeTime(updatePrimeTimeDto: UpdatePrimeTimeDto) {
        const {
            id,
            title,
            description,
            rank,
            //tags,
            subscriptions,
            //shared
        } = updatePrimeTimeDto

        console.log('update', updatePrimeTimeDto.id)

        const primeTime = this.create({
            id,
            title,
            description,
            rank,
            //tags,
            subscriptions,
            //shared
        });
        try {
            await this.update(id, primeTime)
        }
        catch (error) {
            console.error('Failed to Update PrimeTime', error)
        }
        return primeTime
    }
}