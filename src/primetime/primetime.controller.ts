import {
    Controller,
    Body,
    Get,
    Param,
    Post,
    Delete,
    Put,
    Query,
} from '@nestjs/common';
import { Request } from 'express'

import { PrimeTimeService } from './primetime.service';

//helper
import * as MOCKED_RESPONSE from './data/temp.json'
import { CreatePrimeTimeDto, GetPrimeTimesFilterDto, UpdatePrimeTimeDto } from './primetime.dto';

@Controller('primetime')
export class PrimeTimeController {
    constructor(private primeTimeService: PrimeTimeService) { }

    @Post()
    createPrimeTime(@Body() createPrimeTimeDto: CreatePrimeTimeDto): Promise<any> {
        return this.primeTimeService.createPrimeTime(createPrimeTimeDto)
    }

    @Get()
    getPrimeTimes(@Query() getPrimeTimesFilterDto: GetPrimeTimesFilterDto) {
        return this.primeTimeService.getPrimeTimes(getPrimeTimesFilterDto)
    }

    @Get('/:id')
    getPrimeTimeById(@Param('id') id: string): Promise<any> {
        return this.primeTimeService.getPrimeTimeBy(id)
    }

    @Delete('/:id')
    deletePrimeTimeById(@Param('id') id: string): Promise<any> {
        return this.primeTimeService.deletePrimeTimeBy(id)
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
