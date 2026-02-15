import { Link } from "react-router-dom";
import { tools } from "../../data/toolsRegistry";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-[600px] mx-auto px-5 py-12 text-center">
        <div className="flex flex-wrap justify-center gap-5 mb-8">
          {tools.map((t) => (
            <Link
              key={t.id}
              to={t.path}
              className="text-[15px] font-medium text-gray-400 hover:text-indigo transition-colors"
            >
              {t.emoji} {t.name}
            </Link>
          ))}
        </div>
        <p className="text-sm font-medium text-gray-400 leading-[1.7]">
          통계 출처: 2026년 가계금융복지조사 (국가데이터처 &middot; 금융감독원 &middot; 한국은행)
        </p>
        <p className="text-sm font-medium text-gray-400 mt-2 leading-[1.7]">
          본 서비스는 통계 기반의 추정치이며, 실제 개인 자산 순위와 다를 수 있습니다.
        </p>

        <div className="mt-8 h-px w-12 mx-auto bg-gray-200" />

        <p className="mt-6 text-[15px] font-bold text-navy/50 leading-relaxed">
          "모든 부자는 처음에 궁금한 사람이었다" — 대한민국 부자연구소
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-gray-300">
          <Link to="/about" className="hover:text-gray-500 transition-colors">연구소 소개</Link>
          <span className="text-gray-200">|</span>
          <Link to="/privacy" className="hover:text-gray-500 transition-colors">개인정보처리방침</Link>
          <span className="text-gray-200">|</span>
          <Link to="/terms" className="hover:text-gray-500 transition-colors">이용약관</Link>
        </div>

        <p className="mt-5 text-base font-black text-navy/20 flex items-center justify-center gap-1.5">
          <span role="img" aria-label="부자연구소 로고">🧪</span> 대한민국 부자연구소
        </p>
      </div>
    </footer>
  );
}
