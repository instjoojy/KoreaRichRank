import { Link } from "react-router-dom";
import { Helmet } from "@dr.pogodin/react-helmet";
import { BookOpen, ArrowRight, ChevronRight } from "lucide-react";
import { tools } from "../data/toolsRegistry";
import { columns, categoryMeta } from "../data/columns";
import ToolCard from "../components/ToolCard";
import AdBanner from "../components/AdBanner";

export default function HomePage() {
  /* 허브 페이지에는 최근 6개만 표시 */
  const previewColumns = columns.slice(0, 6);

  return (
    <>
      <Helmet>
        <title>대한민국 부자연구소 | 통계 기반 무료 금융 계산기 모음</title>
        <meta name="description" content="2026 통계청 공식 데이터 기반 금융 분석 도구. 자산 상위 % 계산, 부자 지수(BQ) 테스트, 진짜 시급 계산기, FIRE 은퇴 시뮬레이션까지 무료로 이용하세요." />
        <link rel="canonical" href="https://korearichlab.com/" />
        <meta property="og:title" content="대한민국 부자연구소 | 통계 기반 무료 금융 계산기 모음" />
        <meta property="og:description" content="2026 통계청 공식 데이터 기반 금융 분석 도구. 자산 상위 % 계산, 부자 지수 테스트, 진짜 시급 계산기, FIRE 은퇴 시뮬레이션까지 무료." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://korearichlab.com/" />
        <meta property="og:site_name" content="대한민국 부자연구소" />
      </Helmet>

      {/* ── 히어로 ──────────────────────────────────────── */}
      <header className="bg-gradient-to-b from-indigo to-indigo-dark">
        <div className="max-w-[600px] mx-auto px-6 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-[28px] mb-6 animate-float text-5xl" role="img" aria-label="부자연구소 실험 플라스크 아이콘">
            🧪
          </div>
          <h1 className="text-[32px] sm:text-[40px] font-black tracking-tight leading-tight text-white">
            대한민국 부자연구소
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
      <section className="max-w-[600px] mx-auto px-5 pb-12 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* ── 부자연구소 인사이트 ──────────────────────────── */}
      <section className="max-w-[960px] mx-auto px-5 pb-20">
        {/* 섹션 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo/10">
              <BookOpen className="w-5 h-5 text-indigo" />
            </div>
            <h2 className="text-2xl sm:text-[28px] font-black text-navy">
              부자연구소 인사이트
            </h2>
          </div>
          <Link
            to="/columns"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-indigo hover:text-indigo-dark transition-colors"
          >
            전체 칼럼 보기
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 칼럼 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewColumns.map((col, idx) => {
            const meta = categoryMeta[col.category];
            return (
            <>
              <Link
                key={col.id}
                to={`/column/${col.slug}`}
                className="group bg-white rounded-3xl shadow-lg border border-gray-100 p-6 flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <span className={`inline-flex self-start items-center text-[11px] font-black px-2.5 py-1 rounded-full ${meta?.bg ?? "bg-indigo-50"} ${meta?.text ?? "text-indigo"} mb-3`}>
                  {col.category}
                </span>
                <h3 className="text-[15px] font-black text-navy leading-snug mb-2 group-hover:text-indigo transition-colors">
                  {col.title}
                </h3>
                <p className="text-sm font-medium text-gray-400 leading-relaxed flex-1">
                  {col.summary}
                </p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                  <span className="text-xs font-medium text-gray-300">{col.date}</span>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo transition-colors" />
                </div>
              </Link>

              {/* 인피드 광고: 3번째 카드 뒤에 삽입 */}
              {idx === 2 && (
                <div key="infeed-ad" className="sm:col-span-2 lg:col-span-3">
                  <AdBanner slot="home-infeed" format="horizontal" />
                </div>
              )}
            </>
            );
          })}
        </div>

        {/* 모바일용 전체 칼럼 보기 버튼 */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/columns"
            className="inline-flex items-center gap-2 bg-indigo/10 hover:bg-indigo/20 text-indigo font-bold text-sm px-6 py-3 rounded-2xl transition-colors"
          >
            전체 칼럼 보기
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
