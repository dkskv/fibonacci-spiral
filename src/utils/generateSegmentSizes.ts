export interface ISpiralThickness {
  from: number;
  to: number;
}

function pairwise<T>(arr: T[], f: (a: T, b: T, index: number) => void) {
  arr.reduce((a, b, i) => (f(a, b, i), b));
}

export function generateSegmentThicknesses(
  coefficients: number[],
  max: number
): ISpiralThickness[] {
  if (coefficients.length === 0) {
    return [];
  }

  const sizeFactor = max / coefficients[0];

  const result: ISpiralThickness[] = [];

  pairwise(coefficients.concat(0), (c1, c2) => {
    result.push({ from: sizeFactor * c1, to: sizeFactor * c2 });
  });

  return result;
}
