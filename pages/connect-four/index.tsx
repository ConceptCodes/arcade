import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import Tile, { TileColor } from "./tile";
import { useGameState, GameState } from '../../hooks/useGameState';
import { Players } from "../../hooks/useGameState";
import { isColumnValid, makeMove, getValidMoves, isValidMove, shuffle } from './util';

const ConnectFourPage: NextPage = () => {
  const COLS = 6;
  const ROWS = 6;
  const [currentPlayer, setCurrentPlayer] = useState(Players.YOU);
  const [winner, crownWinner] = useState<Players>();

  const rows = [];
  for (let i = 0; i < COLS; i++) {
    rows.push(Array.from(Array(ROWS), () => TileColor.WHITE));
  }

  const tiles = {
    [Players.CPU]: TileColor.RED,
    [Players.YOU]: TileColor.YELLOW,
  };

  function calculateWinner(_player: Players): boolean {
    const chosen = tiles[_player];
    // horizontalCheck
    for (let j = 0; j < ROWS - 3; j++) {
      for (let i = 0; i < COLS; i++) {
        if (
          board[i][j] == chosen &&
          board[i][j + 1] == chosen &&
          board[i][j + 2] == chosen &&
          board[i][j + 3] == chosen
        ) {
          return true;
        }
      }
    }
    // verticalCheck
    for (let i = 0; i < ROWS - 3; i++) {
      for (let j = 0; j < COLS; j++) {
        if (
          board[i][j] == chosen &&
          board[i + 1][j] == chosen &&
          board[i + 2][j] == chosen &&
          board[i + 3][j] == chosen
        ) {
          return true;
        }
      }
    }
    // ascendingDiagonalCheck
    for (let i = 3; i < ROWS; i++) {
      for (let j = 0; j < COLS - 3; j++) {
        if (
          board[i][j] == chosen &&
          board[i - 1][j + 1] == chosen &&
          board[i - 2][j + 2] == chosen &&
          board[i - 3][j + 3] == chosen
        )
          return true;
      }
    }
    // descendingDiagonalCheck
    for (let i = 3; i < ROWS; i++) {
      for (let j = 3; j < COLS; j++) {
        if (
          board[i][j] == chosen &&
          board[i - 1][j - 1] == chosen &&
          board[i - 2][j - 2] == chosen &&
          board[i - 3][j - 3] == chosen
        )
          return true;
      }
    }
    return false;
  }

  const [board, setBoard] = useState<TileColor[][]>(rows);

  function play(column: number): void {
    if (!winner) {
      const emptyIndexes: number[] = [];
      board.forEach((row: any[], rowIndex: number) => {
        if (row[column] === TileColor.WHITE) {
          emptyIndexes.push(rowIndex);
        }
      });
      const move = Math.max(...emptyIndexes);
      board[move][column] = tiles[currentPlayer];
      setBoard([...board]);
      // if (calculateWinner(currentPlayer)) {
      //   crownWinner(currentPlayer);
      // }
      setCurrentPlayer(currentPlayer === Players.YOU ? Players.CPU : Players.YOU);
    }
  }

  function MiniMaxAlphaBeta(depth: number, player: Players): number {
    //get array of possible moves 
    const validMoves = getValidMoves(board);
    shuffle(validMoves); // shuffle the array to randomize the moves
    let bestMove  = validMoves[0];
    let bestScore = -Infinity;

    // # initial alpha & beta values for alpha-beta pruning
    let alpha = -Infinity;
    let beta = Infinity;

    const opponent = (player == Players.CPU) ? Players.YOU : Players.CPU;
  
    // # go through all of those boards
    for (let move of validMoves) {
        // # create new board from move
        let tempBoard: any = makeMove(board, move, player);
        // # call min on that new board
        let boardScore = minimizeBeta(tempBoard.board, depth - 1, alpha, beta, player, opponent)
        if (boardScore > bestScore) {
            bestScore = boardScore;
            bestMove = move;
        }
    }
    return bestMove;
  }

  function minimizeBeta(
    board: TileColor[][], 
    depth: number, 
    a: number, 
    b: number, 
    player: Players, 
    opponent: Players,
    ): number {
      let validMoves: number[] = [];
      for (let col = 0; col < board[0].length; col++) {
          // # if column col is a legal move...
          if (isValidMove(col, board)) {
            // # make the move in column col for curr_player
            let temp: any = makeMove(board, col, player);
            validMoves.push(temp.col);
          }
      }
      // # check to see if game over
      // if (depth == 0 || validMoves.length == 0) alert('game over'); 
      
      validMoves = getValidMoves(board); 
      let beta = b
      
      // # if end of tree evaluate scores
      for (let move of validMoves) {
        let boardScore = Infinity;
        // # else continue down tree as long as ab conditions met
        if (a < beta) {
          let tempBoard: any = makeMove(board, move, opponent);
          boardScore = maximizeAlpha(tempBoard.board, depth - 1, a, beta, player, opponent);
        }

        if (boardScore < beta) beta = boardScore;
      }
      return beta;
  }

  function maximizeAlpha(
    board: TileColor[][], 
    depth: number, 
    a: number, 
    b: number, 
    player: Players, 
    opponent: Players,
  ): number {
    let validMoves: number[] = [];
    for (let col = 0; col < board.length; col++) {
      // # if column col is a legal move...
      if (isValidMove(col, board)) {
        // # make the move in column col for curr_player
        let temp: any = makeMove(board, col, player);
        validMoves.push(temp.col);
      }
    }
    // # check to see if game over
    // if (depth == 0 || validMoves.length == 0) alert('game over');

    let alpha = a;        
    // # if end of tree, evaluate scores
    for (let move of validMoves) {
      let boardScore = -Infinity;
      if (alpha < b) {
        let tempBoard: any = makeMove(board, move, player);
        boardScore = minimizeBeta(tempBoard.board, depth - 1, alpha, b, player, opponent);
      }

      if (boardScore > alpha) alpha = boardScore
    }
    return alpha;
  }

  useEffect(() => {
    if (calculateWinner(Players.YOU)) crownWinner(Players.YOU);
    if (calculateWinner(Players.CPU)) crownWinner(Players.CPU);
    // if (currentPlayer === Players.CPU) {
    //   setTimeout(() => {
    //     play(MiniMaxAlphaBeta(4, Players.CPU));
    //   }, 1000);
    // }
  }, [board]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Connect Four</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <section className="">
          <h1 className="text-6xl font-bold pb-3">
            { winner && `Winner is ${ winner === Players.YOU ? '🟡' : '🔴'}` }
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
