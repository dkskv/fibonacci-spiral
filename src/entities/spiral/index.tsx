import { memo } from "react";
import { sum } from "../../shared/common/sum";
import { take } from "../../shared/common/take";
import { Arc } from "./components/arc";
import { Line } from "./components/line";
import { Square } from "./components/square";
import { generateArcsThickness } from "./utils/generateArcsThickness";
import { generateSupportSegments } from "./utils/generateSupportSegments";

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
      maxSpiralWidth / sum(take(coefficients, 2)),
      maxSpiralHeight / sum(take(coefficients, 1))
    );

    const squareSizes = coefficients.map((a) => a * sizeFactor);
    const diagonalSizes = squareSizes.map((a) => a * Math.sqrt(2));
    const segments = generateSupportSegments(diagonalSizes);

    const spiralWidth = sum(take(squareSizes, 2));
    const spiralHeight = sum(take(squareSizes, 1));
    const x = (areaWidth - spiralWidth) / 2;
    const y = (areaHeight - spiralHeight) / 2;

    const arcsThickness = generateArcsThickness(coefficients, 30);

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
          <g>
            {segments.map((s, i) => (
              <Square key={i} diagonal={s} />
            ))}
          </g>
          <g>
            {segments.map((s, i) => (
              <Line key={i} segment={s} />
            ))}
          </g>
          <g>
            {segments.map((s, i) => (
              <Arc key={i} segment={s} thickness={arcsThickness[i]} />
            ))}
          </g>
        </g>
      </svg>
    );
  }
);
