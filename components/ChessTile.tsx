import React from 'react';
import Image from 'next/image'
import { 
  Piece, 
  WikiImages, 
} from '../utils/chess';

import { useChessBoard } from '../hooks/useChessBoard';

interface ITileProps {
  row: number;
  col: number;
  currentPiece: Piece;
  highlighted?: boolean;
}

export const Tile: React.FC<ITileProps> = ({ 
  row, 
  col,
  currentPiece,
  highlighted
}) => {

  const { isCheck } = useChessBoard();

  const size = 50;
  
  const isBlack = (row + col) % 2 === 1;
  const style = `${isBlack ? 'bg-[#457b9d]' : 'bg-[#a8dadc]'} flex items-center justify-center w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24`;
  const highlightStyle =  currentPiece != Piece.EMPTY ? 'bg-emerald-500' : 'bg-[#FFD700]';

  // TODO: find a way to hight tiles differently based on the strength of the move

  // TODO: highlight the tile for the king when he is in check

  const main = `${style} ${highlighted ? highlightStyle : ''}`;

  const kingHighlight = isCheck && (currentPiece === Piece.WHITE_KING) || currentPiece === Piece.BLACK_KING ? 'bg-red-500' : '';

  return (
    <div className={main + kingHighlight}>
      {WikiImages[currentPiece] !== WikiImages.Empty ? (
      <Image 
        width={size} 
        height={size} 
        alt={currentPiece} 
        src={WikiImages[currentPiece]} 
      />
      ): <div className={main + kingHighlight} /> }
    </div>
  );
}