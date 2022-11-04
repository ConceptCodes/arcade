export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export class Snake {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public move(direction: Direction): void {
    switch (direction) {
      case Direction.UP:
        this.x--;
        break;
      case Direction.DOWN:
        this.x++;
        break;
      case Direction.LEFT:
        this.y--;
        break;
      case Direction.RIGHT:
        this.y++;
        break;
      default:
        break;
    }
  }

  public isOnWall(cols: number, rows: number): boolean {
    // check if current x and y position is on the x and y of the edge of the grid
    return this.x === 0 || this.x === rows || this.y === 0 || this.y === cols;
  }


}
