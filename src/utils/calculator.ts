import type { Threshold, AgeGroupStats, RegionalFactor } from "../data/types";

export interface CalculatorInput {
  age: number;
  region: string;
  netAsset: number;
  income: number;
}

export interface CalculatorResult {
  ageGroup: string;
  region: string;
  assetPercentile: number;
  assetPercentileByAge: number;
  incomePercentile: number;
  incomePercentileByAge: number;
  assetPercentileByRegion: number;
  assetToAvgRatio: number;
  incomeToAvgRatio: number;
}

export interface StatsContext {
  ageGroupMap: Record<string, AgeGroupStats>;
  regionalFactors: Record<string, RegionalFactor>;
}

function getAgeGroupKey(age: number): string {
  if (age < 30) return "20s";
  if (age < 40) return "30s";
  if (age < 50) return "40s";
  if (age < 60) return "50s";
  return "60s";
}

function interpolate(value: number, thresholds: Threshold[]): number {
  if (value >= thresholds[0][0]) {
    return thresholds[0][1];
  }
  if (value <= thresholds[thresholds.length - 1][0]) {
    return thresholds[thresholds.length - 1][1];
  }

  for (let i = 0; i < thresholds.length - 1; i++) {
    const [upperAsset, upperPct] = thresholds[i];
    const [lowerAsset, lowerPct] = thresholds[i + 1];

    if (value <= upperAsset && value >= lowerAsset) {
      const ratio =
        upperAsset === lowerAsset
          ? 0
          : (upperAsset - value) / (upperAsset - lowerAsset);
      return upperPct + ratio * (lowerPct - upperPct);
    }
  }

  return 50;
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

function adjustThresholds(
  thresholds: Threshold[],
  factor: number
): Threshold[] {
  return thresholds.map(([amount, pct]) => [
    Math.round(amount * factor),
    pct,
  ]);
}

export function calculatePercentile(
  input: CalculatorInput,
  stats: StatsContext
): CalculatorResult {
  const { age, region, netAsset, income } = input;

  const ageKey = getAgeGroupKey(age);
  const ageStats: AgeGroupStats = stats.ageGroupMap[ageKey];
  const allStats: AgeGroupStats = stats.ageGroupMap["all"];
  const regionInfo =
    stats.regionalFactors[region] ?? stats.regionalFactors["national"];

  const assetPercentile = round1(
    interpolate(netAsset, allStats.assetThresholds)
  );
  const incomePercentile = round1(
    interpolate(income, allStats.incomeThresholds)
  );

  const assetPercentileByAge = round1(
    interpolate(netAsset, ageStats.assetThresholds)
  );
  const incomePercentileByAge = round1(
    interpolate(income, ageStats.incomeThresholds)
  );

  const regionalAssetThresholds = adjustThresholds(
    ageStats.assetThresholds,
    regionInfo.factor
  );
  const assetPercentileByRegion = round1(
    interpolate(netAsset, regionalAssetThresholds)
  );

  const assetToAvgRatio = round1(
    ageStats.avgNetAsset > 0 ? netAsset / ageStats.avgNetAsset : 0
  );
  const incomeToAvgRatio = round1(
    ageStats.avgIncome > 0 ? income / ageStats.avgIncome : 0
  );

  return {
    ageGroup: ageStats.label,
    region: regionInfo.label,
    assetPercentile,
    assetPercentileByAge,
    incomePercentile,
    incomePercentileByAge,
    assetPercentileByRegion,
    assetToAvgRatio,
    incomeToAvgRatio,
  };
}
