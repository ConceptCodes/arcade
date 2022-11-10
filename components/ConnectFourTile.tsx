import { FC } from "react";
import { TileColor } from '../utils/connectFour';

interface TileProps {
  type: TileColor;
}

const Tile: FC<TileProps> = ({ type }) => {
  const style = 'flex border-2 bg-white text-4xl w-24 h-24 justify-center items-center hover:cursor-pointer'
  switch (type) {
    case TileColor.RED:
      return (
        <div className={style}>
          🔴
        </div>
      );
    case TileColor.YELLOW:
      return (
        <div className={style}>
          🟡
        </div>
      );
    case TileColor.WHITE:
      return <div className={style} />;
  }
};

export default Tile;
