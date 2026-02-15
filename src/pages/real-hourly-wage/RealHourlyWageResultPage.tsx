import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import AnalyzingLoader from "../../components/AnalyzingLoader";
import { Helmet } from "@dr.pogodin/react-helmet";
import {
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Timer,
  Train,
  Briefcase,
  RotateCcw,
  Share2,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { shareKakao } from "../../utils/kakaoShare";
import SharedResultBanner from "../../components/SharedResultBanner";
import AdBanner from "../../components/AdBanner";
import WageArticle from "./WageArticle";
import {
  type Inputs,
  calculate,
  getGrade,
  formatNumber,
  MIN_WAGE_2026,
} from "./wageUtils";

export default function RealHourlyWageResultPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [inputs, setInputs] = useState<Inputs | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const isShared = searchParams.get("shared") === "true";

  // ── URL 파라미터 파싱 ──────────────────────────────────
  useEffect(() => {
    const salary = searchParams.get("salary");
    const hours = searchParams.get("hours");
    if (!salary || !hours) {
      navigate("/real-hourly-wage", { replace: true });
      return;
    }

    const newInputs: Inputs = {
      monthlySalary: Number(salary),
      regularHours: Number(hours),
      commuteHours: Number(searchParams.get("commute") || 0),
      overtimeHours: Number(searchParams.get("overtime") || 0),
      afterWorkMinutes: Number(searchParams.get("afterwork") || 0),
      prepHours: Number(searchParams.get("prep") || 0),
    };
    setInputs(newInputs);

    if (isShared) {
      setIsLoading(false);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const timer = setTimeout(() => setIsLoading(false), 3500);
      return () => clearTimeout(timer);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const result = inputs ? calculate(inputs) : null;

  return (
    <>
      <Helmet>
        <title>나의 진짜 시급 분석 결과 | 대한민국 부자연구소</title>
        <meta
          name="description"
          content="출퇴근·야근·업무 연락 시간까지 반영한 진짜 시급 분석 결과입니다."
        />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content="나의 진짜 시급 계산기 | 대한민국 부자연구소" />
        <meta property="og:description" content="출퇴근·야근·업무 연락까지 포함한 실제 시급을 계산해보세요." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://korearichlab.com/real-hourly-wage/result" />
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
        {isLoading ? (
          <div className="mt-0">
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
        ) : result && inputs ? (() => {
          const grade = getGrade(result.minWageRatio);
          const wageDropPct = Math.round(
            ((result.officialHourlyWage - result.realHourlyWage) / result.officialHourlyWage) * 100
          );
          const sharePath = `/real-hourly-wage/result?salary=${inputs.monthlySalary}&hours=${inputs.regularHours}&commute=${inputs.commuteHours || 0}&overtime=${inputs.overtimeHours || 0}&afterwork=${inputs.afterWorkMinutes || 0}&prep=${inputs.prepHours || 0}`;

          return (
          <div id="result-section" className="space-y-8">
            {isShared && (
              <SharedResultBanner
                calculatorPath="/real-hourly-wage"
                accentColor="#F43F5E"
                ctaText="나도 진짜 시급 계산하기"
              />
            )}
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

            {/* 인페이지 광고 (결과 수치 아래) */}
            <AdBanner slot="wage-result-top" format="rectangle" />

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
                    description: `최저임금의 ${result.minWageRatio}% · 명목 시급에서 ${wageDropPct}% 하락\n당신도 부자연구소에서 분석받아보세요!`,
                    path: sharePath,
                    buttonText: "내 진짜 시급 계산해보기",
                  })
                }
                className="w-full flex items-center justify-center gap-3 bg-[#FEE500] hover:bg-[#F5DC00] text-[#3C1E1E] font-black text-lg h-16 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                카카오톡으로 공유하기
              </button>
              <button
                onClick={() => {
                  const text = `[나의 진짜 시급 테스트]\n${grade.emoji} ${grade.title}\n내 진짜 시급: ${formatNumber(result.realHourlyWage)}원 (최저임금의 ${result.minWageRatio}%)\n명목 시급에서 ${wageDropPct}% 하락...\n\n친구 결과 보기 ▸ https://www.korearichlab.com${sharePath}&shared=true`;
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
              onClick={() => navigate("/real-hourly-wage")}
              className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-400 font-bold text-base h-14 rounded-2xl border border-gray-100 shadow-xl transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              다시 계산하기
            </button>
          </div>
          );
        })() : null}
      </div>

      {/* ── 애드센스 칼럼 ─────────────────────────────────── */}
      <WageArticle />
    </>
  );
}
