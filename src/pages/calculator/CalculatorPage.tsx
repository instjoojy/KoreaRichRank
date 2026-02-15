import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import { Helmet } from "@dr.pogodin/react-helmet";
import type { StatsData } from "../../data/types";
import {
  ASSET_STOPS,
  INCOME_STOPS,
  stopsToValue,
  valueToStops,
} from "../../utils/sliderStops";
import CalculatorForm from "./components/CalculatorForm";
import InsightsSection from "./components/InsightsSection";

export default function CalculatorPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // ── 기존 공유 URL 리다이렉트 ─────────────────────────────
  useEffect(() => {
    const urlAge = searchParams.get("age");
    const urlAsset = searchParams.get("asset");
    if (urlAge && urlAsset) {
      navigate(`/calculator/result?${searchParams.toString()}`, { replace: true });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── 통계 데이터 로딩 ────────────────────────────────────
  const [statsData, setStatsData] = useState<StatsData | null>(null);
  const [statsError, setStatsError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/data/stats.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: StatsData) => {
        if (!cancelled) setStatsData(data);
      })
      .catch((err) => {
        if (!cancelled) setStatsError(err.message ?? "데이터 로딩 실패");
      });
    return () => { cancelled = true; };
  }, []);

  const REGION_OPTIONS = useMemo(
    () =>
      statsData
        ? Object.entries(statsData.regionalFactors).map(([key, val]) => ({
            value: key,
            label: val.label,
          }))
        : [],
    [statsData]
  );

  // ── 입력 상태 ──────────────────────────────────────────────
  const [age, setAge] = useState<number | "">(35);
  const [region, setRegion] = useState("national");
  const [assetEok, setAssetEok] = useState(3);
  const [assetMan, setAssetMan] = useState(0);
  const [incomeMan, setIncomeMan] = useState(5000);

  const netAsset = assetEok * 10000 + assetMan;
  const assetSliderPos = valueToStops(netAsset, ASSET_STOPS);
  const incomeSliderPos = valueToStops(incomeMan, INCOME_STOPS);

  // ── 계산 핸들러 → 결과 페이지로 이동 ──────────────────────
  function handleCalculate() {
    if (!statsData) return;
    const ageNum = age === "" ? 20 : age;
    const params = new URLSearchParams({
      age: String(ageNum),
      region,
      asset: String(netAsset),
      income: String(incomeMan),
    });
    navigate(`/calculator/result?${params.toString()}`);
  }

  // ── 슬라이더 핸들러 ───────────────────────────────────────
  function handleAssetSlider(pos: number) {
    const v = stopsToValue(pos, ASSET_STOPS);
    setAssetEok(Math.floor(v / 10000));
    setAssetMan(v % 10000);
  }

  function handleIncomeSlider(pos: number) {
    setIncomeMan(stopsToValue(pos, INCOME_STOPS));
  }

  // ── 통계 데이터 로딩/에러 ─────────────────────────────────
  if (statsError) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg p-10 text-center max-w-sm w-full">
          <p className="text-xl font-black text-navy mb-3">데이터 로딩 실패</p>
          <p className="text-sm font-medium text-gray-400 mb-8">{statsError}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 bg-indigo hover:bg-indigo-dark text-navy font-bold px-6 py-3.5 rounded-2xl transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            새로고침
          </button>
        </div>
      </div>
    );
  }

  if (!statsData) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full border-4 border-indigo-100 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-t-indigo border-r-indigo border-b-transparent border-l-transparent animate-spin-slow" />
          </div>
          <p className="text-sm font-medium text-gray-400">통계 데이터 로딩 중...</p>
        </div>
      </div>
    );
  }

  // ═════════════════════════════════════════════════════════
  return (
    <>
      <Helmet>
        <title>내 자산 상위 몇 %? 2026 자산순위 계산기 | 대한민국 부자연구소</title>
        <meta name="description" content="2026년 통계청 가계금융복지조사 기반, 내 순자산은 전국 상위 몇 퍼센트일까? 나이·지역·소득별 자산 백분위를 무료로 확인하세요." />
        <link rel="canonical" href="https://korearichlab.com/calculator" />
        <meta property="og:title" content="대한민국 자산 상위 % 계산기 | 대한민국 부자연구소" />
        <meta property="og:description" content="2026년 통계청 기반, 내 자산은 전국 상위 몇 %? 나이·지역·소득별 백분위를 무료로 확인하세요." />
        <meta property="og:image" content="https://korearichlab.com/og-image.jpg" />
        <meta property="og:url" content="https://korearichlab.com/calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="대한민국 부자연구소" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="대한민국 자산 상위 % 계산기 | 대한민국 부자연구소" />
        <meta name="twitter:description" content="2026년 통계청 기반, 내 자산은 전국 상위 몇 %? 나이·지역·소득별 백분위를 무료로 확인하세요." />
        <meta name="twitter:image" content="https://korearichlab.com/og-image.jpg" />
      </Helmet>

      {/* ── 히어로 헤더 ───────────────────────────────────── */}
      <header className="bg-gradient-to-b from-indigo to-indigo-dark">
        <div className="max-w-[600px] mx-auto px-6 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-3xl mb-6 animate-float text-4xl" role="img" aria-label="자산 순위 트로피 아이콘">
            🏆
          </div>
          <h1 className="text-[32px] sm:text-[40px] font-black tracking-tight leading-tight text-white">
            내 지갑, 전국 몇 등?
          </h1>
          <p className="mt-5 text-lg sm:text-xl font-bold text-white/80 leading-[1.7]">
            대한민국 자산 상위 % 계산기
          </p>
          <p className="mt-2 text-base sm:text-lg font-medium text-indigo-light/60">
            2026 가계금융복지조사 기반
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-white/[0.08] rounded-full px-5 py-2.5 text-[15px] font-medium text-indigo-100/60">
            <div className="w-1.5 h-1.5 rounded-full bg-amber" />
            통계청 공식 데이터 기반 분석
          </div>
        </div>
      </header>

      <div className="max-w-[600px] mx-auto px-5 pb-20 -mt-8 relative z-10">
        <CalculatorForm
          age={age}
          region={region}
          assetEok={assetEok}
          assetMan={assetMan}
          incomeMan={incomeMan}
          netAsset={netAsset}
          assetSliderPos={assetSliderPos}
          incomeSliderPos={incomeSliderPos}
          regionOptions={REGION_OPTIONS}
          onAgeChange={setAge}
          onRegionChange={setRegion}
          onAssetSlider={handleAssetSlider}
          onAssetEokChange={setAssetEok}
          onAssetManChange={setAssetMan}
          onIncomeSlider={handleIncomeSlider}
          onIncomeManChange={setIncomeMan}
          onCalculate={handleCalculate}
        />
      </div>

      {/* ── 연구소의 비밀 노트 ──────────────────────────────── */}
      <InsightsSection />
    </>
  );
}
