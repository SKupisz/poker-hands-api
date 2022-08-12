import { CardColor } from "../hands.model";
import {IsNotEmpty} from "class-validator";

export class HandsDto {

    @IsNotEmpty()
    cards: [string, CardColor][];
}