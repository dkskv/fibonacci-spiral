/**
 * Точка.
 * Поддерживает Декартовые и полярные координаты.
 */
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

  divByNumber(n: number) {
    return this.map((a) => a / n);
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

  /** от 0 до 2pi */
  private get polarAngle() {
    const { x, y } = this;

    if (x === 0 && y > 0) {
      return Math.PI / 2;
    }

    if (x === 0 && y < 0) {
      return (3 * Math.PI) / 2;
    }

    const alfa = Math.atan(y / x);

    if (x > 0 && y >= 0) {
      return alfa;
    }

    if (x > 0 && y < 0) {
      return alfa + 2 * Math.PI;
    }

    if (x < 0) {
      return alfa + Math.PI;
    }

    return NaN;
  }

  setPolarAngle(value: number) {
    const { polarRadius } = this;
    return new Point(
      polarRadius * Math.cos(value),
      polarRadius * Math.sin(value)
    );
  }

  get polarRadius() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  setPolarRadius(value: number) {
    const { polarAngle } = this;
    return new Point(
      value * Math.cos(polarAngle),
      value * Math.sin(polarAngle)
    );
  }

  shiftPolarRadius(delta: number) {
    const { polarRadius } = this;
    return this.setPolarRadius(polarRadius + delta);
  }

  rotate(delta: number) {
    const { polarAngle } = this;
    return this.setPolarAngle(polarAngle + delta);
  }

  rotateRespectTo(origin: Point, alfa: number) {
    return this.subtract(origin).rotate(alfa).add(origin);
  }

  /** Сдвинуться от переданной точки */
  moveFrom(origin: Point, delta: number) {
    return this.subtract(origin).shiftPolarRadius(delta).add(origin);
  }
}
