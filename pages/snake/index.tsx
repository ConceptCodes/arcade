import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Tile, { TileType } from "./tile";
import useHotkeys from "@reecelucas/react-use-hotkeys";
import { Direction } from './util'
// import useWindowDimensions from '../../hooks/useWindowDimensions';

import { Snake } from "./util";

const SnakePage: NextPage = () => {
  // const { width, height } = useWindowDimensions();
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const ROWS = 10;
  const COLS = 10;

  const [snakePosition, setSnakePosition] = useState({
    x: Math.floor(Math.random() * ROWS),
    y: Math.floor(Math.random() * COLS),
  });

  const [foodPosition, setFoodPosition] = useState({
    x: Math.floor(Math.random() * ROWS),
    y: Math.floor(Math.random() * COLS),
  });

  const s = new Snake(snakePosition.x, snakePosition.y);

  const rows = [];
  for (let i = 0; i < COLS; i++) {
    rows.push(Array.from(Array(ROWS), () => TileType.EMPTY));
  }

  const [grid, setGrid] = useState<TileType[][]>(rows);

  useHotkeys("ArrowUp", () => {
    s.move(Direction.UP);
  });

  useHotkeys("ArrowDown", () => {
    s.move(Direction.DOWN);
  });

  useHotkeys("ArrowLeft", () => {
    s.move(Direction.LEFT);
  });

  useHotkeys("ArrowRight", () => {
    s.move(Direction.RIGHT);
  });

  useEffect(() => {
    if(snakePosition.x === foodPosition.x && snakePosition.y === foodPosition.y) {
      setScore(score + 1);
      setFoodPosition({
        x: Math.floor(Math.random() * ROWS),
        y: Math.floor(Math.random() * COLS),
      });
    }
  }, [snakePosition]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameOver) {
        clearInterval(interval);
      } else {
        if (s.isOnWall(COLS, ROWS)) {
          console.log("I Hit the wall")
        }
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
    <div className="max-h-screen">
      <Head>
        <title>Snake</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="z-20 m-3">
        <h1 className="text-4xl">Score: {score}</h1>
      </div>
      <main className="flex flex-grow">
        {grid.map((row, i) => {
          return (
            <div className="flex flex-col">
              {row.map((col, j) => {
                return ( <Tile key={i + j} type={col} /> )
              })}
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default SnakePage;
