import type { NextPage } from "next";
import Head from "next/head";
import Tile from "../components/WordleTile";
import { useState, useEffect } from "react";
import { ITile } from "../components/WordleTile";
import { toast } from "react-toastify";

const Wordle: NextPage = () => {
  const [wordOfTheDay, setWordOfTheDay] = useState<string>("");
  const [tiles, setTiles] = useState<ITile[][]>([]);
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [choice, setChoice] = useState<string>("");

  const getScore = () => {
    tiles[currentRow] = "result from apis"
    tiles[currentRow]


    setTiles([...tiles]);
    if (tiles[currentRow].every((tile) => tile.correctSpot)) {
      toast.success(
        `Congratulations, You guessed correctly in ${currentRow + 1} tries!`
      );
      setChoice("");
    } else {
      setCurrentRow(currentRow + 1);
    }
  };

  useEffect(() => {
    if (currentRow < tiles.length) {
      tiles[currentRow] = Array(5).fill({
        letter: "",
        correctSpot: false,
        selected: true,
        presentInWord: false,
      });
      setTiles([...tiles]);
    }
    if (currentRow === 5) {
      toast.error(
        `You have exceeded the number of tries! Correct word was ${wordOfTheDay}`
      );
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }
  }, [currentRow]);

  useEffect(() => {
    fetch("/api/wordle")
      .then((res) => res.json())
      .then((data) => {
        // setWordOfTheDay(data.data);
        console.log(data)
      });
    const newTiles = Array(5).fill(
      new Array(5).fill({
        letter: "",
        correctSpot: false,
        selected: false,
        presentInWord: false,
      })
    );
    newTiles[currentRow] = Array(5).fill({
      letter: "",
      correctSpot: false,
      selected: true,
      presentInWord: false,
    });
    setTiles(newTiles);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Wordle</title>
        <meta name="description" content="A simple game of wordle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center space-y-4 w-full flex-1 px-20 text-center">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            className="h-10 p-3 w-96 shadow-lg rounded-lg border-2 border-black"
            maxLength={5}
            minLength={5}
            value={choice}
            onChange={(e) => setChoice(e.target.value)}
          ></input>
          <button
            className="p-2 rounded-lg bg-black font-bold text-white"
            onClick={() => getScore()}
            disabled={choice.length !== 5}
          >
            Submit
          </button>
        </div>
        <section className="flex flex-col space-y-3">
          {tiles.map((row: ITile[], rowIndex) => (
            <div key={rowIndex} className="flex flex-row space-x-3">
              {row.map((tile: ITile, tileIndex: number) => (
                <Tile key={tileIndex} {...tile} />
              ))}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Wordle;
