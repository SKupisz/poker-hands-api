import { Controller, Get, Param } from '@nestjs/common';
import { HandsService } from './hands.service';

@Controller('hands')
export class HandsController {
    constructor(private readonly handsService: HandsService){}

    @Get("/names/")
    getHandsNames(): string[]{
        return this.handsService.getHandsNames();
    }

    @Get("/names/:order")
    getHandsOrderedNames(@Param("order") order: string): string[]{
        return this.handsService.getHandsOrderedNames(order);
    }
}
