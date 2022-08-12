import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { HandsDto } from './dto/hands.dto';
import { HandsService } from './hands.service';

@Controller('hands')
export class HandsController {
    constructor(private readonly handsService: HandsService){}

    @Get("/names")
    getHandsNames(): string[]{
        return this.handsService.getHandsNames();
    }

    @Get("/names/:order")
    getHandsOrderedNames(@Param("order") order: string): string[]{
        return this.handsService.getHandsOrderedNames(order);
    }

    @Post("/verify")
    verifyIfHandIsCorrect(@Body() handDto: HandsDto): {isValid: boolean} {
        const {cards} = handDto;
        return {
            isValid: this.handsService.checkIfHandIsCorrect(JSON.parse(cards.toString()))
        };
    }
}
