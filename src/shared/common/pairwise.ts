export function pairwise<T>(arr: T[], f: (a: T, b: T, index: number) => void) {
  arr.reduce((a, b, i) => {
    f(a, b, i);
    return b;
  });
}
