import { Point } from "./Point";

/** Отрезок */
export class Segment {
  constructor(public a: Point, public b: Point) {}

  get size() {
    return this.a.calcDistance(this.b);
  }

  get x1() {
    return this.a.x;
  }

  get y1() {
    return this.a.y;
  }

  get x2() {
    return this.b.x;
  }

  get y2() {
    return this.b.y;
  }

  get center() {
    return this.a.add(this.b).divByNumber(2);
  }
}
