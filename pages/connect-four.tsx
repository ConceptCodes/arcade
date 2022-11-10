import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import Tile from "../components/ConnectFourTile";
import { TileColor } from "../utils/connectFour";
import { useGameState, GameState } from "../hooks/useGameState";
import { Players } from "../hooks/useGameState";
import {
  makeMove,
  getValidMoves,
  isValidMove,
  shuffle,
  tiles,
} from "../utils/connectFour";
import { toast } from 'react-toastify';

// TODO: make sure it does not error out when the column is full

const ConnectFourPage: NextPage = () => {
  const COLS = 6;
  const ROWS = 6;
  const [currentPlayer, setCurrentPlayer] = useState(Players.YOU);
  const [winner, crownWinner] = useState<Players>();

  const rows = [];
  for (let i = 0; i < COLS; i++) {
    rows.push(Array.from(Array(ROWS), () => TileColor.WHITE));
  }

  const [board, setBoard] = useState<TileColor[][]>(rows);

  function play(column: number): void {
    if (winner) return;
    const emptyIndexes: number[] = [];
    board.forEach((row: any[], rowIndex: number) => {
      if (row[column] === TileColor.WHITE) {
        emptyIndexes.push(rowIndex);
      }
    });
    const move = Math.max(...emptyIndexes) || 0;
    if (move < 0) {
      toast.error('🙃 This column is full!');
      return;
    }
    board[move][column] = tiles[currentPlayer];
    setBoard([...board]);
    setCurrentPlayer(
      currentPlayer === Players.YOU ? Players.CPU : Players.YOU
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Connect Four</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <section className="">
          <h1 className="text-6xl font-bold pb-3">
            {winner && `Winner is ${winner === Players.YOU ? "🟡" : "🔴"}`}
          </h1>
          {board.map((row, i) => (
            <div className="flex" key={i}>
              {row.map((tile, j) => (
                <div key={j} onClick={() => play(j)}>
                  <Tile type={tile} />
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


