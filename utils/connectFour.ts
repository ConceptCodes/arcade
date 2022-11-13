import { Players } from "../hooks/useGameState";

export enum TileColor {
  WHITE,
  RED,
  YELLOW,
};

export const tiles = {
  [Players.CPU]: TileColor.RED,
  [Players.YOU]: TileColor.YELLOW,
};

/**
 * Calculates the winner of a connect four game.
 * 
 * @param board {TileColor[][]}
 * @returns {[TileColor, [[number, number]]]} The winning player and the winning tiles
 */
export function calculateWinner(board: TileColor[][]) {
  // check rows
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length - 3; col++) {
      const player = board[row][col];
      if (
        player !== TileColor.WHITE &&
        player === board[row][col + 1] &&
        player === board[row][col + 2] &&
        player === board[row][col + 3]
      ) {
        return [
          player,[
            [row, col],
            [row, col + 1],
            [row, col + 2],
            [row, col + 3]
          ]
        ];
      }
    }
  }
  // check columns
  for (let row = 0; row < board.length - 3; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const player = board[row][col];
      if (
        player !== TileColor.WHITE &&
        player === board[row + 1][col] &&
        player === board[row + 2][col] &&
        player === board[row + 3][col]
      ) {
        return [
          player,
          [
            [row, col],
            [row + 1, col],
            [row + 2, col],
            [row + 3, col],
          ]
        ];
      }
    }
  }
  // check diagonals
  for (let row = 0; row < board.length - 3; row++) {
    for (let col = 0; col < board[row].length - 3; col++) {
      const player = board[row][col];
      if (
        player !== TileColor.WHITE &&
        player === board[row + 1][col + 1] &&
        player === board[row + 2][col + 2] &&
        player === board[row + 3][col + 3]
      ) {
        return [
          player,
          [
            [row, col],
            [row + 1, col + 1],
            [row + 2, col + 2],
            [row + 3, col + 3],
          ]
        ];
      }
    }
  }
  // check other diagonals
  for (let row = 0; row < board.length - 3; row++) {
    for (let col = board[row].length - 1; col > 2; col--) {
      const player = board[row][col];
      if (
        player !== TileColor.WHITE &&
        player === board[row + 1][col - 1] &&
        player === board[row + 2][col - 2] &&
        player === board[row + 3][col - 3]
      ) {
        return [
          player,
          [
            [row, col],
            [row + 1, col - 1],
            [row + 2, col - 2],
            [row + 3, col - 3],
          ]
        ];
      }
    }
  }
  return [TileColor.WHITE, [[]]];
};

/**
 * check if the column is empty
 * @param board {TileColor[][]} the game board
 * @param col {number} the column to check
 * @returns {boolean} true if the column is empty
 */
 export function isColumnValid(
  board: number[][], 
  column: number
  ): boolean {
  if (board[0][column] == TileColor.WHITE) return true;
  return false;
};

/**
 * Check for columns that are not full
 * 
 * @param board {TileColor[][]}
 * @returns {number[]} The columns that were not full
 */
export function getValidMoves(board: TileColor[][]) {
  const availableCols = [];
  for (let i = 0; i < board[0].length; i++) 
    if (isColumnValid(board, i)) availableCols.push(i);
  return availableCols;
};

/**
 * Randomize array in-place using Durstenfeld shuffle algorithm
 * 
 * @param array {number[]}
 */
export function shuffle(array: number[]) {
  for (var i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

export function minimax(board: TileColor[][], depth: number, isMaximizing: boolean) {
  const [winner, _] = calculateWinner(board);
  let bestCols;
  if (winner !== TileColor.WHITE) {
    return winner === TileColor.RED ? 1 : -1;
  }
  if (depth === 0) return 0;
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const col of getValidMoves(board)) {
      const newBoard = [...board];
      newBoard[0][col] = TileColor.RED;
      const score = minimax(newBoard, depth - 1, false);
      bestScore = Math.max(score, bestScore);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const col of getValidMoves(board)) {
      const newBoard = [...board];
      newBoard[0][col] = TileColor.YELLOW;
      const score = minimax(newBoard, depth - 1, true);
      bestScore = Math.min(score, bestScore);
    }
    return bestScore;
  }
}




