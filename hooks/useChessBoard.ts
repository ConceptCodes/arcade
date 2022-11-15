import React from "react";
import { 
  Piece, 
  indexToPosition, 
  positionToIndex, 
  getPiece,
  boardToGrid,
  generateFen,
} from "../utils/chess";
import { Chess, Square } from 'chess.js';

export const chessEngine = new Chess();

export const useChessBoard = () => {
  const [board, setBoard] = React.useState<Piece[][]>();
  const [selected, setSelected] = React.useState<string | null>(null);
  const [moves, setMoves] = React.useState<string[]>();
  const [isCheck, setIsCheck] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    chessEngine.load(generateFen());
    setBoard(boardToGrid(chessEngine.board()));
  }, []);

  React.useEffect(() => {
    setIsCheck(chessEngine.isCheck());
  }, [board])

  function play(piece: Piece, index: [number, number]) {
    const position = indexToPosition(index);
    if (selected) {
      chessEngine.move({ from: selected, to: position });
      setBoard(boardToGrid(chessEngine.board()));
      setSelected(null);
      setMoves(undefined);
    } else {
      const moves = chessEngine.moves({ square: position as Square, verbose: true });
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
    play,
    isCheck
  };
}