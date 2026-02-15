import { forwardRef } from "react";
import {
  TrendingUp,
  Users,
  Briefcase,
  MapPin,
  MessageCircle,
  BarChart3,
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
import type { CalculatorResult as CalcResult } from "../../../utils/calculator";
import type { Analysis } from "../utils/analysis";
import { DISTRIBUTION } from "../utils/distribution";
import ChartTooltip from "./ChartTooltip";
import StatCard from "../../../components/StatCard";
import AdBanner from "../../../components/AdBanner";

interface CalculatorResultProps {
  result: CalcResult;
  displayPct: number;
  analysis: Analysis;
  chartData: { range: string; percent: number; upper: number; isUser: boolean }[];
  userBin: number;
}

const CalculatorResult = forwardRef<HTMLDivElement, CalculatorResultProps>(
  function CalculatorResult({ result, displayPct, analysis, chartData, userBin }, ref) {
    const AnalysisIcon = analysis.icon;

    return (
      <div ref={ref} className="mt-10 space-y-8">
        {/* 메인 결과 카드 */}
        <section className="relative overflow-hidden rounded-3xl bg-navy shadow-xl animate-fade-in-up">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber/[0.06] rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber/[0.04] rounded-full blur-3xl" />
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
              <span className="text-6xl sm:text-7xl font-black tracking-tight text-amber animate-count-pulse drop-shadow-sm">
                {displayPct}
              </span>
              <span className="text-3xl font-black ml-1 text-amber/70">%</span>
            </div>
            <p className="text-lg sm:text-xl font-bold text-white">
              동년배 자산 상위{" "}
              <span className="text-amber underline decoration-2 underline-offset-4">{result.assetPercentileByAge}%</span>
            </p>
          </div>
        </section>

        {/* 심리 분석 */}
        <section className="bg-white rounded-3xl shadow-xl p-8 animate-fade-in-up animation-delay-100 opacity-0">
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
              <p className="text-gray-400 font-medium leading-[1.7] text-[15px] sm:text-base">
                {analysis.message}
              </p>
            </div>
          </div>
        </section>

        {/* 상세 수치 카드 그리드 */}
        <div className="grid grid-cols-2 gap-4 animate-fade-in-up animation-delay-200 opacity-0">
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
        <section className="bg-white rounded-3xl shadow-xl p-7 sm:p-9 animate-fade-in-up animation-delay-300 opacity-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber-50">
              <BarChart3 className="w-4.5 h-4.5 text-amber-dark" />
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
                      fill={entry.isUser ? "#6366F1" : "#E2E8F0"}
                      stroke={entry.isUser ? "#4F46E5" : "none"}
                      strokeWidth={entry.isUser ? 2 : 0}
                    />
                  ))}
                </Bar>
                <ReferenceLine
                  x={DISTRIBUTION[userBin].range}
                  stroke="#6366F1"
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
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* 카카오톡 공유 */}
        <section className="animate-fade-in-up animation-delay-400 opacity-0">
          <button
            onClick={() => alert("카카오톡 공유 기능은 현재 준비 중입니다.")}
            className="w-full flex items-center justify-center gap-3 bg-[#FEE500] hover:bg-[#F5DC00] text-[#3C1E1E] font-black text-lg h-16 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            카카오톡으로 결과 공유하기
          </button>
        </section>

        {/* 하단 광고 */}
        <AdBanner slot="bottom-banner" className="w-full" />
      </div>
    );
  }
);

export default CalculatorResult;
