import { Segment } from "../../../../shared/geometry/Segment";

interface IProps {
  segment: Segment;
}

export const Line: React.FC<IProps> = ({ segment: { x1, y1, x2, y2 } }) => {
  return <line {...{ x1, y1, x2, y2 }} stroke="lightgrey" />;
};
