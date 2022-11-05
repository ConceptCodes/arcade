import { FC } from 'react';

export enum TileColor {
  RED,
  YELLOW,
  WHITE,
}

interface TileProps {
  type: TileColor;
}

const Tile: FC<TileProps> = ({ type }) => {
  switch (type) {
    case TileColor.RED:
      return <div className="flex border-2 text-4xl w-24 h-24 justify-center items-center">
        🔴
      </div>
    case TileColor.YELLOW:
      return <div className="flex border-2 text-4xl w-24 h-24 justify-center items-center">
        🟡
      </div>
    case TileColor.WHITE:
      return <div className="flex w-24 h-24 border-2 bg-white" />;
  }
}

export default Tile;