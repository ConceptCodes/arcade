export enum Suits {
  Hearts = "♥",
  Diamonds = "♦️",
  Clubs = "♣️",
  Spades = "♠️",
}

export enum Ranks {
  Ace = "A",
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
  Seven = "7",
  Eight = "8",
  Nine = "9",
  Ten = "10",
  Jack = "J",
  Queen = "Q",
  King = "K",
}

export interface IPlayingCard {
  suit: Suits;
  value: Ranks;
  flipped: boolean;
}

const deckOfCards: IPlayingCard[] = [];

for (const suit of Object.values(Suits)) {
  for (const value of Object.values(Ranks)) {
    deckOfCards.push({
      suit,
      value,
      flipped: true,
    });
  }
}

export const getRandomCards = (): IPlayingCard[] => {
  for (let i = deckOfCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deckOfCards[i], deckOfCards[j]] = [deckOfCards[j], deckOfCards[i]];
  }
  return deckOfCards.slice(0, 5);
};
