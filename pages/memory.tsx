import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { toast } from "react-toastify";
import { PlayingCard } from "../components/PlayingCard";
import { getRandomCards, IPlayingCard } from "../utils/memory";

const Memory: NextPage = () => {
  const [cards, setCards] = React.useState<IPlayingCard[]>(getRandomCards());
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [score, setScore] = React.useState<number>(0);
  const [chosen, setChosen] = React.useState<IPlayingCard>();
  const [guess, setGuess] = React.useState<IPlayingCard>();
  const [attempts, setAttempts] = React.useState<string[]>(["👨🏾", "👨🏾", "👨🏾"]);

  function reset() {
    setTimeout(() => setIsPlaying(true), 100);
    setScore(0);
    setChosen(undefined);
    setGuess(undefined);
    setAttempts(["👨🏾", "👨🏾", "👨🏾"]);
    setIsPlaying(false);
    const newCards = getRandomCards();
    setCards(newCards);
  }

  React.useEffect(() => {
    if (
      cards.every((card) => !card.flipped) &&
      attempts.length > 0 &&
      score > 0
    ) {
      toast.success("You won!");
      reset();
    }
  }, [cards]);

  React.useEffect(() => {
    if (!isPlaying) return;
    if (attempts.length === 0) {
      reset();
      toast.error("You lost!");
    }

    if (guess && chosen) {
      if (guess.value === chosen.value && guess.suit === chosen.suit) {
        setScore(score + 1);
        toast.success("Correct");
        const index = cards.findIndex(
          (c) => c.value === guess.value && c.suit === guess.suit
        );
        const newCards = [...cards];
        newCards[index].flipped = false;
        setCards(newCards);
        setTimeout(() => {
          const clean = newCards.filter((c) => c.flipped);
          console.log(clean);
          const _new = clean[Math.floor(Math.random() * clean.length)];
          setChosen(_new);
        }, 500);
      } else {
        toast.error("Incorrect");
        setAttempts(attempts.slice(0, attempts.length - 1));
      }
      setGuess(undefined);
    }
  }, [guess]);

  function begin() {
    setCards(cards.map((card) => ({ ...card, flipped: false })));
    const resolveAfter3Sec = new Promise((resolve) => {
      setTimeout(() => {
        setCards(cards.map((card) => ({ ...card, flipped: true })));
        setIsPlaying(true);
        setChosen(cards[Math.floor(Math.random() * cards.length)]);
        resolve(true);
      }, 3000);
    });
    toast.promise(resolveAfter3Sec, {
      pending: "Memorize the cards 👀",
      success: "Let the games begin 🎮",
      error: "Something went wrong 🤯",
    });
  }

  return (
    <>
      <Head>
        <title>Memory</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <main className="flex min-h-screen bg-slate-100 space-y-6 flex-col justify-center items-center">
        <div className="flex justify-between w-1/2">
          <div className="text-4xl font-bold">{attempts}</div>
          <div className="text-2xl font-bold">Score: {score}</div>
        </div>
        {chosen && isPlaying && (
          <div className="flex justify-center items-center space-x-4">
            <PlayingCard
              size="sm"
              value={chosen.value}
              suit={chosen.suit}
              flipped={false}
            />
          </div>
        )}
        <section className="grid grid-cols-3 xl:grid-cols-5 gap-4">
          {cards.map((card, index) => (
            <div key={index} onClick={() => setGuess(card)}>
              <PlayingCard
                size="lg"
                suit={card.suit}
                value={card.value}
                flipped={card.flipped}
              />
            </div>
          ))}
        </section>
        {!chosen && (
          <button
            className="bg-purple-600 text-white rounded-lg p-3 w-[150px] text-lg"
            onClick={() => begin()}
          >
            Begin
          </button>
        )}
      </main>
    </>
  );
};

export default Memory;
