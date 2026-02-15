import { useState, useCallback, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "@dr.pogodin/react-helmet";
import { Brain, ChevronRight } from "lucide-react";
import { questions } from "./questions";
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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [step, setStep] = useState<"intro" | "quiz">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [direction, setDirection] = useState(1);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // ── 기존 공유 URL 리다이렉트 ──────────────────────────────
  useEffect(() => {
    const urlAnswers = searchParams.get("answers");
    if (urlAnswers) {
      const shared = searchParams.get("shared") === "true" ? "&shared=true" : "";
      navigate(`/bq-test/result?answers=${urlAnswers}${shared}`, { replace: true });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
          navigate(`/bq-test/result?answers=${newAnswers.join(",")}`);
        } else {
          setCurrentQ((q) => q + 1);
        }
      }, 400);
    },
    [answers, currentQ, selectedIdx, navigate]
  );

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
      </div>

      {/* ── 애드센스 칼럼 ─────────────────────────────────── */}
      <BqArticle />
    </>
  );
}
