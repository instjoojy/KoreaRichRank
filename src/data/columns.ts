export interface Column {
  id: number;
  title: string;
  summary: string;
  category: string;
  date: string;
  path: string;
}

export const columns: Column[] = [
  {
    id: 11,
    title: "연봉 5000만원이면 부자일까? 부자지수로 본 진실",
    summary:
      "고소득이 곧 부자는 아닙니다. 소득 대비 순자산으로 진짜 부를 측정하는 법.",
    category: "BQ 인사이트",
    date: "2026.02.18",
    path: "/bq-test",
  },
  {
    id: 12,
    title: "20대 자산 형성의 골든타임, 놓치면 10년이 밀린다",
    summary:
      "복리의 힘은 일찍 시작할수록 강력합니다. 20대에 시작하면 30대 시작보다 2배 유리한 이유.",
    category: "자산 분석",
    date: "2026.02.15",
    path: "/calculator",
  },
  {
    id: 1,
    title: "진짜 시급을 알면 퇴사하고 싶어지는 이유",
    summary: "출퇴근, 야근, 업무 준비 시간까지 합치면 당신의 시급은 최저임금보다 낮을 수 있습니다.",
    category: "시급 분석",
    date: "2026.02.10",
    path: "/real-hourly-wage",
  },
  {
    id: 2,
    title: "30대 순자산 중위값, 당신은 상위 몇 %?",
    summary: "통계청 데이터로 본 30대 자산 분포. 또래 대비 내 위치를 정확히 알아보세요.",
    category: "자산 분석",
    date: "2026.02.08",
    path: "/calculator",
  },
  {
    id: 3,
    title: "월 300만원 버는 직장인의 FIRE 현실 계산",
    summary: "4% 룰로 계산한 FIRE 목표 금액, 월 300 소득으로 도달 가능한 시점은?",
    category: "FIRE",
    date: "2026.02.05",
    path: "/fire-calculator",
  },
  {
    id: 4,
    title: "부자가 될 사람의 5가지 소비 습관",
    summary: "BQ 테스트 10만 건 데이터에서 발견한, 고득점자들의 공통적인 소비 패턴.",
    category: "BQ 인사이트",
    date: "2026.02.03",
    path: "/bq-test",
  },
  {
    id: 5,
    title: "서울 vs 지방, 같은 연봉이라도 자산 순위가 다른 이유",
    summary: "지역별 자산 분포 차이를 알면, 이직 전략이 달라집니다.",
    category: "자산 분석",
    date: "2026.01.28",
    path: "/calculator",
  },
  {
    id: 6,
    title: "출퇴근 시간 1시간이 연봉 500만원의 가치인 이유",
    summary: "왕복 1시간의 출퇴근이 연간 몇 시간인지, 시급으로 환산하면 충격적입니다.",
    category: "시급 분석",
    date: "2026.01.25",
    path: "/real-hourly-wage",
  },
  {
    id: 7,
    title: "2026년 최저임금 10,030원 시대, 내 실제 시급은?",
    summary: "올해 최저임금이 올랐지만, 숨겨진 근무시간을 포함하면 이야기가 달라집니다.",
    category: "시급 분석",
    date: "2026.01.20",
    path: "/real-hourly-wage",
  },
  {
    id: 8,
    title: "저축률 50% vs 투자 수익률 10%, 뭐가 더 중요할까?",
    summary: "FIRE 달성에서 저축률과 수익률 중 어떤 게 더 결정적인 변수인지 시뮬레이션 결과.",
    category: "FIRE",
    date: "2026.01.15",
    path: "/fire-calculator",
  },
  {
    id: 9,
    title: "40대 자산 1억이면 하위 몇 %? 충격적인 현실",
    summary: "통계청 가계금융복지조사로 본 40대 순자산 분포의 현실.",
    category: "자산 분석",
    date: "2026.01.10",
    path: "/calculator",
  },
  {
    id: 10,
    title: "배달앱 삭제가 은퇴를 3년 앞당기는 수학적 증명",
    summary: "월 20만원 절약이 복리 효과로 은퇴 시점에 미치는 영향을 계산해봤습니다.",
    category: "FIRE",
    date: "2026.01.05",
    path: "/fire-calculator",
  },
];
