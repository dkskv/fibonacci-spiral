export class Box {
  static byDiagonal(diagonal: Segment) {
    const origin = diagonal.a.zipWith(diagonal.b, Math.min);
    const diff = diagonal.b.subtract(diagonal.a).map(Math.abs);

    return new Box(origin.x, origin.y, diff.x, diff.y);
  }

  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}
}

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
}

export class Point {
  static byPolar(radius: number, angle: number) {
    return new Point(Math.cos(angle), Math.sin(angle)).mulByNumber(radius);
  }

  constructor(public x: number, public y: number) {}

  add(p: Point) {
    return new Point(this.x + p.x, this.y + p.y);
  }

  subtract(p: Point) {
    return new Point(this.x - p.x, this.y - p.y);
  }

  mulByNumber(n: number) {
    return this.map((a) => a * n);
  }

  map(f: (n: number) => number) {
    return new Point(f(this.x), f(this.y));
  }

  zipWith(p: Point, f: (n1: number, n2: number) => number) {
    return new Point(f(this.x, p.x), f(this.y, p.y));
  }

  calcDistance(p: Point) {
    return Math.sqrt((this.x - p.x) ** 2 + (this.y - p.y) ** 2);
  }

  // /** от 0 до 2pi */
  // private get polarAngle() {
  //   const { x, y } = this;

  //   if (x === 0 && y > 0) {
  //     return Math.PI / 2;
  //   }

  //   if (x === 0 && y < 0) {
  //     return (3 * Math.PI) / 2;
  //   }

  //   const alfa = Math.atan(y / x);

  //   if (x > 0 && y >= 0) {
  //     return alfa;
  //   }

  //   if (x > 0 && y < 0) {
  //     return alfa + 2 * Math.PI;
  //   }

  //   if (x < 0) {
  //     return alfa + Math.PI;
  //   }

  //   return NaN;
  // }

  // get polarRadius() {
  //   return Math.sqrt(this.x ** 2 + this.y ** 2);
  // }

  // /** Вращение в полярных координатах */
  // rotate(angle: number) {
  //   const { polarRadius, polarAngle } = this;
  //   return new Point(
  //     polarRadius * Math.cos(polarAngle + angle),
  //     polarRadius * Math.sin(polarAngle + angle)
  //   );
  // }

  // rotateRespectTo(origin: Point, alfa: number) {
  //   return this.subtract(origin).rotate(alfa).add(origin);
  // }
}
