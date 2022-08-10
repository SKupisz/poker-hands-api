export interface Card {
    value: string,
    color: CardColor
}

export enum CardColor {
    CLUBS,
    DIAMONDS,
    HEARTS,
    SPADES
}