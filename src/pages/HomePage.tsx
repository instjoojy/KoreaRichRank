import { Helmet } from "@dr.pogodin/react-helmet";
import { BarChart3 } from "lucide-react";
import { tools } from "../data/toolsRegistry";
import ToolCard from "../components/ToolCard";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>코리아리치랭크 | 대한민국 금융 도구 모음</title>
        <meta name="description" content="통계청 공식 데이터 기반 금융 분석 도구 모음. 자산 백분위 계산, 소득 분석 등 다양한 금융 도구를 무료로 사용하세요." />
        <meta property="og:title" content="코리아리치랭크 | 대한민국 금융 도구 모음" />
        <meta property="og:description" content="통계청 공식 데이터 기반 금융 분석 도구 모음. 자산 백분위 계산, 소득 분석 등 다양한 금융 도구를 무료로 사용하세요." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="코리아리치랭크" />
      </Helmet>

      {/* ── 히어로 ──────────────────────────────────────── */}
      <header className="bg-navy">
        <div className="max-w-3xl mx-auto px-6 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/15 rounded-3xl mb-6 animate-float">
            <BarChart3 className="w-8 h-8 text-gold" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            코리아리치랭크
          </h1>
          <p className="mt-5 text-lg sm:text-xl font-bold text-white/90 leading-relaxed">
            대한민국 금융 분석 도구 모음
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-white/[0.06] rounded-full px-5 py-2 text-sm font-medium text-gray-400">
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            통계청 공식 데이터 기반
          </div>
        </div>
      </header>

      {/* ── 도구 그리드 ─────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 pb-16 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </>
  );
}
