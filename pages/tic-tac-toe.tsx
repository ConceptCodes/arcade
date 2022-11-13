import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useGameState, GameState, Players } from "../hooks/useGameState";
import Tile from "../components/TicTacToeTile";
import {
  symbols,
  getAiDecision,
  emptyTiles,
  calculateWinner,
} from "../utils/tictactoe";

const TicTacToe: NextPage = () => {
  const [currentGameState, updateGameState] = useGameState();
  const [tiles, updateBoard] = useState<string[]>(Array(9).fill(""));
  const [winner, setWinner] = useState<Players>();
  const [highlight, setHighlight] = useState<number[]>([]);

  useEffect(() => {
    if (winner) {
      updateGameState(
        winner === symbols[Players.PLAYER]
          ? GameState.PLAYER_WINS
          : GameState.CPU_WINS
      );
    }
    if (!winner && currentGameState === GameState.CPU_IS_NEXT) cPUPlay();
    if (!winner && (emptyTiles(tiles).length === 0)) updateGameState(GameState.DRAW);
    let win: any = calculateWinner(tiles);
    if (win) {
      setWinner(win[0]);
      setHighlight(win[1]);
    }
  }, [currentGameState]);

  // NOTE: return the game back to its initial state
  function reset() {
    updateGameState(GameState.PLAYER_IS_NEXT);
    updateBoard([...Array(9).fill("")]);
    if (winner) setWinner(undefined);
    if (highlight.length) setHighlight([]);
  }

  async function cPUPlay() {
    if (winner || currentGameState === GameState.DRAW) return;
    setTimeout(() => {
      const nextMove = getAiDecision(tiles);
      play(nextMove);
      updateGameState(GameState.PLAYER_IS_NEXT);
    }, 600);
  }

  function play(move: number) {
    if (winner || currentGameState === GameState.DRAW) return;
    tiles[move] = currentGameState === GameState.PLAYER_IS_NEXT
      ? symbols[Players.PLAYER]
      : symbols[Players.CPU];
    updateBoard([...tiles]);
  }

  return (
    <div>
      <Head>
        <title>Tic Tac Toe</title>
      </Head>
      <main className="flex min-h-screen bg-slate-100 space-y-6 flex-col justify-center items-center">
        {winner && (
          <h1 className="text-6xl pb-3 font-medium">
            {winner === symbols[Players.CPU] ? "🤖" : "🙋🏾‍♂️"} won
          </h1>
        )}
        {
        (currentGameState === GameState.DRAW) && (
          <h1 className="text-6xl pb-3 font-medium">
            😅 Draw
          </h1>
        )}
        <div className="grid grid-cols-3 gap-4">
          {tiles.map((_, index: number) => {
            return (
              <Tile
                key={index}
                value={tiles[index]}
                highlight={highlight.includes(index)}
                onClick={() => {
                  if (currentGameState === GameState.PLAYER_IS_NEXT)
                    play(index);
                  updateGameState(GameState.CPU_IS_NEXT);
                }}
              />
            );
          })}
        </div>
        <button
          className="bg-red-500 text-white rounded-lg p-3 w-[150px] text-lg"
          onClick={() => reset()}
        >
          {winner ? "Play again" : "Reset"}
        </button>
      </main>
    </div>
  );
};

export default TicTacToe;
