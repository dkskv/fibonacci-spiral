export function generateFibonacciSequence(n: number): number[] {
  let a = 1;
  let b = 1;
  const xs: number[] = [];

  while (n--) {
    xs.push(a);

    const c = a + b;
    a = b;
    b = c;
  }

  return xs;
}
