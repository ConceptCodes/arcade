import { Players } from '../../hooks/useGameState';
import { TileColor } from './tile';

/**
 * check if the column is empty
 */
export const isColumnValid = (board: number[][], column: number): boolean => {
  if (board[0][column] == TileColor.WHITE) return true;
  return false;
}

// return all valid moves (empty columns) from the board
export function getValidMoves(board: number[][]) {
  let availableCols = [];
  for (let i = 0; i < board[0].length; i++) {
    if (isColumnValid(board, i)) availableCols.push(i);
  }
  return availableCols;
}

// #places the current move's player ['x'|'o'] in the referenced column in the board

// #check if the played move is in empty column or not
export function isValidMove(col: number, board: number[][]) {
  for (let i = 0; i < board.length; i++) {
    if (board[i][col] == TileColor.WHITE) return true;
  }
  return false;
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
export function shuffle(array: number[]) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

export function makeMove(board: number[][], col: number, player: any) {
  let tmp = [...board];
  for (let i = tmp.length - 1; i >= 0; i--) {
    if (tmp[i][col] == TileColor.WHITE) {
      tmp[i][col] = player;
      console.log({ tmp });
      return { board: tmp, row: i, col };
      break;
    }
  }
}
