export type Stop = [number, number];

export const ASSET_STOPS: Stop[] = [
  [0, 0],
  [8, 500],
  [15, 1000],
  [22, 3000],
  [30, 7000],
  [38, 15000],
  [46, 25000],
  [54, 50000],
  [62, 80000],
  [70, 120000],
  [78, 200000],
  [86, 350000],
  [94, 600000],
  [100, 1000000],
];

export const INCOME_STOPS: Stop[] = [
  [0, 0],
  [10, 1000],
  [20, 2000],
  [30, 3000],
  [40, 4500],
  [50, 6000],
  [60, 8000],
  [70, 12000],
  [80, 18000],
  [90, 30000],
  [100, 50000],
];

export function stopsToValue(pos: number, stops: Stop[]): number {
  if (pos <= stops[0][0]) return stops[0][1];
  if (pos >= stops[stops.length - 1][0]) return stops[stops.length - 1][1];
  for (let i = 0; i < stops.length - 1; i++) {
    const [p1, v1] = stops[i];
    const [p2, v2] = stops[i + 1];
    if (pos >= p1 && pos <= p2) {
      const r = (pos - p1) / (p2 - p1);
      return Math.round(v1 + r * (v2 - v1));
    }
  }
  return stops[stops.length - 1][1];
}

export function valueToStops(value: number, stops: Stop[]): number {
  if (value <= stops[0][1]) return stops[0][0];
  if (value >= stops[stops.length - 1][1]) return stops[stops.length - 1][0];
  for (let i = 0; i < stops.length - 1; i++) {
    const [p1, v1] = stops[i];
    const [p2, v2] = stops[i + 1];
    if (value >= v1 && value <= v2) {
      const r = v2 === v1 ? 0 : (value - v1) / (v2 - v1);
      return Math.round(p1 + r * (p2 - p1));
    }
  }
  return stops[stops.length - 1][0];
}
