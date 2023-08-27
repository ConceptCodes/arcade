import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import {
  indexToPosition,
  getAllMoves,
  positionToIndex,
} from "../utils/chess";
import { useChessBoard } from "../hooks/useChessBoard";
import { Tile } from "../components/ChessTile";
import { GameState, Players, useGameState } from "../hooks/useGameState";
import { MoveParserResponseType, playChess } from "../hooks/useAi";
import { Piece } from "../utils/chess";
import { Square } from "chess.js";

const ChessPage: NextPage = () => {
  const { board, moves, setMoves, selected, play, aiPlay } = useChessBoard();
  const [gameState, updateGameState] = useGameState();
  const [results, setResults] = React.useState<MoveParserResponseType[]>([]);
  const [isThinking, setIsThinking] = React.useState(false);

  React.useEffect(() => {
    if (selected) {
      const possibleMoves = getAllMoves(board, selected);
      setMoves(possibleMoves);
    }
  }, [selected]);

  const strinfyBoard = (board: Piece[][] | undefined) => {
    return board ? board.map((row) => row.join(" ")).join("\n") : "";
  };

  React.useEffect(() => {
    if (gameState === GameState.CPU_IS_NEXT) {
      setIsThinking(true);
      playChess(strinfyBoard(board), "black").then((result) => {
        setResults([...results, result]);
        aiPlay(result.from as Square, result.square as Square)
        updateGameState(GameState.PLAYER_IS_NEXT);
        setIsThinking(false);
      });
    }
  }, [board, gameState]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Chess</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <main className="flex bg-slate-200 flex-col items-center justify-center w-full flex-1 px-10">
        <section className="flex flex-row justify-between w-full space-x-6">
          <div className="flex flex-col items-start space-y-6">
            <h1 className="text-6xl font-bold mb-4">AI Breakdown</h1>
            {isThinking && (
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold">AI is thinking...</h2>
              </div>
            )}
            <div className="flex flex-col overflow-y-scroll max-h-[700px] space-y-6">
              {
                results.reverse().map((result, i) => (
                  <div
                    className={`bg-white shadow-lg rounded-lg p-6 ${i === results.length ? "bg-yellow-200" : ""
                      }`}
                  >
                    <div className="flex w-full justify-between">
                      <h2 className="text-xl font-bold mb-4"><span className="text-muted">{result.square}</span> - {result.from}</h2>
                      <h2 className="text-xl font-bold mb-4">{result.winProbability}</h2>
                    </div>
                    <strong>Reasoning</strong>
                    <p className="text-gray-500">{result.explanation}</p>
                    {/* {result.column && (
                      <p className="text-gray-500 mt-4">Column: {result.column}</p>
                    )} */}
                  </div>
                ))
              }
            </div>
            {
              results.length === 0 && (
                "Begin by clicking on a tile."
              )
            }
          </div>
          <section className="border-2 shadow-lg">
            <div className="flex flex-col w-full">
              {board &&
                board.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex">
                    {row.map((tile, tileIndex) => (
                      <div
                        key={indexToPosition([rowIndex, tileIndex])}
                        onClick={() => {
                          play([rowIndex, tileIndex]);
                          setTimeout(() => {
                            updateGameState(GameState.CPU_IS_NEXT);
                          }, 700);
                        }}
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
        </section>
      </main>
    </div>
  );
};

export default ChessPage;
