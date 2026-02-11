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
  BarChart3,
  Sparkles,
  ChevronRight,
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
import { Helmet } from "@dr.pogodin/react-helmet";
import AccordionItem from "./components/AccordionItem";

// ─── 슬라이더 ↔ 값 변환 (비선형) ──────────────────────────
type Stop = [number, number];

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
  bgGlow: string;
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
      bgGlow: "rgba(245, 158, 11, 0.15)",
    };
  if (pct <= 5)
    return {
      icon: Award,
      title: "상위 부유층",
      message:
        "한국에서 '부유층'으로 분류되는 상위 5%에 드셨습니다. 부동산과 금융자산의 균형 잡힌 포트폴리오를 갖추고 계실 가능성이 높습니다. 이 단계에서는 절세 전략이 자산 증식만큼 중요합니다.",
      gradient: "from-purple-600 to-indigo-500",
      badge: "WEALTHY",
      bgGlow: "rgba(139, 92, 246, 0.15)",
    };
  if (pct <= 10)
    return {
      icon: Target,
      title: "경제적 상위층",
      message:
        "상위 10% — 경제적으로 매우 안정된 위치입니다. 이 그룹이 대한민국 전체 순자산의 46%를 보유하고 있습니다. 꾸준한 자산 관리로 상위 5%를 향해 나아갈 기반이 충분합니다.",
      gradient: "from-indigo-600 to-blue-500",
      badge: "TOP 10%",
      bgGlow: "rgba(99, 102, 241, 0.15)",
    };
  if (pct <= 20)
    return {
      icon: TrendingUp,
      title: "안정적 자산가",
      message:
        "상위 20% 안에 드셨습니다. 평균을 크게 상회하는 자산을 축적해 오신 결과입니다. 은퇴 후에도 안정적인 생활이 가능한 수준이며, 추가 투자 여력이 있는 단계입니다.",
      gradient: "from-blue-600 to-cyan-500",
      badge: "STABLE",
      bgGlow: "rgba(59, 130, 246, 0.15)",
    };
  if (pct <= 30)
    return {
      icon: TrendingUp,
      title: "중상위층",
      message:
        "착실하게 자산을 형성해오고 계십니다. 대한민국 중상위 30%로, 부동산이나 금융 투자를 통해 한 단계 도약할 수 있는 탄탄한 기반을 갖추고 계십니다.",
      gradient: "from-cyan-600 to-teal-500",
      badge: "UPPER MID",
      bgGlow: "rgba(6, 182, 212, 0.15)",
    };
  if (pct <= 50)
    return {
      icon: Users,
      title: "중위 수준",
      message:
        "대한민국 가구의 중간 지점에 위치해 있습니다. 전국 순자산 중위값은 약 2억 3,800만 원입니다. 꾸준한 저축과 현명한 투자로 상위 30%를 충분히 노려볼 수 있는 위치입니다.",
      gradient: "from-teal-600 to-emerald-500",
      badge: "MEDIAN",
      bgGlow: "rgba(20, 184, 166, 0.15)",
    };
  if (pct <= 70)
    return {
      icon: Target,
      title: "자산 성장기",
      message:
        "아직 자산 형성 초중반 단계이지만 걱정하지 마세요. 시간은 가장 강력한 투자 도구입니다. 매달 소액이라도 꾸준히 투자하는 습관이 10년 후 큰 차이를 만듭니다.",
      gradient: "from-emerald-600 to-green-500",
      badge: "GROWING",
      bgGlow: "rgba(16, 185, 129, 0.15)",
    };
  return {
    icon: Target,
    title: "자산 축적 시작",
    message:
      "자산 축적의 출발선에 계십니다. 모든 부의 시작은 '지금'입니다. 비상금 마련부터 시작해서 차근차근 자산을 쌓아가세요. 대한민국 평균 순자산은 4억 7,144만 원이지만, 중위값은 2억 3,800만 원입니다.",
    gradient: "from-green-600 to-lime-500",
    badge: "STARTER",
    bgGlow: "rgba(34, 197, 94, 0.15)",
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
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 px-4 py-3">
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
    setIsLoading(true);
    setResult(null);

    setTimeout(() => {
      const res = calculatePercentile({
        age,
        region,
        netAsset,
        income: incomeMan,
      });
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
  const AnalysisIcon = analysis?.icon ?? Target;

  // ═════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/30 to-indigo-50/40">
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
      <header className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-400/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-2xl mx-auto px-5 py-14 sm:py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15 backdrop-blur-sm rounded-2xl mb-5 ring-1 ring-white/20 animate-float">
            <Calculator className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            대한민국 자산 상위 %
          </h1>
          <p className="mt-3 text-indigo-200 text-base sm:text-lg leading-relaxed">
            2026 가계금융복지조사 기반 &middot; 내 자산은 상위 몇 %일까?
          </p>
          <div className="mt-5 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs text-indigo-100 ring-1 ring-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            통계청 공식 데이터 기반 분석
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pb-12 -mt-6 relative z-10">
        {isLoading ? (
          /* ── 로딩 상태 ────────────────────────────────────── */
          <section className="bg-white rounded-2xl shadow-xl shadow-indigo-100/50 ring-1 ring-gray-100 p-8 sm:p-10 text-center flex flex-col items-center justify-center min-h-[340px]">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full border-4 border-indigo-100 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-t-indigo-500 border-r-indigo-500 border-b-transparent border-l-transparent animate-spin-slow" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-indigo-500" />
              </div>
            </div>
            <p className="text-xl font-bold text-gray-900 mb-2">
              데이터 분석 중
            </p>
            <p className="text-sm text-gray-400 mb-5">
              2026년 통계청 자료와 비교하고 있습니다
            </p>
            <div className="w-full max-w-xs mx-auto">
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-progress" />
              </div>
            </div>
            <div className="mt-8 w-full max-w-sm">
              <AdBanner slot="loading-banner" className="w-full" />
            </div>
          </section>
        ) : (
          <>
            {/* ── 입력 카드 ───────────────────────────────────── */}
            <section className="bg-white rounded-2xl shadow-xl shadow-indigo-100/50 ring-1 ring-gray-100 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2.5">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50">
                  <Wallet className="w-4.5 h-4.5 text-indigo-600" />
                </div>
                내 정보 입력
              </h2>

              {/* 나이 + 지역 */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    나이
                  </label>
                  <input
                    type="number"
                    min={20}
                    max={99}
                    value={age}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v === "") { setAge(0); return; }
                      setAge(+v);
                    }}
                    onBlur={() => setAge((prev) => Math.max(20, Math.min(99, prev || 20)))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-lg font-semibold text-gray-900 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    거주 지역
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-lg font-semibold text-gray-900 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%239ca3af' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`,
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

              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-6" />

              {/* 순자산 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  순자산 (자산 - 부채)
                </label>
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="number"
                    value={assetEok}
                    onChange={(e) => setAssetEok(Math.max(0, +e.target.value || 0))}
                    className="w-20 border border-gray-200 rounded-xl px-3 py-2.5 text-center text-lg font-semibold text-gray-900 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                  />
                  <span className="text-gray-400 font-medium text-sm">억</span>
                  <input
                    type="number"
                    value={assetMan}
                    step={100}
                    onChange={(e) => setAssetMan(Math.max(0, Math.min(9999, +e.target.value || 0)))}
                    className="w-28 border border-gray-200 rounded-xl px-3 py-2.5 text-center text-lg font-semibold text-gray-900 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                  />
                  <span className="text-gray-400 font-medium text-sm">만원</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={assetSliderPos}
                  onChange={(e) => handleAssetSlider(+e.target.value)}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1.5">
                  <span>0원</span>
                  <span className="font-semibold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">{formatWon(netAsset)}</span>
                  <span>100억+</span>
                </div>
              </div>

              {/* 연봉 */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-500 mb-2 flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                  연봉 (세전)
                </label>
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="number"
                    value={incomeMan}
                    step={100}
                    onChange={(e) => setIncomeMan(Math.max(0, +e.target.value || 0))}
                    className="w-32 border border-gray-200 rounded-xl px-3 py-2.5 text-center text-lg font-semibold text-gray-900 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                  />
                  <span className="text-gray-400 font-medium text-sm">만원</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={incomeSliderPos}
                  onChange={(e) => handleIncomeSlider(+e.target.value)}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1.5">
                  <span>0원</span>
                  <span className="font-semibold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">{formatWon(incomeMan)}</span>
                  <span>5억+</span>
                </div>
              </div>

              {/* CTA 버튼 */}
              <button
                onClick={handleCalculate}
                className="w-full group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-indigo-200/70 transition-all duration-300 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                내 순위 계산하기
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </section>

            {/* ── 결과 섹션 ───────────────────────────────────── */}
            {result && analysis && (
              <div ref={resultRef} className="mt-8 space-y-5">
                {/* 메인 결과 카드 */}
                <section
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${analysis.gradient} shadow-xl animate-fade-in-up`}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-2xl" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
                  </div>
                  <div className="relative p-6 sm:p-8 text-center text-white">
                    <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-sm font-bold px-4 py-1.5 rounded-full mb-4">
                      <Sparkles className="w-3.5 h-3.5" />
                      {analysis.badge}
                    </span>
                    <p className="text-white/70 text-sm mb-1">
                      {result.ageGroup} 기준 &middot; {result.region} 거주
                    </p>
                    <div className="my-5">
                      <span className="text-6xl sm:text-7xl font-extrabold tracking-tight animate-count-pulse drop-shadow-sm">
                        {displayPct}
                      </span>
                      <span className="text-3xl font-bold ml-1 opacity-80">%</span>
                    </div>
                    <p className="text-lg sm:text-xl font-semibold">
                      동년배 자산 상위 <span className="underline decoration-2 underline-offset-4">{result.assetPercentileByAge}%</span>
                    </p>
                  </div>
                </section>

                {/* 심리 분석 */}
                <section
                  className="bg-white rounded-2xl shadow-lg ring-1 ring-gray-100 p-6 animate-fade-in-up animation-delay-100 opacity-0"
                  style={{ boxShadow: `0 4px 24px ${analysis.bgGlow}` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${analysis.gradient} flex items-center justify-center shadow-md`}>
                      <AnalysisIcon className="w-5.5 h-5.5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1.5">
                        {analysis.title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed text-sm sm:text-[15px]">
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
                <section className="bg-white rounded-2xl shadow-lg ring-1 ring-gray-100 p-5 sm:p-6 animate-fade-in-up animation-delay-300 opacity-0">
                  <div className="flex items-center gap-2.5 mb-1">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-50">
                      <BarChart3 className="w-4 h-4 text-indigo-600" />
                    </div>
                    <h3 className="font-bold text-gray-900">
                      대한민국 순자산 분포
                    </h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-5 ml-[38px]">
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
                          tickFormatter={(v: number) => `${v}%`}
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
                    onClick={() => alert("카카오톡 공유 기능은 현재 준비 중입니다.")}
                    className="w-full flex items-center justify-center gap-3 bg-[#FEE500] hover:bg-[#F5DC00] text-[#3C1E1E] font-bold text-lg py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5" />
                    카카오톡으로 결과 공유하기
                  </button>
                </section>

                {/* 하단 광고 */}
                <AdBanner slot="bottom-banner" className="w-full" />
              </div>
            )}
          </>
        )}
      </main>

      {/* ── 전문 칼럼 ─────────────────────────────────────── */}
      <section className="max-w-2xl mx-auto px-4 pb-12">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50">
            <TrendingUp className="w-4.5 h-4.5 text-indigo-600" />
          </div>
          <h2 className="text-xl font-extrabold text-gray-900">
            자산 관리 인사이트
          </h2>
        </div>
        <div className="space-y-3">
          <AccordionItem title="2026 대한민국 평균 자산과 소득 (통계 분석)">
            <p className="mb-3">
              <strong className="font-semibold text-gray-800">2026년 통계청 발표 기준, 대한민국의 자산 및 소득 분포는 다음과 같습니다.</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li><strong className="font-medium text-gray-700">전국 가구 평균 순자산:</strong> 약 4억 7,144만 원</li>
              <li><strong className="font-medium text-gray-700">전국 가구 순자산 중위값:</strong> 약 2억 3,800만 원 (중산층 기준)</li>
              <li><strong className="font-medium text-gray-700">자산 불평등 심화:</strong> 상위 1%가 전체 순자산의 약 20% 보유, 상위 10%가 46% 보유. 이는 부동산, 금융자산, 상속/증여 등 복합적 요인에 기인합니다.</li>
              <li><strong className="font-medium text-gray-700">중산층의 변화:</strong> 과거 &apos;내 집 마련&apos;, &apos;안정적 직업&apos;에서 현재는 &apos;포괄적 자산 포트폴리오&apos;와 &apos;재정적 안정성&apos;이 중요.</li>
            </ul>
          </AccordionItem>

          <AccordionItem title="상위 1% 부자들의 자산 배분 전략">
            <p className="mb-3">
              <strong className="font-semibold text-gray-800">상위 1% 자산가들은 일반 가구와는 다른 자산 배분 전략을 통해 부를 증식합니다.</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li><strong className="font-medium text-gray-700">부동산:</strong> 여전히 핵심 자산으로, 핵심 지역의 다주택 또는 상업용 부동산에 투자하여 임대 수익 및 시세 차익 추구.</li>
              <li><strong className="font-medium text-gray-700">금융 자산:</strong> 주식, 채권, 펀드 외에도 헤지펀드, 사모펀드 등 대체 투자 비중을 높여 고수익 추구 및 위험 분산.</li>
              <li><strong className="font-medium text-gray-700">사업체 투자:</strong> 직접 사업체를 운영하거나 유망 스타트업에 투자하여 지분 가치 상승을 통한 자산 증대.</li>
              <li><strong className="font-medium text-gray-700">해외 투자:</strong> 국내 시장의 한계를 넘어 해외 부동산, 주식, 벤처 투자 등으로 포트폴리오 다변화.</li>
              <li><strong className="font-medium text-gray-700">절세 전략:</strong> 법인 설립, 증여/상속 계획 등 전문가와 협력하여 합법적인 절세 전략 적극 활용.</li>
            </ul>
          </AccordionItem>

          <AccordionItem title="나이대별 권장 순자산 목표치">
            <p className="mb-3">
              <strong className="font-semibold text-gray-800">개인의 재무 목표는 나이와 상황에 따라 달라지지만, 일반적으로 다음의 순자산 목표치를 참고할 수 있습니다.</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li><strong className="font-medium text-gray-700">20대:</strong> 종잣돈 마련 및 부채 관리. 학자금 대출 상환, 비상금 확보(3~6개월 생활비).</li>
              <li><strong className="font-medium text-gray-700">30대:</strong> 자산 형성의 기반 다지기. 주택 마련 자금, 결혼 및 출산 준비. 투자 시작 및 포트폴리오 구축.</li>
              <li><strong className="font-medium text-gray-700">40대:</strong> 자산 증식 가속화. 은퇴 자산 마련의 중요성 증대. 적극적인 투자 및 자산 리밸런싱.</li>
              <li><strong className="font-medium text-gray-700">50대:</strong> 은퇴 준비 마무리 단계. 안정적인 자산 유지 및 인출 계획 수립. 현금 흐름 확보.</li>
              <li><strong className="font-medium text-gray-700">60대 이상:</strong> 자산 보존 및 효율적인 인출 전략. 건강 관리 비용, 여가 생활비 등 고려.</li>
            </ul>
            <p className="mt-3 text-xs text-gray-400">
              *위 목표치는 일반적인 가이드라인이며, 개인의 소득, 소비 습관, 투자 성향에 따라 조절이 필요합니다.
            </p>
          </AccordionItem>

          <AccordionItem title="자산 상위 %를 높이기 위한 실전 재테크 팁">
            <p className="mb-3">
              <strong className="font-semibold text-gray-800">자산 순위를 높이고 경제적 자유를 달성하기 위한 실질적인 재테크 팁입니다.</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li><strong className="font-medium text-gray-700">체계적인 재무 계획:</strong> 목표 설정(주택, 은퇴, 교육 등), 예산 수립, 정기적인 재무 상태 점검.</li>
              <li><strong className="font-medium text-gray-700">조기 투자 시작:</strong> 복리의 마법을 활용하여 소액이라도 일찍 시작하는 것이 중요.</li>
              <li><strong className="font-medium text-gray-700">분산 투자 원칙:</strong> 주식, 채권, 부동산, 대체 투자 등 다양한 자산에 분산하여 위험 최소화.</li>
              <li><strong className="font-medium text-gray-700">꾸준한 자기 계발:</strong> 소득 증대를 위한 능력 향상, 시장 변화에 대한 학습 지속.</li>
              <li><strong className="font-medium text-gray-700">부채 현명하게 활용:</strong> 좋은 부채(투자 목적)와 나쁜 부채(소비 목적)를 구분하고, 이자율 낮은 대출 우선 상환.</li>
              <li><strong className="font-medium text-gray-700">절세 전략 숙지:</strong> 연금저축, ISA, 비과세 상품 등 다양한 절세 혜택을 활용하여 세금 부담 최소화.</li>
              <li><strong className="font-medium text-gray-700">부동산 인사이트:</strong> 거주 목적 외 투자 목적 부동산은 시장 분석 및 전문가 자문 필수.</li>
            </ul>
          </AccordionItem>
        </div>
      </section>

      {/* ── 푸터 ──────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 bg-white/60 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 py-8 text-center">
          <p className="text-xs text-gray-400 leading-relaxed">
            통계 출처: 2026년 가계금융복지조사 (국가데이터처 &middot; 금융감독원 &middot; 한국은행)
          </p>
          <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
            본 서비스는 통계 기반의 추정치이며, 실제 개인 자산 순위와 다를 수 있습니다.
          </p>
          <div className="mt-4 h-px w-16 mx-auto bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          <p className="mt-4 text-xs text-gray-300 font-medium">
            코리아리치랭크
          </p>
        </div>
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
  const borderColors = {
    indigo: "hover:border-indigo-200",
    purple: "hover:border-purple-200",
    blue: "hover:border-blue-200",
    cyan: "hover:border-cyan-200",
  };
  return (
    <div className={`bg-white rounded-xl shadow-sm ring-1 ring-gray-100 p-4 transition-all duration-200 hover:shadow-md ${borderColors[color]}`}>
      <div
        className={`inline-flex items-center justify-center w-8 h-8 rounded-lg mb-2.5 ${colors[color]}`}
      >
        {icon}
      </div>
      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
      <p className="text-xl font-extrabold text-gray-900">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{sub}</p>
    </div>
  );
}
