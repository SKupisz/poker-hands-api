import { Injectable, NotFoundException } from '@nestjs/common';

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

}
