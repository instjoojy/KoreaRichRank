export type Stop = [number, number];

// ── 자산순위 계산기 ──────────────────────────────────
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

// ── 진짜시급 계산기 ──────────────────────────────────
export const SALARY_STOPS: Stop[] = [
  [0, 0],
  [10, 100],
  [25, 200],
  [40, 300],
  [55, 500],
  [70, 700],
  [80, 1000],
  [90, 1500],
  [100, 2000],
];

export const HOURS_STOPS: Stop[] = [
  [0, 0],
  [50, 8],
  [100, 16],
];

export const MINUTES_STOPS: Stop[] = [
  [0, 0],
  [50, 90],
  [100, 180],
];

// ── FIRE 계산기 ──────────────────────────────────────
export const AGE_STOPS: Stop[] = [
  [0, 15],
  [100, 80],
];

export const FIRE_ASSET_STOPS: Stop[] = [
  [0, 0],
  [10, 500],
  [20, 1000],
  [30, 3000],
  [40, 5000],
  [50, 10000],
  [60, 20000],
  [70, 50000],
  [80, 100000],
  [90, 150000],
  [100, 200000],
];

export const MONTHLY_WON_STOPS: Stop[] = [
  [0, 0],
  [15, 50],
  [30, 100],
  [45, 200],
  [60, 300],
  [75, 500],
  [90, 800],
  [100, 1000],
];

export const RETURN_STOPS: Stop[] = [
  [0, 0],
  [50, 10],
  [100, 20],
];

// ── 보간 함수 ────────────────────────────────────────
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
