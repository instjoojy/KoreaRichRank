import { useState, useCallback, useEffect } from "react";
import AnalyzingLoader from "../../components/AnalyzingLoader";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "@dr.pogodin/react-helmet";
import {
  Brain,
  ChevronRight,
  RotateCcw,
  Calculator,
  Sparkles,
} from "lucide-react";
import { questions } from "./questions";
import { getBqResult } from "./results";
import BqArticle from "./BqArticle";

// ── 애니메이션 variants ────────────────────────────────
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export default function BqTestPage() {
  const [step, setStep] = useState<"intro" | "quiz" | "loading" | "result">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [direction, setDirection] = useState(1);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const result = step === "result" ? getBqResult(totalScore) : null;
  const ResultIcon = result?.icon ?? Brain;

  const handleSelect = useCallback(
    (score: number, optIdx: number) => {
      if (selectedIdx !== null) return;
      setSelectedIdx(optIdx);
      setDirection(1);

      setTimeout(() => {
        const newAnswers = [...answers, score];
        setAnswers(newAnswers);
        setSelectedIdx(null);

        if (currentQ + 1 >= questions.length) {
          setStep("loading");
        } else {
          setCurrentQ((q) => q + 1);
        }
      }, 400);
    },
    [answers, currentQ, selectedIdx]
  );

  useEffect(() => {
    if (step !== "loading") return;
    const timer = setTimeout(() => setStep("result"), 3500);
    return () => clearTimeout(timer);
  }, [step]);

  const handleRestart = () => {
    setStep("intro");
    setCurrentQ(0);
    setAnswers([]);
    setDirection(1);
    setSelectedIdx(null);
  };

  const progress = step === "quiz" ? ((currentQ + 1) / questions.length) * 100 : 0;

  return (
    <>
      <Helmet>
        <title>부자 지수(BQ) 테스트 — 나의 부자 잠재력 점수는? | 대한민국 부자연구소</title>
        <meta
          name="description"
          content="소비 습관, 투자 성향, 경제 지식 10문항으로 측정하는 부자 지수(BQ) 테스트. 나는 부자가 될 떡잎일까? 무료로 진단해보세요."
        />
        <link rel="canonical" href="https://korearichlab.com/bq-test" />
        <meta property="og:title" content="부자 지수(BQ) 테스트 | 대한민국 부자연구소" />
        <meta property="og:description" content="소비·투자·경제 지식 10문항으로 측정하는 부자 잠재력 점수. 무료 BQ 테스트." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://korearichlab.com/bq-test" />
        <meta property="og:site_name" content="대한민국 부자연구소" />
      </Helmet>

      {/* ── 히어로 헤더 ───────────────────────────────────── */}
      {step === "intro" && (
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
            <div className="mt-6 inline-flex items-center gap-2 bg-white/[0.06] rounded-full px-5 py-2 text-sm font-medium text-amber-100/60">
              <div className="w-1.5 h-1.5 rounded-full bg-amber" />
              약 2분 소요
            </div>
          </div>
        </header>
      )}

      {/* ── 프로그레스 바 (퀴즈 중) ──────────────────────── */}
      {step === "quiz" && (
        <div className="bg-gradient-to-b from-[#D97706] to-[#92400E]">
          <div className="max-w-[600px] mx-auto px-6 pt-8 pb-12">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-white/60">
                {currentQ + 1} / {questions.length}
              </span>
              <span className="text-sm font-bold text-amber">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-amber rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[600px] mx-auto px-4 pb-16 relative">
        {/* ═════════════ INTRO ═════════════ */}
        {step === "intro" && (
          <div className="-mt-8 relative z-10">
            <section className="bg-white rounded-3xl shadow-xl p-7 sm:p-10 text-center">
              <div className="space-y-4 mb-8">
                {[
                  { emoji: "💳", label: "소비 습관", desc: "당신의 돈 쓰는 패턴 분석" },
                  { emoji: "📊", label: "투자 성향", desc: "투자 판단력과 멘탈 측정" },
                  { emoji: "🧠", label: "경제 지식", desc: "금융 IQ 레벨 체크" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 bg-[#F9FAFB] rounded-2xl p-4 text-left"
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <p className="font-bold text-navy text-sm">{item.label}</p>
                      <p className="text-xs font-medium text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setStep("quiz")}
                className="w-full group bg-amber hover:bg-amber-dark text-navy text-lg font-black h-16 rounded-2xl shadow-lg shadow-amber/25 transition-all duration-300 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                테스트 시작하기
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </section>
          </div>
        )}

        {/* ═════════════ QUIZ ═════════════ */}
        {step === "quiz" && (
          <div className="-mt-6 relative z-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.section
                key={currentQ}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-white rounded-3xl shadow-xl p-7 sm:p-10"
              >
                {/* 카테고리 태그 */}
                <span className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full bg-amber-50 text-amber-dark mb-5">
                  {questions[currentQ].category}
                </span>

                <h2 className="text-xl sm:text-2xl font-black text-navy leading-snug mb-8">
                  {questions[currentQ].question}
                </h2>

                <div className="space-y-3">
                  {questions[currentQ].options.map((opt, idx) => {
                    const isSelected = selectedIdx === idx;
                    return (
                      <motion.button
                        key={idx}
                        onClick={() => handleSelect(opt.score, idx)}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "border-amber bg-amber/10 shadow-md"
                            : "border-gray-100 bg-[#F9FAFB] hover:border-gray-200 hover:bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black ${
                              isSelected
                                ? "bg-amber text-navy"
                                : "bg-gray-200/60 text-gray-400"
                            }`}
                          >
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span
                            className={`font-medium text-sm sm:text-[15px] ${
                              isSelected ? "text-navy font-bold" : "text-gray-500"
                            }`}
                          >
                            {opt.text}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.section>
            </AnimatePresence>
          </div>
        )}

        {/* ═════════════ LOADING ═════════════ */}
        {step === "loading" && (
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
        )}

        {/* ═════════════ RESULT ═════════════ */}
        {step === "result" && result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-6 space-y-6"
          >
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

            {/* CTA 버튼들 */}
            <div className="space-y-3">
              <Link
                to="/calculator"
                className="w-full flex items-center justify-center gap-3 bg-amber hover:bg-amber-dark text-navy font-black text-lg h-16 rounded-2xl shadow-lg shadow-amber/25 transition-all duration-300 active:scale-[0.98]"
              >
                <Calculator className="w-5 h-5" />
                자산 순위 확인하러 가기
              </Link>
              <button
                onClick={handleRestart}
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-400 font-bold text-base py-4 rounded-2xl border border-gray-100 transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                다시 테스트하기
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* ── 애드센스 칼럼 ─────────────────────────────────── */}
      <BqArticle />
    </>
  );
}
