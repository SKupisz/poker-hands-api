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

    @Post("/checkIfHasOnePair")
    checkIfHasOnePair(@Body() handDto: HandsDto) : {cards: [string, CardColor][], hasOnePair: boolean} {
        const {cards} = handDto;
        return {
            cards: cards,
            hasOnePair: this.handsService.checkIfHandHasOnePair(JSON.parse(cards.toString()))
        };
    }

    @Post("/checkIfHasTwoPairs")
    checkIfHasTwoPair(@Body() handDto: HandsDto) : {cards: [string, CardColor][], hasTwoPairs: boolean} {
        const {cards} = handDto;
        return {
            cards: cards,
            hasTwoPairs: this.handsService.checkIfHandHasTwoPairs(JSON.parse(cards.toString()))
        };
    }

    @Post("/checkIfHasThree")
    checkIfHasThree(@Body() handDto: HandsDto) : {cards: [string, CardColor][], hasThreeOfAKind: boolean} {
        const {cards} = handDto;
        return {
            cards: cards,
            hasThreeOfAKind: this.handsService.checkIfHandHasThreeOfAKind(JSON.parse(cards.toString()))
        };
    }
    

    @Post("/checkIfHasStraight")
    checkIfHasStraight(@Body() handDto: HandsDto) : {cards: [string, CardColor][], hasStraight: boolean} {
        const {cards} = handDto;
        return {
            cards: cards,
            hasStraight: this.handsService.checkIfHandHasStraight(JSON.parse(cards.toString()))
        };
    }

    @Post("/checkIfHasFlush")
    checkIfHasFlush(@Body() handDto: HandsDto) : {cards: [string, CardColor][], hasFlush: boolean} {
        const {cards} = handDto;
        return {
            cards: cards,
            hasFlush: this.handsService.checkIfHandHasFlush(JSON.parse(cards.toString()))
        };
    }

    @Post("/checkIfHasFullHouse")
    checkIfHasFullHouse(@Body() handDto: HandsDto) : {cards: [string, CardColor][], hasFullHouse: boolean} {
        const {cards} = handDto;
        return {
            cards: cards,
            hasFullHouse: this.handsService.checkIfHandHasFullHouse(JSON.parse(cards.toString()))
        };
    }
    

    @Post("/checkIfHasFour")
    checkIfHasFour(@Body() handDto: HandsDto) : {cards: [string, CardColor][], hasFourOfAKind: boolean} {
        const {cards} = handDto;
        return {
            cards: cards,
            hasFourOfAKind: this.handsService.checkIfHandHasFourOfAKind(JSON.parse(cards.toString()))
        };
    }

    @Post("/checkIfHasStraightFlush")
    checkIfHasStraightFlush(@Body() handDto: HandsDto) : {cards: [string, CardColor][], hasStraightFlush: boolean} {
        const {cards} = handDto;
        return {
            cards: cards,
            hasStraightFlush: this.handsService.checkIfHandHasStraight(JSON.parse(cards.toString())) 
            && this.handsService.checkIfHandHasFlush(JSON.parse(cards.toString())) 
            && !this.handsService.checkIfHandHasRoyalFlush(JSON.parse(cards.toString()))
        };
    }

    @Post("/checkIfHasRoyalFlush")
    checkIfHasRoyalFlush(@Body() handDto: HandsDto) : {cards: [string, CardColor][], hasRoyalFlush: boolean} {
        const {cards} = handDto;
        return {
            cards: cards,
            hasRoyalFlush: this.handsService.checkIfHandHasRoyalFlush(JSON.parse(cards.toString()))
        };
    }
}
