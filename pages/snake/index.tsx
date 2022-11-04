import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Tile, { TileType } from "./tile";
import useHotkeys from "@reecelucas/react-use-hotkeys";
import { Direction } from './util'
import useWindowDimensions from '../../hooks/useWindowDimensions';

import { Snake } from "./util";

const SnakePage: NextPage = () => {
  const { width, height } = useWindowDimensions();
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const COLS = Math.floor(10);
  const ROWS = Math.floor(10);

  const [snakePosition, setSnakePosition] = useState({
    x: Math.floor(Math.random() * COLS),
    y: Math.floor(Math.random() * ROWS),
  });

  const [foodPosition, setFoodPosition] = useState({
    x: Math.floor(Math.random() * COLS),
    y: Math.floor(Math.random() * ROWS),
  });

  const s = new Snake(snakePosition.x, snakePosition.y);

  const rows = [];
  for (let i = 0; i < COLS; i++) {
    rows.push(Array.from(Array(ROWS), () => TileType.EMPTY));
  }

  const [grid, setGrid] = useState<TileType[][]>(rows);

  const [direction, setDirection] = useState<Direction>(Direction.UP);

  useEffect(() => {
    if (s.isOnWall(COLS, ROWS)) {
      switch (direction) {
        case Direction.UP:
          setDirection(Direction.DOWN);
          break;
        case Direction.DOWN:
          setDirection(Direction.UP);
          break;
        case Direction.LEFT:
          setDirection(Direction.RIGHT);
          break;
        case Direction.RIGHT:
          setDirection(Direction.LEFT);
          break;
      }
    }
  }, [snakePosition]);

  useHotkeys("ArrowUp", () => {
    setDirection(Direction.UP);
  });

  useHotkeys("ArrowDown", () => {
    setDirection(Direction.DOWN);
  });

  useHotkeys("ArrowLeft", () => {
    setDirection(Direction.LEFT);
  });

  useHotkeys("ArrowRight", () => {
    setDirection(Direction.RIGHT);
  });

  useEffect(() => {
    if(snakePosition.x === foodPosition.x && snakePosition.y === foodPosition.y) {
      setScore(score + 1);
      setFoodPosition({
        x: Math.floor(Math.random() * COLS),
        y: Math.floor(Math.random() * ROWS),
      });
    }
  }, [snakePosition]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameOver) {
        clearInterval(interval);
      } else {
        s.move(direction);
        setSnakePosition({ x: s.x, y: s.y });
        const newGrid = grid.map((row, y) =>
          row.map((_, x) => {
            if (x === snakePosition.x && y === snakePosition.y) {
              return TileType.SNAKE;
            } else if (x === foodPosition.x && y === foodPosition.y) {
              return TileType.FOOD;
            } else {
              return TileType.EMPTY;
            }
          })
        );
        setGrid(newGrid);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [snakePosition, foodPosition]);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Head>
        <title>Snake</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="z-20 m-3">
        <h1 className="text-4xl text-white">Score: {score}</h1>
      </div>
      <main className="flex border-2">
        {
          grid.map((row, i) => {
          return (
            <div className="flex flex-col">
              {row.map((col, j) => {
                return ( <Tile key={j} type={col} /> )
              })}
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default SnakePage;
