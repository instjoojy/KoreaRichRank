import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "@dr.pogodin/react-helmet";
import {
  Flame,
  ChevronRight,
  User,
  Wallet,
  ShoppingCart,
  PiggyBank,
  TrendingUp,
  Target,
} from "lucide-react";
import SliderInput from "../../components/SliderInput";
import { AGE_STOPS, FIRE_ASSET_STOPS, MONTHLY_WON_STOPS, RETURN_STOPS, type Stop } from "../../utils/sliderStops";
import FireArticle from "./FireArticle";
import { type Inputs, formatWon } from "./fireUtils";

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

const FIELD_STOPS: Record<keyof Inputs, Stop[]> = {
  currentAge: AGE_STOPS,
  totalAssets: FIRE_ASSET_STOPS,
  monthlyExpenses: MONTHLY_WON_STOPS,
  monthlySavings: MONTHLY_WON_STOPS,
  expectedReturn: RETURN_STOPS,
};

const FIELD_MAX_LABELS: Record<keyof Inputs, string> = {
  currentAge: "80세",
  totalAssets: "20억",
  monthlyExpenses: "1,000만원",
  monthlySavings: "1,000만원",
  expectedReturn: "20%",
};

/* ── 메인 컴포넌트 ────────────────────────────── */
export default function FireCalculatorPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<Inputs>({
    currentAge: "",
    totalAssets: "",
    monthlyExpenses: "",
    monthlySavings: "",
    expectedReturn: "",
  });

  // ── 기존 공유 URL 리다이렉트 ─────────────────────────────────
  useEffect(() => {
    const urlAge = searchParams.get("age");
    const urlExpense = searchParams.get("expense");
    if (urlAge && urlExpense) {
      navigate(`/fire-calculator/result?${searchParams.toString()}`, { replace: true });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (key: keyof Inputs, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [key]: value === "" ? "" : Number(value),
    }));
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

  const handleCalculate = () => {
    if (!inputs.currentAge || !inputs.monthlyExpenses) return;
    const params = new URLSearchParams({
      age: String(inputs.currentAge),
      assets: String(inputs.totalAssets || 0),
      expense: String(inputs.monthlyExpenses),
      saving: String(inputs.monthlySavings || 0),
      return: String(inputs.expectedReturn || 0),
    });
    navigate(`/fire-calculator/result?${params.toString()}`);
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
            {inputFields.map((field) => (
              <SliderInput
                key={field.key}
                label={field.label}
                icon={field.icon}
                unit={field.unit}
                value={inputs[field.key]}
                placeholder={field.placeholder}
                min={field.min}
                step={field.step}
                stops={FIELD_STOPS[field.key]}
                accentColor="#10B981"
                accentColorRgb="16, 185, 129"
                onChange={(v) => handleChange(field.key, String(v))}
                formatBadge={field.key === "totalAssets" ? (v) => formatWon(v) : field.key === "expectedReturn" ? (v) => `${v}%` : undefined}
                minLabel={field.key === "currentAge" ? "15세" : `0${field.unit}`}
                maxLabel={FIELD_MAX_LABELS[field.key]}
              />
            ))}
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
      </div>

      {/* ── 애드센스 칼럼 ─────────────────────────────── */}
      <FireArticle />
    </>
  );
}
