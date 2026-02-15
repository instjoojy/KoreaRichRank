import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnalyzingLoader from "../../components/AnalyzingLoader";
import { Helmet } from "@dr.pogodin/react-helmet";
import {
  Brain,
  RotateCcw,
  Calculator,
  Sparkles,
  MessageCircle,
  Share2,
} from "lucide-react";
import { shareKakao } from "../../utils/kakaoShare";
import SharedResultBanner from "../../components/SharedResultBanner";
import AdBanner from "../../components/AdBanner";
import { questions } from "./questions";
import { getBqResult } from "./results";
import BqArticle from "./BqArticle";

export default function BqTestResultPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState<number[]>([]);

  const isShared = searchParams.get("shared") === "true";

  // ── URL 파라미터로 답변 복원 ──────────────────────────────
  useEffect(() => {
    const urlAnswers = searchParams.get("answers");
    if (!urlAnswers) {
      navigate("/bq-test", { replace: true });
      return;
    }
    const parsed = urlAnswers.split(",").map(Number);
    if (parsed.length !== questions.length || parsed.some(isNaN)) {
      navigate("/bq-test", { replace: true });
      return;
    }
    setAnswers(parsed);

    if (isShared) {
      setIsLoading(false);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const timer = setTimeout(() => setIsLoading(false), 3500);
      return () => clearTimeout(timer);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const result = answers.length > 0 ? getBqResult(totalScore) : null;
  const ResultIcon = result?.icon ?? Brain;
  const sharePath = `/bq-test/result?answers=${answers.join(",")}`;

  return (
    <>
      <Helmet>
        <title>부자 지수(BQ) 테스트 결과 | 대한민국 부자연구소</title>
        <meta
          name="description"
          content="소비 습관, 투자 성향, 경제 지식 10문항으로 측정하는 부자 지수(BQ) 테스트 결과입니다."
        />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content="부자 지수(BQ) 테스트 결과 | 대한민국 부자연구소" />
        <meta property="og:description" content="소비·투자·경제 지식 10문항으로 측정하는 부자 잠재력 점수. 무료 BQ 테스트." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://korearichlab.com/bq-test/result" />
        <meta property="og:site_name" content="대한민국 부자연구소" />
      </Helmet>

      {/* ── 히어로 헤더 ───────────────────────────────────── */}
      <header className="bg-gradient-to-b from-[#D97706] to-[#92400E]">
        <div className="max-w-[600px] mx-auto px-6 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100/20 rounded-3xl mb-6 animate-float">
            <Brain className="w-8 h-8 text-amber-100" />
          </div>
          <h1 className="text-[32px] sm:text-[40px] font-black tracking-tight leading-tight text-white">
            부자 지수(BQ) 테스트
          </h1>
          <p className="mt-5 text-lg sm:text-xl font-bold text-white/90 leading-relaxed">
            나의 부자 잠재력은 몇 점?
          </p>
          <p className="mt-2 text-base sm:text-lg font-medium text-amber-100/60">
            소비 · 투자 · 경제 지식 10문항
          </p>
        </div>
      </header>

      <div className="max-w-[600px] mx-auto px-4 pb-16 relative">
        {isLoading ? (
          <div className="-mt-6 relative z-10">
            <AnalyzingLoader
              accentColor="#D97706"
              accentBgColor="#FEF3C7"
              adSlot="bq-loading"
              messages={[
                "부자 잠재력 측정 중...",
                "소비 습관 분석 중...",
                "투자 성향 판별 중...",
                "경제 지식 레벨 계산 중...",
                "부자 지수(BQ) 산출 중...",
              ]}
            />
          </div>
        ) : result ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-6 space-y-6"
          >
            {isShared && (
              <SharedResultBanner
                calculatorPath="/bq-test"
                accentColor="#D97706"
                ctaText="나도 부자 지수 테스트하기"
              />
            )}
            {/* 메인 결과 카드 */}
            <section className="relative overflow-hidden rounded-3xl bg-navy shadow-xl">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber/[0.06] rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber/[0.04] rounded-full blur-3xl" />
              </div>
              <div className="relative p-8 sm:p-10 text-center">
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-black px-4 py-1.5 rounded-full mb-5"
                  style={{
                    backgroundColor: `${result.accentColor}20`,
                    color: result.accentColor,
                  }}
                >
                  등급 {result.grade}
                </span>
                <p className="text-gray-400 text-sm font-medium mb-2">
                  당신의 BQ 점수
                </p>
                <div className="my-6">
                  <span className="text-6xl sm:text-7xl font-black tracking-tight text-amber drop-shadow-sm">
                    {totalScore}
                  </span>
                  <span className="text-2xl font-black ml-1 text-amber/70">
                    / 40
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 text-lg sm:text-xl font-bold text-white">
                  <span className="text-2xl">{result.emoji}</span>
                  {result.title}
                </div>
              </div>
            </section>

            {/* 인페이지 광고 (결과 수치 아래) */}
            <AdBanner slot="bq-result-top" format="rectangle" />

            {/* 분석 카드 */}
            <section className="bg-white rounded-3xl shadow-xl p-7">
              <div className="flex items-start gap-4">
                <div
                  className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${result.accentColor}18` }}
                >
                  <ResultIcon
                    className="w-5 h-5"
                    style={{ color: result.accentColor }}
                  />
                </div>
                <div>
                  <h3 className="font-black text-navy text-lg mb-2">
                    {result.emoji} {result.title}
                  </h3>
                  <p className="text-gray-400 font-medium leading-relaxed text-sm sm:text-[15px]">
                    {result.message}
                  </p>
                </div>
              </div>
            </section>

            {/* 팁 카드 */}
            <section className="bg-amber/5 rounded-3xl border border-amber/20 p-6">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-navy text-sm mb-1">
                    맞춤 조언
                  </h4>
                  <p className="text-sm font-medium text-gray-500 leading-relaxed">
                    {result.tip}
                  </p>
                </div>
              </div>
            </section>

            {/* 점수 상세 */}
            <section className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="font-black text-navy text-base mb-4 flex items-center gap-2">
                <Brain className="w-4 h-4 text-amber-dark" />
                점수 분포
              </h3>
              <div className="space-y-3">
                {(["소비", "투자", "경제 지식"] as const).map((cat) => {
                  const catQuestions = questions.filter(
                    (q) => q.category === cat
                  );
                  const catScore = catQuestions.reduce((sum, q) => {
                    const qIdx = questions.indexOf(q);
                    return sum + (answers[qIdx] ?? 0);
                  }, 0);
                  const maxScore = catQuestions.length * 4;
                  const pct = Math.round((catScore / maxScore) * 100);
                  return (
                    <div key={cat}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-bold text-navy">
                          {cat}
                        </span>
                        <span className="text-sm font-bold text-gray-400">
                          {catScore}/{maxScore}
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-amber"
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 공유 + CTA 버튼들 */}
            <div className="space-y-3">
              <button
                onClick={() =>
                  shareKakao({
                    title: `${result.emoji} 나의 부자 지수(BQ): ${totalScore}/40점!`,
                    description: `등급: ${result.grade} ${result.title}\n${result.message}\n당신도 부자연구소에서 분석받아보세요!`,
                    path: sharePath,
                    buttonText: "내 부자 등급도 확인하기",
                  })
                }
                className="w-full flex items-center justify-center gap-3 bg-[#FEE500] hover:bg-[#F5DC00] text-[#3C1E1E] font-black text-lg h-16 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                카카오톡으로 공유하기
              </button>
              <button
                onClick={() => {
                  const text = `[부자 지수(BQ) 테스트]\n${result.emoji} ${result.title} (${totalScore}/40점)\n${result.message}\n\n친구 결과 보기 ▸ https://www.korearichlab.com${sharePath}&shared=true`;
                  if (navigator.share) {
                    navigator.share({ title: "부자 지수(BQ) 테스트", text }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(text).then(() => alert("결과가 복사되었습니다!"));
                  }
                }}
                className="w-full flex items-center justify-center gap-3 bg-amber hover:bg-amber-dark text-navy font-black text-base h-14 rounded-2xl shadow-md transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                <Share2 className="w-5 h-5" />
                다른 앱으로 공유하기
              </button>
              <Link
                to="/calculator"
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-navy font-bold text-base py-4 rounded-2xl border border-gray-100 transition-all duration-200 active:scale-[0.98]"
              >
                <Calculator className="w-5 h-5" />
                자산 순위 확인하러 가기
              </Link>
              <button
                onClick={() => navigate("/bq-test")}
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-400 font-bold text-base py-4 rounded-2xl border border-gray-100 transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                다시 테스트하기
              </button>
            </div>
          </motion.div>
        ) : null}
      </div>

      {/* ── 애드센스 칼럼 ─────────────────────────────────── */}
      <BqArticle />
    </>
  );
}
