// layout 1 x 5 cards
// the goal of the game is to guess all the cards in order
// show the user for 5 seconds
// then flip the cards
// then show one of the pairs and ask the user to flip the correct card
// if the user is correct, add +1 to score, and show the next pair
// if the user is incorrect, end the game

export enum Suits {
  Hearts = '♥',
  Diamonds = '♦️',
  Clubs = '♣️',
  Spades = '♠️',
}

export enum Ranks {
  Ace = 'A',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9',
  Ten = '10',
  Jack = 'J',
  Queen = 'Q',
  King = 'K',
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

// shuffle the deck

export const getRandomCards = (): IPlayingCard[] => {
  const cards: IPlayingCard[] = [];
  for (let i = 0; i < 5; i++) {
    const randomCard = deckOfCards[Math.floor(Math.random() * deckOfCards.length)];
    cards.push(randomCard);
  }
  return cards;
}


