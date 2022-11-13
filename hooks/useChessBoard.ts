import React from "react";
import { defaultBoard, Piece } from "../utils/chess";

export const useChessBoard = () => {
  const [board, setBoard] = React.useState<Piece[][]>(defaultBoard);
  const [selected, setSelected] = React.useState<string | null>(null);
  const [moves, setMoves] = React.useState<string[]>();

  return { 
    board, 
    setBoard, 
    selected, 
    setSelected, 
    moves, 
    setMoves 
  };
}