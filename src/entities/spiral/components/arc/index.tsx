import { Segment } from "../../../../shared/geometry/Segment";
import { IRange } from "../../types";

interface IProps {
  segment: Segment;
  thickness: IRange;
}

export const Arc: React.FC<IProps> = ({ segment, thickness }) => {
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
      d={d1.concat(d2).join(" ")}
      strokeWidth="2" // чтобы спрятать швы между сегментами
      stroke="DodgerBlue"
      fill="DodgerBlue"
    />
  );
};
