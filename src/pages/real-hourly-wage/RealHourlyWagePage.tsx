import { useState, useEffect, useMemo, useRef } from "react";
import AnalyzingLoader from "../../components/AnalyzingLoader";
import { Helmet } from "@dr.pogodin/react-helmet";
import {
  Clock,
  ChevronRight,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Timer,
  Train,
  Moon,
  MessageSquare,
  BookOpen,
  Briefcase,
  RotateCcw,
  Share2,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { shareKakao } from "../../utils/kakaoShare";
import AdBanner from "../../components/AdBanner";
import WageArticle from "./WageArticle";

// 2026년 최저임금: 10,030원
const MIN_WAGE_2026 = 10_030;
const WORK_DAYS_PER_MONTH = 22;
const WORK_DAYS_PER_YEAR = 264;

interface Inputs {
  monthlySalary: number | "";
  regularHours: number | "";
  commuteHours: number | "";
  overtimeHours: number | "";
  afterWorkMinutes: number | "";
  prepHours: number | "";
}

interface Result {
  realHourlyWage: number;
  officialHourlyWage: number;
  minWageRatio: number;
  totalDailyHours: number;
  hiddenHours: number;
  monthlyHiddenHours: number;
  monthlyLostWon: number;
  yearlyCommuteHours: number;
  yearlyCommuteWon: number;
  yearlyHiddenHours: number;
  yearlyLostWon: number;
}

interface Grade {
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
}

function getGrade(minWageRatio: number): Grade {
  if (minWageRatio < 70)
    return { title: "기부 천사", subtitle: "회사에 재능 기부 중이시군요? 아니, 돈까지 기부하고 계셨네요! 사장님이 당신을 볼 때마다 눈물을 흘리는 이유, 감동이 아니라 감사였습니다.", emoji: "😇", color: "#DC2626" };
  if (minWageRatio < 100)
    return { title: "삼각김밥 사장님", subtitle: "편의점 알바가 진심으로 부럽습니다. 사장님 삼각김밥 하나만요... 시급 따지면 편의점 알바보다 못한 건 국가기밀로 해주세요.", emoji: "🍙", color: "#EA580C" };
  if (minWageRatio < 150)
    return { title: "이직 포털 즐겨찾기", subtitle: "퇴근 후 잡플래닛 켜는 거 다 보여요. 이직각입니다 이직각! 면접관 앞에서 이 시급 결과 보여주면 동정표 받을 수 있습니다.", emoji: "🧳", color: "#D97706" };
  if (minWageRatio < 200)
    return { title: "야근 후유증 주의보", subtitle: "시급은 괜찮은데 병원비로 다 나갑니다. 제발 운동하세요! 야근 수당이 아니라 야근 치료비를 회사에 청구해야 할 판입니다.", emoji: "💊", color: "#059669" };
  if (minWageRatio < 300)
    return { title: "워라밸 수호자", subtitle: "칼퇴 후 넷플릭스 켜는 여유... 부럽다 정말 부럽다! 이 정도면 '연봉이 높아서가 아니라 삶의 질이 높은 겁니다'라고 당당히 말할 수 있어요.", emoji: "🔥", color: "#10B981" };
  return { title: "시급 재벌", subtitle: "혹시 대표님이세요? 아니라면 연봉 협상의 신이십니다! 시간당 벌이가 너무 좋아서 일이 아니라 취미처럼 느껴지시는 분.", emoji: "👑", color: "#FFD700" };
}

function calculate(inputs: Inputs): Result | null {
  const salary = Number(inputs.monthlySalary);
  const regular = Number(inputs.regularHours);
  const commute = Number(inputs.commuteHours);
  const overtime = Number(inputs.overtimeHours);
  const afterWorkMin = Number(inputs.afterWorkMinutes);
  const prep = Number(inputs.prepHours);

  if (!salary || !regular) return null;

  const afterWorkHours = afterWorkMin / 60;
  const totalDailyHours = regular + overtime + commute + afterWorkHours + prep;
  const hiddenHours = totalDailyHours - regular;

  const realHourlyWage = Math.round(
    salary / (WORK_DAYS_PER_MONTH * totalDailyHours)
  );
  const officialHourlyWage = Math.round(
    salary / (WORK_DAYS_PER_MONTH * regular)
  );

  const minWageRatio = Math.round((realHourlyWage / MIN_WAGE_2026) * 100);
  const monthlyHiddenHours = Math.round(hiddenHours * WORK_DAYS_PER_MONTH * 10) / 10;
  const monthlyLostWon = Math.round(hiddenHours * WORK_DAYS_PER_MONTH * realHourlyWage);

  const yearlyCommuteHours = Math.round(commute * WORK_DAYS_PER_YEAR * 10) / 10;
  const yearlyCommuteWon = Math.round(commute * WORK_DAYS_PER_YEAR * realHourlyWage);
  const yearlyHiddenHours = Math.round(hiddenHours * WORK_DAYS_PER_YEAR * 10) / 10;
  const yearlyLostWon = Math.round(hiddenHours * WORK_DAYS_PER_YEAR * realHourlyWage);

  return {
    realHourlyWage,
    officialHourlyWage,
    minWageRatio,
    totalDailyHours,
    hiddenHours,
    monthlyHiddenHours,
    monthlyLostWon,
    yearlyCommuteHours,
    yearlyCommuteWon,
    yearlyHiddenHours,
    yearlyLostWon,
  };
}

const inputFields = [
  {
    key: "monthlySalary" as const,
    label: "월 세전 급여",
    unit: "만원",
    icon: Briefcase,
    placeholder: "300",
    min: 0,
    step: 10,
  },
  {
    key: "regularHours" as const,
    label: "일일 정규 근무시간",
    unit: "시간",
    icon: Clock,
    placeholder: "8",
    min: 0,
    step: 0.5,
  },
  {
    key: "commuteHours" as const,
    label: "왕복 출퇴근 시간",
    unit: "시간",
    icon: Train,
    placeholder: "1.5",
    min: 0,
    step: 0.5,
  },
  {
    key: "overtimeHours" as const,
    label: "일평균 야근 시간",
    unit: "시간",
    icon: Moon,
    placeholder: "1",
    min: 0,
    step: 0.5,
  },
  {
    key: "afterWorkMinutes" as const,
    label: "퇴근 후 업무 연락 응대",
    unit: "분",
    icon: MessageSquare,
    placeholder: "30",
    min: 0,
    step: 5,
  },
  {
    key: "prepHours" as const,
    label: "업무 준비 및 자기계발",
    unit: "시간",
    icon: BookOpen,
    placeholder: "0.5",
    min: 0,
    step: 0.5,
  },
];

function formatNumber(n: number): string {
  return n.toLocaleString("ko-KR");
}

export default function RealHourlyWagePage() {
  const [inputs, setInputs] = useState<Inputs>({
    monthlySalary: "",
    regularHours: "",
    commuteHours: "",
    overtimeHours: "",
    afterWorkMinutes: "",
    prepHours: "",
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

  // 실시간 잠재적 손실 시간 프리뷰
  const livePreview = useMemo(() => {
    const commute = Number(inputs.commuteHours) || 0;
    const overtime = Number(inputs.overtimeHours) || 0;
    const afterWork = (Number(inputs.afterWorkMinutes) || 0) / 60;
    const prep = Number(inputs.prepHours) || 0;
    const hidden = commute + overtime + afterWork + prep;
    return {
      hidden: Math.round(hidden * 10) / 10,
      monthly: Math.round(hidden * WORK_DAYS_PER_MONTH * 10) / 10,
    };
  }, [inputs.commuteHours, inputs.overtimeHours, inputs.afterWorkMinutes, inputs.prepHours]);

  const result = showResult ? calculate(inputs) : null;

  const handleCalculate = () => {
    if (!inputs.monthlySalary || !inputs.regularHours) return;
    setIsLoading(true);
    setShowResult(false);
  };

  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowResult(true);
      setTimeout(() => {
        document.getElementById("result-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 3500);
    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleReset = () => {
    setInputs({
      monthlySalary: "",
      regularHours: "",
      commuteHours: "",
      overtimeHours: "",
      afterWorkMinutes: "",
      prepHours: "",
    });
    setShowResult(false);
  };

  return (
    <>
      <Helmet>
        <title>나의 진짜 시급 계산기 — 숨겨진 근무시간 포함 실제 시급 | 대한민국 부자연구소</title>
        <meta
          name="description"
          content="출퇴근·야근·업무 연락 시간까지 반영한 진짜 시급은 얼마일까? 2026년 최저임금 10,030원 대비 내 실제 시급을 무료로 계산해보세요."
        />
        <link rel="canonical" href="https://korearichlab.com/real-hourly-wage" />
        <meta property="og:title" content="나의 진짜 시급 계산기 | 대한민국 부자연구소" />
        <meta property="og:description" content="출퇴근·야근·업무 연락까지 포함한 실제 시급을 계산해보세요. 2026 최저임금 대비 분석." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://korearichlab.com/real-hourly-wage" />
        <meta property="og:site_name" content="대한민국 부자연구소" />
      </Helmet>

      {/* ── 히어로 ─────────────────────────────────────── */}
      <header className="bg-gradient-to-b from-[#E11D48] to-[#9F1239]">
        <div className="max-w-[600px] mx-auto px-6 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100/20 rounded-3xl mb-6 animate-float">
            <Timer className="w-8 h-8 text-rose-100" />
          </div>
          <h1 className="text-[32px] sm:text-[40px] font-black tracking-tight leading-tight text-white">
            나의 진짜 시급 계산기
          </h1>
          <p className="mt-5 text-lg sm:text-xl font-bold text-white/90 leading-[1.7]">
            출퇴근, 야근, 업무 연락까지 포함하면?
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-white/[0.06] rounded-full px-5 py-2.5 text-[15px] font-medium text-rose-100/60">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-light" />
            2026년 최저임금 {formatNumber(MIN_WAGE_2026)}원 기준
          </div>
        </div>
      </header>

      {/* ── 메인 컨텐츠 ───────────────────────────────── */}
      <div className="max-w-[600px] mx-auto px-5 pb-20 -mt-8 relative z-10">
        {/* 입력 폼 카드 */}
        <section className="bg-white rounded-3xl shadow-xl p-7 sm:p-10">
          <h2 className="text-[32px] font-black text-navy mb-10 flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-rose-50">
              <Clock className="w-6 h-6 text-rose" />
            </div>
            근무 정보 입력
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

          {/* 실시간 손실 시간 프리뷰 */}
          {livePreview.hidden > 0 && (
            <div className="mt-8 bg-[#FFF7ED] border border-orange-200 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-navy text-sm mb-1">
                    잠재적 손실 시간 (실시간)
                  </h4>
                  <p className="text-sm font-medium text-gray-500 leading-relaxed">
                    매일{" "}
                    <span className="font-black text-orange-600">
                      {livePreview.hidden}시간
                    </span>
                    , 한 달 기준{" "}
                    <span className="font-black text-orange-600">
                      {livePreview.monthly}시간
                    </span>
                    이 급여에 반영되지 않고 있어요.
                  </p>
                </div>
              </div>
              {/* 시각화 바 */}
              <div className="mt-4 space-y-2">
                {[
                  { label: "출퇴근", value: Number(inputs.commuteHours) || 0, color: "bg-blue-400" },
                  { label: "야근", value: Number(inputs.overtimeHours) || 0, color: "bg-purple-400" },
                  { label: "업무연락", value: (Number(inputs.afterWorkMinutes) || 0) / 60, color: "bg-pink-400" },
                  { label: "준비/자기계발", value: Number(inputs.prepHours) || 0, color: "bg-amber-400" },
                ].filter((item) => item.value > 0).map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-500 w-24 text-right shrink-0">
                      {item.label}
                    </span>
                    <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-500 flex items-center justify-end pr-2`}
                        style={{
                          width: `${Math.min(100, (item.value / 4) * 100)}%`,
                          minWidth: item.value > 0 ? "2.5rem" : "0",
                        }}
                      >
                        <span className="text-[10px] font-black text-white">
                          {Math.round(item.value * 10) / 10}h
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="h-px bg-gray-100 my-10" />

          {/* CTA 버튼 */}
          <button
            onClick={handleCalculate}
            disabled={!inputs.monthlySalary || !inputs.regularHours}
            className="w-full group bg-gradient-to-r from-[#FB7185] to-[#F43F5E] hover:from-[#F43F5E] hover:to-[#E11D48] disabled:from-gray-200 disabled:to-gray-200 disabled:text-gray-400 text-white text-lg font-black h-16 rounded-2xl shadow-lg shadow-rose/25 disabled:shadow-none transition-all duration-300 active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            내 진짜 시급 계산하기
            <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </section>

        {/* ── 로딩 ─────────────────────────────────────── */}
        {isLoading && (
          <div className="mt-8">
            <AnalyzingLoader
              accentColor="#F43F5E"
              accentBgColor="#FFE4E6"
              adSlot="wage-loading"
              messages={[
                "급여 데이터 분석 중...",
                "숨은 근무시간 계산 중...",
                "진짜 시급 환산 중...",
                "최저임금 대비 비교 중...",
                "워라밸 지수 측정 중...",
              ]}
            />
          </div>
        )}

        {/* ── 결과 ─────────────────────────────────────── */}
        {result && (() => {
          const grade = getGrade(result.minWageRatio);
          const wageDropPct = Math.round(
            ((result.officialHourlyWage - result.realHourlyWage) / result.officialHourlyWage) * 100
          );

          return (
          <div id="result-section" className="mt-8 space-y-8">
            {/* ① 메인 결과 + 등급 카드 */}
            <section className="relative overflow-hidden rounded-3xl bg-navy shadow-xl">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl" style={{ backgroundColor: `${grade.color}12` }} />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl" style={{ backgroundColor: `${grade.color}08` }} />
              </div>
              <div className="relative p-8 sm:p-10 text-center">
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-black px-4 py-1.5 rounded-full mb-5"
                  style={{ backgroundColor: `${grade.color}20`, color: grade.color }}
                >
                  {grade.emoji} {grade.title}
                </span>
                <p className="text-gray-400 text-sm font-medium mb-2">
                  나의 진짜 시급
                </p>
                <div className="my-6">
                  <span className="text-5xl sm:text-6xl font-black tracking-tight drop-shadow-sm" style={{ color: grade.color }}>
                    {formatNumber(result.realHourlyWage)}
                  </span>
                  <span className="text-2xl font-black ml-1" style={{ color: `${grade.color}AA` }}>원</span>
                </div>
                <p className="text-lg sm:text-xl font-bold text-white">
                  2026 최저임금 대비{" "}
                  <span className="underline decoration-2 underline-offset-4" style={{ color: grade.color }}>
                    {result.minWageRatio}%
                  </span>
                </p>
                <p className="mt-3 text-sm font-medium text-gray-400">
                  {grade.subtitle}
                </p>
              </div>
            </section>

            {/* ② 비교 카드 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 bg-gray-100 text-gray-400">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">명목 시급</h4>
                <p className="text-xl font-black text-navy">
                  {formatNumber(result.officialHourlyWage)}원
                </p>
                <p className="text-sm font-medium text-gray-400 mt-1">정규시간 기준</p>
              </div>
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3" style={{ backgroundColor: `${grade.color}15` }}>
                  <Timer className="w-4 h-4" style={{ color: grade.color }} />
                </div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">진짜 시급</h4>
                <p className="text-xl font-black" style={{ color: grade.color }}>
                  {formatNumber(result.realHourlyWage)}원
                </p>
                <p className="text-sm font-medium text-gray-400 mt-1">
                  {wageDropPct}% 감소
                </p>
              </div>
            </div>

            {/* ③ 충격 요법: 출퇴근 시간 낭비 */}
            {Number(inputs.commuteHours) > 0 && (
              <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a2e] to-[#16213e] shadow-xl p-7 sm:p-9">
                <div className="absolute top-4 right-4 text-5xl opacity-10">🚶</div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/20">
                    <Train className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="font-black text-white text-lg">길바닥에 버리는 시간</h3>
                </div>
                <p className="text-white/80 font-medium text-[15px] leading-[1.8] mb-6">
                  당신이 매일 출퇴근 길바닥에 버리는 시간은{" "}
                  <span className="font-black text-red-400">1년에 총 {formatNumber(result.yearlyCommuteHours)}시간</span>이며,{" "}
                  이를 시급으로 환산하면{" "}
                  <span className="font-black text-[#FFD700]">{formatNumber(result.yearlyCommuteWon)}원</span>입니다.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/[0.06] rounded-2xl p-4 text-center border border-white/[0.08]">
                    <p className="text-xs font-medium text-gray-400 mb-1">1년 출퇴근</p>
                    <p className="text-2xl font-black text-red-400">
                      {formatNumber(result.yearlyCommuteHours)}
                      <span className="text-sm ml-0.5 text-red-400/70">시간</span>
                    </p>
                    <p className="text-xs font-medium text-gray-500 mt-1">
                      약 {Math.round(result.yearlyCommuteHours / 24)}일 꼬박
                    </p>
                  </div>
                  <div className="bg-white/[0.06] rounded-2xl p-4 text-center border border-white/[0.08]">
                    <p className="text-xs font-medium text-gray-400 mb-1">환산 금액</p>
                    <p className="text-2xl font-black text-[#FFD700]">
                      {result.yearlyCommuteWon >= 10000
                        ? `${Math.round(result.yearlyCommuteWon / 10000)}만`
                        : formatNumber(result.yearlyCommuteWon)}
                      <span className="text-sm ml-0.5 text-[#FFD700]/70">원</span>
                    </p>
                    <p className="text-xs font-medium text-gray-500 mt-1">
                      길에서 사라진 돈
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* ④ 시간 분석 카드 */}
            <section className="bg-white rounded-3xl shadow-xl p-7 sm:p-9">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-50">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="font-black text-navy text-lg">보이지 않는 근무 시간</h3>
              </div>

              {/* 하루 시간 시각화 */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-navy">하루 총 투입 시간</span>
                  <span className="text-sm font-black text-navy">
                    {Math.round(result.totalDailyHours * 10) / 10}시간
                  </span>
                </div>
                <div className="w-full h-8 bg-gray-100 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-rose-light flex items-center justify-center"
                    style={{ width: `${(Number(inputs.regularHours) / result.totalDailyHours) * 100}%` }}
                  >
                    <span className="text-[10px] font-black text-white">정규</span>
                  </div>
                  {Number(inputs.commuteHours) > 0 && (
                    <div
                      className="h-full bg-blue-400 flex items-center justify-center"
                      style={{ width: `${(Number(inputs.commuteHours) / result.totalDailyHours) * 100}%` }}
                    >
                      <span className="text-[10px] font-black text-white">이동</span>
                    </div>
                  )}
                  {Number(inputs.overtimeHours) > 0 && (
                    <div
                      className="h-full bg-purple-400 flex items-center justify-center"
                      style={{ width: `${(Number(inputs.overtimeHours) / result.totalDailyHours) * 100}%` }}
                    >
                      <span className="text-[10px] font-black text-white">야근</span>
                    </div>
                  )}
                  {Number(inputs.afterWorkMinutes) > 0 && (
                    <div
                      className="h-full bg-pink-400 flex items-center justify-center"
                      style={{ width: `${((Number(inputs.afterWorkMinutes) / 60) / result.totalDailyHours) * 100}%` }}
                    >
                      <span className="text-[10px] font-black text-white">연락</span>
                    </div>
                  )}
                  {Number(inputs.prepHours) > 0 && (
                    <div
                      className="h-full bg-amber-400 flex items-center justify-center"
                      style={{ width: `${(Number(inputs.prepHours) / result.totalDailyHours) * 100}%` }}
                    >
                      <span className="text-[10px] font-black text-white">준비</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-3 mt-3">
                  {[
                    { label: "정규", color: "bg-rose-light" },
                    { label: "이동", color: "bg-blue-400" },
                    { label: "야근", color: "bg-purple-400" },
                    { label: "연락", color: "bg-pink-400" },
                    { label: "준비", color: "bg-amber-400" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-1.5">
                      <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                      <span className="text-xs font-medium text-gray-400">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-100 my-6" />

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#FFF7ED] rounded-2xl p-4 text-center">
                  <p className="text-xs font-medium text-orange-400 mb-1">월 숨겨진 시간</p>
                  <p className="text-2xl font-black text-orange-600">
                    {result.monthlyHiddenHours}
                    <span className="text-sm ml-0.5">시간</span>
                  </p>
                </div>
                <div className="bg-[#FEF2F2] rounded-2xl p-4 text-center">
                  <p className="text-xs font-medium text-red-400 mb-1">월 환산 손실액</p>
                  <p className="text-2xl font-black text-red-600">
                    {formatNumber(result.monthlyLostWon)}
                    <span className="text-sm ml-0.5">원</span>
                  </p>
                </div>
              </div>
            </section>

            {/* ⑤ 최저임금 비교 카드 */}
            <section className="bg-white rounded-3xl shadow-xl p-7 sm:p-9">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50">
                  {result.minWageRatio >= 100 ? (
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <h3 className="font-black text-navy text-lg">2026 최저임금 비교</h3>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-400">2026 최저임금</span>
                    <span className="text-sm font-black text-navy">{formatNumber(MIN_WAGE_2026)}원</span>
                  </div>
                  <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-300 rounded-full" style={{ width: "100%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-400">나의 진짜 시급</span>
                    <span className={`text-sm font-black ${result.minWageRatio >= 100 ? "text-emerald-600" : "text-red-500"}`}>
                      {formatNumber(result.realHourlyWage)}원 ({result.minWageRatio}%)
                    </span>
                  </div>
                  <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        result.minWageRatio >= 100 ? "bg-emerald-400" : "bg-red-400"
                      }`}
                      style={{ width: `${Math.min(150, result.minWageRatio)}%` }}
                    />
                  </div>
                </div>
              </div>

              {result.minWageRatio < 100 && (
                <div className="mt-5 bg-[#FEF2F2] border border-red-100 rounded-2xl p-4">
                  <p className="text-sm font-bold text-red-600 leading-relaxed">
                    실제 투입 시간 기준으로 환산하면, 최저임금보다{" "}
                    <span className="font-black">{100 - result.minWageRatio}%</span> 낮은 시급을 받고 있어요.
                  </p>
                </div>
              )}
              {result.minWageRatio >= 100 && result.minWageRatio < 150 && (
                <div className="mt-5 bg-[#FFF7ED] border border-orange-100 rounded-2xl p-4">
                  <p className="text-sm font-bold text-orange-600 leading-relaxed">
                    최저임금은 넘지만, 명목 시급 대비{" "}
                    <span className="font-black">{wageDropPct}%</span>가 숨겨진 시간에 의해 사라지고 있어요.
                  </p>
                </div>
              )}
              {result.minWageRatio >= 150 && (
                <div className="mt-5 bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
                  <p className="text-sm font-bold text-emerald-700 leading-relaxed">
                    숨겨진 시간을 포함해도 최저임금의{" "}
                    <span className="font-black">{result.minWageRatio}%</span> 수준이에요. 비교적 건강한 시급 구조입니다.
                  </p>
                </div>
              )}
            </section>

            {/* ⑥ 바이럴 카드뉴스 요약 */}
            <section
              ref={cardRef}
              className="relative overflow-hidden rounded-3xl shadow-xl"
              style={{ background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)" }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gold/[0.06] rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-3xl" style={{ backgroundColor: `${grade.color}08` }} />
              </div>
              <div className="relative p-7 sm:p-9">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold text-gray-500">부자연구소</span>
                  <span className="text-xs font-bold text-gray-500">나의 진짜 시급</span>
                </div>

                <div className="text-center mb-6">
                  <span className="text-4xl mb-3 block">{grade.emoji}</span>
                  <p className="text-sm font-bold mb-1" style={{ color: grade.color }}>{grade.title}</p>
                  <p className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    {formatNumber(result.realHourlyWage)}
                    <span className="text-lg ml-0.5 text-white/60">원</span>
                  </p>
                </div>

                <div className="h-px bg-white/10 my-5" />

                <div className="grid grid-cols-3 gap-3 text-center mb-6">
                  <div>
                    <p className="text-[10px] font-medium text-gray-500 mb-1">명목 시급</p>
                    <p className="text-sm font-black text-white">{formatNumber(result.officialHourlyWage)}원</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-gray-500 mb-1">시급 하락률</p>
                    <p className="text-sm font-black text-red-400">-{wageDropPct}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-gray-500 mb-1">최저임금 대비</p>
                    <p className="text-sm font-black" style={{ color: grade.color }}>{result.minWageRatio}%</p>
                  </div>
                </div>

                <div className="bg-white/[0.06] rounded-2xl p-4 border border-white/[0.08] mb-6">
                  <p className="text-xs font-medium text-gray-400 leading-relaxed text-center">
                    하루 <span className="font-black text-white">{Math.round(result.totalDailyHours * 10) / 10}시간</span> 투입 &middot;
                    {" "}숨겨진 시간 <span className="font-black text-orange-400">{Math.round(result.hiddenHours * 10) / 10}h</span> &middot;
                    {" "}1년 손실 <span className="font-black text-[#FFD700]">{result.yearlyLostWon >= 10000 ? `${Math.round(result.yearlyLostWon / 10000)}만원` : `${formatNumber(result.yearlyLostWon)}원`}</span>
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] font-medium text-gray-600">
                  <div className="w-1 h-1 rounded-full bg-gray-600" />
                  부자연구소 Rich Lab
                  <div className="w-1 h-1 rounded-full bg-gray-600" />
                </div>
              </div>
            </section>

            {/* ⑦ 공유 버튼들 */}
            <div className="space-y-3">
              <button
                onClick={() =>
                  shareKakao({
                    title: `${grade.emoji} 내 진짜 시급: ${formatNumber(result.realHourlyWage)}원!`,
                    description: `최저임금의 ${result.minWageRatio}% · 명목 시급에서 ${wageDropPct}% 하락\n숨겨진 근무시간까지 반영한 진짜 시급 계산기`,
                    path: "/real-hourly-wage",
                  })
                }
                className="w-full flex items-center justify-center gap-3 bg-[#FEE500] hover:bg-[#F5DC00] text-[#3C1E1E] font-black text-lg h-16 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                카카오톡으로 공유하기
              </button>
              <button
                onClick={() => {
                  const text = `[나의 진짜 시급 테스트]\n${grade.emoji} ${grade.title}\n내 진짜 시급: ${formatNumber(result.realHourlyWage)}원 (최저임금의 ${result.minWageRatio}%)\n명목 시급에서 ${wageDropPct}% 하락...\n\n나도 테스트하기 ▸ https://www.korearichlab.com/real-hourly-wage`;
                  if (navigator.share) {
                    navigator.share({ title: "나의 진짜 시급 계산기", text }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(text).then(() => alert("결과가 복사되었습니다!"));
                  }
                }}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#FB7185] to-[#F43F5E] hover:from-[#F43F5E] hover:to-[#E11D48] text-white font-black text-base h-14 rounded-2xl shadow-lg shadow-rose/25 transition-all duration-300 active:scale-[0.98] cursor-pointer"
              >
                <Share2 className="w-5 h-5" />
                다른 앱으로 공유하기
              </button>
              <a
                href="https://www.teamblind.com/kr/post"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 bg-[#00B45A] hover:bg-[#00A050] text-white font-black text-lg h-16 rounded-2xl shadow-lg shadow-[#00B45A]/25 transition-all duration-300 active:scale-[0.98] cursor-pointer"
              >
                <ExternalLink className="w-5 h-5" />
                블라인드에 내 시급 인증하기
              </a>
            </div>

            {/* ⑧ 광고 영역 */}
            <section className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
              <p className="text-center text-[15px] font-black text-navy mb-2">
                {result.minWageRatio < 150
                  ? "이 시급 받고 일하기 아깝다면?"
                  : "나의 가치를 높여줄 자기계발"}
              </p>
              <p className="text-center text-sm font-medium text-gray-400 mb-5">
                {result.minWageRatio < 150
                  ? "커리어 전환, 연봉 협상, 부업까지 — 지금 시작하세요"
                  : "더 높은 시급을 위한 투자, 지금이 적기입니다"}
              </p>
              <AdBanner slot="wage-result-ad" format="rectangle" className="mt-2" />
            </section>

            {/* ⑨ 다시하기 버튼 */}
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

      {/* ── 애드센스 칼럼 ─────────────────────────────────── */}
      <WageArticle />
    </>
  );
}
