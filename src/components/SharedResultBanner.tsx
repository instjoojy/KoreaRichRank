import { Link } from "react-router-dom";
import { UserCheck, ChevronRight } from "lucide-react";

interface SharedResultBannerProps {
  calculatorPath: string;
  accentColor: string;
  ctaText: string;
}

export default function SharedResultBanner({
  calculatorPath,
  accentColor,
  ctaText,
}: SharedResultBannerProps) {
  return (
    <div
      className="mb-6 bg-white rounded-3xl shadow-xl p-6 text-center border-2"
      style={{ borderColor: `${accentColor}30` }}
    >
      <div className="flex items-center justify-center gap-2 mb-3">
        <UserCheck className="w-5 h-5" style={{ color: accentColor }} />
        <p className="text-[15px] font-black text-navy">
          친구님의 분석 결과입니다
        </p>
      </div>
      <Link
        to={calculatorPath}
        className="inline-flex items-center justify-center gap-2 text-white font-black text-base px-8 py-3.5 rounded-2xl shadow-lg transition-all duration-300 active:scale-[0.98]"
        style={{ backgroundColor: accentColor }}
      >
        {ctaText}
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
