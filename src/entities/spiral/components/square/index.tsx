import { Rectangle } from "../../../../shared/geometry/Rectangle";
import { Segment } from "../../../../shared/geometry/Segment";

interface IProps {
  diagonal: Segment;
}

export const Square: React.FC<IProps> = ({ diagonal }) => {
  const { x, y, width, height } = Rectangle.byDiagonal(diagonal);

  return (
    <rect {...{ x, y, width, height }} fill="transparent" stroke="black" />
  );
};
