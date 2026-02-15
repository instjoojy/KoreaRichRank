export const DISTRIBUTION = [
  { range: "0 미만", percent: 3, upper: 0 },
  { range: "0~1.5천만", percent: 7, upper: 1500 },
  { range: "1.5천~1억", percent: 20, upper: 10000 },
  { range: "1~2.4억", percent: 20, upper: 23800 },
  { range: "2.4~5억", percent: 20, upper: 50000 },
  { range: "5~7억", percent: 10, upper: 70000 },
  { range: "7~10.5억", percent: 10, upper: 105000 },
  { range: "10.5~15억", percent: 5, upper: 152000 },
  { range: "15~33억", percent: 4, upper: 330000 },
  { range: "33억+", percent: 1, upper: Infinity },
];

export function getUserBin(netAsset: number): number {
  if (netAsset < 0) return 0;
  if (netAsset < 1500) return 1;
  if (netAsset < 10000) return 2;
  if (netAsset < 23800) return 3;
  if (netAsset < 50000) return 4;
  if (netAsset < 70000) return 5;
  if (netAsset < 105000) return 6;
  if (netAsset < 152000) return 7;
  if (netAsset < 330000) return 8;
  return 9;
}
