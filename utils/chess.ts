export enum Piece {
  PAWN = 'Pawn',
  KNIGHT = 'Knight',
  BISHOP = 'Bishop',
  ROOK = 'Rook',
  QUEEN = 'Queen',
  KING = 'King',
  EMPTY = 'Empty',
}

export const PIECES = {
  [Piece.PAWN]: {
    white: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg',
    black: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg',
  },
  [Piece.ROOK]: {
    white: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg',
    black: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg',
  },
  [Piece.KNIGHT]: {
    white: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg',
    black: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg',
  },
  [Piece.BISHOP]: {
    white: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg',
    black: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg',
  },
  [Piece.QUEEN]: {
    white: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg',
    black: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg',
  },
  [Piece.KING]: {
    white: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg',
    black: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg',
  },
  [Piece.EMPTY]: {
    white: '',
    black: '',
  },
}

export const defaultBoard = [
  [Piece.ROOK, Piece.KNIGHT, Piece.BISHOP, Piece.QUEEN, Piece.KING, Piece.BISHOP, Piece.KNIGHT, Piece.ROOK],
  [...Array(8).fill(Piece.PAWN)],
  [...Array(8).fill(Piece.EMPTY)],
  [...Array(8).fill(Piece.EMPTY)],
  [...Array(8).fill(Piece.EMPTY)],
  [...Array(8).fill(Piece.EMPTY)],
  [...Array(8).fill(Piece.PAWN)],
  [Piece.ROOK, Piece.KNIGHT, Piece.BISHOP, Piece.QUEEN, Piece.KING, Piece.BISHOP, Piece.KNIGHT, Piece.ROOK],
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

/**
 * 
 * @param board {Piece[][]} the current board
 * @param pos 
 * @returns 
 */
export const getPiece = (board: Piece[][], pos: string): Piece => {
  const [rank, file] = positionToIndex(pos);
  return board[rank][file];
}

export const possibleMoves = (board: Piece[][], pos: string): string[] => {
  const piece = getPiece(board, pos);
  switch (piece) {
    case Piece.PAWN:
      return pawnMoves(board, pos);
    case Piece.ROOK:
      return rookMoves(board, pos);
    case Piece.KNIGHT:
      return knightMoves(board, pos);
    case Piece.BISHOP:
      return bishopMoves(board, pos);
    case Piece.QUEEN:
      return queenMoves(board, pos);
    case Piece.KING:
      return kingMoves(board, pos);
    default:
      return [];
  }
}

const pawnMoves = (board: Piece[][], pos: string): string[] => {
  const [rank, file] = positionToIndex(pos);
  const moves: string[] = [];
  if (rank === 1) {
    if (board[rank + 1][file] === Piece.EMPTY) {
      moves.push(indexToPosition([rank + 1, file]));
      if (board[rank + 2][file] === Piece.EMPTY) {
        moves.push(indexToPosition([rank + 2, file]));
      }
    }
  } else if (rank < 7) {
    if (board[rank + 1][file] === Piece.EMPTY) {
      moves.push(indexToPosition([rank + 1, file]));
    }
  }
  return moves;
}

const rookMoves = (board: Piece[][], pos: string): string[] => {
  const [rank, file] = positionToIndex(pos);
  const moves: string[] = [];
  for (let i = rank + 1; i < 8; i++) {
    if (board[i][file] !== Piece.EMPTY) {
      break;
    }
    moves.push(indexToPosition([i, file]));
  }
  for (let i = rank - 1; i >= 0; i--) {
    if (board[i][file] !== Piece.EMPTY) {
      break;
    }
    moves.push(indexToPosition([i, file]));
  }
  for (let i = file + 1; i < 8; i++) {
    if (board[rank][i] !== Piece.EMPTY) {
      break;
    }
    moves.push(indexToPosition([rank, i]));
  }
  for (let i = file - 1; i >= 0; i--) {
    if (board[rank][i] !== Piece.EMPTY) {
      break;
    }
    moves.push(indexToPosition([rank, i]));
  }
  return moves;
}

const knightMoves = (board: Piece[][], pos: string): string[] => {
  const [rank, file] = positionToIndex(pos);
  const moves: string[] = [];
  const offsets = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];
  for (const [rankOffset, fileOffset] of offsets) {
    const newRank = rank + rankOffset;
    const newFile = file + fileOffset;
    if (newRank >= 0 && newRank < 8 && newFile >= 0 && newFile < 8) {
      moves.push(indexToPosition([newRank, newFile]));
    }
  }
  return moves;
}

const bishopMoves = (board: Piece[][], pos: string): string[] => {
  const [rank, file] = positionToIndex(pos);
  const moves: string[] = [];
  for (let i = 1; i < 8; i++) {
    if (rank + i < 8 && file + i < 8) {
      if (board[rank + i][file + i] !== Piece.EMPTY) {
        break;
      }
      moves.push(indexToPosition([rank + i, file + i]));
    }
  }
  for (let i = 1; i < 8; i++) {
    if (rank - i >= 0 && file - i >= 0) {
      if (board[rank - i][file - i] !== Piece.EMPTY) {
        break;
      }
      moves.push(indexToPosition([rank - i, file - i]));
    }
  }
  for (let i = 1; i < 8; i++) {
    if (rank + i < 8 && file - i >= 0) {
      if (board[rank + i][file - i] !== Piece.EMPTY) {
        break;
      }
      moves.push(indexToPosition([rank + i, file - i]));
    }
  }
  for (let i = 1; i < 8; i++) {
    if (rank - i >= 0 && file + i < 8) {
      if (board[rank - i][file + i] !== Piece.EMPTY) {
        break;
      }
      moves.push(indexToPosition([rank - i, file + i]));
    }
  }
  return moves;
}

const queenMoves = (board: Piece[][], pos: string): string[] => {
  return [...rookMoves(board, pos), ...bishopMoves(board, pos)];
}

const kingMoves = (board: Piece[][], pos: string): string[] => {
  const [rank, file] = positionToIndex(pos);
  const moves: string[] = [];
  const offsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  for (const [rankOffset, fileOffset] of offsets) {
    const newRank = rank + rankOffset;
    const newFile = file + fileOffset;
    if (newRank >= 0 && newRank < 8 && newFile >= 0 && newFile < 8) {
      moves.push(indexToPosition([newRank, newFile]));
    }
  }
  return moves;
}

// ----------------------------------------------------------------
export const isCheck = (board: Piece[][], pos: string): boolean => {
  const [rank, file] = positionToIndex(pos);
  const piece = board[rank][file];
  const opponent = piece === Piece.WHITE ? Piece.BLACK : Piece.WHITE;
  const opponentMoves = allPossibleMoves(board, opponent);
  return opponentMoves.includes(pos);
}

export const isCheckmate = (board: Piece[][], pos: string): boolean => {
  const [rank, file] = positionToIndex(pos);
  const piece = board[rank][file];
  const opponent = piece === Piece.WHITE ? Piece.BLACK : Piece.WHITE;
  const opponentMoves = allPossibleMoves(board, opponent);
  const moves = allPossibleMoves(board, piece);
  return opponentMoves.includes(pos) && moves.length === 0;
}

export const isStalemate = (board: Piece[][], pos: string): boolean => {
  const [rank, file] = positionToIndex(pos);
  const piece = board[rank][file];
  const opponent = piece === Piece.WHITE ? Piece.BLACK : Piece.WHITE;
  const opponentMoves = allPossibleMoves(board, opponent);
  const moves = allPossibleMoves(board, piece);
  return !opponentMoves.includes(pos) && moves.length === 0;
}

export const isDraw = (board: Piece[][], pos: string): boolean => {
  const [rank, file] = positionToIndex(pos);
  const piece = board[rank][file];
  const opponent = piece === Piece.WHITE ? Piece.BLACK : Piece.WHITE;
  const opponentMoves = allPossibleMoves(board, opponent);
  const moves = allPossibleMoves(board, piece);
  return !opponentMoves.includes(pos) && moves.length === 0;
}
// ----------------------------------------------------------------


export const allPossibleMoves = (board: Piece[][], pos: string): string[] => {
  const moves: string[] = [];
  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      if (board[rank][file] === getPiece(board, pos)) {
        const pos = indexToPosition([rank, file]);
        moves.push(...possibleMoves(board, pos));
      }
    }
  }
  return moves;
}



