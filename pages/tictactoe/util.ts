import { Players } from "../../hooks/useGameState";

export const symbols = {
  [Players.PLAYER]: "❌",
  [Players.CPU]: "⭕",
};

export const emptyTiles = (tiles: any[]) => {
  const empty: number[] = [];
  tiles.forEach((tile, index) => {
    if (tile === "") empty.push(index);
  });
  return empty;
}

export async function getRandomDecision(tiles: any[]): Promise<any> {
  const empty: any[] = emptyTiles(tiles);
  const randomIndex = Math.floor(Math.random() * empty.length);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(empty[randomIndex]);
    }, 700);
  });
}

const scores = {
  [symbols[Players.PLAYER]]: -1,
  [symbols[Players.CPU]]: 1,
  draw: 0,
};

export function minimax(
  tiles: string[],
  player: Players,
  depth: number = 0
) {
  const winner: any = calculateWinner(tiles);
  if (winner) {
    return { score: scores[winner[0]], index: -1 };
  }

  const empty = emptyTiles(tiles);
  if (empty.length === 0) {
    return { score: scores.draw, index: -1 };
  }

  const moves: any[] = [];
  for (let i = 0; i < empty.length; i++) {
    const index = empty[i];
    tiles[index] = symbols[player];
    const score: any = minimax(tiles, player === Players.PLAYER ? Players.CPU : Players.PLAYER, depth + 1);
    tiles[index] = "";
    score.index = index;
    moves.push(score);
  }

  let bestMove: any;
  if (player === Players.CPU) {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = moves[i];
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = moves[i];
      }
    }
  }
  return bestMove;
}


// this should return
// GameState.PLAYER_HAS_WON or
// GameState.CPU_HAS_WON or
// GameState.DRAW or
// null
/**
 * 
 * @param tiles {string[]} the current state of the game
 * @returns {[winner, winningTiles]} a tuple of the winner and the winning tiles 
 */
export function calculateWinner(tiles: string[]) {
  const possibleLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // go over all possibly winning lines and check if they consist of only X's/only O's
  for (let i = 0; i < possibleLines.length; i++) {
    const [a, b, c] = possibleLines[i];
    if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c])
      return [tiles[a], possibleLines[i]];
  }
  return null;
}

function winning(tiles: any[], player: Players) {
  if (
    (tiles[0] == player && tiles[1] == player && tiles[2] == player) ||
    (tiles[3] == player && tiles[4] == player && tiles[5] == player) ||
    (tiles[6] == player && tiles[7] == player && tiles[8] == player) ||
    (tiles[0] == player && tiles[3] == player && tiles[6] == player) ||
    (tiles[1] == player && tiles[4] == player && tiles[7] == player) ||
    (tiles[2] == player && tiles[5] == player && tiles[8] == player) ||
    (tiles[0] == player && tiles[4] == player && tiles[8] == player) ||
    (tiles[2] == player && tiles[4] == player && tiles[6] == player)
  ) {
    return true;
  } else {
    return false;
  }
}

export function getAiDecision(tiles: any[]) {
  //use minimax function to get the best move
  const bestMove: any = minimax(tiles, Players.CPU);
  return bestMove.index;
}
