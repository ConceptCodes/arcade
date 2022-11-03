import { FC } from 'react'
interface ITileProps {
  value: string;
  highlight: boolean;
  onClick: () => void;
}

const Tile: FC<ITileProps> =  ({ value, highlight, onClick }) => {
  return (
    <button className={`w-20 h-20 bg-white md:w-40 md:h-40 border-2 rounded-xl shadow-lg text-md md:text-4xl ${highlight ? 'border-blue-500 border-4' : ''}`} onClick={onClick}>
      {value}
    </button>
  );
}

export default Tile;