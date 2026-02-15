import { Calculator, Brain, type LucideIcon } from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  description: string;
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
    description: "2026 통계청 자료 기반, 내 자산은 상위 몇 %?",
    path: "/calculator",
    icon: Calculator,
    accentColor: "#FFD700",
    badge: "인기",
  },
  {
    id: "bq-test",
    name: "부자 지수(BQ) 테스트",
    description: "나의 부자 잠재력은? 10문항으로 알아보는 BQ 지수",
    path: "/bq-test",
    icon: Brain,
    accentColor: "#8B5CF6",
    badge: "NEW",
  },
];
