import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Tool } from "../data/toolsRegistry";

export default function ToolCard({ tool }: { tool: Tool }) {
  if (tool.isComingSoon) {
    return (
      <div className="relative bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col items-center text-center aspect-[4/3] justify-center opacity-50">
        {tool.badge && (
          <span className="absolute top-4 right-4 text-[11px] font-black text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
            {tool.badge}
          </span>
        )}
        <div className="text-5xl sm:text-6xl mb-5">{tool.emoji}</div>
        <h3 className="text-xl sm:text-2xl font-bold text-navy tracking-tight mb-2">
          {tool.name}
        </h3>
        <p className="text-sm font-medium text-gray-400 leading-relaxed">
          {tool.description}
        </p>
        <p className="mt-4 text-sm font-bold text-gray-300">준비중</p>
      </div>
    );
  }

  return (
    <Link
      to={tool.path}
      className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col items-center text-center aspect-[4/3] justify-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      {tool.badge && (
        <span
          className="absolute top-4 right-4 text-[11px] font-black px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: `${tool.accentColor}15`,
            color: tool.accentColor,
          }}
        >
          {tool.badge}
        </span>
      )}

      {/* 큰 아이콘 */}
      <div className="text-5xl sm:text-6xl mb-5 transition-transform duration-300 group-hover:scale-110">
        {tool.emoji}
      </div>

      {/* 제목 */}
      <h3 className="text-xl sm:text-2xl font-bold text-navy tracking-tight mb-2">
        {tool.name}
      </h3>

      {/* 설명 */}
      <p className="text-sm font-medium text-gray-400 leading-relaxed mb-4">
        {tool.description}
      </p>

      {/* CTA */}
      <div
        className="inline-flex items-center gap-1 text-sm font-bold transition-colors"
        style={{ color: tool.accentColor }}
      >
        시작하기
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
