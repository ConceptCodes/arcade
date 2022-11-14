import React from 'react';
import Image from 'next/image'
import { 
  Piece, 
  WikiImages, 
} from '../utils/chess';

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
  const size = 50;
  
  const isBlack = (row + col) % 2 === 1;
  const style = `${isBlack ? 'bg-[#161625]' : 'bg-[#565695]'} flex items-center justify-center w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24`;
  const highlightStyle =  currentPiece != Piece.EMPTY ? 'bg-emerald-500' : 'bg-[#FFD700] opacity-100';

  const main = `${style} ${highlighted ? highlightStyle : ''}`;

  return (
    <div className={main}>
      {WikiImages[currentPiece] !== WikiImages.Empty ? (
      <Image 
        width={size} 
        height={size} 
        alt={currentPiece} 
        src={WikiImages[currentPiece]} 
      />
      ): <div className={main} /> }
    </div>
  );
}