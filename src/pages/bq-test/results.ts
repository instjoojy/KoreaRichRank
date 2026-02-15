import { Crown, TrendingUp, Lightbulb, Sprout, type LucideIcon } from "lucide-react";

export interface BqResult {
  grade: string;
  title: string;
  icon: LucideIcon;
  accentColor: string;
  emoji: string;
  message: string;
  tip: string;
}

export function getBqResult(score: number): BqResult {
  if (score >= 35) {
    return {
      grade: "S",
      title: "금융 천재",
      icon: Crown,
      accentColor: "#FFD700",
      emoji: "👑",
      message:
        "당신은 타고난 부자 DNA의 소유자입니다! 소비 통제력, 투자 판단력, 경제 지식 모두 최상위권이에요. 이 정도면 주변 사람들이 재테크 질문을 하러 올 레벨입니다. 워런 버핏이 당신을 보면 고개를 끄덕일 겁니다.",
      tip: "이미 훌륭합니다. 세금 최적화와 자산 승계 전략까지 공부해보세요!",
    };
  }
  if (score >= 27) {
    return {
      grade: "A",
      title: "예비 부자",
      icon: TrendingUp,
      accentColor: "#60A5FA",
      emoji: "📈",
      message:
        "부자가 될 모든 기본기를 갖추고 있습니다! 재무 감각이 뛰어나고, 대부분의 상황에서 현명한 판단을 내리고 있어요. 약간의 실행력만 더하면 경제적 자유는 시간문제입니다. 지금 이 속도면 충분합니다.",
      tip: "투자 포트폴리오를 더 다양화하고, 자동화 시스템을 구축해보세요.",
    };
  }
  if (score >= 19) {
    return {
      grade: "B",
      title: "성장하는 투자자",
      icon: Lightbulb,
      accentColor: "#34D399",
      emoji: "💡",
      message:
        "기본기는 있지만 아직 갈 길이 남아 있어요. 소비 습관이나 투자 지식 중 한쪽이 약하다면 그 부분을 집중 보강하면 빠르게 올라갈 수 있습니다. 중요한 건 지금 이 테스트를 하고 있다는 것 자체가 이미 상위 마인드라는 거예요!",
      tip: "매달 소득의 일정 비율을 자동 투자로 설정하고, 경제 뉴스를 습관화하세요.",
    };
  }
  return {
    grade: "C",
    title: "잠재력 만렙",
    icon: Sprout,
    accentColor: "#F59E0B",
    emoji: "🌱",
    message:
      "아직 금융 근육이 발달하지 않았지만, 걱정 마세요! 모든 부자도 처음엔 여기서 시작했습니다. 지금부터 하나씩 바꿔나가면 됩니다. 가장 중요한 첫 번째 단계? 바로 이 테스트를 끝까지 한 것! 시작이 반입니다.",
    tip: "비상금 3개월치 마련부터 시작하세요. 작은 성공이 큰 변화를 만듭니다!",
  };
}
