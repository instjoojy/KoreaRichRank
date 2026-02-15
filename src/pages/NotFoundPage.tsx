import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Helmet } from "@dr.pogodin/react-helmet";

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>페이지를 찾을 수 없습니다 | 코리아리치랭크</title>
      </Helmet>
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-7xl font-black text-navy/10 mb-4">404</p>
          <h1 className="text-2xl font-black text-navy mb-3">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="text-sm font-medium text-gray-400 mb-8">
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-6 py-3.5 rounded-2xl transition-colors"
          >
            <Home className="w-4 h-4" />
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </>
  );
}
