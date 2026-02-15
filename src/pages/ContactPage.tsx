import { Helmet } from "@dr.pogodin/react-helmet";
import { Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>문의하기 | 대한민국 부자연구소</title>
        <meta name="description" content="대한민국 부자연구소에 대한 문의, 제안, 협업 요청은 이메일로 연락해주세요." />
        <link rel="canonical" href="https://korearichlab.com/contact" />
        <meta property="og:title" content="문의하기 | 대한민국 부자연구소" />
        <meta property="og:description" content="대한민국 부자연구소에 대한 문의, 제안, 협업 요청은 이메일로 연락해주세요." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://korearichlab.com/contact" />
        <meta property="og:site_name" content="대한민국 부자연구소" />
      </Helmet>

      {/* ── 히어로 ──────────────────────────────────── */}
      <header className="bg-gradient-to-b from-indigo to-indigo-dark">
        <div className="max-w-[600px] mx-auto px-6 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-3xl mb-6 animate-float">
            <Mail className="w-8 h-8 text-indigo-100" />
          </div>
          <h1 className="text-[32px] sm:text-[40px] font-black tracking-tight leading-tight text-white">
            문의하기
          </h1>
          <p className="mt-5 text-lg sm:text-xl font-bold text-white/80 leading-[1.7]">
            부자연구소에 궁금한 점이 있으신가요?
          </p>
        </div>
      </header>

      {/* ── 컨텐츠 ─────────────────────────────────── */}
      <div className="max-w-[600px] mx-auto px-5 pb-20 -mt-8 relative z-10">
        <section className="bg-white rounded-3xl shadow-xl p-7 sm:p-10">
          <h2 className="text-2xl font-black text-navy mb-6">Contact</h2>

          <p className="text-[15px] font-medium text-gray-500 leading-relaxed mb-8">
            서비스 이용 관련 문의, 데이터 오류 신고, 광고 및 제휴 제안, 기타 의견 등 무엇이든 편하게 연락해주세요. 빠른 시일 내에 답변 드리겠습니다.
          </p>

          {/* 이메일 카드 */}
          <a
            href="mailto:instjoojy@gmail.com"
            className="flex items-center gap-4 bg-[#F9FAFB] hover:bg-indigo-50 border border-gray-100 hover:border-indigo/20 rounded-2xl p-5 transition-all duration-200 group"
          >
            <div className="shrink-0 w-12 h-12 rounded-xl bg-indigo/10 flex items-center justify-center group-hover:bg-indigo/20 transition-colors">
              <Mail className="w-5 h-5 text-indigo" />
            </div>
            <div>
              <p className="text-sm font-bold text-navy mb-0.5">이메일</p>
              <p className="text-[15px] font-medium text-indigo">
                instjoojy@gmail.com
              </p>
            </div>
          </a>

          <div className="h-px bg-gray-100 my-8" />

          <div className="text-sm font-medium text-gray-400 leading-relaxed space-y-2">
            <p>
              운영시간: 평일 10:00 ~ 18:00 (주말 및 공휴일 제외)
            </p>
            <p>
              일반적으로 영업일 기준 1~2일 이내에 답변 드립니다.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
