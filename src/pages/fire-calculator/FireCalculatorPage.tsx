import { useState, useEffect, useMemo, useRef } from "react";
import AnalyzingLoader from "../../components/AnalyzingLoader";
import { Helmet } from "@dr.pogodin/react-helmet";
import {
  Flame,
  ChevronRight,
  User,
  Wallet,
  ShoppingCart,
  PiggyBank,
  TrendingUp,
  RotateCcw,
  Share2,
  Target,
} from "lucide-react";
import AdBanner from "../../components/AdBanner";
import FireArticle from "./FireArticle";

/* ── 상수 ─────────────────────────────────────── */
const MAX_SIMULATION_MONTHS = 12 * 80; // 최대 80년

/* ── 타입 ─────────────────────────────────────── */
interface Inputs {
  currentAge: number | "";
  totalAssets: number | "";
  monthlyExpenses: number | "";
  monthlySavings: number | "";
  expectedReturn: number | "";
}

interface Result {
  fireNumber: number;
  currentAssets: number;
  progressPercent: number;
  monthsToFire: number;
  yearsToFire: number;
  fireAge: number;
  fireYear: number;
  fireMonth: number;
  monthlyExpenses: number;
  monthlySavings: number;
  annualExpenses: number;
  savingsRate: number;
  alreadyFired: boolean;
  reachable: boolean;
}

interface Grade {
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
}

/* ── 등급 시스템 ──────────────────────────────── */
function getGrade(result: Result): Grade {
  if (result.alreadyFired)
    return {
      title: "이미 FIRE 달성!",
      subtitle:
        "축하합니다! 이미 경제적 자유를 달성하셨습니다. 회사에 다니고 계시다면... 그건 취미인 거죠?",
      emoji: "🏖️",
      color: "#FFD700",
    };
  if (!result.reachable)
    return {
      title: "대수술이 필요합니다",
      subtitle:
        "현재 속도로는 은퇴가 좀... 요원합니다. 하지만 가장 중요한 건 '지금 시작하는 것'! 배달앱 삭제가 위대한 첫 걸음입니다.",
      emoji: "🔧",
      color: "#DC2626",
    };
  if (result.yearsToFire <= 5)
    return {
      title: "거의 다 왔다!",
      subtitle:
        "퇴사 버튼에 손이 가는 건 자연스러운 현상입니다. 조금만 더 버티세요, 사표의 맛이 달콤해집니다!",
      emoji: "🚀",
      color: "#10B981",
    };
  if (result.yearsToFire <= 10)
    return {
      title: "FIRE 고속도로 탑승",
      subtitle:
        "10년 안에 은퇴라니, 동료들이 들으면 시기 질투의 눈빛을 보낼 겁니다. 절대 말하지 마세요!",
      emoji: "🏎️",
      color: "#059669",
    };
  if (result.yearsToFire <= 20)
    return {
      title: "꾸준함이 답이다",
      subtitle:
        "마라톤 러너처럼 꾸준히 달리고 계시네요. 중간에 치킨 시켜먹어도 됩니다, 멈추지만 않으면!",
      emoji: "🏃",
      color: "#F59E0B",
    };
  if (result.yearsToFire <= 30)
    return {
      title: "아직 갈 길이 멀다",
      subtitle:
        "걱정 마세요, 저축률을 5%만 높여도 은퇴 시점이 확 당겨집니다. 배달앱 삭제가 첫 걸음입니다!",
      emoji: "🧗",
      color: "#EA580C",
    };
  return {
    title: "대수술이 필요합니다",
    subtitle:
      "현재 속도로는 은퇴가 좀... 요원합니다. 하지만 가장 중요한 건 '지금 시작하는 것'! 오늘이 가장 빠른 날입니다.",
    emoji: "🔧",
    color: "#DC2626",
  };
}

/* ── 계산 로직 (4% 룰 + 월별 복리) ────────────── */
function calculate(inputs: Inputs): Result | null {
  const age = Number(inputs.currentAge);
  const assets = Number(inputs.totalAssets);
  const expenses = Number(inputs.monthlyExpenses);
  const savings = Number(inputs.monthlySavings);
  const annualReturn = Number(inputs.expectedReturn);

  if (!age || !expenses) return null;

  const fireNumber = expenses * 300;
  const annualExpenses = expenses * 12;
  const totalMonthly = expenses + savings;
  const savingsRate =
    totalMonthly > 0 ? Math.round((savings / totalMonthly) * 100) : 0;

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (assets >= fireNumber) {
    return {
      fireNumber,
      currentAssets: assets,
      progressPercent: 100,
      monthsToFire: 0,
      yearsToFire: 0,
      fireAge: age,
      fireYear: currentYear,
      fireMonth: currentMonth,
      monthlyExpenses: expenses,
      monthlySavings: savings,
      annualExpenses,
      savingsRate,
      alreadyFired: true,
      reachable: true,
    };
  }

  const monthlyRate = annualReturn / 100 / 12;
  let cur = assets;
  let months = 0;

  while (months < MAX_SIMULATION_MONTHS) {
    months++;
    cur = cur * (1 + monthlyRate) + savings;
    if (cur >= fireNumber) break;
  }

  const reachable = cur >= fireNumber;
  const yearsToFire = reachable ? Math.round((months / 12) * 10) / 10 : -1;
  const fireAge = reachable ? age + Math.ceil(months / 12) : -1;

  let fireYear = -1;
  let fireMonth = -1;
  if (reachable) {
    const totalMonths = (currentYear * 12 + currentMonth - 1) + months;
    fireYear = Math.floor(totalMonths / 12);
    fireMonth = (totalMonths % 12) + 1;
  }

  return {
    fireNumber,
    currentAssets: assets,
    progressPercent: Math.min(Math.round((assets / fireNumber) * 100), 99),
    monthsToFire: reachable ? months : -1,
    yearsToFire,
    fireAge,
    fireYear,
    fireMonth,
    monthlyExpenses: expenses,
    monthlySavings: savings,
    annualExpenses,
    savingsRate,
    alreadyFired: false,
    reachable,
  };
}

/* ── 입력 필드 정의 ───────────────────────────── */
const inputFields = [
  {
    key: "currentAge" as const,
    label: "현재 나이",
    unit: "세",
    icon: User,
    placeholder: "30",
    min: 15,
    step: 1,
  },
  {
    key: "totalAssets" as const,
    label: "총 순자산",
    unit: "만원",
    icon: Wallet,
    placeholder: "5000",
    min: 0,
    step: 100,
  },
  {
    key: "monthlyExpenses" as const,
    label: "월 평균 소비액",
    unit: "만원",
    icon: ShoppingCart,
    placeholder: "200",
    min: 1,
    step: 10,
  },
  {
    key: "monthlySavings" as const,
    label: "월 저축액",
    unit: "만원",
    icon: PiggyBank,
    placeholder: "100",
    min: 0,
    step: 10,
  },
  {
    key: "expectedReturn" as const,
    label: "예상 투자 수익률 (연)",
    unit: "%",
    icon: TrendingUp,
    placeholder: "7",
    min: 0,
    step: 0.5,
  },
];

/* ── 포맷 헬퍼 ────────────────────────────────── */
function formatNumber(n: number): string {
  return n.toLocaleString("ko-KR");
}

function formatWon(man: number): string {
  if (man >= 10000) {
    const eok = Math.floor(man / 10000);
    const remainder = man % 10000;
    if (remainder === 0) return `${eok}억`;
    return `${eok}억 ${formatNumber(remainder)}만`;
  }
  return `${formatNumber(man)}만`;
}

/* ── 메인 컴포넌트 ────────────────────────────── */
export default function FireCalculatorPage() {
  const [inputs, setInputs] = useState<Inputs>({
    currentAge: "",
    totalAssets: "",
    monthlyExpenses: "",
    monthlySavings: "",
    expectedReturn: "",
  });
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleChange = (key: keyof Inputs, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [key]: value === "" ? "" : Number(value),
    }));
    setShowResult(false);
  };

  /* 실시간 FIRE 달성률 프리뷰 */
  const livePreview = useMemo(() => {
    const assets = Number(inputs.totalAssets) || 0;
    const expenses = Number(inputs.monthlyExpenses) || 0;
    const fireNumber = expenses * 300;
    const progress =
      fireNumber > 0 ? Math.min(Math.round((assets / fireNumber) * 100), 100) : 0;
    return { fireNumber, progress };
  }, [inputs.totalAssets, inputs.monthlyExpenses]);

  const result = showResult ? calculate(inputs) : null;

  const handleCalculate = () => {
    if (!inputs.currentAge || !inputs.monthlyExpenses) return;
    setIsLoading(true);
    setShowResult(false);
  };

  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowResult(true);
      setTimeout(() => {
        document
          .getElementById("result-section")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 3500);
    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleReset = () => {
    setInputs({
      currentAge: "",
      totalAssets: "",
      monthlyExpenses: "",
      monthlySavings: "",
      expectedReturn: "",
    });
    setShowResult(false);
  };

  return (
    <>
      <Helmet>
        <title>FIRE 조기 은퇴 계산기 — 나는 몇 살에 은퇴할 수 있을까? | 대한민국 부자연구소</title>
        <meta
          name="description"
          content="4% 룰 기반 FIRE(경제적 자립 조기 은퇴) 시뮬레이션. 현재 자산·저축·소비 습관을 입력하면 은퇴 가능 시점을 월 단위로 계산해드립니다."
        />
        <link rel="canonical" href="https://korearichlab.com/fire-calculator" />
        <meta
          property="og:title"
          content="FIRE 조기 은퇴 계산기 | 대한민국 부자연구소"
        />
        <meta
          property="og:description"
          content="나는 몇 살에 은퇴할 수 있을까? 4% 룰 기반 FIRE 시뮬레이션으로 은퇴 시점을 계산하세요."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://korearichlab.com/fire-calculator" />
        <meta property="og:site_name" content="대한민국 부자연구소" />
      </Helmet>

      {/* ── 히어로 ─────────────────────────────────────── */}
      <header className="bg-gradient-to-b from-[#059669] to-[#065F46]">
        <div className="max-w-[600px] mx-auto px-6 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100/20 rounded-3xl mb-6 animate-float">
            <Flame className="w-8 h-8 text-emerald-100" />
          </div>
          <h1 className="text-[32px] sm:text-[40px] font-black tracking-tight leading-tight text-white">
            파이어(FIRE) 지수 계산기
          </h1>
          <p className="mt-5 text-lg sm:text-xl font-bold text-white/90 leading-[1.7]">
            나는 몇 살에 은퇴할 수 있을까?
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-white/[0.06] rounded-full px-5 py-2.5 text-[15px] font-medium text-emerald-100/60">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-light" />
            4% Rule 기반 시뮬레이션
          </div>
        </div>
      </header>

      {/* ── 메인 컨텐츠 ───────────────────────────────── */}
      <div className="max-w-[600px] mx-auto px-5 pb-20 -mt-8 relative z-10">
        {/* 입력 폼 카드 */}
        <section className="bg-white rounded-3xl shadow-xl p-7 sm:p-10">
          <h2 className="text-[32px] font-black text-navy mb-10 flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50">
              <Target className="w-6 h-6 text-emerald" />
            </div>
            FIRE 정보 입력
          </h2>

          <div className="space-y-7">
            {inputFields.map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.key}>
                  <label className="block text-[15px] font-bold text-navy mb-3 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-gray-400" />
                    {field.label}
                  </label>
                  <div className="flex items-center gap-2.5">
                    <input
                      type="number"
                      min={field.min}
                      step={field.step}
                      value={inputs[field.key]}
                      placeholder={field.placeholder}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      className="w-full border border-gray-200 rounded-2xl px-4 py-4 text-lg font-bold text-navy bg-[#F9FAFB] placeholder:text-gray-300 placeholder:font-medium transition-all duration-200"
                    />
                    <span className="text-gray-400 font-bold text-[15px] shrink-0 w-10">
                      {field.unit}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 실시간 FIRE 달성률 프리뷰 */}
          {livePreview.fireNumber > 0 && (
            <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-black text-navy text-sm mb-1">
                    FIRE 목표 금액 (실시간)
                  </h4>
                  <p className="text-sm font-medium text-gray-500 leading-relaxed">
                    목표:{" "}
                    <span className="font-black text-emerald-600">
                      {formatWon(livePreview.fireNumber)}원
                    </span>{" "}
                    (월 소비액 x 300)
                  </p>
                  {/* 프로그레스 바 */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-gray-400">
                        현재 달성률
                      </span>
                      <span className="text-xs font-black text-emerald-600">
                        {livePreview.progress}%
                      </span>
                    </div>
                    <div className="w-full h-3 bg-emerald-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald rounded-full transition-all duration-500"
                        style={{ width: `${livePreview.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="h-px bg-gray-100 my-10" />

          {/* CTA 버튼 */}
          <button
            onClick={handleCalculate}
            disabled={!inputs.currentAge || !inputs.monthlyExpenses}
            className="w-full group bg-gradient-to-r from-[#34D399] to-[#10B981] hover:from-[#10B981] hover:to-[#059669] disabled:from-gray-200 disabled:to-gray-200 disabled:text-gray-400 text-white text-lg font-black h-16 rounded-2xl shadow-lg shadow-emerald/25 disabled:shadow-none transition-all duration-300 active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            내 은퇴 시점 계산하기
            <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </section>

        {/* ── 로딩 ─────────────────────────────────────── */}
        {isLoading && (
          <div className="mt-8">
            <AnalyzingLoader
              accentColor="#10B981"
              accentBgColor="#D1FAE5"
              adSlot="fire-loading"
              messages={[
                "FIRE 목표 금액 산출 중...",
                "복리 수익 시뮬레이션 중...",
                "은퇴 시점 계산 중...",
                "저축률 분석 중...",
                "경제적 자유 지수 측정 중...",
              ]}
            />
          </div>
        )}

        {/* ── 결과 ─────────────────────────────────────── */}
        {result &&
          (() => {
            const grade = getGrade(result);

            return (
              <div id="result-section" className="mt-8 space-y-8">
                {/* ① 메인 결과 + 등급 카드 */}
                <section className="relative overflow-hidden rounded-3xl bg-navy shadow-xl">
                  <div className="absolute inset-0 overflow-hidden">
                    <div
                      className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl"
                      style={{ backgroundColor: `${grade.color}12` }}
                    />
                    <div
                      className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl"
                      style={{ backgroundColor: `${grade.color}08` }}
                    />
                  </div>
                  <div className="relative p-8 sm:p-10 text-center">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-black px-4 py-1.5 rounded-full mb-5"
                      style={{
                        backgroundColor: `${grade.color}20`,
                        color: grade.color,
                      }}
                    >
                      {grade.emoji} {grade.title}
                    </span>

                    {result.reachable ? (
                      <>
                        <p className="text-gray-400 text-sm font-medium mb-2">
                          나의 FIRE 예상 나이
                        </p>
                        <div className="my-6">
                          <span
                            className="text-5xl sm:text-6xl font-black tracking-tight drop-shadow-sm"
                            style={{ color: grade.color }}
                          >
                            {result.fireAge}
                          </span>
                          <span
                            className="text-2xl font-black ml-1"
                            style={{ color: `${grade.color}AA` }}
                          >
                            세
                          </span>
                        </div>

                        {/* 은퇴 예정 연도/월 */}
                        <p className="text-lg sm:text-xl font-bold text-white">
                          {result.alreadyFired ? (
                            "지금 바로 은퇴 가능합니다!"
                          ) : (
                            <>
                              <span
                                className="underline decoration-2 underline-offset-4"
                                style={{ color: grade.color }}
                              >
                                {result.fireYear}년 {result.fireMonth}월
                              </span>
                              {" "}은퇴 예정
                            </>
                          )}
                        </p>
                        {!result.alreadyFired && (
                          <p className="mt-1 text-sm font-medium text-gray-500">
                            약 {result.yearsToFire}년 후 경제적 자유
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <p className="text-gray-400 text-sm font-medium mb-2">
                          나의 FIRE 예상 나이
                        </p>
                        <div className="my-6">
                          <span
                            className="text-5xl sm:text-6xl font-black tracking-tight drop-shadow-sm"
                            style={{ color: grade.color }}
                          >
                            ∞
                          </span>
                        </div>
                        <p className="text-lg sm:text-xl font-bold text-white">
                          현재 조건으로는 달성이 어렵습니다
                        </p>
                      </>
                    )}

                    <p className="mt-3 text-sm font-medium text-gray-400">
                      {grade.subtitle}
                    </p>
                  </div>
                </section>

                {/* ② 핵심 지표 그리드 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 bg-emerald-50">
                      <Target className="w-4 h-4 text-emerald" />
                    </div>
                    <p className="text-sm font-medium text-gray-400 mb-1">
                      FIRE 목표 금액
                    </p>
                    <p className="text-xl font-black text-navy">
                      {formatWon(result.fireNumber)}원
                    </p>
                    <p className="text-sm font-medium text-gray-400 mt-1">
                      월 소비 x 300
                    </p>
                  </div>
                  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                    <div
                      className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3"
                      style={{ backgroundColor: `${grade.color}15` }}
                    >
                      <TrendingUp
                        className="w-4 h-4"
                        style={{ color: grade.color }}
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-400 mb-1">
                      현재 달성률
                    </p>
                    <p
                      className="text-xl font-black"
                      style={{ color: grade.color }}
                    >
                      {result.progressPercent}%
                    </p>
                    <p className="text-sm font-medium text-gray-400 mt-1">
                      {formatWon(result.currentAssets)}원
                    </p>
                  </div>
                </div>

                {/* ③ 상세 분석 카드 */}
                <section className="bg-white rounded-3xl shadow-xl p-7 sm:p-9">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50">
                      <Flame className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="font-black text-navy text-lg">
                      FIRE 상세 분석
                    </h3>
                  </div>

                  {/* 프로그레스 바 */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-navy">
                        FIRE 달성 진행률
                      </span>
                      <span className="text-sm font-black text-emerald-600">
                        {result.progressPercent}%
                      </span>
                    </div>
                    <div className="w-full h-6 bg-gray-100 rounded-full overflow-hidden relative">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-light to-emerald rounded-full transition-all duration-700 flex items-center justify-end pr-2"
                        style={{
                          width: `${Math.max(result.progressPercent, 3)}%`,
                        }}
                      >
                        {result.progressPercent >= 10 && (
                          <span className="text-[10px] font-black text-white">
                            {formatWon(result.currentAssets)}원
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-xs font-medium text-gray-400">
                        0원
                      </span>
                      <span className="text-xs font-medium text-gray-400">
                        {formatWon(result.fireNumber)}원
                      </span>
                    </div>
                  </div>

                  <div className="h-px bg-gray-100 my-6" />

                  {/* 저축률 & 월 캐시플로우 */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-emerald-50 rounded-2xl p-4 text-center">
                      <h4 className="text-xs font-medium text-emerald-600 mb-1">
                        저축률
                      </h4>
                      <p className="text-2xl font-black text-emerald-700">
                        {result.savingsRate}
                        <span className="text-sm ml-0.5">%</span>
                      </p>
                    </div>
                    <div className="bg-[#FFF7ED] rounded-2xl p-4 text-center">
                      <h4 className="text-xs font-medium text-orange-500 mb-1">
                        연간 필요 소비
                      </h4>
                      <p className="text-2xl font-black text-orange-600">
                        {formatWon(result.annualExpenses)}
                        <span className="text-sm ml-0.5">원</span>
                      </p>
                    </div>
                  </div>

                  {/* 월 캐시플로우 시각화 */}
                  <div>
                    <p className="text-sm font-bold text-navy mb-3">
                      월 캐시플로우
                    </p>
                    <div className="w-full h-8 bg-gray-100 rounded-full overflow-hidden flex">
                      {result.monthlySavings > 0 && (
                        <div
                          className="h-full bg-emerald flex items-center justify-center"
                          style={{
                            width: `${(result.monthlySavings / (result.monthlyExpenses + result.monthlySavings)) * 100}%`,
                          }}
                        >
                          <span className="text-[10px] font-black text-white">
                            저축
                          </span>
                        </div>
                      )}
                      <div
                        className="h-full bg-orange-400 flex items-center justify-center"
                        style={{
                          width: `${(result.monthlyExpenses / (result.monthlyExpenses + result.monthlySavings)) * 100}%`,
                        }}
                      >
                        <span className="text-[10px] font-black text-white">
                          소비
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald" />
                        <span className="text-xs font-medium text-gray-400">
                          저축 {formatNumber(result.monthlySavings)}만원
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-orange-400" />
                        <span className="text-xs font-medium text-gray-400">
                          소비 {formatNumber(result.monthlyExpenses)}만원
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* ④ 바이럴 카드뉴스 */}
                <section
                  ref={cardRef}
                  className="relative overflow-hidden rounded-3xl shadow-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
                  }}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-emerald/[0.06] rounded-full blur-3xl" />
                    <div
                      className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-3xl"
                      style={{ backgroundColor: `${grade.color}08` }}
                    />
                  </div>
                  <div className="relative p-7 sm:p-9">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-bold text-gray-500">
                        부자연구소
                      </span>
                      <span className="text-xs font-bold text-gray-500">
                        FIRE 지수 계산기
                      </span>
                    </div>

                    <div className="text-center mb-6">
                      <span className="text-4xl mb-3 block">
                        {grade.emoji}
                      </span>
                      <p
                        className="text-sm font-bold mb-1"
                        style={{ color: grade.color }}
                      >
                        {grade.title}
                      </p>
                      <p className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                        {result.reachable ? (
                          <>
                            {result.fireAge}
                            <span className="text-lg ml-0.5 text-white/60">
                              세
                            </span>
                          </>
                        ) : (
                          "∞"
                        )}
                      </p>
                      {result.reachable && !result.alreadyFired && (
                        <p className="text-sm font-bold text-gray-400 mt-2">
                          {result.fireYear}년 {result.fireMonth}월 은퇴 예정
                        </p>
                      )}
                    </div>

                    <div className="h-px bg-white/10 my-5" />

                    <div className="grid grid-cols-3 gap-3 text-center mb-6">
                      <div>
                        <p className="text-[10px] font-medium text-gray-500 mb-1">
                          목표 금액
                        </p>
                        <p className="text-sm font-black text-white">
                          {formatWon(result.fireNumber)}원
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium text-gray-500 mb-1">
                          달성률
                        </p>
                        <p
                          className="text-sm font-black"
                          style={{ color: grade.color }}
                        >
                          {result.progressPercent}%
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium text-gray-500 mb-1">
                          저축률
                        </p>
                        <p className="text-sm font-black text-emerald-400">
                          {result.savingsRate}%
                        </p>
                      </div>
                    </div>

                    <div className="bg-white/[0.06] rounded-2xl p-4 border border-white/[0.08] mb-6">
                      <p className="text-xs font-medium text-gray-400 leading-relaxed text-center">
                        월 소비{" "}
                        <span className="font-black text-orange-400">
                          {formatNumber(result.monthlyExpenses)}만원
                        </span>{" "}
                        &middot; 월 저축{" "}
                        <span className="font-black text-emerald-400">
                          {formatNumber(result.monthlySavings)}만원
                        </span>{" "}
                        &middot; 투자 수익률{" "}
                        <span className="font-black text-[#FFD700]">
                          {Number(inputs.expectedReturn)}%
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[10px] font-medium text-gray-600">
                      <div className="w-1 h-1 rounded-full bg-gray-600" />
                      부자연구소 Rich Lab
                      <div className="w-1 h-1 rounded-full bg-gray-600" />
                    </div>
                  </div>
                </section>

                {/* ⑤ 공유 버튼 */}
                <button
                  onClick={() => {
                    const text = result.reachable
                      ? `[FIRE 지수 테스트]\n${grade.emoji} ${grade.title}\nFIRE 예상 나이: ${result.fireAge}세 (${result.fireYear}년 ${result.fireMonth}월)\n목표 금액: ${formatWon(result.fireNumber)}원 | 달성률: ${result.progressPercent}%\n\n나도 테스트하기 ▸ ${window.location.href}`
                      : `[FIRE 지수 테스트]\n${grade.emoji} ${grade.title}\n현재 조건으로는 FIRE 달성이 어렵습니다.\n\n나도 테스트하기 ▸ ${window.location.href}`;
                    if (navigator.share) {
                      navigator
                        .share({ title: "FIRE 지수 계산기", text })
                        .catch(() => {});
                    } else {
                      navigator.clipboard
                        .writeText(text)
                        .then(() => alert("결과가 복사되었습니다!"));
                    }
                  }}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#34D399] to-[#10B981] hover:from-[#10B981] hover:to-[#059669] text-white font-black text-lg h-16 rounded-2xl shadow-lg shadow-emerald/25 transition-all duration-300 active:scale-[0.98] cursor-pointer"
                >
                  <Share2 className="w-5 h-5" />
                  결과 공유하기
                </button>

                {/* ⑥ 광고 영역 */}
                <section className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
                  <p className="text-center text-[15px] font-black text-navy mb-2">
                    {result.reachable && result.yearsToFire <= 10
                      ? "은퇴 준비, 지금부터 시작하세요"
                      : "FIRE를 앞당기는 투자 전략이 궁금하다면?"}
                  </p>
                  <p className="text-center text-sm font-medium text-gray-400 mb-5">
                    {result.reachable && result.yearsToFire <= 10
                      ? "은퇴 후 자산 관리, 건보료 절약까지"
                      : "저축률 UP, 수익률 UP — 작은 변화가 큰 차이를 만듭니다"}
                  </p>
                  <AdBanner
                    slot="fire-result-ad"
                    format="rectangle"
                    className="mt-2"
                  />
                </section>

                {/* ⑦ 다시하기 버튼 */}
                <button
                  onClick={handleReset}
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-400 font-bold text-base h-14 rounded-2xl border border-gray-100 shadow-xl transition-all duration-200 active:scale-[0.98] cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  다시 계산하기
                </button>
              </div>
            );
          })()}
      </div>

      {/* ── 애드센스 칼럼 ─────────────────────────────── */}
      <FireArticle />
    </>
  );
}
