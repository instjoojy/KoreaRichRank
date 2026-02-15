import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "@dr.pogodin/react-helmet";
import {
  Clock,
  ChevronRight,
  AlertTriangle,
  Timer,
  Train,
  Moon,
  MessageSquare,
  BookOpen,
  Briefcase,
} from "lucide-react";
import SliderInput from "../../components/SliderInput";
import { SALARY_STOPS, HOURS_STOPS, MINUTES_STOPS, type Stop } from "../../utils/sliderStops";
import WageArticle from "./WageArticle";
import {
  type Inputs,
  formatNumber,
  MIN_WAGE_2026,
  WORK_DAYS_PER_MONTH,
} from "./wageUtils";

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

const FIELD_STOPS: Record<keyof Inputs, Stop[]> = {
  monthlySalary: SALARY_STOPS,
  regularHours: HOURS_STOPS,
  commuteHours: HOURS_STOPS,
  overtimeHours: HOURS_STOPS,
  afterWorkMinutes: MINUTES_STOPS,
  prepHours: HOURS_STOPS,
};

const FIELD_MAX_LABELS: Record<keyof Inputs, string> = {
  monthlySalary: "2,000만원",
  regularHours: "16시간",
  commuteHours: "16시간",
  overtimeHours: "16시간",
  afterWorkMinutes: "180분",
  prepHours: "16시간",
};

export default function RealHourlyWagePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<Inputs>({
    monthlySalary: 300,
    regularHours: 8,
    commuteHours: 1,
    overtimeHours: "",
    afterWorkMinutes: "",
    prepHours: "",
  });

  // ── 기존 공유 URL 리다이렉트 ─────────────────────────────
  useEffect(() => {
    const urlSalary = searchParams.get("salary");
    const urlHours = searchParams.get("hours");
    if (urlSalary && urlHours) {
      navigate(`/real-hourly-wage/result?${searchParams.toString()}`, { replace: true });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (key: keyof Inputs, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [key]: value === "" ? "" : Number(value),
    }));
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

  const handleCalculate = () => {
    if (!inputs.monthlySalary || !inputs.regularHours) return;
    const params = new URLSearchParams({
      salary: String(inputs.monthlySalary),
      hours: String(inputs.regularHours),
      commute: String(inputs.commuteHours || 0),
      overtime: String(inputs.overtimeHours || 0),
      afterwork: String(inputs.afterWorkMinutes || 0),
      prep: String(inputs.prepHours || 0),
    });
    navigate(`/real-hourly-wage/result?${params.toString()}`);
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
                accentColor="#F43F5E"
                accentColorRgb="244, 63, 94"
                onChange={(v) => handleChange(field.key, String(v))}
                minLabel={`0${field.unit}`}
                maxLabel={FIELD_MAX_LABELS[field.key]}
              />
            ))}
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
      </div>

      {/* ── 애드센스 칼럼 ─────────────────────────────────── */}
      <WageArticle />
    </>
  );
}
