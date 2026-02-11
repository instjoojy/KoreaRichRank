import {
  ageGroupMap,
  regionalFactors,
  type Threshold,
  type AgeGroupStats,
} from "../data/stats";

export interface CalculatorInput {
  age: number; // 나이
  region: string; // 지역 key (예: "seoul", "national")
  netAsset: number; // 순자산 (만 원)
  income: number; // 연봉 (만 원)
}

export interface CalculatorResult {
  ageGroup: string; // 연령대 라벨
  region: string; // 지역 라벨
  /** 전국 기준 자산 상위 % */
  assetPercentile: number;
  /** 동일 연령대 내 자산 상위 % */
  assetPercentileByAge: number;
  /** 전국 기준 소득 상위 % */
  incomePercentile: number;
  /** 동일 연령대 내 소득 상위 % */
  incomePercentileByAge: number;
  /** 해당 지역 기준 자산 상위 % (지역 보정) */
  assetPercentileByRegion: number;
  /** 연령대 평균 순자산 대비 배율 */
  assetToAvgRatio: number;
  /** 연령대 평균 소득 대비 배율 */
  incomeToAvgRatio: number;
}

/** 나이 → 연령대 키 */
function getAgeGroupKey(age: number): string {
  if (age < 30) return "20s";
  if (age < 40) return "30s";
  if (age < 50) return "40s";
  if (age < 60) return "50s";
  return "60s";
}

/**
 * 정렬된 기준점 배열에서 선형 보간으로 상위 % 산출
 * thresholds: [금액, 상위%] — 금액 내림차순
 */
function interpolate(value: number, thresholds: Threshold[]): number {
  // 최고 기준점보다 높으면 → 해당 상위% 그대로
  if (value >= thresholds[0][0]) {
    return thresholds[0][1];
  }
  // 최저 기준점보다 낮으면 → 해당 상위% 그대로
  if (value <= thresholds[thresholds.length - 1][0]) {
    return thresholds[thresholds.length - 1][1];
  }

  for (let i = 0; i < thresholds.length - 1; i++) {
    const [upperAsset, upperPct] = thresholds[i];
    const [lowerAsset, lowerPct] = thresholds[i + 1];

    if (value <= upperAsset && value >= lowerAsset) {
      // 두 기준점 사이를 선형 보간
      const ratio =
        upperAsset === lowerAsset
          ? 0
          : (upperAsset - value) / (upperAsset - lowerAsset);
      return upperPct + ratio * (lowerPct - upperPct);
    }
  }

  return 50; // fallback
}

/** 소수점 첫째 자리까지 반올림 */
function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

/**
 * 지역 보정된 기준점 생성
 * 서울 등 고자산 지역은 기준점 금액을 factor만큼 올려서
 * 같은 금액이어도 상위 %가 더 낮아지도록 함
 */
function adjustThresholds(
  thresholds: Threshold[],
  factor: number
): Threshold[] {
  return thresholds.map(([amount, pct]) => [
    Math.round(amount * factor),
    pct,
  ]);
}

/**
 * 사용자 입력을 바탕으로 상위 %를 계산합니다.
 * 소수점 첫째 자리까지 반환합니다.
 */
export function calculatePercentile(input: CalculatorInput): CalculatorResult {
  const { age, region, netAsset, income } = input;

  const ageKey = getAgeGroupKey(age);
  const ageStats: AgeGroupStats = ageGroupMap[ageKey];
  const allStats: AgeGroupStats = ageGroupMap["all"];
  const regionInfo = regionalFactors[region] ?? regionalFactors["national"];

  // 전국 기준 (전연령)
  const assetPercentile = round1(
    interpolate(netAsset, allStats.assetThresholds)
  );
  const incomePercentile = round1(
    interpolate(income, allStats.incomeThresholds)
  );

  // 동일 연령대 기준
  const assetPercentileByAge = round1(
    interpolate(netAsset, ageStats.assetThresholds)
  );
  const incomePercentileByAge = round1(
    interpolate(income, ageStats.incomeThresholds)
  );

  // 지역 보정: 해당 지역 기준점을 factor로 조정
  const regionalAssetThresholds = adjustThresholds(
    ageStats.assetThresholds,
    regionInfo.factor
  );
  const assetPercentileByRegion = round1(
    interpolate(netAsset, regionalAssetThresholds)
  );

  // 평균 대비 배율
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
