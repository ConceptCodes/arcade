import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import {
  indexToPosition,
  getAllMoves,
  positionsWithMoves,
} from "../utils/chess";
import { useChessBoard } from "../hooks/useChessBoard";
import { Tile } from "../components/ChessTile";

const ChessPage: NextPage = () => {
  const { board, moves, setMoves, selected, play } = useChessBoard();

  React.useEffect(() => {
    if (selected) {
      const possibleMoves = getAllMoves(board, selected);
      const positions = positionsWithMoves(board, "White");
      console.log("Pieces with moves: ", positions);
      setMoves(possibleMoves);
    }
  }, [selected]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Chess</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex bg-slate-200 flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <section className="border-2 shadow-lg">
          <div className="flex flex-col w-full">
            {board &&
              board.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                  {row.map((tile, tileIndex) => (
                    <div
                      key={indexToPosition([rowIndex, tileIndex])}
                      onClick={() => play(tile, [rowIndex, tileIndex])}
                    >
                      <Tile
                        row={rowIndex}
                        col={tileIndex}
                        currentPiece={tile}
                        highlighted={
                          moves &&
                          moves.includes(indexToPosition([rowIndex, tileIndex]))
                        }
                      />
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ChessPage;
