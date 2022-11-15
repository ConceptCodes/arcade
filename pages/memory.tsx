import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { toast } from 'react-toastify';
import { PlayingCard } from "../components/PlayingCard";
import { getRandomCards, IPlayingCard } from "../utils/memory";

const Memory: NextPage = () => {
  const [cards, setCards] = React.useState<IPlayingCard[]>(getRandomCards());
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [score, setScore] = React.useState<number>(0);
  const [chosen, setChosen] = React.useState<IPlayingCard>();
  const [guess, setGuess] = React.useState<IPlayingCard>();
  const [attempts, setAttempts] = React.useState<number>(2);

  function reset() {
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 100);
    setScore(0);
    setChosen(undefined);
    setGuess(undefined);
    setAttempts(2);
  }

  React.useEffect(() => {
    if (!isPlaying) return;
    if (attempts === 0) toast.error('You lost!');

    setChosen(cards[Math.floor(Math.random() * cards.length)]);
    if (guess && chosen) {
      setAttempts(attempts - 1);
      if (guess.value === chosen.value && guess.suit === chosen.suit) {
        setScore(score + 1);
        toast.success("Correct!");
      } else {
        toast.error("Incorrect !");
      }
      setGuess(undefined);
    }
  }, [guess]);

  function makeAGuess(card: IPlayingCard) {
    if (!isPlaying) return;
    if (card.flipped) return;

    // choose a random card
  }

  function begin () {
    setCards(cards.map((card) => ({ ...card, flipped: false })));
    const resolveAfter3Sec = new Promise(resolve => {
      setTimeout(() => {
        setCards(cards.map((card) => ({ ...card, flipped: true })));
        setIsPlaying(true);
        resolve(true);
      }, 3000);
    });
    toast.promise(
        resolveAfter3Sec,
        {
          pending: 'Memorize the cards 👀',
          success: 'Now Begin 🎮',
          error: 'Something went wrong 🤯'
        }
    )
  }

  return (
    <>
      <Head>
        <title>Memory</title>
      </Head>
      <main className="flex min-h-screen bg-slate-100 space-y-6 flex-col justify-center items-center">
        { (chosen && isPlaying) && (
          <div className="flex justify-center items-center space-x-4">
            <h1 className="text-4xl">Find this Card</h1>
            <PlayingCard size="sm" value={chosen.value} suit={chosen.suit} flipped={false}  />
          </div>
        ) }
        <section className="flex space-x-5 items-center space-y-5">
          {cards.map((card, index) => (
              <div onClick={() => setGuess(card)}>
                <PlayingCard
                  size="lg"
                  key={index}
                  suit={card.suit}
                  value={card.value}
                  flipped={card.flipped}
                />
              </div>
            ))}
        </section>
          <button
            className="bg-purple-600 text-white rounded-lg p-3 w-[150px] text-lg"
            onClick={() => begin()}
          >
            { isPlaying ? "Reset" : "Begin"}
          </button>
      </main>
    </>
  );
};

export default Memory;
