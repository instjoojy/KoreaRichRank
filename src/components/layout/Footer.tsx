import { Link } from "react-router-dom";
import { tools } from "../../data/toolsRegistry";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-2xl mx-auto px-4 py-10 text-center">
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {tools.map((t) => (
            <Link
              key={t.id}
              to={t.path}
              className="text-sm font-medium text-gray-400 hover:text-navy transition-colors"
            >
              {t.name}
            </Link>
          ))}
        </div>
        <p className="text-xs font-medium text-gray-400 leading-relaxed">
          통계 출처: 2026년 가계금융복지조사 (국가데이터처 &middot; 금융감독원 &middot; 한국은행)
        </p>
        <p className="text-xs font-medium text-gray-400 mt-2 leading-relaxed">
          본 서비스는 통계 기반의 추정치이며, 실제 개인 자산 순위와 다를 수 있습니다.
        </p>
        <div className="mt-5 h-px w-12 mx-auto bg-gray-200" />
        <p className="mt-5 text-sm font-black text-navy/30">
          코리아리치랭크
        </p>
      </div>
    </footer>
  );
}
