import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import Tile, { TileColor } from "./tile";

const ConnectFourPage: NextPage = () => {
  const COLS = 5;
  const ROWS = 6;
  const [currentPlayer, setCurrentPlayer] = useState(TileColor.RED);

  const rows = [];
  for (let i = 0; i < COLS; i++) {
    rows.push(Array.from(Array(ROWS), () => TileColor.WHITE));
  }

  const [board, setBoard] = useState<TileColor[][]>(rows);

  function play(column: number) {
    console.log('column', column);
    const emptyIndexes: number[] = [];
    board.forEach(
      (row: any[], rowIndex: number) => {
        if (row[column] === TileColor.WHITE) {
          emptyIndexes.push(rowIndex);
        }
    });
    const move = Math.max(...emptyIndexes);
    console.log('move', move);
    console.log(emptyIndexes);
    board[move][column] = currentPlayer;
    setBoard([...board]);
    setCurrentPlayer(currentPlayer === TileColor.RED ? TileColor.YELLOW : TileColor.RED);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Connect Four</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <section className="">
          {board.map((row, i) => (
            <div className="flex" key={i}>
              {row.map((tile, j) => (
                <div onClick={() => play(j)}>
                  <Tile type={tile} key={j} val={i} />
                </div>
              ))}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default ConnectFourPage;
