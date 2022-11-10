import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import Tile from "../components/ConnectFourTile";
import { TileColor } from "../utils/connectFour";
import { useGameState, GameState } from "../hooks/useGameState";
import { Players } from "../hooks/useGameState";
import {
  getValidMoves,
  shuffle,
  calculateWinner,
  tiles
} from "../utils/connectFour";
import { toast } from 'react-toastify';

// TODO: make sure it does not error out when the column is full

const ConnectFourPage: NextPage = () => {
  const COLS = 6;
  const ROWS = 6;
  const [currentPlayer, setCurrentPlayer] = useState(Players.YOU);
  const [winner, crownWinner] = useState<Players>();

  function initBoard () {
    const rows = [];
    for (let i = 0; i < COLS; i++) {
      rows.push(Array.from(Array(ROWS), () => TileColor.WHITE));
    }
    return rows;
  }

  const [board, setBoard] = useState<TileColor[][]>(initBoard());

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

  function reset() {
    setBoard(initBoard());
    crownWinner(undefined);
    setCurrentPlayer(Players.YOU);
  }

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      crownWinner(winner === TileColor.YELLOW ? Players.YOU : Players.CPU);
    }
    if (currentPlayer === Players.CPU) {
      const validMoves = getValidMoves(board);
      shuffle(validMoves);
      play(validMoves[0]);
    }
  }, [board]);

  

  return (
    <div className="flex min-h-screen flex-col bg-slate-200 items-center justify-center py-2">
      <Head>
        <title>Connect Four</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 space-y-4 text-center">
        <section className="">
          <h1 className="text-6xl font-bold pb-3">
            {winner && `Winner is ${winner === Players.YOU ? "🟡" : "🔴"}`}
          </h1>
          {board.map((row, i) => (
            <div className="flex shadow-lg" key={i}>
              {row.map((tile, j) => (
                <div key={j} onClick={() => play(j)}>
                  <Tile type={tile} />
                </div>
              ))}
            </div>
          ))}
        </section>
        <button
          className="bg-blue-500 text-white rounded-lg p-3 w-[150px] text-lg"
          onClick={() => reset()}
        >
          {winner ? "Play again" : "Reset"}
        </button>
      </main>
    </div>
  );
};

export default ConnectFourPage;


