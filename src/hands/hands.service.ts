import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CardColor } from './hands.model';

@Injectable()
export class HandsService {
    private handsNames:string[] = ["High Card", "One Pair", "Two Pairs", "Three of a kind", "Straight", "Flush", "Full House", "Four of a kind", "Straight Flush", "Royal Flush"];

    getHandsNames(): string[]{
        return this.handsNames;
    }

    getHandsOrderedNames(order: string): string[]{

        const operand = order.trim().toLowerCase();

        if(operand === "asc" || operand === "ascending"){
            return this.handsNames;
        }
        else if(operand === "dsc" || operand === "descending"){
            return this.handsNames.reverse();
        }
        else throw new NotFoundException("Wrong order given");
    }

    validateIfHandIsCorrect(hand: [string, CardColor][]): void {
        if(hand.length !== 5){
            throw new NotAcceptableException("Given card hand is incorrect");
        }
        for(let i = 0 ; i < hand.length; i++){
            if(hand[i][0] !== "ace" && hand[i][0] !== "king" && hand[i][0] !== "queen" && hand[i][0] !== "jack"){
                try {
                    const operand = parseInt(hand[i][0], 10);
                    if(operand < 2 || operand > 10 || operand.toString() !== hand[i][0]) throw new NotAcceptableException("Given card hand is incorrect");
                }
                catch {
                    throw new NotAcceptableException("Given card hand is incorrect");
                }
            }
        }
    }

    checkIfHandIsCorrect(hand: [string, CardColor][]): boolean {
        if(hand.length !== 5){
            return false;
        }
        for(let i = 0 ; i < hand.length; i++){
            const nameOperand = hand[i][0].toLowerCase();
            if(nameOperand !== "ace" && nameOperand !== "king" && nameOperand !== "queen" && nameOperand !== "jack"){
                try {
                    const operand = parseInt(hand[i][0], 10);
                    if(operand < 2 || operand > 10 || operand.toString() !== hand[i][0]) return false;
                }
                catch {
                    return false;
                }
            }
        }
        return true;
    }

    checkIfHandHasOnePair(hand: [string, CardColor][]): boolean {
        for(let i = 0 ; i < hand.length; i++){
            for(let j = i+1; j < hand.length; j++){
                if(hand[i][0] === hand[j][0] && i !== j) return true;
            }
        }
        return false;
    }

    checkIfHandsHasTwoPairs(hand: [string, CardColor][]): boolean {
        let operand:[string, CardColor][] = [...hand];
        if(!this.checkIfHandHasOnePair(hand)) return false;
        let flag:boolean = false;
        for(let i = 0 ; i < hand.length; i++){
            for(let j = i+1; j < hand.length; j++){
                if(hand[i][0] === hand[j][0] && i !== j) {
                    operand.splice(operand.indexOf(hand[i]), 1);
                    operand.splice(operand.indexOf(hand[j]), 1);
                    flag = true;
                    break;
                }
            }
            if(flag) break;
        }
        return this.checkIfHandHasOnePair(operand);
    }

}
