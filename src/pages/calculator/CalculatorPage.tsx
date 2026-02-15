import { useState, useEffect, useRef, useMemo } from "react";
import { Calculator, BarChart3, RefreshCw } from "lucide-react";
import { Helmet } from "@dr.pogodin/react-helmet";
import {
  calculatePercentile,
  type CalculatorResult as CalcResult,
} from "../../utils/calculator";
import type { StatsData } from "../../data/types";
import AdBanner from "../../components/AdBanner";
import {
  ASSET_STOPS,
  INCOME_STOPS,
  stopsToValue,
  valueToStops,
} from "./utils/sliderStops";
import { getUserBin } from "./utils/distribution";
import { DISTRIBUTION } from "./utils/distribution";
import { getAnalysis } from "./utils/analysis";
import CalculatorForm from "./components/CalculatorForm";
import CalculatorResult from "./components/CalculatorResult";
import InsightsSection from "./components/InsightsSection";

export default function CalculatorPage() {
  // ── 통계 데이터 로딩 ────────────────────────────────────────
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

  // ── 결과 상태 ──────────────────────────────────────────────
  const [result, setResult] = useState<CalcResult | null>(null);
  const [displayPct, setDisplayPct] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // ── 카운트업 애니메이션 ────────────────────────────────────
  useEffect(() => {
    if (!result) return;
    const target = result.assetPercentileByAge;
    const duration = 1200;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayPct(
        Math.round((100 - (100 - target) * eased) * 10) / 10
      );
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [result]);

  // ── 계산 핸들러 ────────────────────────────────────────────
  function handleCalculate() {
    if (!statsData) return;
    setIsLoading(true);
    setResult(null);

    const ageNum = age === "" ? 20 : age;

    setTimeout(() => {
      const res = calculatePercentile(
        { age: ageNum, region, netAsset, income: incomeMan },
        statsData
      );
      setResult(res);
      setIsLoading(false);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 3500);
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

  // ── 차트 데이터 ────────────────────────────────────────────
  const userBin = getUserBin(netAsset);
  const chartData = DISTRIBUTION.map((d, i) => ({
    ...d,
    isUser: result ? i === userBin : false,
  }));

  // ── 분석 데이터 ────────────────────────────────────────────
  const analysis = result ? getAnalysis(result.assetPercentileByAge) : null;

  // ── 통계 데이터 로딩/에러 ─────────────────────────────────
  if (statsError) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg p-10 text-center max-w-sm w-full">
          <p className="text-xl font-black text-navy mb-3">데이터 로딩 실패</p>
          <p className="text-sm font-medium text-gray-400 mb-8">{statsError}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-6 py-3.5 rounded-2xl transition-colors cursor-pointer"
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
          <div className="w-16 h-16 mx-auto mb-5 rounded-full border-4 border-gold-100 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-t-gold border-r-gold border-b-transparent border-l-transparent animate-spin-slow" />
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
        <title>대한민국 자산 상위 % 계산기 | 코리아리치랭크</title>
        <meta name="description" content="2026년 최신 통계청 자료 기반, 내 자산은 대한민국 상위 몇 %일까? 나의 경제적 위치를 확인하고 맞춤형 금융 정보를 얻으세요." />
        <meta property="og:title" content={`대한민국 자산 상위 ${result ? displayPct : ''}% | 코리아리치랭크`} />
        <meta property="og:description" content="2026년 최신 통계청 자료 기반, 내 자산은 대한민국 상위 몇 %일까? 나의 경제적 위치를 확인하고 맞춤형 금융 정보를 얻으세요." />
        <meta property="og:image" content={`${window.location.origin}/og-image.jpg`} />
        <meta property="og:url" content={window.location.origin} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="코리아리치랭크" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`대한민국 자산 상위 ${result ? displayPct : ''}% | 코리아리치랭크`} />
        <meta name="twitter:description" content="2026년 최신 통계청 자료 기반, 내 자산은 대한민국 상위 몇 %일까? 나의 경제적 위치를 확인하고 맞춤형 금융 정보를 얻으세요." />
        <meta name="twitter:image" content={`${window.location.origin}/og-image.jpg`} />
      </Helmet>

      {/* ── 상단 광고 ─────────────────────────────────────── */}
      <AdBanner slot="top-banner" className="w-full" />

      {/* ── 히어로 헤더 ───────────────────────────────────── */}
      <header className="bg-navy">
        <div className="max-w-2xl mx-auto px-6 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/15 rounded-3xl mb-6 animate-float">
            <Calculator className="w-8 h-8 text-gold" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            대한민국 자산 상위 %
          </h1>
          <p className="mt-5 text-lg sm:text-xl font-bold text-white/90 leading-relaxed">
            내 자산은 상위 몇 %일까?
          </p>
          <p className="mt-2 text-base sm:text-lg font-medium text-gray-400">
            2026 가계금융복지조사 기반
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-white/[0.06] rounded-full px-5 py-2 text-sm font-medium text-gray-400">
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            통계청 공식 데이터 기반 분석
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pb-16 -mt-8 relative z-10">
        {isLoading ? (
          /* ── 로딩 상태 ────────────────────────────────────── */
          <section className="bg-white rounded-3xl shadow-lg p-10 sm:p-12 text-center flex flex-col items-center justify-center min-h-[360px]">
            <div className="relative mb-8">
              <div className="w-20 h-20 rounded-full border-4 border-gold-100 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-t-gold border-r-gold border-b-transparent border-l-transparent animate-spin-slow" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-gold" />
              </div>
            </div>
            <p className="text-2xl font-black text-navy mb-3">
              데이터 분석 중
            </p>
            <p className="text-base font-medium text-gray-400 mb-6">
              2026년 통계청 자료와 비교하고 있습니다
            </p>
            <div className="w-full max-w-xs mx-auto">
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gold rounded-full animate-progress" />
              </div>
            </div>
            <div className="mt-10 w-full max-w-sm">
              <AdBanner slot="loading-banner" className="w-full" />
            </div>
          </section>
        ) : (
          <>
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

            {result && analysis && (
              <CalculatorResult
                ref={resultRef}
                result={result}
                displayPct={displayPct}
                analysis={analysis}
                chartData={chartData}
                userBin={userBin}
              />
            )}
          </>
        )}
      </div>

      {/* ── 전문 칼럼 ─────────────────────────────────────── */}
      <InsightsSection />
    </>
  );
}
