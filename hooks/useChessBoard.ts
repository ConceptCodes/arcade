import React from "react";
import { defaultBoard, Piece, indexToPosition, positionToIndex, getPiece } from "../utils/chess";
import { Chess, Square } from 'chess.js';

export const chess = new Chess();

export const useChessBoard = () => {
  const [board, setBoard] = React.useState<Piece[][]>(defaultBoard);
  const [selected, setSelected] = React.useState<string | null>(null);
  const [moves, setMoves] = React.useState<string[]>();

  function play(piece: Piece, index: [number, number]) {
    const position = indexToPosition(index);
    if (selected) {
      chess.move({ from: selected, to: position });
      const newBoard = board;
      const oldIndex = positionToIndex(selected);

      newBoard[index[0]][index[1]] = getPiece(board, selected);
      newBoard[oldIndex[0]][oldIndex[1]] = Piece.EMPTY;
      setBoard([...newBoard]);

      setSelected(null);
      setMoves(undefined);
    } else {
      const moves = chess.moves({ square: position as Square, verbose: true });
      if (moves.length > 0) {
        setSelected(position);
        setMoves(moves.map(x => x.to));
      }
    }
  }

  return { 
    board, 
    setBoard, 
    selected, 
    setSelected, 
    moves, 
    setMoves,
    play 
  };
}