import { useState, useEffect } from 'react';

export enum GameState {
  PLAYER_IS_NEXT = 'PLAYER_IS_NEXT',
  CPU_IS_NEXT = 'CPU_IS_NEXT',
  PLAYER_WINS = 'PLAYER_WINS',
  CPU_WINS = 'CPUWINS',
  DRAW = 'DRAW',
}

export enum Players {
  PLAYER = 'YOU',
  CPU = 'CPU',
}

export const useGameState = (): [GameState, any] => {
  const [currentState, updateGameState] = useState(GameState.PLAYER_IS_NEXT);

  return [currentState, updateGameState];
}

