import Game, { Board, Players, Position, Symbol } from "./game";

export default class TicTacToe extends Game {
  constructor(board: Board, symbols: Symbol) {
    super(board, symbols);
  }

  calculateWinner() {
    const possibleLines: Position[][] = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    for (let i = 0; i < possibleLines.length; i++) {
      const [a, b, c] = possibleLines[i];
      if (
        this.board[a[0]][a[1]] &&
        this.board[a[0]][a[1]] === this.board[b[0]][b[1]] &&
        this.board[a[0]][a[1]] === this.board[c[0]][c[1]]
      )
        return this.board[a[0]][a[1]] as Players;
    }
    return null;
  }

  makeMove(position: Position): void {
    const [row, col] = position;
    this.board[row][col] = this.symbols[this.currentPlayer];
    this.togglePlayer();
  }

  isGameOver(): boolean {
    return this.calculateWinner() !== null;
  }

  aiMove(): Position {
    console.log("AI is thinking...");
    return this.minimax(this.board, this.currentPlayer).move;
  }
}
