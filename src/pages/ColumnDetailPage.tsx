import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "@dr.pogodin/react-helmet";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { columns, getColumnBySlug, categoryMeta } from "../data/columns";
import type { Column } from "../data/columns";
import AdBanner from "../components/AdBanner";

/** 공백 제외 글자 수 기반 읽기 시간 추정 (분) */
function getReadingTime(column: Column): number {
  const totalChars = column.content.reduce(
    (sum, s) => sum + s.heading.length + s.body.replace(/\s/g, "").length,
    0,
  );
  // 한국어 평균 읽기 속도: 분당 약 500자
  return Math.max(1, Math.round(totalChars / 500));
}

/** 본문 텍스트를 \n\n 기준으로 문단 분리하여 렌더링 */
function RenderBody({ text }: { text: string }) {
  const paragraphs = text.split("\n\n");
  return (
    <>
      {paragraphs.map((p, i) => (
        <p key={i} className={i > 0 ? "mt-4" : ""}>
          {p}
        </p>
      ))}
    </>
  );
}

export default function ColumnDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const column = slug ? getColumnBySlug(slug) : undefined;

  if (!column) return <Navigate to="/columns" replace />;

  const meta = categoryMeta[column.category] ?? categoryMeta["자산 분석"];
  const readMin = getReadingTime(column);
  const totalSections = column.content.length;

  const related = columns
    .filter((c) => c.category === column.category && c.id !== column.id)
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{column.title} | 대한민국 부자연구소</title>
        <meta name="description" content={column.summary} />
        <link
          rel="canonical"
          href={`https://korearichlab.com/column/${column.slug}`}
        />
        <meta property="og:title" content={column.title} />
        <meta property="og:description" content={column.summary} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://korearichlab.com/column/${column.slug}`}
        />
        <meta property="og:site_name" content="대한민국 부자연구소" />
      </Helmet>

      {/* ── 히어로 ──────────────────────────────────── */}
      <header className={`bg-gradient-to-b ${meta.gradient}`}>
        <div className="max-w-[600px] mx-auto px-6 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-3xl mb-6 animate-float text-4xl">
            {meta.emoji}
          </div>
          <span className="inline-flex items-center text-[11px] font-black px-3 py-1 rounded-full bg-white/20 text-white mb-4">
            {column.category}
          </span>
          <h1 className="text-[24px] sm:text-[32px] font-black tracking-tight leading-tight text-white">
            {column.title}
          </h1>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm font-medium text-white/60">
            <span>{column.date}</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {readMin}분 읽기
            </span>
          </div>
        </div>
      </header>

      {/* ── 본문 ───────────────────────────────────── */}
      <article className="max-w-[600px] mx-auto px-5 pb-20 -mt-8 relative z-10">
        {/* 요약 카드 */}
        <div className="bg-white rounded-3xl shadow-xl p-7 sm:p-10 mb-8">
          <p className="text-[15px] sm:text-base font-bold text-navy leading-[1.85]">
            {column.summary}
          </p>
        </div>

        {/* 콘텐츠 섹션 */}
        <div className="space-y-6">
          {column.content.map((section, idx) => {
            const isIntro = idx === 0;
            const isConclusion = idx === totalSections - 1;

            return (
              <div key={idx}>
                <section
                  className={`bg-white rounded-3xl shadow-lg border border-gray-100 p-7 sm:p-10 ${
                    isConclusion ? `border-l-4 !border-l-current ${meta.text}` : ""
                  }`}
                >
                  {/* 섹션 헤더 */}
                  <div className="flex items-start gap-3 mb-5">
                    {!isIntro && !isConclusion && (
                      <span
                        className={`shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-black text-white bg-gradient-to-br ${meta.gradient} mt-0.5`}
                      >
                        {idx}
                      </span>
                    )}
                    <h2
                      className={`${
                        isIntro
                          ? "text-[22px] sm:text-2xl"
                          : "text-lg sm:text-xl"
                      } font-black text-navy leading-snug`}
                    >
                      {section.heading}
                    </h2>
                  </div>

                  {/* 본문 — 문단 분리 렌더링 */}
                  <div className="text-[15px] sm:text-base font-medium text-gray-500 leading-[1.85]">
                    <RenderBody text={section.body} />
                  </div>
                </section>

                {/* 광고 배너: 2번째, 4번째 섹션 뒤 */}
                {(idx === 1 || idx === 3) && idx < totalSections - 1 && (
                  <AdBanner
                    slot={`column-mid-${column.id}-${idx}`}
                    format="rectangle"
                    className="mt-6"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* 도구 CTA */}
        <div className={`mt-12 ${meta.bg} rounded-3xl p-7 sm:p-10 text-center`}>
          <p className="text-3xl mb-3">{meta.emoji}</p>
          <p className="text-lg font-black text-navy mb-2">
            직접 확인해보세요
          </p>
          <p className="text-sm font-medium text-gray-400 mb-5 leading-relaxed">
            이 칼럼과 관련된 도구로 나의 수치를 계산해보세요.
          </p>
          <Link
            to={column.toolPath}
            className={`inline-flex items-center gap-2 bg-gradient-to-r ${meta.gradient} text-white font-bold px-6 py-3 rounded-2xl transition-opacity hover:opacity-90 text-sm`}
          >
            도구 사용하기 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 관련 칼럼 */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-black text-navy mb-6">관련 칼럼</h2>
            <div className="space-y-4">
              {related.map((col) => {
                const relMeta = categoryMeta[col.category];
                return (
                  <Link
                    key={col.id}
                    to={`/column/${col.slug}`}
                    className="group block bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-lg transition-all"
                  >
                    <span
                      className={`text-[11px] font-black ${relMeta?.text ?? "text-indigo"}`}
                    >
                      {col.category}
                    </span>
                    <h3 className="text-[15px] font-black text-navy mt-1 group-hover:text-indigo transition-colors">
                      {col.title}
                    </h3>
                    <p className="text-sm font-medium text-gray-400 mt-1 line-clamp-2">
                      {col.summary}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* 뒤로가기 */}
        <div className="mt-10 text-center">
          <Link
            to="/columns"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-indigo transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            전체 칼럼 보기
          </Link>
        </div>
      </article>
    </>
  );
}
