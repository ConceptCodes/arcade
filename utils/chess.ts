import { Chess, Square } from 'chess.js';

const chess = new Chess();

export enum Piece {
  WHITE_PAWN = 'White_Pawn',
  BLACK_PAWN = 'Black_Pawn',

  WHITE_ROOK = 'White_Rook',
  BLACK_ROOK = 'Black_Rook',

  WHITE_KNIGHT = 'White_Knight',
  BLACK_KNIGHT = 'Black_Knight',

  WHITE_BISHOP = 'White_Bishop',
  BLACK_BISHOP = 'Black_Bishop',

  WHITE_QUEEN = 'White_Queen',
  BLACK_QUEEN = 'Black_Queen',

  WHITE_KING = 'White_King',
  BLACK_KING = 'Black_King',

  EMPTY = 'Empty',
}

export const WikiImages = {
  [Piece.WHITE_PAWN]: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg',
  [Piece.BLACK_PAWN]: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg',

  [Piece.WHITE_ROOK]: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg',
  [Piece.BLACK_ROOK]: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg',

  [Piece.WHITE_KNIGHT]: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg',
  [Piece.BLACK_KNIGHT]: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg',

  [Piece.WHITE_BISHOP]: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg',
  [Piece.BLACK_BISHOP]: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg',

  [Piece.WHITE_QUEEN]: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg',
  [Piece.BLACK_QUEEN]: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg',

  [Piece.WHITE_KING]: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg',
  [Piece.BLACK_KING]: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg',
  
  [Piece.EMPTY]: '',
}

export const defaultBoard = [
  [Piece.WHITE_ROOK, Piece.WHITE_KNIGHT, Piece.WHITE_BISHOP, Piece.WHITE_QUEEN, Piece.WHITE_KING, Piece.WHITE_BISHOP, Piece.WHITE_KNIGHT, Piece.WHITE_ROOK],
  [...Array(8).fill(Piece.WHITE_PAWN)],
  [...Array(8).fill(Piece.EMPTY)],
  [...Array(8).fill(Piece.EMPTY)],
  [...Array(8).fill(Piece.EMPTY)],
  [...Array(8).fill(Piece.EMPTY)],
  [...Array(8).fill(Piece.BLACK_PAWN)],
  [Piece.BLACK_ROOK, Piece.BLACK_KNIGHT, Piece.BLACK_BISHOP, Piece.BLACK_QUEEN, Piece.BLACK_KING, Piece.BLACK_BISHOP, Piece.BLACK_KNIGHT, Piece.BLACK_ROOK],
];

/**
 * Index To Position 
 *
 * @param pos {[row, col]} the position of the current piece
 * @returns {string} the position of the current piece in algebraic notation
 */
export const indexToPosition = (pos: [number, number]): string => {
  const file = String.fromCharCode(97 + pos[1]);
  const rank = 8 - pos[0];
  return `${file}${rank}`;
}

/**
 * Position To Index
 * 
 * @param pos {string} the position of the current piece
 * @returns {[number, number]} the index of the current piece 
 */
export const positionToIndex = (pos: string): [number, number] => {
  const file = pos[0].charCodeAt(0) - 97;
  const rank = 8 - parseInt(pos[1]);
  return [rank, file];
}

// convert pgn move to algerabic notation
export const pgnToPosition = (pgn: string): string  => {

}
  

/**
 * 
 * @param board {Piece[][]} the current board
 * @param pos {string} the position of the current piece
 * @returns {Piece[]} the piece at that given position
 */
export const getPiece = (board: Piece[][], pos: string): Piece => {
  const [rank, file] = positionToIndex(pos);
  return board[rank][file];
}

const chessJsMoves = {
  [Piece.WHITE_PAWN]: 'p',
  [Piece.BLACK_PAWN]: 'P',
  
  [Piece.WHITE_ROOK]: 'r',
  [Piece.BLACK_ROOK]: 'R',

  [Piece.WHITE_KNIGHT]: 'n',
  [Piece.BLACK_KNIGHT]: 'N',

  [Piece.WHITE_BISHOP]: 'b',
  [Piece.BLACK_BISHOP]: 'B',

  [Piece.WHITE_QUEEN]: 'q',
  [Piece.BLACK_QUEEN]: 'Q',

  [Piece.WHITE_KING]: 'k',
  [Piece.BLACK_KING]: 'K',

  [Piece.EMPTY]: '',
}

export const getAllMoves = (board: Piece[][], pos: string): string[] => {
  const piece = chessJsMoves[getPiece(board, pos)];
  const moves = chess.moves({ piece, square: pos as Square, verbose: true }) as string[];
  return moves.map(x => x.to)
}