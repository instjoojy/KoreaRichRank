import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { Tool } from "../data/toolsRegistry";

export default function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;

  if (tool.isComingSoon) {
    return (
      <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 p-7 opacity-60">
        {tool.badge && (
          <span className="absolute top-5 right-5 text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
            {tool.badge}
          </span>
        )}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
          style={{ backgroundColor: `${tool.accentColor}15` }}
        >
          <Icon className="w-6 h-6" style={{ color: tool.accentColor }} />
        </div>
        <h3 className="text-lg font-black text-navy mb-1.5">{tool.name}</h3>
        <p className="text-[15px] font-medium text-gray-400 leading-[1.7]">{tool.description}</p>
        <p className="mt-4 text-sm font-bold text-gray-300">준비중</p>
      </div>
    );
  }

  return (
    <Link
      to={tool.path}
      className="group relative bg-white rounded-3xl shadow-xl border border-gray-100 p-7 transition-all duration-200 hover:shadow-2xl hover:-translate-y-1"
    >
      {tool.badge && (
        <span
          className="absolute top-5 right-5 text-xs font-black px-2.5 py-1 rounded-full"
          style={{ backgroundColor: `${tool.accentColor}20`, color: tool.accentColor }}
        >
          {tool.badge}
        </span>
      )}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
        style={{ backgroundColor: `${tool.accentColor}15` }}
      >
        <Icon className="w-6 h-6" style={{ color: tool.accentColor }} />
      </div>
      <h3 className="text-lg font-black text-navy mb-1.5">{tool.name}</h3>
      <p className="text-[15px] font-medium text-gray-400 mb-4 leading-[1.7]">{tool.description}</p>
      <div className="flex items-center gap-1 text-[15px] font-bold transition-colors" style={{ color: tool.accentColor }}>
        시작하기
        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
