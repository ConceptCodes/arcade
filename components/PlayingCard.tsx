import React from "react";
import { IPlayingCard, Suits } from "../utils/memory";

interface IPlayingCardProps {
  size: 'lg' | 'sm';
}

export const PlayingCard: React.FC<IPlayingCard & IPlayingCardProps> = ({ suit, value, flipped, size }) => {
  const style =
    `flex ${size === 'lg' ? 'w-[200px]' : 'w-[150px]'} ${size === 'lg' ? 'h-[275px]' : 'h-[175px]'} bg-white rounded-lg shadow-xl p-3 ${size === 'lg' ? 'text-2xl' : 'text-md'}` + 
    (suit === Suits.Hearts || suit === Suits.Diamonds ? ' text-red-500' : ' text-black');

  if (flipped) return (
    <div className={style}>
      <div className={`bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg w-[175px] h-[250px]`} />
    </div>
  );

  const top = 'flex flex-grow flex-col align-start';
  const bottom = top + ' transform rotate-180';

  return (
    <div className={style}>
      <div className={top}>
        <div className="card-value">{value}</div>
        <div className="card-suit">{suit}</div>
      </div>
      <div className={bottom}>
        <div className="card-value">{value}</div>
        <div className="card-suit">{suit}</div>
      </div>
    </div>
  );
};
