import AdBanner from "../../../components/AdBanner";

export default function AssetArticle() {
  return (
    <article className="max-w-[600px] mx-auto px-5 pb-20">
      <div className="bg-white rounded-3xl shadow-lg p-7 sm:p-10">
        <span className="inline-block text-xs font-black text-indigo bg-indigo-50 px-3 py-1.5 rounded-full mb-5">
          부자연구소 칼럼
        </span>
        <h2 className="text-[24px] sm:text-[28px] font-black text-navy leading-snug mb-2">
          2026년 한국 자산 격차 현황과 중산층 기준
        </h2>
        <p className="text-sm font-medium text-gray-400 mb-8">
          통계청 가계금융복지조사 기반 심층 분석
        </p>

        <div className="space-y-6 text-[15px] sm:text-base font-medium text-gray-500 leading-[1.85]">
          <section>
            <h3 className="text-lg font-black text-navy mb-3">대한민국 자산 분포의 현주소</h3>
            <p>
              2026년 통계청 가계금융복지조사에 따르면, 대한민국 전체 가구의 평균 순자산은 약 4억 7,144만 원으로 집계되었습니다. 하지만 이 수치는 극소수의 초고자산 가구에 의해 크게 왜곡된 결과입니다. 실제로 가구 순자산의 중위값은 약 2억 3,800만 원으로, 평균의 절반 수준에 불과합니다. 이는 곧 대한민국 전체 가구의 절반 이상이 평균 순자산에 미치지 못한다는 의미이며, 자산 불평등이 얼마나 심각한 수준인지를 보여줍니다.
            </p>
            <p className="mt-3">
              특히 상위 10% 가구가 전체 순자산의 약 46%를 보유하고 있으며, 상위 1%만으로도 전체의 약 20%를 차지합니다. 하위 50% 가구의 자산 비중은 전체의 5%에도 미치지 못하는데, 이러한 양극화 현상은 지난 10년간 꾸준히 심화되어 왔습니다. 부동산 가격 상승, 금융자산 수익률 격차, 상속 및 증여의 세습 효과가 복합적으로 작용한 결과입니다.
            </p>
          </section>

          <AdBanner slot="asset-article-mid1" format="rectangle" className="my-8" />

          <section>
            <h3 className="text-lg font-black text-navy mb-3">중산층의 기준은 어떻게 변했나</h3>
            <p>
              전통적으로 한국 사회에서 중산층이란 &apos;내 집 한 채, 안정적인 직업, 자녀 교육을 감당할 수 있는 소득&apos;을 갖춘 계층을 의미했습니다. 하지만 2026년 현재, 중산층의 정의는 크게 달라졌습니다. OECD 기준 중위소득 75~200% 구간을 중산층으로 분류하면, 1인 가구 기준 월 약 200만~530만 원, 4인 가구 기준 월 약 390만~1,040만 원의 소득을 올려야 중산층에 해당합니다.
            </p>
            <p className="mt-3">
              그러나 소득만으로는 중산층 여부를 판단하기 어렵습니다. 순자산 기준으로 보면, 중위값인 약 2억 3,800만 원 전후가 하나의 기준점이 될 수 있습니다. 문제는 수도권 아파트 가격이 이미 이 기준을 훌쩍 넘어섰다는 점입니다. 서울 아파트 평균 매매가는 약 12억 원에 달하며, 이에 따라 &apos;집 한 채 가진 사람&apos;이 자동으로 상위 30%에 진입하는 기형적 구조가 형성되어 있습니다.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-black text-navy mb-3">연령대별 자산 격차와 세대 간 불평등</h3>
            <p>
              자산 격차는 연령대에 따라서도 극명하게 나타납니다. 60대 이상 가구주의 평균 순자산은 약 5억 8,000만 원으로 가장 높은 반면, 30대 미만 가구주의 평균 순자산은 약 1억 2,000만 원에 불과합니다. 40대는 약 4억 3,000만 원, 50대는 약 5억 5,000만 원 수준입니다.
            </p>
            <p className="mt-3">
              특히 MZ세대(밀레니얼+Z세대)에게 자산 형성은 과거 세대보다 훨씬 어려운 과제가 되었습니다. 높은 주거비, 학자금 대출, 불안정한 고용 시장 속에서 종잣돈을 마련하는 것 자체가 큰 도전입니다. 반면 부모 세대의 자산 이전(증여, 상속) 여부가 자산 격차를 결정짓는 핵심 변수로 부상하고 있어, &apos;금수저-흙수저&apos; 담론이 단순한 유행어를 넘어 구조적 현실이 되었습니다.
            </p>
          </section>

          <AdBanner slot="asset-article-mid2" format="rectangle" className="my-8" />

          <section>
            <h3 className="text-lg font-black text-navy mb-3">지역별 자산 격차: 서울과 비서울의 벽</h3>
            <p>
              지역 간 자산 격차도 심각한 수준입니다. 서울 거주 가구의 평균 순자산은 약 7억 4,000만 원으로 전국 평균을 크게 상회합니다. 경기도는 약 4억 8,000만 원, 세종시는 약 5억 2,000만 원 수준인 반면, 전남은 약 3억 원, 강원은 약 2억 8,000만 원에 그칩니다.
            </p>
            <p className="mt-3">
              이러한 지역 간 격차의 핵심 원인은 부동산입니다. 한국 가구의 자산 구성에서 부동산이 차지하는 비중은 평균 약 68%에 달하는데, 서울·수도권의 높은 부동산 가격이 곧 자산 격차로 직결됩니다. 이는 &apos;어디에 사느냐&apos;가 곧 &apos;얼마나 부유한가&apos;를 결정짓는 구조적 문제이며, 금융자산 비중을 높이지 않는 한 해결이 어려운 과제입니다.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-black text-navy mb-3">자산 격차를 줄이기 위한 개인 전략</h3>
            <p>
              거시적인 자산 격차를 개인이 바꿀 수는 없지만, 자신의 자산 순위를 높이기 위한 전략적 접근은 가능합니다. 첫째, 소득의 일정 비율을 반드시 저축 및 투자에 배분하는 &apos;선저축 후소비&apos; 습관이 필수적입니다. 둘째, 부동산에 편중된 자산 구조를 벗어나 주식, ETF, 채권 등 금융자산으로의 분산 투자가 필요합니다. 셋째, 세제 혜택이 있는 연금저축, ISA 계좌를 최대한 활용하여 절세 효과를 극대화해야 합니다.
            </p>
            <p className="mt-3">
              무엇보다 중요한 것은 자신의 현재 위치를 정확히 파악하는 것입니다. 부자연구소의 자산 상위 % 계산기는 바로 이 목적을 위해 만들어졌습니다. 통계청 공식 데이터를 기반으로 나이, 지역, 자산, 소득을 종합적으로 분석하여, 여러분이 대한민국에서 어디쯤 서 있는지를 객관적으로 보여드립니다. 현재의 위치를 알아야 목표를 세울 수 있고, 목표가 있어야 전략을 실행할 수 있습니다.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
