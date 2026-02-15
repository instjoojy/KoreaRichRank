import { useState, useEffect } from "react";
import AdBanner from "./AdBanner";

interface AnalyzingLoaderProps {
  /** 스피너·프로그레스 바 색상 (Tailwind arbitrary 값) */
  accentColor: string;
  /** 프로그레스 배경 색상 */
  accentBgColor: string;
  /** 도구별 분석 메시지 배열 */
  messages: string[];
  /** 광고 슬롯 이름 */
  adSlot: string;
}

export default function AnalyzingLoader({
  accentColor,
  accentBgColor,
  messages,
  adSlot,
}: AnalyzingLoaderProps) {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % messages.length);
    }, 900);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <section className="bg-white rounded-3xl shadow-xl p-10 sm:p-12 text-center flex flex-col items-center justify-center min-h-[420px]">
      {/* 스피너 */}
      <div className="relative mb-8">
        <div
          className="w-20 h-20 rounded-full border-4 flex items-center justify-center"
          style={{ borderColor: accentBgColor }}
        >
          <div
            className="w-16 h-16 rounded-full border-4 border-b-transparent border-l-transparent animate-spin-slow"
            style={{ borderTopColor: accentColor, borderRightColor: accentColor }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">🧪</span>
        </div>
      </div>

      {/* 메인 타이틀 */}
      <p className="text-xl sm:text-2xl font-black text-navy mb-2">
        부자연구소 AI 분석 중
      </p>
      <p className="text-sm font-medium text-gray-400 mb-6">
        당신의 데이터를 정밀 분석하고 있습니다...
      </p>

      {/* 롤링 메시지 */}
      <p
        className="text-sm font-bold mb-6 transition-opacity duration-300"
        style={{ color: accentColor }}
      >
        {messages[msgIdx]}
      </p>

      {/* 프로그레스 바 */}
      <div className="w-full max-w-xs mx-auto mb-8">
        <div
          className="w-full h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: accentBgColor }}
        >
          <div
            className="h-full rounded-full animate-progress"
            style={{ backgroundColor: accentColor }}
          />
        </div>
      </div>

      {/* 광고 */}
      <div className="w-full max-w-sm">
        <p className="text-xs font-medium text-gray-300 mb-3">
          잠시만 기다려주시면 결과가 공개됩니다 ✨
        </p>
        <AdBanner slot={adSlot} format="rectangle" className="w-full" />
      </div>
    </section>
  );
}
