import {
    Controller,
    Body,
    Get,
    Param,
    Post,
    Delete,
    Put,
    Query,
    UseGuards,
    Req,
} from '@nestjs/common';

import { PrimeTimeService } from './primetime.service';

//helper
import * as MOCKED_RESPONSE from './data/temp.json'
import { CreatePrimeTimeDto, GetPrimeTimesFilterDto, UpdatePrimeTimeDto } from './primetime.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { getUser } from 'src/auth/get-user.decorator';

@Controller('primetime')
@UseGuards(AuthGuard())
export class PrimeTimeController {
    constructor(private primeTimeService: PrimeTimeService) { }

    @Post()
    createPrimeTime(
        @Body() createPrimeTimeDto: CreatePrimeTimeDto,
        @getUser() user: User
    ): Promise<any> {
        return this.primeTimeService.createPrimeTime(createPrimeTimeDto, user)
    }

    @Get()
    getPrimeTimes(
        @Query() getPrimeTimesFilterDto: GetPrimeTimesFilterDto,
        @getUser() user: User,
    ) {
        return this.primeTimeService.getPrimeTimes(getPrimeTimesFilterDto, user)
    }

    @Get('/:id')
    getPrimeTimeById(
        @Param('id') id: string,
        @getUser() user: User,
    ): Promise<any> {
        return this.primeTimeService.getPrimeTimeBy(id, user)
    }

    @Delete('/:id')
    deletePrimeTimeById(
        @Param('id') id: string,
        @getUser() user: User,
    ): Promise<any> {
        return this.primeTimeService.deletePrimeTimeBy(id, user)
    }

    @Put('/:id')
    updatePrimeTime(@Param('id') id: string, @Body() updatePrimeTimeDto: UpdatePrimeTimeDto): Promise<any> {
        return this.primeTimeService.updatePrimeTime(updatePrimeTimeDto)
    }

    @Get('test/tempData')
    getTempData() {
        return MOCKED_RESPONSE
    }
}
