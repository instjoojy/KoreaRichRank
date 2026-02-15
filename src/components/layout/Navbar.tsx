import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { tools } from "../../data/toolsRegistry";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-[600px] mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="대한민국 부자연구소 KOREA RICH LAB" className="h-20 w-auto object-contain" />
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
                  className={`flex items-center gap-1 px-3 py-2 rounded-2xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? "text-white shadow-sm"
                      : "text-gray-400 hover:text-navy hover:bg-gray-50"
                  }`}
                  style={isActive ? { backgroundColor: tool.accentColor } : undefined}
                >
                  <span className="text-sm">{tool.emoji}</span>
                  <span className="hidden sm:inline">{tool.navLabel}</span>
                </Link>
              );
            })}
        </div>
      </div>
    </nav>
  );
}
