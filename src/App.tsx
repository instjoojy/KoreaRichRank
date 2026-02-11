import { useState, useEffect, useRef, useMemo } from "react";
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
  ChevronRight,
  RefreshCw,
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
import type { StatsData } from "./data/types";
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
  accentColor: string;
  badge: string;
}

function getAnalysis(pct: number): Analysis {
  if (pct <= 1)
    return {
      icon: Crown,
      title: "혹시 재벌 3세...?",
      message:
        "대한민국 상위 1%. 축하드립니다, 당신은 공식적으로 '그 분'입니다. 100명이 모인 방에 들어가면 당신보다 부자인 사람은 없거나 겨우 한 명입니다. 이쯤 되면 고민이 '돈을 어떻게 벌까'가 아니라 '세금을 어떻게 줄일까'죠. 전체 순자산의 약 20%를 상위 1%가 쥐고 있다는 사실, 그리고 그 1%에 당신이 포함된다는 사실. 카페에서 아메리카노 시킬 때 가격 안 보고 시키시죠? 인정하세요. 지금 필요한 건 재테크 팁이 아니라 세무사랑 변호사 전화번호입니다.",
      accentColor: "#FFD700",
      badge: "TOP 1%",
    };
  if (pct <= 5)
    return {
      icon: Award,
      title: "동네에서 소문난 부자",
      message:
        "상위 5%! 친구들 사이에서 '걔 좀 사는데...'라는 말을 듣는 포지션입니다. 부동산에 금융자산까지, 포트폴리오가 제법 균형 잡혀 있을 확률이 높습니다. 연말정산 때 세무사가 먼저 전화하는 수준이시죠? 이 단계에서는 돈을 버는 것보다 지키는 게 더 어렵습니다. 주변에서 '야, 너 좀 빌려줘' 소리가 점점 늘어나는 것도 이 구간의 특징입니다. 절세 전략을 세우시고, 부탁은 정중하게 거절하세요.",
      accentColor: "#FFD700",
      badge: "WEALTHY",
    };
  if (pct <= 10)
    return {
      icon: Target,
      title: "슬슬 부자 냄새가...",
      message:
        "상위 10%! 대한민국 전체 순자산의 46%를 이 그룹이 들고 있습니다. 당신도 그 멤버라는 뜻이에요. 택시 탈 때 '좀 돌아가도 편한 길로'라고 말하기 시작하셨죠? 마트에서 1+1 안 보고 그냥 집어드시구요. 이 정도면 노후 걱정은 접어두셔도 됩니다. 다만 '상위 5%'까지는 생각보다 가깝습니다. 조금만 더 꾸준히 관리하면 다음에는 한 단계 위의 멘트를 보실 수 있을 겁니다. 화이팅!",
      accentColor: "#FFD700",
      badge: "TOP 10%",
    };
  if (pct <= 20)
    return {
      icon: TrendingUp,
      title: "인생 꽤 잘 굴리셨는데요?",
      message:
        "상위 20%! 평균을 크게 상회하는 자산을 가지고 계십니다. 명절에 친척들이 '너는 잘 나가지~' 하는 소리를 들어보셨을 겁니다. 은퇴 후에도 치킨에 맥주 정도는 눈치 안 보고 시킬 수 있는 수준이에요. 다만 아직 '있는 집'이라고 당당하게 말하기엔 살짝 애매한 구간이기도 합니다. 그래도 이 정도면 자기 자신을 꽤 칭찬해줘도 됩니다. 다음 목표는 상위 10%! 가능합니다, 이미 여기까지 왔잖아요.",
      accentColor: "#60A5FA",
      badge: "STABLE",
    };
  if (pct <= 30)
    return {
      icon: TrendingUp,
      title: "착실함의 끝판왕",
      message:
        "상위 30%! 당신은 대한민국에서 '착실하게 사는 사람'의 정석입니다. 매달 월급날 자동이체 설정해놓고, 커피값이 아까워서 텀블러 들고 다니신 보람이 있네요. 아직 강남 아파트는 먼 얘기지만, 적어도 통장 잔고 보고 한숨 쉬는 일은 없으시죠? 이 구간의 핵심은 '점프'입니다. 부동산이든 투자든, 한 번의 좋은 판단이 상위 20%로 뛰어오르게 해줄 수 있습니다. 텀블러는 계속 들고 다니시되, 투자 공부도 시작해보세요.",
      accentColor: "#60A5FA",
      badge: "UPPER MID",
    };
  if (pct <= 50)
    return {
      icon: Users,
      title: "대한민국의 진정한 중심",
      message:
        "딱 중간! 전국 순자산 중위값은 약 2억 3,800만 원인데, 당신은 바로 그 근처에 계십니다. 자랑하기엔 좀 그렇고, 그렇다고 슬퍼할 것도 전혀 없는 절묘한 위치입니다. 대한민국의 허리이자 기둥이시네요. 배달 시킬 때 '기본 메뉴'에서 고민하다가 결국 '곱빼기'는 시키시는 분이시죠? 여기서부터가 진짜 게임입니다. 꾸준한 저축과 현명한 투자 한 방이면 상위 30%는 금방이에요. 곱빼기 대신 투자에 그 돈을... 아, 곱빼기는 계속 드세요.",
      accentColor: "#34D399",
      badge: "MEDIAN",
    };
  if (pct <= 70)
    return {
      icon: Target,
      title: "아직 게임은 안 끝났다!",
      message:
        "자산 형성 초중반 단계! 걱정하지 마세요, 워런 버핏도 30세에 자산의 99%가 없었습니다(물론 그는 11살에 주식을 시작했지만, 그건 넘어갑시다). 중요한 건 지금부터입니다. 매달 소액이라도 투자하는 습관을 만들면, 10년 후의 당신은 지금의 당신에게 절을 할 겁니다. '에이, 이것도 안 되는데 뭘 투자해' 하고 넘기지 마세요. 커피 한 잔 값이 20년 뒤에는 치킨 한 마리가 됩니다. 복리의 마법을 믿으세요!",
      accentColor: "#34D399",
      badge: "GROWING",
    };
  return {
    icon: Target,
    title: "모든 영웅에겐 시작이 있다",
    message:
      "자산 축적의 출발선! 하지만 기죽을 필요 전혀 없습니다. 대한민국 평균 순자산이 4억 7,144만 원이라고 하지만, 그건 소수의 부자들이 평균을 왕창 끌어올린 거예요. 실제 중위값은 2억 3,800만 원이고, 생각보다 많은 사람들이 비슷한 위치에 있습니다. 지금 이 결과를 보고 있다는 것 자체가 재무 관리에 관심이 있다는 뜻이고, 그게 이미 절반은 성공한 겁니다. 비상금 마련부터 차근차근! '부자 되세요'가 아니라 '부자 됩시다'. 같이 갑시다!",
    accentColor: "#94A3B8",
    badge: "STARTER",
  };
}

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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-5 py-3">
      <p className="text-sm font-bold text-navy">{label}</p>
      <p className="text-sm font-medium text-gray-500">
        전체 가구의 <span className="font-bold text-navy">{payload[0].value}%</span>
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// App
// ═════════════════════════════════════════════════════════════
export default function App() {
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
  const AnalysisIcon = analysis?.icon ?? Target;

  // ── 통계 데이터 로딩/에러 ─────────────────────────────────
  if (statsError) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4">
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
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
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
    <div className="min-h-screen bg-[#F9FAFB]">
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
          <h1 className="text-3xl sm:text-[40px] font-black tracking-tight leading-tight text-white">
            대한민국 자산 상위 %
          </h1>
          <p className="mt-4 text-gray-400 text-base sm:text-lg font-medium leading-relaxed">
            2026 가계금융복지조사 기반 &middot; 내 자산은 상위 몇 %일까?
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-white/[0.06] rounded-full px-5 py-2 text-xs font-medium text-gray-400">
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            통계청 공식 데이터 기반 분석
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pb-16 -mt-8 relative z-10">
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
            <p className="text-xl font-black text-navy mb-2">
              데이터 분석 중
            </p>
            <p className="text-sm font-medium text-gray-400 mb-6">
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
            {/* ── 입력 카드 ───────────────────────────────────── */}
            <section className="bg-white rounded-3xl shadow-lg p-7 sm:p-10">
              <h2 className="text-xl font-black text-navy mb-8 flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gold-50">
                  <Wallet className="w-5 h-5 text-gold-dark" />
                </div>
                내 정보 입력
              </h2>

              {/* 나이 + 지역 */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <label className="block text-sm font-bold text-navy mb-2.5">
                    나이
                  </label>
                  <input
                    type="number"
                    min={20}
                    max={99}
                    value={age}
                    placeholder="나이 입력"
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v === "") { setAge(""); return; }
                      setAge(+v);
                    }}
                    onBlur={() => {
                      if (age === "") return;
                      setAge(Math.max(20, Math.min(99, age)));
                    }}
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 text-lg font-bold text-navy bg-[#F9FAFB] placeholder:text-gray-300 placeholder:font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-navy mb-2.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    거주 지역
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 text-lg font-bold text-navy bg-[#F9FAFB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-200 appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%239ca3af' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 16px center",
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

              <div className="h-px bg-gray-100 my-8" />

              {/* 순자산 */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-navy mb-2.5">
                  순자산 (자산 - 부채)
                </label>
                <div className="flex items-center gap-2.5 mb-4">
                  <input
                    type="number"
                    value={assetEok}
                    onChange={(e) => setAssetEok(Math.max(0, +e.target.value || 0))}
                    className="w-20 border border-gray-200 rounded-2xl px-3 py-3 text-center text-lg font-bold text-navy bg-[#F9FAFB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-200"
                  />
                  <span className="text-gray-400 font-bold text-sm">억</span>
                  <input
                    type="number"
                    value={assetMan}
                    step={100}
                    onChange={(e) => setAssetMan(Math.max(0, Math.min(9999, +e.target.value || 0)))}
                    className="w-28 border border-gray-200 rounded-2xl px-3 py-3 text-center text-lg font-bold text-navy bg-[#F9FAFB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-200"
                  />
                  <span className="text-gray-400 font-bold text-sm">만원</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={assetSliderPos}
                  onChange={(e) => handleAssetSlider(+e.target.value)}
                />
                <div className="flex justify-between text-xs font-medium text-gray-400 mt-2">
                  <span>0원</span>
                  <span className="font-bold text-navy bg-gold-50 px-3 py-1 rounded-full">{formatWon(netAsset)}</span>
                  <span>100억+</span>
                </div>
              </div>

              {/* 연봉 */}
              <div className="mb-10">
                <label className="block text-sm font-bold text-navy mb-2.5 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                  연봉 (세전)
                </label>
                <div className="flex items-center gap-2.5 mb-4">
                  <input
                    type="number"
                    value={incomeMan}
                    step={100}
                    onChange={(e) => setIncomeMan(Math.max(0, +e.target.value || 0))}
                    className="w-32 border border-gray-200 rounded-2xl px-3 py-3 text-center text-lg font-bold text-navy bg-[#F9FAFB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-200"
                  />
                  <span className="text-gray-400 font-bold text-sm">만원</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={incomeSliderPos}
                  onChange={(e) => handleIncomeSlider(+e.target.value)}
                />
                <div className="flex justify-between text-xs font-medium text-gray-400 mt-2">
                  <span>0원</span>
                  <span className="font-bold text-navy bg-gold-50 px-3 py-1 rounded-full">{formatWon(incomeMan)}</span>
                  <span>5억+</span>
                </div>
              </div>

              {/* CTA 버튼 */}
              <button
                onClick={handleCalculate}
                className="w-full group bg-gold hover:bg-gold-dark text-navy text-lg font-black py-4.5 rounded-2xl shadow-lg shadow-gold/25 transition-all duration-300 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                내 순위 계산하기
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </section>

            {/* ── 결과 섹션 ───────────────────────────────────── */}
            {result && analysis && (
              <div ref={resultRef} className="mt-6 space-y-4">
                {/* 메인 결과 카드 */}
                <section className="relative overflow-hidden rounded-3xl bg-navy shadow-xl animate-fade-in-up">
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-60 h-60 bg-gold/[0.06] rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gold/[0.04] rounded-full blur-3xl" />
                  </div>
                  <div className="relative p-8 sm:p-10 text-center">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-black px-4 py-1.5 rounded-full mb-5"
                      style={{ backgroundColor: `${analysis.accentColor}20`, color: analysis.accentColor }}
                    >
                      {analysis.badge}
                    </span>
                    <p className="text-gray-400 text-sm font-medium mb-2">
                      {result.ageGroup} 기준 &middot; {result.region} 거주
                    </p>
                    <div className="my-6">
                      <span className="text-6xl sm:text-7xl font-black tracking-tight text-gold animate-count-pulse drop-shadow-sm">
                        {displayPct}
                      </span>
                      <span className="text-3xl font-black ml-1 text-gold/70">%</span>
                    </div>
                    <p className="text-lg sm:text-xl font-bold text-white">
                      동년배 자산 상위{" "}
                      <span className="text-gold underline decoration-2 underline-offset-4">{result.assetPercentileByAge}%</span>
                    </p>
                  </div>
                </section>

                {/* 심리 분석 */}
                <section className="bg-white rounded-3xl shadow-md p-7 animate-fade-in-up animation-delay-100 opacity-0">
                  <div className="flex items-start gap-4">
                    <div
                      className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${analysis.accentColor}18` }}
                    >
                      <AnalysisIcon className="w-5 h-5" style={{ color: analysis.accentColor }} />
                    </div>
                    <div>
                      <h3 className="font-black text-navy text-lg mb-2">
                        {analysis.title}
                      </h3>
                      <p className="text-gray-400 font-medium leading-relaxed text-sm sm:text-[15px]">
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
                  />
                  <StatCard
                    icon={<Users className="w-4 h-4" />}
                    label={`${result.ageGroup} 자산`}
                    value={`상위 ${result.assetPercentileByAge}%`}
                    sub={`동년배 평균의 ${result.assetToAvgRatio}배`}
                  />
                  <StatCard
                    icon={<Briefcase className="w-4 h-4" />}
                    label="전국 소득"
                    value={`상위 ${result.incomePercentile}%`}
                    sub={`평균의 ${result.incomeToAvgRatio}배`}
                  />
                  <StatCard
                    icon={<MapPin className="w-4 h-4" />}
                    label={`${result.region} 자산`}
                    value={`상위 ${result.assetPercentileByRegion}%`}
                    sub="지역 기준"
                  />
                </div>

                {/* 차트 */}
                <section className="bg-white rounded-3xl shadow-md p-6 sm:p-8 animate-fade-in-up animation-delay-300 opacity-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gold-50">
                      <BarChart3 className="w-4.5 h-4.5 text-gold-dark" />
                    </div>
                    <h3 className="font-black text-navy text-lg">
                      대한민국 순자산 분포
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-400 mb-6 ml-12">
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
                          tick={{ fontSize: 10, fill: "#94A3B8" }}
                          interval={0}
                          angle={-35}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis
                          tick={{ fontSize: 11, fill: "#94A3B8" }}
                          tickFormatter={(v: number) => `${v}%`}
                        />
                        <Tooltip content={<ChartTooltip />} />
                        <Bar dataKey="percent" radius={[8, 8, 0, 0]}>
                          {chartData.map((entry, i) => (
                            <Cell
                              key={i}
                              fill={entry.isUser ? "#FFD700" : "#E2E8F0"}
                              stroke={entry.isUser ? "#C5A600" : "none"}
                              strokeWidth={entry.isUser ? 2 : 0}
                            />
                          ))}
                        </Bar>
                        {result && (
                          <ReferenceLine
                            x={DISTRIBUTION[userBin].range}
                            stroke="#FFD700"
                            strokeDasharray="4 4"
                            strokeWidth={1.5}
                            label={{
                              value: "나",
                              position: "top",
                              fill: "#1E293B",
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
                    className="w-full flex items-center justify-center gap-3 bg-[#FEE500] hover:bg-[#F5DC00] text-[#3C1E1E] font-black text-lg py-4.5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer"
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
      <section className="max-w-2xl mx-auto px-4 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gold-50">
            <TrendingUp className="w-5 h-5 text-gold-dark" />
          </div>
          <h2 className="text-xl font-black text-navy">
            자산 관리 인사이트
          </h2>
        </div>
        <div className="space-y-3">
          <AccordionItem title="2026 대한민국 평균 자산과 소득 (통계 분석)">
            <p className="mb-3">
              <strong className="font-bold text-navy">2026년 통계청 발표 기준, 대한민국의 자산 및 소득 분포는 다음과 같습니다.</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
              <li><strong className="font-semibold text-navy-light">전국 가구 평균 순자산:</strong> 약 4억 7,144만 원</li>
              <li><strong className="font-semibold text-navy-light">전국 가구 순자산 중위값:</strong> 약 2억 3,800만 원 (중산층 기준)</li>
              <li><strong className="font-semibold text-navy-light">자산 불평등 심화:</strong> 상위 1%가 전체 순자산의 약 20% 보유, 상위 10%가 46% 보유. 이는 부동산, 금융자산, 상속/증여 등 복합적 요인에 기인합니다.</li>
              <li><strong className="font-semibold text-navy-light">중산층의 변화:</strong> 과거 &apos;내 집 마련&apos;, &apos;안정적 직업&apos;에서 현재는 &apos;포괄적 자산 포트폴리오&apos;와 &apos;재정적 안정성&apos;이 중요.</li>
            </ul>
          </AccordionItem>

          <AccordionItem title="상위 1% 부자들의 자산 배분 전략">
            <p className="mb-3">
              <strong className="font-bold text-navy">상위 1% 자산가들은 일반 가구와는 다른 자산 배분 전략을 통해 부를 증식합니다.</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
              <li><strong className="font-semibold text-navy-light">부동산:</strong> 여전히 핵심 자산으로, 핵심 지역의 다주택 또는 상업용 부동산에 투자하여 임대 수익 및 시세 차익 추구.</li>
              <li><strong className="font-semibold text-navy-light">금융 자산:</strong> 주식, 채권, 펀드 외에도 헤지펀드, 사모펀드 등 대체 투자 비중을 높여 고수익 추구 및 위험 분산.</li>
              <li><strong className="font-semibold text-navy-light">사업체 투자:</strong> 직접 사업체를 운영하거나 유망 스타트업에 투자하여 지분 가치 상승을 통한 자산 증대.</li>
              <li><strong className="font-semibold text-navy-light">해외 투자:</strong> 국내 시장의 한계를 넘어 해외 부동산, 주식, 벤처 투자 등으로 포트폴리오 다변화.</li>
              <li><strong className="font-semibold text-navy-light">절세 전략:</strong> 법인 설립, 증여/상속 계획 등 전문가와 협력하여 합법적인 절세 전략 적극 활용.</li>
            </ul>
          </AccordionItem>

          <AccordionItem title="나이대별 권장 순자산 목표치">
            <p className="mb-3">
              <strong className="font-bold text-navy">개인의 재무 목표는 나이와 상황에 따라 달라지지만, 일반적으로 다음의 순자산 목표치를 참고할 수 있습니다.</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
              <li><strong className="font-semibold text-navy-light">20대:</strong> 종잣돈 마련 및 부채 관리. 학자금 대출 상환, 비상금 확보(3~6개월 생활비).</li>
              <li><strong className="font-semibold text-navy-light">30대:</strong> 자산 형성의 기반 다지기. 주택 마련 자금, 결혼 및 출산 준비. 투자 시작 및 포트폴리오 구축.</li>
              <li><strong className="font-semibold text-navy-light">40대:</strong> 자산 증식 가속화. 은퇴 자산 마련의 중요성 증대. 적극적인 투자 및 자산 리밸런싱.</li>
              <li><strong className="font-semibold text-navy-light">50대:</strong> 은퇴 준비 마무리 단계. 안정적인 자산 유지 및 인출 계획 수립. 현금 흐름 확보.</li>
              <li><strong className="font-semibold text-navy-light">60대 이상:</strong> 자산 보존 및 효율적인 인출 전략. 건강 관리 비용, 여가 생활비 등 고려.</li>
            </ul>
            <p className="mt-3 text-xs text-gray-400 font-medium">
              *위 목표치는 일반적인 가이드라인이며, 개인의 소득, 소비 습관, 투자 성향에 따라 조절이 필요합니다.
            </p>
          </AccordionItem>

          <AccordionItem title="자산 상위 %를 높이기 위한 실전 재테크 팁">
            <p className="mb-3">
              <strong className="font-bold text-navy">자산 순위를 높이고 경제적 자유를 달성하기 위한 실질적인 재테크 팁입니다.</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
              <li><strong className="font-semibold text-navy-light">체계적인 재무 계획:</strong> 목표 설정(주택, 은퇴, 교육 등), 예산 수립, 정기적인 재무 상태 점검.</li>
              <li><strong className="font-semibold text-navy-light">조기 투자 시작:</strong> 복리의 마법을 활용하여 소액이라도 일찍 시작하는 것이 중요.</li>
              <li><strong className="font-semibold text-navy-light">분산 투자 원칙:</strong> 주식, 채권, 부동산, 대체 투자 등 다양한 자산에 분산하여 위험 최소화.</li>
              <li><strong className="font-semibold text-navy-light">꾸준한 자기 계발:</strong> 소득 증대를 위한 능력 향상, 시장 변화에 대한 학습 지속.</li>
              <li><strong className="font-semibold text-navy-light">부채 현명하게 활용:</strong> 좋은 부채(투자 목적)와 나쁜 부채(소비 목적)를 구분하고, 이자율 낮은 대출 우선 상환.</li>
              <li><strong className="font-semibold text-navy-light">절세 전략 숙지:</strong> 연금저축, ISA, 비과세 상품 등 다양한 절세 혜택을 활용하여 세금 부담 최소화.</li>
              <li><strong className="font-semibold text-navy-light">부동산 인사이트:</strong> 거주 목적 외 투자 목적 부동산은 시장 분석 및 전문가 자문 필수.</li>
            </ul>
          </AccordionItem>
        </div>
      </section>

      {/* ── 푸터 ──────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-2xl mx-auto px-4 py-10 text-center">
          <p className="text-xs font-medium text-gray-400 leading-relaxed">
            통계 출처: 2026년 가계금융복지조사 (국가데이터처 &middot; 금융감독원 &middot; 한국은행)
          </p>
          <p className="text-xs font-medium text-gray-400 mt-2 leading-relaxed">
            본 서비스는 통계 기반의 추정치이며, 실제 개인 자산 순위와 다를 수 있습니다.
          </p>
          <div className="mt-5 h-px w-12 mx-auto bg-gray-200" />
          <p className="mt-5 text-sm font-black text-navy/30">
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
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 transition-all duration-200 hover:shadow-md">
      <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl mb-3 bg-gold-50 text-gold-dark">
        {icon}
      </div>
      <p className="text-xs font-medium text-gray-400 mb-1">{label}</p>
      <p className="text-xl font-black text-navy">{value}</p>
      <p className="text-xs font-medium text-gray-400 mt-1">{sub}</p>
    </div>
  );
}
