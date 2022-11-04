export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT
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
    return this.x < 0 || this.x >= cols || this.y < 0 || this.y >= rows;
  }


}
