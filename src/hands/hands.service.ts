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

    validateIfHandIsCorrect(hand: [string, CardColor][], boolNeeded: boolean): (void | boolean) {
        if(hand.length !== 5){
            boolNeeded ? () => {return false;} : () => {throw new NotAcceptableException("A hand contains of exactly 5 cards")};
        }
        if(hand.filter((elem: [string, CardColor]) => elem[0] === elem[0][0]).length === 5){
            boolNeeded ? () => {return false;} : () => {throw new NotAcceptableException("No cards set has 5 cards of the same value")};
        }
        for(let i = 0 ; i < hand.length; i++){
            if(hand[i][0] !== "ace" && hand[i][0] !== "king" && hand[i][0] !== "queen" && hand[i][0] !== "jack"){
                try {
                    const operand = parseInt(hand[i][0], 10);
                    if(operand < 2 || operand > 10 || operand.toString() !== hand[i][0]) 
                    boolNeeded ? () => {return false;} : () => {throw new NotAcceptableException("Given card hand is incorrect")};
                }
                catch {
                    boolNeeded ? () => {return false;} : () => {throw new NotAcceptableException("Given card hand is incorrect")};
                }
            }
        }
        if(boolNeeded) return true;
    }

    checkIfHandHasOnePair(hand: [string, CardColor][]): boolean {
        for(let i = 0 ; i < hand.length; i++){
            for(let j = i+1; j < hand.length; j++){
                if(hand[i][0] === hand[j][0] && i !== j) return true;
            }
        }
        return false;
    }

    checkIfHandHasTwoPairs(hand: [string, CardColor][]): boolean {
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

    getHandName(hand: [string, CardColor][]): string{

        if(hand.filter((elem: [string, CardColor]) => elem[1] === hand[0][1]).length === 5) return "Flush";

        if(this.checkIfHandHasTwoPairs(hand)) {
            if(hand.filter((elem: [string, CardColor]) => elem[0] === hand[0][0]).length === 4
            || hand.filter((elem: [string, CardColor]) => elem[0] === hand[1][0]).length === 4) return "Four of a kind";
            return "Two pairs";
        }

        if(this.checkIfHandHasOnePair(hand)) return "One pair";
        
        return "High card";
    }

}
