import { pairwise } from "../../../shared/common/pairwise";
import { IRange } from "../types";

export function generateArcsThickness(
  coefficients: number[],
  max: number
): IRange[] {
  if (coefficients.length === 0) {
    return [];
  }

  const sizeFactor = max / coefficients[0];

  const ranges: IRange[] = [];

  pairwise(coefficients.concat(0), (c1, c2) => {
    ranges.push({ from: sizeFactor * c1, to: sizeFactor * c2 });
  });

  return ranges;
}
