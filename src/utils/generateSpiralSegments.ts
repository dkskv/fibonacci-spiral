import { Point, Segment } from "./geometryEntities";

export function generateSpiralSegments(sizes: number[]): Segment[] {
  let point0 = new Point(0, 0);
  let angle = Math.PI / 4;

  const segments: Segment[] = [];

  for (let i = 0; i < sizes.length; i++) {
    const pointTo = point0.add(Point.byPolar(sizes[i], angle));
    const segment = new Segment(point0, pointTo);
    segments.push(segment);

    point0 = pointTo;
    angle -= Math.PI / 2;
  }

  return segments;
}
