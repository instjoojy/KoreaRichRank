import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import AnalyzingLoader from "../../components/AnalyzingLoader";
import { Helmet } from "@dr.pogodin/react-helmet";
import {
  Flame,
  TrendingUp,
  RotateCcw,
  Share2,
  Target,
  MessageCircle,
} from "lucide-react";
import { shareKakao } from "../../utils/kakaoShare";
import SharedResultBanner from "../../components/SharedResultBanner";
import AdBanner from "../../components/AdBanner";
import FireArticle from "./FireArticle";
import {
  type Inputs,
  calculate,
  getGrade,
  formatNumber,
  formatWon,
} from "./fireUtils";

export default function FireCalculatorResultPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [inputs, setInputs] = useState<Inputs | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const isShared = searchParams.get("shared") === "true";

  // ── URL 파라미터 파싱 ──────────────────────────────────
  useEffect(() => {
    const age = searchParams.get("age");
    const expense = searchParams.get("expense");
    if (!age || !expense) {
      navigate("/fire-calculator", { replace: true });
      return;
    }

    const newInputs: Inputs = {
      currentAge: Number(age),
      totalAssets: Number(searchParams.get("assets") || 0),
      monthlyExpenses: Number(expense),
      monthlySavings: Number(searchParams.get("saving") || 0),
      expectedReturn: Number(searchParams.get("return") || 0),
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
        <title>FIRE 조기 은퇴 분석 결과 | 대한민국 부자연구소</title>
        <meta
          name="description"
          content="4% 룰 기반 FIRE(경제적 자립 조기 은퇴) 시뮬레이션 결과입니다."
        />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content="FIRE 조기 은퇴 계산기 | 대한민국 부자연구소" />
        <meta property="og:description" content="나는 몇 살에 은퇴할 수 있을까? 4% 룰 기반 FIRE 시뮬레이션 결과." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://korearichlab.com/fire-calculator/result" />
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
        {isLoading ? (
          <div className="mt-0">
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
        ) : result && inputs ? (() => {
          const grade = getGrade(result);
          const sharePath = `/fire-calculator/result?age=${inputs.currentAge}&assets=${inputs.totalAssets || 0}&expense=${inputs.monthlyExpenses}&saving=${inputs.monthlySavings || 0}&return=${inputs.expectedReturn || 0}`;

          return (
            <div id="result-section" className="space-y-8">
              {isShared && (
                <SharedResultBanner
                  calculatorPath="/fire-calculator"
                  accentColor="#10B981"
                  ctaText="나도 은퇴 시점 계산하기"
                />
              )}
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

              {/* 인페이지 광고 (결과 수치 아래) */}
              <AdBanner slot="fire-result-top" format="rectangle" />

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
              <div className="space-y-3">
                <button
                  onClick={() =>
                    shareKakao({
                      title: result.reachable
                        ? `${grade.emoji} FIRE 예상 나이: ${result.fireAge}세!`
                        : `${grade.emoji} ${grade.title}`,
                      description: result.reachable
                        ? `목표 금액: ${formatWon(result.fireNumber)}원 · 달성률: ${result.progressPercent}%\n당신도 부자연구소에서 분석받아보세요!`
                        : `현재 조건으로는 FIRE 달성이 어렵습니다.\n당신도 부자연구소에서 분석받아보세요!`,
                      path: sharePath,
                      buttonText: "내 은퇴 나이도 계산해보기",
                    })
                  }
                  className="w-full flex items-center justify-center gap-3 bg-[#FEE500] hover:bg-[#F5DC00] text-[#3C1E1E] font-black text-lg h-16 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  카카오톡으로 공유하기
                </button>
                <button
                  onClick={() => {
                    const text = result.reachable
                      ? `[FIRE 지수 테스트]\n${grade.emoji} ${grade.title}\nFIRE 예상 나이: ${result.fireAge}세 (${result.fireYear}년 ${result.fireMonth}월)\n목표 금액: ${formatWon(result.fireNumber)}원 | 달성률: ${result.progressPercent}%\n\n친구 결과 보기 ▸ https://www.korearichlab.com${sharePath}&shared=true`
                      : `[FIRE 지수 테스트]\n${grade.emoji} ${grade.title}\n현재 조건으로는 FIRE 달성이 어렵습니다.\n\n친구 결과 보기 ▸ https://www.korearichlab.com${sharePath}&shared=true`;
                    if (navigator.share) {
                      navigator.share({ title: "FIRE 지수 계산기", text }).catch(() => {});
                    } else {
                      navigator.clipboard.writeText(text).then(() => alert("결과가 복사되었습니다!"));
                    }
                  }}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#34D399] to-[#10B981] hover:from-[#10B981] hover:to-[#059669] text-white font-black text-base h-14 rounded-2xl shadow-lg shadow-emerald/25 transition-all duration-300 active:scale-[0.98] cursor-pointer"
                >
                  <Share2 className="w-5 h-5" />
                  다른 앱으로 공유하기
                </button>
              </div>

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
                onClick={() => navigate("/fire-calculator")}
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
      <FireArticle />
    </>
  );
}
