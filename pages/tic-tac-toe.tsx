import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

import Tile from "../components/TicTacToeTile";

import TicTacToe from "../utils/tictactoe";
import { GameState, Players } from "../utils/game";

const TicTacToePage: NextPage = () => {
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [winner, setWinner] = useState<Players>();
  const game = new TicTacToe(board, {
    [Players.YOU]: "❌",
    [Players.CPU]: "⭕️",
  });
  const [highlight, setHighlight] = useState<number[]>([]);

  useEffect(() => {
    if (winner) {
      // TODO: do something cool
    }
    if (!winner && game.currentState === GameState.PLAYER_IS_NEXT)
      setTimeout(() => {
        game.makeMove(game.aiMove());
      }, 600);
    if (!winner && game.isDraw()) {
    }
    let win = game.calculateWinner();
    if (win) {
      setWinner(win);
      // setHighlight(win[1]);
    }
    if (winner || game.currentState === GameState.DRAW) return;
  }, [game.currentState]);


  function reset() {
    if (winner) setWinner(undefined);
    if (highlight.length) setHighlight([]);
    game.reset();
  }

  return (
    <div>
      <Head>
        <title>Tic Tac Toe</title>
      </Head>
      <main className="flex min-h-screen bg-slate-100 space-y-6 flex-col justify-center items-center">
        {winner && (
          <h1 className="text-6xl pb-3 font-medium">
            {winner === game.symbols[Players.CPU] ? "🤖" : "🙋🏾‍♂️"} won
          </h1>
        )}
        {game.currentState === GameState.DRAW && (
          <h1 className="text-6xl pb-3 font-medium">😅 Draw</h1>
        )}
        <div className="grid grid-cols-3 gap-4">
          {game.board.map((row, i) =>
            row.map((col, j) => (
              <Tile
                key={i + "" + j}
                value={col}
                onClick={() => {
                  game.makeMove([i, j]);
                  console.log("BOARD", game.board);
                }}
                highlight={highlight.includes(i * 3 + j)}
              />
            ))
          )}
        </div>
        <button
          className="bg-red-500 text-white rounded-lg p-3 w-[150px] text-lg"
          onClick={reset}
        >
          {winner ? "Play again" : "Reset"}
        </button>
      </main>
    </div>
  );
};

export default TicTacToePage;
