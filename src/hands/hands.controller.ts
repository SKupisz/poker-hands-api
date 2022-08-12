import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { HandsDto } from './dto/hands.dto';
import { HandsService } from './hands.service';
import { CardColor } from './hands.model';

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
    verifyIfHandIsCorrect(@Body() handDto: HandsDto): {isValid: boolean | void} {
        const {cards} = handDto;
        return {
            isValid: this.handsService.validateIfHandIsCorrect(JSON.parse(cards.toString()), true)
        };
    }

    @Post("/getHandName")
    getHandName(@Body() handDto: HandsDto) : {cards: [string, CardColor][], name: string}{
        const {cards} = handDto;
        this.handsService.validateIfHandIsCorrect(JSON.parse(cards.toString()), false);
        return {
            cards: cards,
            name: this.handsService.getHandName(JSON.parse(cards.toString()))
        }
    }
}
