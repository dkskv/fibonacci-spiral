import { Segment } from "./Segment";

/** Прямоугольник */
export class Rectangle {
  static byDiagonal(diagonal: Segment) {
    const origin = diagonal.a.zipWith(diagonal.b, Math.min);
    const diff = diagonal.b.subtract(diagonal.a).map(Math.abs);

    return new Rectangle(origin.x, origin.y, diff.x, diff.y);
  }

  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}
}
