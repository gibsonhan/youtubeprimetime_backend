import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreatePrimeTimeDto, GetPrimeTimesFilterDto, UpdatePrimeTimeDto } from "../primetime.dto";
import { PrimeTime } from "./primetime.entity";

@EntityRepository(PrimeTime)
export class PrimeTimeRepository extends Repository<PrimeTime | any>{
    async getPrimetimes(filterDto: GetPrimeTimesFilterDto, user: User): Promise<any> {
        const query = this.createQueryBuilder('primetime');
        query.where({ user })

        const primetimes = await query.getMany()
        return primetimes
    }

    async createPrimeTime(createPrimeTimeDto: CreatePrimeTimeDto, user: User) {
        const {
            title,
            description,
            rank,
            subscriptions,
            shared,
            tags,
        } = createPrimeTimeDto

        const primeTime = this.create({
            title,
            description,
            rank,
            subscriptions,
            shared,
            tags,
            user
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
            tags,
            subscriptions,
            shared,
        } = updatePrimeTimeDto

        console.log('update', updatePrimeTimeDto.id)

        const primeTime = this.create({
            id,
            title,
            description,
            rank,
            tags,
            subscriptions,
            shared
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