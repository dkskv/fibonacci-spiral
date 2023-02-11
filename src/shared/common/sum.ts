export function sum(ns: (number | undefined)[]) {
  return ns.reduce<number>((acc, n = 0) => acc + n, 0);
}
