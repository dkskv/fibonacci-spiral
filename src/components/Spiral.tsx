import { memo } from "react";
import { generateSpiralSegments } from "../utils/generateSpiralSegments";
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
    areaWidth -= areaPadding * 2;
    areaHeight -= areaPadding * 2;

    const sizeFactor = Math.min(
      areaWidth / optionalSum(coefficients.slice(0, 2)),
      areaHeight / optionalSum(coefficients.slice(0, 1))
    );

    const squareSizes = coefficients.map((a) => a * sizeFactor);
    const diagonalSizes = squareSizes.map((a) => a * Math.sqrt(2));
    const segments = generateSpiralSegments(diagonalSizes);

    const spiralWidth = optionalSum(squareSizes.slice(0, 2));
    const spiralHeight = optionalSum(squareSizes.slice(0, 1));
    const x = (areaWidth - spiralWidth) / 2 + areaPadding;
    const y = (areaHeight - spiralHeight) / 2 + areaPadding;

    return (
      <svg
        style={{
          width: "100%",
          height: "100%",
          border: "1px solid lightgrey",
          transformOrigin: "50% 50%",
          transform: `scale(1,-1)`, // для отражения оси Y
        }}
      >
        <g transform={`translate(${x} ${y})`}>
          <g>{segments.map(renderSquare)}</g>
          <g>{segments.map(renderLine)}</g>
          <g>{segments.map(renderArc)}</g>
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

function renderArc(segment: Segment, index: number) {
  const { x1, y1, x2, y2, size } = segment;
  const radius = size / Math.sqrt(2);

  return (
    <path
      key={index}
      d={` M ${x2} ${y2} A ${radius} ${radius} 0 0 1 ${x1} ${y1}`}
      stroke="purple"
      strokeWidth="5"
      fill="transparent"
    />
  );
}
