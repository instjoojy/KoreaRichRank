import { Helmet } from "@dr.pogodin/react-helmet";
import { tools } from "../data/toolsRegistry";
import ToolCard from "../components/ToolCard";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>부자연구소 | 대한민국 금융 실험실</title>
        <meta name="description" content="통계청 공식 데이터 기반 금융 분석 도구 모음. 자산 백분위 계산, 부자 지수 테스트, 진짜 시급 계산까지 무료로 사용하세요." />
        <meta property="og:title" content="부자연구소 | 대한민국 금융 실험실" />
        <meta property="og:description" content="통계청 공식 데이터 기반 금융 분석 도구 모음. 자산 백분위 계산, 부자 지수 테스트, 진짜 시급 계산까지." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="부자연구소" />
      </Helmet>

      {/* ── 히어로 ──────────────────────────────────────── */}
      <header className="bg-gradient-to-b from-indigo to-indigo-dark">
        <div className="max-w-[600px] mx-auto px-6 py-20 sm:py-24 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-[28px] mb-6 animate-float text-5xl">
            🧪
          </div>
          <h1 className="text-[32px] sm:text-[40px] font-black tracking-tight leading-tight text-white">
            부자연구소
          </h1>
          <p className="mt-4 font-display text-2xl sm:text-3xl text-amber leading-snug">
            Rich Lab
          </p>
          <p className="mt-5 text-lg sm:text-xl font-bold text-white/80 leading-[1.7]">
            돈에 대해 진지하게, 결과는 유쾌하게
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-white/[0.08] rounded-full px-5 py-2.5 text-[15px] font-medium text-indigo-100/70">
            <div className="w-1.5 h-1.5 rounded-full bg-amber" />
            통계청 공식 데이터 기반
          </div>
        </div>
      </header>

      {/* ── 도구 그리드 ─────────────────────────────────── */}
      <section className="max-w-[600px] mx-auto px-5 pb-20 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </>
  );
}
