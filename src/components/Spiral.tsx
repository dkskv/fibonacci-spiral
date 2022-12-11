import { memo } from "react";
import { generateSpiralSegments } from "../utils/generateSpiralSegments";
import {
  generateSegmentThicknesses,
  ISpiralThickness,
} from "../utils/generateSegmentSizes";
import { Box, Segment } from "../utils/geometryEntities";

function optionalSum(ns: (number | undefined)[]) {
  return ns.reduce<number>((acc, n = 0) => acc + n, 0);
}

interface IProps {
  coefficients: number[];
  areaWidth: number;
  areaHeight: number;
  areaPadding: number;
}

export const Spiral: React.FC<IProps> = memo(
  ({ coefficients, areaWidth, areaHeight, areaPadding }) => {
    const maxSpiralWidth = areaWidth - areaPadding * 2;
    const maxSpiralHeight = areaHeight - areaPadding * 2;

    const sizeFactor = Math.min(
      maxSpiralWidth / optionalSum(coefficients.slice(0, 2)),
      maxSpiralHeight / optionalSum(coefficients.slice(0, 1))
    );

    const squareSizes = coefficients.map((a) => a * sizeFactor);
    const diagonalSizes = squareSizes.map((a) => a * Math.sqrt(2));
    const segments = generateSpiralSegments(diagonalSizes);

    const spiralWidth = optionalSum(squareSizes.slice(0, 2));
    const spiralHeight = optionalSum(squareSizes.slice(0, 1));
    const x = (areaWidth - spiralWidth) / 2;
    const y = (areaHeight - spiralHeight) / 2;

    const thicknesses = generateSegmentThicknesses(coefficients, 30);

    return (
      <svg
        width={areaWidth}
        height={areaHeight}
        style={{
          transformOrigin: "50% 50%",
          transform: "scale(1,-1)", // для отражения оси Y
          border: "1px solid lightgrey",
        }}
      >
        <g transform={`translate(${x} ${y})`}>
          <g>{segments.map(renderSquare)}</g>
          <g>{segments.map(renderLine)}</g>
          <g>{segments.map((s, i) => renderArc(s, i, thicknesses[i]))}</g>
        </g>
      </svg>
    );
  }
);

function renderSquare(diagonal: Segment, index: number) {
  const { x, y, width, height } = Box.byDiagonal(diagonal);

  return (
    <rect
      key={index}
      {...{ x, y, width, height }}
      fill="transparent"
      stroke="black"
    />
  );
}

function renderLine({ x1, y1, x2, y2 }: Segment, index: number) {
  return <line key={index} {...{ x1, y1, x2, y2 }} stroke="lightgrey" />;
}

function renderArc(
  segment: Segment,
  index: number,
  thickness: ISpiralThickness
) {
  const { size, center, a, b } = segment;
  const rotationOrigin = b.rotateRespectTo(center, -Math.PI / 2);

  const offsetA = thickness.from / 2;
  const offsetB = thickness.to / 2;

  const a1 = a.moveFrom(rotationOrigin, offsetA);
  const a2 = a.moveFrom(rotationOrigin, -offsetA);
  const b1 = b.moveFrom(rotationOrigin, offsetB);
  const b2 = b.moveFrom(rotationOrigin, -offsetB);

  const radius = size / Math.sqrt(2);
  const r1 = radius + offsetB;
  const r2 = radius - offsetB;

  const d1 = ["M", b1.x, b1.y, "A", r1, r1, 0, 0, 1, a1.x, a1.y];
  const d2 = ["L", a2.x, a2.y, "A", r2, r2, 0, 0, 0, b2.x, b2.y];

  return (
    <path
      key={index}
      d={d1.concat(d2).join(" ")}
      strokeWidth="2" // чтобы спрятать швы между сегментами
      stroke="DodgerBlue"
      fill="DodgerBlue"
    />
  );
}
