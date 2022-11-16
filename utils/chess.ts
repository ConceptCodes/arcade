import { title } from "process";
import { chessEngine } from "../hooks/useChessBoard";
import { Square, Move } from 'chess.js'

export enum Piece {
  WHITE_PAWN = "White_Pawn",
  BLACK_PAWN = "Black_Pawn",

  WHITE_ROOK = "White_Rook",
  BLACK_ROOK = "Black_Rook",

  WHITE_KNIGHT = "White_Knight",
  BLACK_KNIGHT = "Black_Knight",

  WHITE_BISHOP = "White_Bishop",
  BLACK_BISHOP = "Black_Bishop",

  WHITE_QUEEN = "White_Queen",
  BLACK_QUEEN = "Black_Queen",

  WHITE_KING = "White_King",
  BLACK_KING = "Black_King",

  EMPTY = "Empty",
}

const chessJsMoves = {
  [Piece.WHITE_PAWN]: "P",
  [Piece.BLACK_PAWN]: "p",

  [Piece.WHITE_ROOK]: "R",
  [Piece.BLACK_ROOK]: "r",

  [Piece.WHITE_KNIGHT]: "N",
  [Piece.BLACK_KNIGHT]: "n",

  [Piece.WHITE_BISHOP]: "B",
  [Piece.BLACK_BISHOP]: "b",

  [Piece.WHITE_QUEEN]: "Q",
  [Piece.BLACK_QUEEN]: "q",

  [Piece.WHITE_KING]: "K",
  [Piece.BLACK_KING]: "k",

  [Piece.EMPTY]: "",
};

// a mapping of chessEngine pieces and my local enums

const chessJsPieces: any = {
  'p': Piece.BLACK_PAWN,
  'r': Piece.BLACK_ROOK,
  'n': Piece.BLACK_KNIGHT,
  'b': Piece.BLACK_BISHOP,
  'q': Piece.BLACK_QUEEN,
  'k': Piece.BLACK_KING,

  'P': Piece.WHITE_PAWN,
  'R': Piece.WHITE_ROOK,
  'N': Piece.WHITE_KNIGHT,
  'B': Piece.WHITE_BISHOP,
  'Q': Piece.WHITE_QUEEN,
  'K': Piece.WHITE_KING,

  '': Piece.EMPTY,
};

export const WikiImages = {
  [Piece.WHITE_PAWN]:
    "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg",
  [Piece.BLACK_PAWN]:
    "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg",

  [Piece.WHITE_ROOK]:
    "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg",
  [Piece.BLACK_ROOK]:
    "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg",

  [Piece.WHITE_KNIGHT]:
    "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg",
  [Piece.BLACK_KNIGHT]:
    "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg",

  [Piece.WHITE_BISHOP]:
    "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg",
  [Piece.BLACK_BISHOP]:
    "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg",

  [Piece.WHITE_QUEEN]:
    "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg",
  [Piece.BLACK_QUEEN]:
    "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg",

  [Piece.WHITE_KING]:
    "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg",
  [Piece.BLACK_KING]:
    "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg",

  [Piece.EMPTY]: "",
};

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
};

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
};

/**
 * Get Piece At a Given Position.
 * 
 * @param board {Piece[][]} the current board
 * @param pos {string} the position of the current piece
 * @returns {Piece[]} the piece at that given position
 */
export const getPiece = (board: Piece[][], pos: string): Piece => {
  const [rank, file] = positionToIndex(pos);
  return board[rank][file];
};


export const getAllMoves = (board: Piece[][] | undefined, pos: string): string[] | undefined => {
  if (board) {
    const piece = chessJsMoves[getPiece(board, pos)];
    const moves = chessEngine.moves({
      // piece,
      square: pos as Square,
      verbose: true,
    }) as Move[];
    return moves.map((x: Move) => x.to);
  }
};

export const boardToGrid = (board: any): Piece[][] => {
  return board.map((row: any, i: number) => {
    return row.map((col: any, j: number) => {
      const tile = board[i][j];
      if (tile) {
        const piece: string = tile.color != "w" ? tile.type : tile.type.toUpperCase();
        return chessJsPieces[piece];
      }
      return Piece.EMPTY;
    });
  });
};

// a function to generate a random board in FEN notation
export const generateFen = (): string => {
  const pieces = ["p", "r", "n", "b", "q", "k"];
  const board = [];
  for (let i = 0; i < 8; i++) {
    const row = [];
    for (let j = 0; j < 8; j++) {
      const piece = pieces[Math.floor(Math.random() * pieces.length)];
      row.push(piece);
    }
    board.push(row);
  }
  return board.join("/");
};


/**
 * Highlight Possible Moves
 * 
 * @param board {Piece[][]} the current board
 * @param color {'White' | 'Black'} the current player's color
 * @returns {string[]} the positions of the pieces that have more than one move
 */
export const positionsWithMoves = (
  board: Piece[][] | undefined,
  color: "White" | "Black"
): string[] => {
  const moves: string[] = [];
  board?.map((rows, rank) => {
    return rows.map((cols, file) => {
      const piece = board[rank][file];
      if (piece != Piece.EMPTY && piece.includes(color)) {
        const pos = indexToPosition([rank, file]);
        const moves = getAllMoves(board, pos);
        console.log(pos, moves)
        if (Array.isArray(moves) && moves.length > 1) {
          moves.push(pos);
        }
      }
    });
  });
  return moves;
};
