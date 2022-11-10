import { Players } from "../hooks/useGameState";

export enum TileColor {
  WHITE,
  RED,
  YELLOW,
}

// a function to calculate the winner of a connect four game
export const calculateWinner = (board: TileColor[][]) => {
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
  return TileColor.WHITE;
};

// a function to check if
// returns the winner or null if there is no winner
// return the index of the winning tile



/**
 * check if the column is empty
 */
 export const isColumnValid = 
    (board: number[][], column: number): boolean => {
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


// #check if the played move is in empty column or not
// export function isValidMove(col: number, board: number[][]) {
//   for (let i = 0; i < board.length; i++) {
//     if (board[i][col] === TileColor.WHITE) return true;
//   }
//   return false;
// }

/* Randomize array in-place using Durstenfeld shuffle algorithm */
export function shuffle(array: number[]) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

export const tiles = {
  [Players.CPU]: TileColor.RED,
  [Players.YOU]: TileColor.YELLOW,
};

export function makeMove(board: TileColor[][], col: number, player: Players) {
  let tmp = [...board];
  for (let i = tmp.length - 1; i >= 0; i--) {
    if (tmp[i][col] === TileColor.WHITE) {
      tmp[i][col] = tiles[player];
    }
  }
  return [board, col];
}


