import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useGameState, GameState, Players } from "../../hooks/useGameState";
import { toast } from "react-toastify";
import { useHotkeys } from "react-hotkeys-hook";
import Tile from "./tile";

const TicTacToe: NextPage = () => {
  const [currentGameState, updateGameState] = useGameState();
  const [tiles, updateBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [highlight, setHighlight] = useState<number[]>([]);

  useHotkeys('escape', () => {
    updateBoard([...Array(9).fill(null)]);
    setWinner(null);
    setHighlight([]);
  });

  const symbols = {
    [Players.PLAYER]: "❌",
    [Players.CPU]: "⭕",
  };

  useEffect(() => {
    if (!winner && currentGameState === GameState.CPU_IS_NEXT) cPUPlay();
    if (winner) {
      updateGameState((winner === symbols[Players.PLAYER]) 
        ? GameState.PLAYER_WINS : GameState.CPU_WINS);
    }
    if(currentGameState === GameState.DRAW) {
      toast.info("It's a draw!");
    }
  }, [currentGameState]);

  function reset() {
    updateBoard([...Array(9).fill(null)]);
    updateGameState(GameState.PLAYER_IS_NEXT);
    if (winner) setWinner(null);
    if (highlight.length) setHighlight([]);
  }

  function calculateWinner() {
    const possibleLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    // go over all possibly winning lines and check if they consist of only X's/only O's
    for (let i = 0; i < possibleLines.length; i++) {
      const [a, b, c] = possibleLines[i];
      if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
        return tiles[a];
      } 
      else if (tiles.every((tile) => tile === symbols[Players.PLAYER] || tile === symbols[Players.CPU])) {
        updateGameState(GameState.DRAW);
      }
    }
    return null;
  }

  async function cPUPlay() {
    const nextMove: number = getAiDecision();
    play(nextMove);
    updateGameState(GameState.PLAYER_IS_NEXT);
  }

  async function getRandomDecision(): Promise<any> {
    const emptyIndexes: any[] = [];
    tiles.forEach((cell, index) => {
      if (!cell) emptyIndexes.push(index);
    });
    const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(emptyIndexes[randomIndex]);
      }, 600);
    });
  }

  const scores = {
    [symbols[Players.PLAYER]]: -1,
    [symbols[Players.CPU]]: 1,
    draw: 0,
  }

  function minimax(depth: number, isMaximizing: boolean) {
    let result = calculateWinner();
    if (result !== null) {
      return scores[result];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < tiles.length; i++) {
        if (tiles[i] === null) {
          tiles[i] = symbols[Players.CPU];
          let score = minimax(tiles, depth + 1, false);
          tiles[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < tiles.length; i++) {
        if (tiles[i] === null) {
          tiles[i] = symbols[Players.PLAYER];
          let score = minimax(tiles, depth + 1, true);
          tiles[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  function getAiDecision() {
    let bestScore: number = -Infinity;
    let bestMove: number = 1;
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i] === null) {
        tiles[i] = symbols[Players.CPU];
        const score: number = minimax(0, false);
        tiles[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove
  }

  function play(move: number) {
    if (winner) return;
    tiles[move] =
      currentGameState === GameState.PLAYER_IS_NEXT
        ? symbols[Players.PLAYER]
        : symbols[Players.CPU];
    updateBoard([...tiles]);
  }

  function renderTile(i: number) {
    return (
      <Tile
        value={tiles[i]}
        highlight={highlight.includes(i)}
        onClick={() => {
          if (currentGameState == GameState.PLAYER_IS_NEXT) 
            play(i);
          updateGameState(GameState.CPU_IS_NEXT);
        }}
      />
    );
  }

  // TODO: add logic to check if game is a draw

  return (
    <div>
      <Head>
        <title>Tic Tac Toe</title>
      </Head>
      <main className="flex min-h-screen bg-slate-100 space-y-6 flex-col justify-center items-center">
       { winner && <h1 className="text-4xl pb-3">{winner === symbols[Players.CPU] ? '🤖': '🙋🏾‍♂️'} won</h1> }
        <div className="grid grid-cols-3 gap-4">
          {tiles.map((_, index: number) => renderTile(index))}
        </div>
        <button className="bg-red-500 text-white rounded-lg p-3 w-[150px] text-lg" onClick={() => reset()}>
          { winner ? 'Play again' : 'Reset' }
        </button>
      </main>
    </div>
  );
};

export default TicTacToe;
