import { useState, useEffect, useRef } from "react";
import {
  Calculator,
  TrendingUp,
  Users,
  MapPin,
  Wallet,
  Briefcase,
  MessageCircle,
  Crown,
  Target,
  Award,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import {
  calculatePercentile,
  type CalculatorResult,
} from "./utils/calculator";
import { regionalFactors } from "./data/stats";
import AdBanner from "./components/AdBanner";
import { Helmet } from "@dr.pogodin/react-helmet"; // Import Helmet

// ─── 슬라이더 ↔ 값 변환 (비선형) ──────────────────────────
type Stop = [number, number]; // [sliderPos, value]

const ASSET_STOPS: Stop[] = [
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

const INCOME_STOPS: Stop[] = [
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

function stopsToValue(pos: number, stops: Stop[]): number {
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

function valueToStops(value: number, stops: Stop[]): number {
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

// ─── 한국식 금액 포맷 ───────────────────────────────────────
function formatWon(v: number): string {
  if (v === 0) return "0원";
  const neg = v < 0;
  const abs = Math.abs(v);
  const eok = Math.floor(abs / 10000);
  const man = abs % 10000;
  let s = "";
  if (eok > 0) s += `${eok.toLocaleString()}억`;
  if (eok > 0 && man > 0) s += " ";
  if (man > 0) s += `${man.toLocaleString()}만`;
  s += "원";
  return neg ? `-${s}` : s;
}

// ─── 순자산 분포 차트 데이터 ────────────────────────────────
const DISTRIBUTION = [
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

function getUserBin(netAsset: number): number {
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

// ─── 심리 분석 문구 ─────────────────────────────────────────
interface Analysis {
  icon: typeof Crown;
  title: string;
  message: string;
  gradient: string;
  badge: string;
}

function getAnalysis(pct: number): Analysis {
  if (pct <= 1)
    return {
      icon: Crown,
      title: "최상위 자산가",
      message:
        "당신은 대한민국 1%의 자산가입니다. 이 수준은 단순한 '부자'를 넘어, 자산 운용 전략과 세대 간 이전 설계가 중요한 단계입니다. 전체 순자산의 약 20%를 상위 1%가 보유하고 있습니다.",
      gradient: "from-amber-500 to-yellow-400",
      badge: "TOP 1%",
    };
  if (pct <= 5)
    return {
      icon: Award,
      title: "상위 부유층",
      message:
        "한국에서 '부유층'으로 분류되는 상위 5%에 드셨습니다. 부동산과 금융자산의 균형 잡힌 포트폴리오를 갖추고 계실 가능성이 높습니다. 이 단계에서는 절세 전략이 자산 증식만큼 중요합니다.",
      gradient: "from-purple-600 to-indigo-500",
      badge: "WEALTHY",
    };
  if (pct <= 10)
    return {
      icon: Target,
      title: "경제적 상위층",
      message:
        "상위 10% — 경제적으로 매우 안정된 위치입니다. 이 그룹이 대한민국 전체 순자산의 46%를 보유하고 있습니다. 꾸준한 자산 관리로 상위 5%를 향해 나아갈 기반이 충분합니다.",
      gradient: "from-indigo-600 to-blue-500",
      badge: "TOP 10%",
    };
  if (pct <= 20)
    return {
      icon: TrendingUp,
      title: "안정적 자산가",
      message:
        "상위 20% 안에 드셨습니다. 평균을 크게 상회하는 자산을 축적해 오신 결과입니다. 은퇴 후에도 안정적인 생활이 가능한 수준이며, 추가 투자 여력이 있는 단계입니다.",
      gradient: "from-blue-600 to-cyan-500",
      badge: "STABLE",
    };
  if (pct <= 30)
    return {
      icon: TrendingUp,
      title: "중상위층",
      message:
        "착실하게 자산을 형성해오고 계십니다. 대한민국 중상위 30%로, 부동산이나 금융 투자를 통해 한 단계 도약할 수 있는 탄탄한 기반을 갖추고 계십니다.",
      gradient: "from-cyan-600 to-teal-500",
      badge: "UPPER MID",
    };
  if (pct <= 50)
    return {
      icon: Users,
      title: "중위 수준",
      message:
        "대한민국 가구의 중간 지점에 위치해 있습니다. 전국 순자산 중위값은 약 2억 3,800만 원입니다. 꾸준한 저축과 현명한 투자로 상위 30%를 충분히 노려볼 수 있는 위치입니다.",
      gradient: "from-teal-600 to-emerald-500",
      badge: "MEDIAN",
    };
  if (pct <= 70)
    return {
      icon: Target,
      title: "자산 성장기",
      message:
        "아직 자산 형성 초중반 단계이지만 걱정하지 마세요. 시간은 가장 강력한 투자 도구입니다. 매달 소액이라도 꾸준히 투자하는 습관이 10년 후 큰 차이를 만듭니다.",
      gradient: "from-emerald-600 to-green-500",
      badge: "GROWING",
    };
  return {
    icon: Target,
    title: "자산 축적 시작",
    message:
      "자산 축적의 출발선에 계십니다. 모든 부의 시작은 '지금'입니다. 비상금 마련부터 시작해서 차근차근 자산을 쌓아가세요. 대한민국 평균 순자산은 4억 7,144만 원이지만, 중위값은 2억 3,800만 원입니다.",
    gradient: "from-green-600 to-lime-500",
    badge: "STARTER",
  };
}

// ─── 지역 옵션 ──────────────────────────────────────────────
const REGION_OPTIONS = Object.entries(regionalFactors).map(([key, val]) => ({
  value: key,
  label: val.label,
}));

// ─── 차트 커스텀 툴팁 ──────────────────────────────────────
function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-100 px-4 py-3">
      <p className="text-sm font-semibold text-gray-800">{label}</p>
      <p className="text-sm text-indigo-600">
        전체 가구의 <span className="font-bold">{payload[0].value}%</span>
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// App
// ═════════════════════════════════════════════════════════════
export default function App() {
  // ── 입력 상태 ──────────────────────────────────────────────
  const [age, setAge] = useState(35);
  const [region, setRegion] = useState("national");
  const [assetEok, setAssetEok] = useState(3);
  const [assetMan, setAssetMan] = useState(0);
  const [incomeMan, setIncomeMan] = useState(5000);

  const netAsset = assetEok * 10000 + assetMan;
  const assetSliderPos = valueToStops(netAsset, ASSET_STOPS);
  const incomeSliderPos = valueToStops(incomeMan, INCOME_STOPS);

  // ── 결과 상태 ──────────────────────────────────────────────
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [displayPct, setDisplayPct] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
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
    setIsLoading(true); // 로딩 시작
    setResult(null); // 이전 결과 초기화

    setTimeout(() => {
      const res = calculatePercentile({
        age,
        region,
        netAsset,
        income: incomeMan,
      });
      setResult(res);
      setIsLoading(false); // 로딩 종료
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 3500); // 3.5초 로딩 지연
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
  const AnalysisIcon = analysis?.icon ?? Target;

  // ═════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/30 to-indigo-50/50">
      <Helmet>
        <title>대한민국 자산 상위 %</title>
        <meta name="description" content="2026년 최신 통계청 자료 기반, 내 자산은 대한민국 상위 몇 %일까? 나의 경제적 위치를 확인하고 맞춤형 금융 정보를 얻으세요." />
        <meta property="og:title" content={`대한민국 자산 상위 ${result ? displayPct : ''}% | 코리아리치랭크`} />
        <meta property="og:description" content="2026년 최신 통계청 자료 기반, 내 자산은 대한민국 상위 몇 %일까? 나의 경제적 위치를 확인하고 맞춤형 금융 정보를 얻으세요." />
        <meta property="og:image" content={`${window.location.origin}/og-image.jpg`} /> {/* Replace with actual image URL */}
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
      <header className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-2xl mx-auto px-5 py-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15 backdrop-blur-sm rounded-2xl mb-5 ring-1 ring-white/20">
            <Calculator className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            대한민국 자산 상위 %
          </h1>
          <p className="mt-3 text-indigo-200 text-base sm:text-lg">
            2026 가계금융복지조사 기반 &middot; 내 자산은 상위 몇 %일까?
          </p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pb-20 -mt-6 relative z-10">
        {isLoading ? (
          <section className="bg-white rounded-2xl shadow-xl shadow-indigo-100/50 p-6 sm:p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
            <p className="text-xl font-bold text-gray-900 mb-6">
              데이터 분석 중...
            </p>
            <AdBanner slot="loading-banner" className="w-full max-w-sm" />
          </section>
        ) : (
          <>
            {/* ── 입력 카드 ───────────────────────────────────── */}
            <section className="bg-white rounded-2xl shadow-xl shadow-indigo-100/50 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-indigo-600" />
                내 정보 입력
              </h2>

              {/* 나이 + 지역 */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">
                    나이
                  </label>
                  <input
                    type="number"
                    min={20}
                    max={99}
                    value={age}
                    onChange={(e) => setAge(Math.max(20, Math.min(99, +e.target.value || 20)))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 inline -mt-0.5 mr-1" />
                    거주 지역
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-lg font-semibold text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%236b7280' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                    }}
                  >
                    {REGION_OPTIONS.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 순자산 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  순자산 (자산 - 부채)
                </label>
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="number"
                    value={assetEok}
                    onChange={(e) => setAssetEok(Math.max(0, +e.target.value || 0))}
                    className="w-20 border border-gray-200 rounded-xl px-3 py-2.5 text-center text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                  <span className="text-gray-500 font-medium">억</span>
                  <input
                    type="number"
                    value={assetMan}
                    step={100}
                    onChange={(e) => setAssetMan(Math.max(0, Math.min(9999, +e.target.value || 0)))}
                    className="w-28 border border-gray-200 rounded-xl px-3 py-2.5 text-center text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                  <span className="text-gray-500 font-medium">만원</span>
                  </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={assetSliderPos}
                  onChange={(e) => handleAssetSlider(+e.target.value)}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0원</span>
                  <span className="font-medium text-indigo-500">{formatWon(netAsset)}</span>
                  <span>100억+</span>
                </div>
              </div>

              {/* 연봉 */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  <Briefcase className="w-3.5 h-3.5 inline -mt-0.5 mr-1" />
                  연봉 (세전)
                </label>
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="number"
                    value={incomeMan}
                    step={100}
                    onChange={(e) => setIncomeMan(Math.max(0, +e.target.value || 0))}
                    className="w-32 border border-gray-200 rounded-xl px-3 py-2.5 text-center text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                  <span className="text-gray-500 font-medium">만원</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={incomeSliderPos}
                  onChange={(e) => handleIncomeSlider(+e.target.value)}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0원</span>
                  <span className="font-medium text-indigo-500">{formatWon(incomeMan)}</span>
                  <span>5억+</span>
                </div>
              </div>

              {/* CTA 버튼 */}
              <button
                onClick={handleCalculate}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                내 순위 계산하기
              </button>
            </section>

            {/* ── 결과 섹션 ───────────────────────────────────── */}
            {result && analysis && (
              <div ref={resultRef} className="mt-8 space-y-5">
                {/* 메인 결과 카드 */}
                <section
                  className={`relative overflow-hidden rounded-2xl shadow-xl text-white bg-gradient-to-br ${analysis.gradient} animate-fade-in-up`}
                >
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute -top-20 -right-20 w-60 h-60 bg-white rounded-full blur-2xl" />
                  </div>
                  <div className="relative p-6 sm:p-8 text-center">
                    <span className="inline-block bg-white/20 backdrop-blur-sm text-sm font-bold px-3 py-1 rounded-full mb-4">
                      {analysis.badge}
                    </span>
                    <p className="text-white/80 mb-1">
                      {result.ageGroup} 기준, {result.region} 거주
                    </p>
                    <div className="my-4">
                      <span className="text-6xl sm:text-7xl font-extrabold tracking-tight animate-count-pulse">
                        {displayPct}
                      </span>
                      <span className="text-3xl font-bold ml-1">%</span>
                    </div>
                    <p className="text-xl font-semibold mb-2">
                      당신은 동년배 자산 상위 {result.assetPercentileByAge}% 입니다
                    </p>
                  </div>
                </section>

                {/* 심리 분석 */}
                <section className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in-up animation-delay-100 opacity-0">
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${analysis.gradient} flex items-center justify-center`}>
                      <AnalysisIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">
                        {analysis.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        {analysis.message}
                      </p>
                    </div>
                  </div>
                </section>

                {/* 상세 수치 카드 그리드 */}
                <div className="grid grid-cols-2 gap-3 animate-fade-in-up animation-delay-200 opacity-0">
                  <StatCard
                    icon={<TrendingUp className="w-4 h-4" />}
                    label="전국 자산"
                    value={`상위 ${result.assetPercentile}%`}
                    sub={`평균의 ${result.assetToAvgRatio}배`}
                    color="indigo"
                  />
                  <StatCard
                    icon={<Users className="w-4 h-4" />}
                    label={`${result.ageGroup} 자산`}
                    value={`상위 ${result.assetPercentileByAge}%`}
                    sub={`동년배 평균의 ${result.assetToAvgRatio}배`}
                    color="purple"
                  />
                  <StatCard
                    icon={<Briefcase className="w-4 h-4" />}
                    label="전국 소득"
                    value={`상위 ${result.incomePercentile}%`}
                    sub={`평균의 ${result.incomeToAvgRatio}배`}
                    color="blue"
                    />
                    <StatCard
                      icon={<MapPin className="w-4 h-4" />}
                      label={`${result.region} 자산`}
                      value={`상위 ${result.assetPercentileByRegion}%`}
                      sub="지역 기준"
                      color="cyan"
                    />
                  </div>

                  {/* 차트 */}
                  <section className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 animate-fade-in-up animation-delay-300 opacity-0">
                    <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                      <TrendingUp className="w-4.5 h-4.5 text-indigo-600" />
                      대한민국 순자산 분포
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      전체 가구 기준 &middot; 내 위치가 강조 표시됩니다
                    </p>
                    <div className="w-full h-64 sm:h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={chartData}
                          margin={{ top: 5, right: 5, bottom: 5, left: -20 }}
                        >
                          <XAxis
                            dataKey="range"
                            tick={{ fontSize: 10, fill: "#9ca3af" }}
                            interval={0}
                            angle={-35}
                            textAnchor="end"
                            height={60}
                          />
                          <YAxis
                            tick={{ fontSize: 11, fill: "#9ca3af" }}
                            tickFormatter={(v) => `${v}%`}
                          />
                          <Tooltip content={<ChartTooltip />} />
                          <Bar dataKey="percent" radius={[6, 6, 0, 0]}>
                            {chartData.map((entry, i) => (
                              <Cell
                                key={i}
                                fill={entry.isUser ? "#4f46e5" : "#e0e7ff"}
                                stroke={entry.isUser ? "#4338ca" : "none"}
                                strokeWidth={entry.isUser ? 2 : 0}
                              />
                            ))}
                          </Bar>
                          {result && (
                            <ReferenceLine
                              x={DISTRIBUTION[userBin].range}
                              stroke="#4f46e5"
                              strokeDasharray="4 4"
                              strokeWidth={1.5}
                              label={{
                                value: "나",
                                position: "top",
                                fill: "#4f46e5",
                                fontSize: 12,
                                fontWeight: "bold",
                              }}
                            />
                          )}
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </section>

                  {/* 카카오톡 공유 */}
                  <section className="animate-fade-in-up animation-delay-400 opacity-0">
                                      <button
                                        onClick={async () => {
                      if (!result) return;
                      const shareMessage = `나 상위 ${displayPct}% 나왔어! 대한민국 자산 순위 알아보기: ${window.location.origin}`;
                      try {
                        await navigator.clipboard.writeText(shareMessage);
                        alert("결과 메시지가 클립보드에 복사되었습니다. 카카오톡에 붙여넣어 공유해주세요!");
                      } catch (err) {
                        console.error("클립보드 복사 실패:", err);
                        alert("클립보드 복사에 실패했습니다. 직접 복사하여 공유해주세요: " + shareMessage);
                      }
                    }}
                                        className="w-full flex items-center justify-center gap-3 bg-[#FEE500] hover:bg-[#F5DC00] text-[#3C1E1E] font-bold text-lg py-4 rounded-xl shadow-md transition-all duration-200 active:scale-[0.98] cursor-pointer"
                                      >
                                        <MessageCircle className="w-5 h-5" />
                                        카카오톡으로 결과 공유하기
                                      </button>                  </section>

                  {/* 하단 광고 */}
                  <AdBanner slot="bottom-banner" className="w-full" />
                </div>
              )}
            </>
          )}
        </main>
        
        {/* ── 전문 칼럼 ─────────────────────────────────────── */}
        <article className="max-w-2xl mx-auto px-4 mt-8 bg-white rounded-2xl shadow-xl shadow-indigo-100/50 p-6 sm:p-8 text-gray-800 leading-relaxed">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
            2026년 대한민국 자산 불평등과 중산층의 기준
          </h2>
          <p className="mb-4">
            대한민국은 빠르게 성장해왔지만, 자산 불평등 심화는 여전히 중요한 사회적 과제입니다. 2026년 현재, 가계금융복지조사(Household Financial Welfare Survey) 데이터를 기반으로 한 분석에 따르면, 상위 소득 계층과 하위 소득 계층 간의 자산 격차는 더욱 벌어지고 있는 추세입니다. 이는 단순히 소득의 문제가 아니라 부동산, 금융 자산, 그리고 상속과 증여 등의 복합적인 요인이 작용한 결과로 해석될 수 있습니다.
          </p>
          <p className="mb-4">
            중산층의 기준은 시대와 경제 상황에 따라 변화합니다. 과거에는 '내 집 마련'과 '안정적인 직업'이 중산층의 대표적인 표상이었으나, 현재는 더욱 포괄적인 자산 포트폴리오와 미래 대비 재정적 안정성이 강조됩니다. 통계청 자료에 의하면, 2026년 기준 대한민국 중산층 가구의 순자산(Net Asset) 중앙값은 약 2억 5천만원으로 추정됩니다. 이는 부채를 제외한 실질적인 자산 규모를 나타내며, 이와 함께 월 소득, 주거 형태, 교육 수준 등이 복합적으로 고려되어 중산층의 지위를 결정하게 됩니다.
          </p>
          <p className="mb-4">
            특히 부동산 자산은 가계 자산에서 큰 비중을 차지하며, 주택 가격의 등락은 자산 불평등에 직접적인 영향을 미칩니다. 특정 지역의 부동산 가격 상승은 해당 지역의 자산가들에게는 긍정적이나, 비자산가들에게는 진입 장벽으로 작용하여 자산 격차를 더욱 확대시키는 요인이 됩니다. 금융 자산의 경우, 주식, 채권, 펀드 등 다양한 투자 상품에 대한 접근성과 정보의 비대칭성이 자산 증식의 속도를 좌우하기도 합니다.
          </p>
          <p className="mb-4">
            자산 불평등 완화를 위한 정책적 노력도 지속되고 있습니다. 정부는 청년층의 자산 형성을 지원하고, 저소득층의 주거 안정을 도모하며, 상속세 및 증여세 제도를 통해 부의 대물림을 완화하려는 시도를 하고 있습니다. 그러나 이러한 정책들이 시장에 미치는 영향은 복합적이며, 때로는 예상치 못한 부작용을 낳기도 합니다. 따라서 지속적인 데이터 분석과 유연한 정책 대응이 중요합니다.
          </p>
          <p className="mb-4">
            개인적인 차원에서는 '재정 문맹'을 탈피하고 '금융 리터러시'를 높이는 것이 중요합니다. 기본적인 경제 원리 이해, 합리적인 소비 습관 형성, 그리고 자신에게 맞는 투자 전략 수립은 불확실한 경제 환경 속에서 자산을 지키고 불려나가는 핵심 역량입니다. 연금 상품 가입을 통한 노후 대비, 분산 투자를 통한 위험 관리 등 장기적인 관점에서의 자산 관리가 필요합니다.
          </p>
          <p className="mb-4">
            결론적으로 2026년 대한민국 자산 시장은 다양한 변수 속에서 복잡한 양상을 보이고 있습니다. 본 서비스를 통해 자신의 자산 위치를 객관적으로 파악하고, 이를 바탕으로 현명한 재정 계획을 세우는 데 도움이 되기를 바랍니다. 자산 증식은 단거리 경주가 아닌 마라톤과 같으며, 꾸준한 노력과 현명한 판단이 지속적인 재정적 성장을 이끌 것입니다.
          </p>
        </article>

        {/* ── 푸터 ──────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 pb-8 px-4">
          <p>
            통계 출처: 2026년 가계금융복지조사 (국가데이터처 &middot; 금융감독원
            &middot; 한국은행)
          </p>
          <p className="mt-1">
            본 서비스는 통계 기반의 추정치이며, 실제 개인 자산 순위와 다를 수
            있습니다.
          </p>
        </footer>
      </div>
    );
  }

  // ─── 통계 카드 컴포넌트 ─────────────────────────────────────
  function StatCard({
    icon,
    label,
    value,
    sub,
    color,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string;
    sub: string;
    color: "indigo" | "purple" | "blue" | "cyan";
  }) {
    const colors = {
      indigo: "bg-indigo-50 text-indigo-600",
      purple: "bg-purple-50 text-purple-600",
      blue: "bg-blue-50 text-blue-600",
      cyan: "bg-cyan-50 text-cyan-600",
    };
    return (
      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-50">
        <div
          className={`inline-flex items-center justify-center w-8 h-8 rounded-lg mb-2 ${colors[color]}`}
        >
          {icon}
        </div>
        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
        <p className="text-xl font-extrabold text-gray-900">{value}</p>
        <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
      </div>
    );
  }
