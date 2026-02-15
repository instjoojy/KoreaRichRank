import { Link, useLocation } from "react-router-dom";
import { tools } from "../../data/toolsRegistry";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-[600px] mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1.5">
          <span className="text-xl">🧪</span>
          <span className="text-lg font-black text-navy tracking-tight">부자연구소</span>
        </Link>

        <div className="flex items-center gap-1">
          {tools
            .filter((t) => !t.isComingSoon)
            .map((tool) => {
              const isActive = pathname === tool.path;
              return (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className={`px-3 py-2 rounded-2xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "font-bold text-indigo bg-indigo-50"
                      : "text-gray-400 hover:text-navy hover:bg-gray-50"
                  }`}
                >
                  {tool.emoji}
                </Link>
              );
            })}
        </div>
      </div>
    </nav>
  );
}
