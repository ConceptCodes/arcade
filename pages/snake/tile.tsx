import { FC } from 'react';

export enum TileType {
  EMPTY,
  SNAKE,
  FOOD,
}

export interface ITileProps {
  type: TileType;
}

const Tile: FC<ITileProps> = ({
  type,
}) => {

  const size = '16';

  switch (type) {
    case TileType.EMPTY:
      return (
        <div className={`w-${size} h-${size}`}>

        </div>
      );
    case TileType.SNAKE:
      return (
        <div className={`w-${size} h-${size} bg-emerald-500`}>

        </div>
      );
    case TileType.FOOD:
      return (
        <div className={`w-${size} h-${size} flex items-center justify-center`}>
          <h1>🍔</h1>
        </div>
      );
    default:
      return (
        <div className={`w-${size} h-${size}`}>

        </div>
      );
  }
}

export default Tile;