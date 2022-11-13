import React from 'react';
import Image from 'next/image'
import { Players } from '../hooks/useGameState';
import { 
  Piece, 
  PIECES, 
} from '../utils/chess';

interface ITileProps {
  row: number;
  col: number;
  currentPiece: Piece;
  player: Players;
  highlighted?: boolean;
}

export const Tile: React.FC<ITileProps> = ({ 
  row, 
  col,
  currentPiece,
  player,
  highlighted
}) => {
  const size = 50;
  
  const isBlack = (row + col) % 2 === 1;
  const style = `${isBlack ? 'bg-[#161625]' : 'bg-[#565695]'} flex items-center justify-center w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24`;
  const highlightStyle = 'bg-[#FFD700]';

  const main = `${style} ${highlighted ? highlightStyle : ''}`;

  return (
    <div className={main}>
      {PIECES[currentPiece] !== PIECES.Empty ? (
      <Image 
        width={size} 
        height={size} 
        alt={currentPiece} 
        src={PIECES[currentPiece][player === Players.CPU ? 'white' : 'black']} 
      />
      ): <div className={main} /> }
    </div>
  );
}