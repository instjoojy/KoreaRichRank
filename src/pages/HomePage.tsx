import { Link } from "react-router-dom";
import { Helmet } from "@dr.pogodin/react-helmet";
import { ArrowRight, ChevronRight } from "lucide-react";
import { tools } from "../data/toolsRegistry";
import { columns, categoryMeta } from "../data/columns";
import ToolCard from "../components/ToolCard";
import AdBanner from "../components/AdBanner";

export default function HomePage() {
  const previewColumns = columns.slice(0, 6);

  return (
    <>
      <Helmet>
        <title>대한민국 부자연구소 | 통계 기반 무료 금융 계산기 모음</title>
        <meta
          name="description"
          content="2026 통계청 공식 데이터 기반 금융 분석 도구. 자산 상위 % 계산, 부자 지수(BQ) 테스트, 진짜 시급 계산기, FIRE 은퇴 시뮬레이션까지 무료로 이용하세요."
        />
        <link rel="canonical" href="https://korearichlab.com/" />
        <meta
          property="og:title"
          content="대한민국 부자연구소 | 통계 기반 무료 금융 계산기 모음"
        />
        <meta
          property="og:description"
          content="2026 통계청 공식 데이터 기반 금융 분석 도구. 자산 상위 % 계산, 부자 지수 테스트, 진짜 시급 계산기, FIRE 은퇴 시뮬레이션까지 무료."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://korearichlab.com/" />
        <meta property="og:site_name" content="대한민국 부자연구소" />
      </Helmet>

      {/* ══════════════════════════════════════════════════
       *  HERO 섹션
       * ══════════════════════════════════════════════════ */}
      <header className="bg-gradient-to-b from-indigo to-indigo-dark">
        <div className="max-w-[700px] mx-auto px-6 py-20 sm:py-24 text-center">
          <div
            className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-3xl mb-6 animate-float text-5xl"
            role="img"
            aria-label="부자연구소 아이콘"
          >
            🧪
          </div>
          <h1 className="text-[32px] sm:text-[44px] font-black tracking-tight leading-tight text-white">
            대한민국 부자연구소
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl text-amber leading-snug">
            Rich Lab
          </p>
          <p className="mt-5 text-lg sm:text-xl font-medium text-white/70 leading-relaxed tracking-wide">
            돈에 대해 진지하게, 결과는 유쾌하게
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-white/[0.08] rounded-full px-5 py-2.5 text-[15px] font-medium text-indigo-100/70">
            <div className="w-1.5 h-1.5 rounded-full bg-amber" />
            통계청 공식 데이터 기반
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════
       *  도구(Calculator) 섹션 — 화이트 배경
       * ══════════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-[700px] mx-auto px-5">
          {/* 섹션 헤더 */}
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-navy tracking-tight">
              금융 분석 도구
            </h2>
            <p className="mt-2 text-sm sm:text-base font-medium text-gray-400 tracking-wide">
              통계 데이터 기반, 무료로 바로 사용해 보세요
            </p>
          </div>

          {/* 2×2 그리드 */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
       *  인사이트(Insights) 섹션 — 연한 회색 배경
       * ══════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-[960px] mx-auto px-5">
          {/* 섹션 헤더 */}
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-navy tracking-tight">
              부자연구소 인사이트
            </h2>
            <p className="mt-2 text-sm sm:text-base font-medium text-gray-400 tracking-wide">
              데이터가 말하는 돈의 진실
            </p>
          </div>

          {/* 매거진 스타일 3열 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previewColumns.map((col, idx) => {
              const meta = categoryMeta[col.category];
              return (
                <div key={col.id}>
                  <Link
                    to={`/column/${col.slug}`}
                    className="group flex flex-col bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    {/* 썸네일 영역 */}
                    <div
                      className={`relative h-32 sm:h-36 bg-gradient-to-br ${meta?.gradient ?? "from-indigo to-indigo-dark"} flex items-center justify-center`}
                    >
                      <span className="text-5xl opacity-80">
                        {meta?.emoji ?? "📊"}
                      </span>
                      <span className="absolute top-3 left-3 text-[11px] font-black px-2.5 py-1 rounded-full bg-white/20 text-white">
                        {col.category}
                      </span>
                    </div>

                    {/* 텍스트 영역 */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <h3 className="text-[15px] sm:text-base font-black text-navy leading-snug mb-2 group-hover:text-indigo transition-colors tracking-tight">
                        {col.title}
                      </h3>
                      <p className="text-sm font-medium text-gray-400 leading-relaxed flex-1 line-clamp-2">
                        {col.summary}
                      </p>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                        <span className="text-xs font-medium text-gray-300">
                          {col.date}
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo transition-colors" />
                      </div>
                    </div>
                  </Link>

                  {/* 인피드 광고: 3번째 카드 뒤 (모바일에서만 보임, 데스크톱은 그리드 유지) */}
                  {idx === 2 && (
                    <div className="mt-6 md:hidden">
                      <AdBanner slot="home-infeed" format="horizontal" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 전체 칼럼 보기 버튼 — 하단 중앙 */}
          <div className="mt-12 text-center">
            <Link
              to="/columns"
              className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-indigo/30 hover:shadow-lg text-navy font-bold text-sm px-8 py-3.5 rounded-3xl transition-all duration-300"
            >
              전체 칼럼 보기
              <ChevronRight className="w-4 h-4 text-indigo" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
