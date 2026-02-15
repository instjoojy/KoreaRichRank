export interface Option {
  text: string;
  score: number;
}

export interface Question {
  id: number;
  category: "소비" | "투자" | "경제 지식";
  question: string;
  options: Option[];
}

export const questions: Question[] = [
  // ── 소비 (1~4) ──────────────────────────────────────
  {
    id: 1,
    category: "소비",
    question: "월급이 들어오면 가장 먼저 하는 일은?",
    options: [
      { text: "자동이체로 저축/투자부터 빼놓는다", score: 4 },
      { text: "고정 지출(월세, 보험 등)을 먼저 확인한다", score: 3 },
      { text: "일단 쓰고 남으면 저축한다", score: 2 },
      { text: "월급? 이미 카드값으로 다 나갔다", score: 1 },
    ],
  },
  {
    id: 2,
    category: "소비",
    question: "세일 기간에 50% 할인 상품을 발견했다. 당신의 선택은?",
    options: [
      { text: "필요한 물건인지 먼저 따져보고 결정한다", score: 4 },
      { text: "원래 살 예정이었으면 산다", score: 3 },
      { text: "이 가격에 안 사면 손해! 일단 산다", score: 2 },
      { text: "장바구니에 있는 것도 다 결제한다", score: 1 },
    ],
  },
  {
    id: 3,
    category: "소비",
    question: "친구들과 비싼 레스토랑에 갔다. 메뉴를 고를 때 당신은?",
    options: [
      { text: "미리 정한 외식 예산 내에서 고른다", score: 4 },
      { text: "가격 대비 만족도가 높은 메뉴를 고른다", score: 3 },
      { text: "분위기에 맞춰 적당한 걸 시킨다", score: 2 },
      { text: "왔으면 제일 비싼 거! YOLO다", score: 1 },
    ],
  },
  {
    id: 4,
    category: "소비",
    question: "갑자기 보너스 200만 원이 들어왔다. 어떻게 할까?",
    options: [
      { text: "전액 투자 계좌로 이체한다", score: 4 },
      { text: "70% 저축, 30%는 나를 위해 쓴다", score: 3 },
      { text: "반은 저축, 반은 갖고 싶던 거 산다", score: 2 },
      { text: "드디어! 위시리스트 쇼핑 시작", score: 1 },
    ],
  },

  // ── 투자 (5~7) ──────────────────────────────────────
  {
    id: 5,
    category: "투자",
    question: "주식 투자를 시작한다면 당신의 스타일은?",
    options: [
      { text: "재무제표와 산업 분석 후 장기 투자", score: 4 },
      { text: "ETF나 인덱스 펀드로 분산 투자", score: 3 },
      { text: "유튜버가 추천한 종목을 따라 산다", score: 2 },
      { text: "차트 보고 단타! 오늘의 수익이 중요하다", score: 1 },
    ],
  },
  {
    id: 6,
    category: "투자",
    question: "투자한 주식이 -20% 하락했다. 당신의 반응은?",
    options: [
      { text: "기업 펀더멘털을 재점검하고 추가 매수를 고려한다", score: 4 },
      { text: "원래 계획대로 보유하며 기다린다", score: 3 },
      { text: "불안해서 일부를 매도한다", score: 2 },
      { text: "공포에 전량 손절한다", score: 1 },
    ],
  },
  {
    id: 7,
    category: "투자",
    question: "'연 수익률 50% 보장' 투자 제안을 받았다. 당신의 반응은?",
    options: [
      { text: "100% 사기다. 즉시 거절하고 주변에 경고한다", score: 4 },
      { text: "의심스럽지만 일단 조사해본다", score: 3 },
      { text: "소액만 넣어볼까 고민한다", score: 2 },
      { text: "대박 기회! 당장 투자한다", score: 1 },
    ],
  },

  // ── 경제 지식 (8~10) ────────────────────────────────
  {
    id: 8,
    category: "경제 지식",
    question: "복리의 효과에 대해 얼마나 알고 있나요?",
    options: [
      { text: "72법칙도 알고, 장기 복리 계산을 직접 해본다", score: 4 },
      { text: "복리가 단리보다 유리하다는 건 안다", score: 3 },
      { text: "들어본 적은 있는데 정확히는 모르겠다", score: 2 },
      { text: "복리? 복숭아 리큐르 아닌가요?", score: 1 },
    ],
  },
  {
    id: 9,
    category: "경제 지식",
    question: "금리가 오르면 일반적으로 어떤 현상이 나타날까?",
    options: [
      { text: "대출 이자 증가, 부동산·주식 하락 압력, 원화 강세 경향", score: 4 },
      { text: "대출 이자가 오르고 집값에 영향을 준다", score: 3 },
      { text: "은행 이자가 올라서 좋은 거 아닌가?", score: 2 },
      { text: "잘 모르겠다", score: 1 },
    ],
  },
  {
    id: 10,
    category: "경제 지식",
    question: "인플레이션이 내 자산에 미치는 영향은?",
    options: [
      { text: "현금 가치 하락, 실물자산 유리, 포트폴리오 리밸런싱 필요", score: 4 },
      { text: "물가가 오르면 돈의 가치가 떨어진다", score: 3 },
      { text: "물건이 비싸지는 건 알지만 자산과의 관계는 모르겠다", score: 2 },
      { text: "인플레이션이 뭔가요?", score: 1 },
    ],
  },
];
