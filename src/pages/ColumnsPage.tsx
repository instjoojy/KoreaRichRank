import { Link } from "react-router-dom";
import { Helmet } from "@dr.pogodin/react-helmet";
import { BookOpen, ArrowRight } from "lucide-react";
import { columns } from "../data/columns";
import AdBanner from "../components/AdBanner";

export default function ColumnsPage() {
  return (
    <>
      <Helmet>
        <title>부자연구소 인사이트 — 전체 칼럼 | 대한민국 부자연구소</title>
        <meta name="description" content="돈, 자산, 은퇴, 시급에 대한 부자연구소의 데이터 기반 인사이트 칼럼 전체 목록." />
        <link rel="canonical" href="https://korearichlab.com/columns" />
        <meta property="og:title" content="부자연구소 인사이트 | 대한민국 부자연구소" />
        <meta property="og:description" content="돈, 자산, 은퇴, 시급에 대한 데이터 기반 인사이트 칼럼." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://korearichlab.com/columns" />
        <meta property="og:site_name" content="대한민국 부자연구소" />
      </Helmet>

      {/* ── 히어로 ──────────────────────────────────── */}
      <header className="bg-gradient-to-b from-indigo to-indigo-dark">
        <div className="max-w-[960px] mx-auto px-6 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-3xl mb-6 animate-float">
            <BookOpen className="w-8 h-8 text-indigo-100" />
          </div>
          <h1 className="text-[32px] sm:text-[40px] font-black tracking-tight leading-tight text-white">
            부자연구소 인사이트
          </h1>
          <p className="mt-5 text-lg sm:text-xl font-bold text-white/80 leading-[1.7]">
            데이터가 말하는 돈의 진실
          </p>
        </div>
      </header>

      {/* ── 칼럼 그리드 ────────────────────────────── */}
      <div className="max-w-[960px] mx-auto px-5 pb-20 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {columns.map((col, idx) => (
            <>
              <Link
                key={col.id}
                to={col.path}
                className="group bg-white rounded-3xl shadow-lg border border-gray-100 p-6 flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <span className="inline-flex self-start items-center text-[11px] font-black px-2.5 py-1 rounded-full bg-indigo/10 text-indigo mb-3">
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

              {/* 인피드 광고: 6번째 카드 뒤에 삽입 */}
              {idx === 5 && (
                <div key="infeed-ad" className="sm:col-span-2 lg:col-span-3">
                  <AdBanner slot="columns-infeed" format="horizontal" />
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </>
  );
}
