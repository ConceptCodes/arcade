import { FC } from "react";
import { TileColor } from '../utils/connectFour';

interface TileProps {
  type: TileColor;
  highlight?: boolean;
}

const Tile: FC<TileProps> = ({ type, highlight }) => {
  const style = 'flex border-2 p-3 bg-white text-4xl w-24 h-24 justify-center items-center hover:cursor-pointer';
  const highlightStyle = highlight ? 'border-6 border-blue-500' : '';
  switch (type) {
    case TileColor.RED:
      return (
        <div className={style + highlightStyle}>
          🔴
        </div>
      );
    case TileColor.YELLOW:
      return (
        <div className={style + highlightStyle}>
          🟡
        </div>
      );
    case TileColor.WHITE:
      return <div className={style + highlightStyle} />;
  }
};

export default Tile;
