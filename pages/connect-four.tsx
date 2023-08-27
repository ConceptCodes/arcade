import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Tile from '../components/ConnectFourTile';
import { TileColor } from '../utils/connectFour';
import { Players } from '../hooks/useGameState';
import {
  getValidMoves,
  calculateWinner,
  tiles,
} from '../utils/connectFour';
import { MoveParserResponseType, playConnectFour } from "../hooks/useAi";
import { toast } from 'react-toastify';

const ConnectFourPage: NextPage = () => {
  const COLS = 6;
  const ROWS = 6;
  const [currentPlayer, setCurrentPlayer] = useState(Players.YOU);
  const [winner, crownWinner] = useState<Players>();
  const [highlight, setHighlight] = useState<number[][] | any>();
  const [results, setResults] = useState<MoveParserResponseType[]>([]);

  function initBoard() {
    const rows = [];
    for (let i = 0; i < COLS; i++) {
      rows.push(Array.from(Array(ROWS), () => TileColor.WHITE));
    }
    return rows;
  }

  const [board, setBoard] = useState<TileColor[][]>(initBoard());

  const strinfyBoard = (board: TileColor[][]) => {
    return board.map((row) => row.join(' ')).join('\n');
  }

  function play(column: number): void {
    if (winner) return;
    const emptyIndexes: number[] = [];
    board.forEach((row: TileColor[], rowIndex: number) => {
      if (row[column] === TileColor.WHITE)
        emptyIndexes.push(rowIndex);
    });
    console.log('Empty indexes:', emptyIndexes);
    const move = Math.max(...emptyIndexes) || 0;
    if (move < 0) {
      toast.error('This column is full!');
      return;
    }
    board[move][column] = tiles[currentPlayer];
    setBoard([...board]);
    setCurrentPlayer(
      currentPlayer === Players.YOU ? Players.CPU : Players.YOU
    );
  }

  async function AiPlay() {
    const result = await playConnectFour(strinfyBoard(board), '1');
    play(result.column);
    setResults([...results, result]);
  }

  function reset() {
    setBoard(initBoard());
    crownWinner(undefined);
    setCurrentPlayer(Players.YOU);
    setHighlight([]);
    setResults([]);
  }

  useEffect(() => {
    const [winner, winningTiles] = calculateWinner(board);
    if (winner) {
      crownWinner(winner === TileColor.YELLOW ? Players.YOU : Players.CPU);
      setHighlight(winningTiles);
      return;
    }
    if (currentPlayer === Players.CPU && !winner) AiPlay();
  }, [board]);

  function shouldHighlight(arr: number[]) {
    if (!highlight) return false;
    for (var i = 0; i < highlight.length; i++) {
      let checker = false;
      for (var j = 0; j < highlight[i].length; j++) {
        if (highlight[i][j] === arr[j]) checker = true;
        else {
          checker = false;
          break;
        }
      }
      if (checker) return true;
    }
    return false;
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-200 justify-center py-2">
      <Head>
        <title>Connect Four</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 space-y-4">
        <section className="">
          <h1 className="text-6xl font-bold pb-3">
            {
              winner && `Winner is ${winner === Players.YOU ? '🟡' : '🔴'}`
            }
            {
              !winner && currentPlayer === Players.YOU ? 'Your turn' : 
                'AI is thinking...'
            }
          </h1>
          <section className='flex space-x-4'>
            <article className='flex flex-col border-2 w-1/2 max-h-[500px] overflow-y-auto'>
              {
                results.reverse().map((result, i) => (
                  <div className='flex flex-col text-left my-3 p-3 rounded-md bg-white' key={i}>
                    <h2 className='text-xl font-bold'>Move {i + 1}</h2>
                    <p>Best move: <strong>{result.column}</strong></p>
                    <p>Reasoning</p>
                    <strong>{result.explanation}</strong>
                  </div>
                ))
              }
            </article>
          <section className='w-1/2'>
            {board.map((row, i) => (
              <div className="flex shadow-lg" key={i}>
                {row.map((tile, j) => (
                  <div key={j} onClick={() => play(j)}>
                    <Tile highlight={shouldHighlight([i, j])} type={tile} />
                  </div>
                ))}
              </div>
            ))}
          </section>
          </section>
        </section>
        <button
          className="bg-red-500 text-white rounded-lg p-3 w-[150px] text-lg"
          onClick={() => reset()}
        >
          {winner ? 'Play again' : 'Reset'}
        </button>
      </main>
    </div>
  );
};

export default ConnectFourPage;


