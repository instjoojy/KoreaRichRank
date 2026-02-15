import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { Tool } from "../data/toolsRegistry";

export default function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;

  if (tool.isComingSoon) {
    return (
      <div className="relative bg-white rounded-3xl shadow-sm border border-gray-100 p-6 opacity-60">
        {tool.badge && (
          <span className="absolute top-4 right-4 text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
            {tool.badge}
          </span>
        )}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
          style={{ backgroundColor: `${tool.accentColor}15` }}
        >
          <Icon className="w-6 h-6" style={{ color: tool.accentColor }} />
        </div>
        <h3 className="text-lg font-black text-navy mb-1">{tool.name}</h3>
        <p className="text-sm font-medium text-gray-400">{tool.description}</p>
        <p className="mt-3 text-xs font-bold text-gray-300">준비중</p>
      </div>
    );
  }

  return (
    <Link
      to={tool.path}
      className="group relative bg-white rounded-3xl shadow-sm border border-gray-100 p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
    >
      {tool.badge && (
        <span
          className="absolute top-4 right-4 text-xs font-black px-2.5 py-1 rounded-full"
          style={{ backgroundColor: `${tool.accentColor}20`, color: tool.accentColor }}
        >
          {tool.badge}
        </span>
      )}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
        style={{ backgroundColor: `${tool.accentColor}15` }}
      >
        <Icon className="w-6 h-6" style={{ color: tool.accentColor }} />
      </div>
      <h3 className="text-lg font-black text-navy mb-1">{tool.name}</h3>
      <p className="text-sm font-medium text-gray-400 mb-3">{tool.description}</p>
      <div className="flex items-center gap-1 text-sm font-bold transition-colors" style={{ color: tool.accentColor }}>
        시작하기
        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
