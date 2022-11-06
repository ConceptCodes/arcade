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
      return <div className="w-24 h-24 bg-red-500" />;
    case TileColor.YELLOW:
      return <div className="w-24 h-24 bg-yellow-500" />;
    case TileColor.WHITE:
      return <div className="w-24 h-24 border-2 bg-white" />;
  }
}

export default Tile;