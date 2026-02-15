import { Calculator, Brain, Timer, type LucideIcon } from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  navLabel: string;
  description: string;
  emoji: string;
  path: string;
  icon: LucideIcon;
  accentColor: string;
  badge?: string;
  isComingSoon?: boolean;
}

export const tools: Tool[] = [
  {
    id: "calculator",
    name: "자산 상위 % 계산기",
    navLabel: "자산순위",
    description: "내 지갑, 전국에서 몇 등일까?",
    emoji: "🏆",
    path: "/calculator",
    icon: Calculator,
    accentColor: "#6366F1",
    badge: "인기",
  },
  {
    id: "bq-test",
    name: "부자 지수(BQ) 테스트",
    navLabel: "부자지수",
    description: "나는 부자가 될 떡잎일까?",
    emoji: "🌱",
    path: "/bq-test",
    icon: Brain,
    accentColor: "#F59E0B",
    badge: "NEW",
  },
  {
    id: "real-hourly-wage",
    name: "나의 진짜 시급 계산기",
    navLabel: "진짜시급",
    description: "내 소중한 시간, 제대로 대접받고 있나요?",
    emoji: "⏰",
    path: "/real-hourly-wage",
    icon: Timer,
    accentColor: "#F43F5E",
    badge: "NEW",
  },
];
