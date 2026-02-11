/** 백분위 기준점: [금액(만 원), 상위 %] */
export type Threshold = [number, number];

export interface AgeGroupStats {
  label: string;
  avgNetAsset: number;
  medianNetAsset: number;
  avgIncome: number;
  assetThresholds: Threshold[];
  incomeThresholds: Threshold[];
}

export interface RegionalFactor {
  label: string;
  factor: number;
}

export interface StatsData {
  ageGroupMap: Record<string, AgeGroupStats>;
  regionalFactors: Record<string, RegionalFactor>;
  incomeQuintileNetAsset: {
    quintile: number;
    label: string;
    avgNetAsset: number;
  }[];
  netAssetDeciles: {
    decile: number;
    avgNetAsset: number;
    sharePercent: number;
  }[];
  meta: {
    source: string;
    baseDate: string;
    incomeBaseDate: string;
  };
}
