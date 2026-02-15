import AdBanner from "../../components/AdBanner";

export default function BqArticle() {
  return (
    <article className="max-w-[600px] mx-auto px-5 pb-20">
      <div className="bg-white rounded-3xl shadow-lg p-7 sm:p-10">
        <span className="inline-block text-xs font-black text-violet-600 bg-violet-50 px-3 py-1.5 rounded-full mb-5">
          부자연구소 칼럼
        </span>
        <h2 className="text-[24px] sm:text-[28px] font-black text-navy leading-snug mb-2">
          토마스 스탠리가 말하는 부자 지수의 비밀과 실천 방안
        </h2>
        <p className="text-sm font-medium text-gray-400 mb-8">
          &lt;이웃집 백만장자&gt; 저자의 부(富) 공식 해부
        </p>

        <div className="space-y-6 text-[15px] sm:text-base font-medium text-gray-500 leading-[1.85]">
          <section>
            <h3 className="text-lg font-black text-navy mb-3">토마스 스탠리와 &apos;이웃집 백만장자&apos;의 교훈</h3>
            <p>
              미국의 부(富) 연구가 토마스 J. 스탠리 박사는 20년 넘게 미국 백만장자들의 생활 습관과 재무 행동을 연구한 끝에, 1996년 &lt;이웃집 백만장자(The Millionaire Next Door)&gt;를 출간했습니다. 이 책은 전 세계적으로 400만 부 이상 팔리며, 부에 대한 고정관념을 완전히 뒤집어 놓았습니다.
            </p>
            <p className="mt-3">
              스탠리 박사의 핵심 발견은 이것이었습니다: 진정한 부자는 화려한 소비를 하는 사람이 아니라, 조용히 자산을 축적하는 사람이라는 것. 실제로 미국 백만장자의 대부분은 고급 외제차 대신 중고차를 몰았고, 명품보다는 실용적인 브랜드를 선호했으며, 호화 저택 대신 평범한 동네에 거주했습니다. 그들의 공통점은 &apos;소득 대비 소비를 최소화&apos;하고, &apos;절약한 돈을 체계적으로 투자&apos;한다는 것이었습니다.
            </p>
          </section>

          <AdBanner slot="bq-article-mid1" format="rectangle" className="my-8" />

          <section>
            <h3 className="text-lg font-black text-navy mb-3">부자 지수(Wealth Index)란 무엇인가</h3>
            <p>
              스탠리 박사는 자신의 연구에서 &apos;기대 순자산(Expected Net Worth)&apos;이라는 개념을 제시합니다. 이 공식은 간단합니다: &apos;나이 × 세전 연소득 ÷ 10&apos;. 예를 들어, 40세에 연봉 5,000만 원을 받는 사람의 기대 순자산은 2억 원입니다. 만약 실제 순자산이 기대치의 2배 이상이라면 &apos;PAW(Prodigious Accumulator of Wealth, 우수한 자산 축적자)&apos;, 절반 이하라면 &apos;UAW(Under Accumulator of Wealth, 부진한 자산 축적자)&apos;로 분류됩니다.
            </p>
            <p className="mt-3">
              한국 상황에 맞게 이 공식을 수정하면, 한국의 높은 부동산 비중과 교육비 지출을 고려해야 합니다. 부자연구소의 BQ(부자 지수) 테스트는 스탠리 박사의 이론을 한국 맥락에 맞게 재설계한 것입니다. 단순히 현재 자산만 보는 것이 아니라, 소비 습관, 투자 성향, 경제 지식이라는 세 축으로 여러분의 &apos;부자 잠재력&apos;을 종합적으로 측정합니다.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-black text-navy mb-3">PAW가 되기 위한 7가지 핵심 습관</h3>
            <p>
              스탠리 박사가 발견한 자산 축적자(PAW)들의 공통 습관은 다음과 같습니다. 첫째, 가계부 작성과 예산 관리를 철저히 합니다. 매월 수입과 지출을 정확히 파악하고, 목표 저축률을 반드시 지킵니다. 둘째, 남의 시선을 의식한 과시적 소비를 철저히 배제합니다. 새 차보다 중고차를, 유행하는 명품보다 가성비 좋은 제품을 선택합니다.
            </p>
            <p className="mt-3">
              셋째, 소득의 최소 15~20%를 투자에 배분합니다. 넷째, 배우자와 재무 목표를 공유하고 함께 실천합니다. 다섯째, 자녀에게 &apos;경제적 돌봄(economic outpatient care)&apos;을 과도하게 제공하지 않습니다. 성인 자녀에게 정기적으로 경제적 지원을 하는 것은 오히려 자녀의 자산 형성 능력을 약화시킵니다. 여섯째, 세금 최적화를 위해 전문가의 조언을 활용합니다. 일곱째, 장기적 관점에서 투자하며, 단기적 시장 변동에 흔들리지 않습니다.
            </p>
          </section>

          <AdBanner slot="bq-article-mid2" format="rectangle" className="my-8" />

          <section>
            <h3 className="text-lg font-black text-navy mb-3">한국형 부자 지수: 우리만의 특수한 변수들</h3>
            <p>
              한국의 부자 방정식에는 미국과 다른 특수한 변수가 존재합니다. 가장 큰 차이는 부동산입니다. 한국 가구의 자산 중 부동산 비중은 약 68%로, 미국(약 30%)의 두 배가 넘습니다. 이는 한국에서 &apos;부동산을 보유했느냐&apos;가 자산 순위를 결정짓는 가장 큰 변수라는 뜻입니다.
            </p>
            <p className="mt-3">
              두 번째 차이는 교육비입니다. 한국의 가구당 월평균 사교육비는 약 55만 원으로, 이는 OECD 국가 중 최상위권입니다. 자녀 1인당 대학 졸업까지 드는 총 교육비는 약 2억 원에 달한다는 추산도 있습니다. 이 막대한 교육비 지출은 한국 가구의 자산 축적 속도를 크게 저해하는 요인입니다.
            </p>
            <p className="mt-3">
              세 번째는 높은 가계부채 수준입니다. 2026년 기준 한국의 가계부채 규모는 GDP 대비 약 105%로 세계 최상위권입니다. 주택담보대출, 전세보증금 대출, 신용대출 등이 복합적으로 작용하여, 명목상 자산은 있으나 실질적으로 빚에 눌린 가구가 적지 않습니다. 순자산(자산-부채)으로 자신의 위치를 파악하는 것이 중요한 이유입니다.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-black text-navy mb-3">부자 지수를 높이는 실전 로드맵</h3>
            <p>
              BQ 테스트 결과가 기대에 미치지 못했더라도 낙담할 필요는 없습니다. 부자 지수는 선천적 능력이 아니라 후천적 습관의 결과이기 때문입니다. 지금 당장 실천할 수 있는 3단계 로드맵을 제시합니다.
            </p>
            <p className="mt-3">
              1단계(1~3개월): 소비 패턴을 진단합니다. 3개월간 모든 지출을 기록하고, 필수 소비와 욕구 소비를 분리합니다. 욕구 소비 중 30% 이상을 줄이는 것이 목표입니다. 2단계(3~6개월): 비상금을 확보하고 자동 투자를 시작합니다. 월 소득의 10%를 자동이체로 투자 계좌에 넣는 시스템을 구축합니다. 연금저축과 ISA 계좌를 먼저 채우세요. 3단계(6개월 이후): 소득을 증가시킵니다. 부업, 자기계발, 이직 등을 통해 소득의 절대치를 높이는 것이 장기적으로 가장 강력한 자산 축적 전략입니다. 저축률이 아무리 높아도, 기본 소득이 낮으면 자산 축적 속도에 한계가 있기 때문입니다.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
