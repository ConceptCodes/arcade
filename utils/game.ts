export enum GameState {
  PLAYER_IS_NEXT = "PLAYER_IS_NEXT",
  CPU_IS_NEXT = "CPU_IS_NEXT",
  PLAYER_WINS = "PLAYER_WINS",
  CPU_WINS = "CPU_WINS",
  DRAW = "DRAW",
}

export enum Players {
  YOU = "YOU",
  CPU = "CPU",
}

export type Board = string[][];
export type Position = [number, number];
export type Symbol = Record<Players, string>;

const MAX_DEPTH: number = 9;

export default abstract class Game {
  board!: Board;
  currentPlayer!: Players;
  currentState!: GameState;
  symbols!: Symbol;

  abstract calculateWinner(): Players | null;
  abstract makeMove(position: Position): void;
  abstract isGameOver(): boolean;

  constructor(board: Board, symbols: Symbol) {
    this.board = board;
    this.currentPlayer = Players.YOU;
    this.currentState = GameState.PLAYER_IS_NEXT;
    this.symbols = symbols;
  }

  togglePlayer() {
    this.currentPlayer =
      this.currentPlayer === Players.YOU ? Players.CPU : Players.YOU;
    this.currentState =
      this.currentPlayer === Players.YOU
        ? GameState.CPU_IS_NEXT
        : GameState.PLAYER_IS_NEXT;
    console.log(this.currentState);
    console.log(this.currentPlayer);
  }

  reset() {
    this.board = this.board.map((row) => row.map(() => ""));
    this.currentPlayer = Players.YOU;
    this.currentState = GameState.CPU_IS_NEXT;
  }

  emptyTiles(): Position[] {
    const empty: Position[] = [];
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        if (this.board[row][col] === "") {
          empty.push([row, col]);
        }
      }
    }
    return empty;
  }

  minimax(
    tiles: string[][],
    player: Players,
    depth: number = 0
  ): { score: number; move: Position } {
    const scores: Record<string, number> = {
      [Players.YOU]: -10,
      [Players.CPU]: 10,
      DRAW: 0,
    };

    const winner: string | null = this.calculateWinner();
    if (winner) {
      return { score: scores[winner], move: [-1, -1] };
    }

    const empty: number[][] = this.emptyTiles();
    if (empty.length === 0 || depth >= MAX_DEPTH) {
      return { score: scores.DRAW, move: [-1, -1] };
    }

    const moves: { score: number; move: Position }[] = [];
    for (let i = 0; i < empty.length; i++) {
      const [row, col]: number[] = empty[i];
      tiles[row][col] = this.symbols[player];
      const score: { score: number; move: Position } = minimax(
        tiles.map((row) => [...row]),
        player === Players.YOU ? Players.CPU : Players.YOU,
        depth + 1
      );
      tiles[row][col] = "";
      score.move = [row, col];
      moves.push(score);
    }

    let bestMove: { score: number; move: Position } | undefined;
    if (player === Players.CPU) {
      let bestScore: number = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = moves[i];
        }
      }
    } else {
      let bestScore: number = Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = moves[i];
        }
      }
    }
    return bestMove!;
  }

  isDraw() {
    return this.board.every((row) => row.every((col) => col !== ""));
  }
}
