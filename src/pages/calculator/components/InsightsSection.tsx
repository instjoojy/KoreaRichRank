import AccordionItem from "../../../components/AccordionItem";
import AdBanner from "../../../components/AdBanner";

const pastelColors = ["#FFF0F5", "#F0FFF4", "#F0F4FF", "#FFFBEB", "#F5F0FF", "#FFF0F0", "#ECFDF5", "#EFF6FF", "#FEF9C3"];

export default function InsightsSection() {
  return (
    <section className="max-w-[600px] mx-auto px-5 pb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl">📝</span>
        <div>
          <h2 className="text-[28px] sm:text-[32px] font-black text-navy leading-tight">
            연구소의 비밀 노트
          </h2>
          <p className="text-sm font-medium text-gray-400 mt-1">부자가 되기 위한 핵심 인사이트</p>
        </div>
      </div>
      <div className="space-y-5">
        <AccordionItem title="📊 2026 대한민국 평균 자산과 소득" bgColor={pastelColors[0]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">2026년 통계청 발표 기준, 대한민국의 자산 및 소득 분포는 다음과 같습니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">전국 가구 평균 순자산:</strong> 약 4억 7,144만 원</li>
            <li><strong className="font-bold text-navy-light">전국 가구 순자산 중위값:</strong> 약 2억 3,800만 원 (중산층 기준)</li>
            <li><strong className="font-bold text-navy-light">자산 불평등 심화:</strong> 상위 1%가 전체 순자산의 약 20% 보유, 상위 10%가 46% 보유. 이는 부동산, 금융자산, 상속/증여 등 복합적 요인에 기인합니다.</li>
            <li><strong className="font-bold text-navy-light">중산층의 변화:</strong> 과거 &apos;내 집 마련&apos;, &apos;안정적 직업&apos;에서 현재는 &apos;포괄적 자산 포트폴리오&apos;와 &apos;재정적 안정성&apos;이 중요.</li>
          </ul>
        </AccordionItem>

        <AccordionItem title="💎 상위 1% 부자들의 자산 배분 전략" bgColor={pastelColors[1]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">상위 1% 자산가들은 일반 가구와는 다른 자산 배분 전략을 통해 부를 증식합니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">부동산:</strong> 여전히 핵심 자산으로, 핵심 지역의 다주택 또는 상업용 부동산에 투자하여 임대 수익 및 시세 차익 추구.</li>
            <li><strong className="font-bold text-navy-light">금융 자산:</strong> 주식, 채권, 펀드 외에도 헤지펀드, 사모펀드 등 대체 투자 비중을 높여 고수익 추구 및 위험 분산.</li>
            <li><strong className="font-bold text-navy-light">사업체 투자:</strong> 직접 사업체를 운영하거나 유망 스타트업에 투자하여 지분 가치 상승을 통한 자산 증대.</li>
            <li><strong className="font-bold text-navy-light">해외 투자:</strong> 국내 시장의 한계를 넘어 해외 부동산, 주식, 벤처 투자 등으로 포트폴리오 다변화.</li>
            <li><strong className="font-bold text-navy-light">절세 전략:</strong> 법인 설립, 증여/상속 계획 등 전문가와 협력하여 합법적인 절세 전략 적극 활용.</li>
          </ul>
        </AccordionItem>

        <AccordionItem title="🎯 나이대별 권장 순자산 목표치" bgColor={pastelColors[2]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">개인의 재무 목표는 나이와 상황에 따라 달라지지만, 일반적으로 다음의 순자산 목표치를 참고할 수 있습니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">20대:</strong> 종잣돈 마련 및 부채 관리. 학자금 대출 상환, 비상금 확보(3~6개월 생활비).</li>
            <li><strong className="font-bold text-navy-light">30대:</strong> 자산 형성의 기반 다지기. 주택 마련 자금, 결혼 및 출산 준비. 투자 시작 및 포트폴리오 구축.</li>
            <li><strong className="font-bold text-navy-light">40대:</strong> 자산 증식 가속화. 은퇴 자산 마련의 중요성 증대. 적극적인 투자 및 자산 리밸런싱.</li>
            <li><strong className="font-bold text-navy-light">50대:</strong> 은퇴 준비 마무리 단계. 안정적인 자산 유지 및 인출 계획 수립. 현금 흐름 확보.</li>
            <li><strong className="font-bold text-navy-light">60대 이상:</strong> 자산 보존 및 효율적인 인출 전략. 건강 관리 비용, 여가 생활비 등 고려.</li>
          </ul>
          <p className="mt-3 text-xs text-gray-400 font-medium">
            *위 목표치는 일반적인 가이드라인이며, 개인의 소득, 소비 습관, 투자 성향에 따라 조절이 필요합니다.
          </p>
        </AccordionItem>

        <AccordionItem title="🚀 자산 순위를 높이는 실전 재테크 팁" bgColor={pastelColors[3]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">자산 순위를 높이고 경제적 자유를 달성하기 위한 실질적인 재테크 팁입니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">체계적인 재무 계획:</strong> 목표 설정(주택, 은퇴, 교육 등), 예산 수립, 정기적인 재무 상태 점검.</li>
            <li><strong className="font-bold text-navy-light">조기 투자 시작:</strong> 복리의 마법을 활용하여 소액이라도 일찍 시작하는 것이 중요.</li>
            <li><strong className="font-bold text-navy-light">분산 투자 원칙:</strong> 주식, 채권, 부동산, 대체 투자 등 다양한 자산에 분산하여 위험 최소화.</li>
            <li><strong className="font-bold text-navy-light">꾸준한 자기 계발:</strong> 소득 증대를 위한 능력 향상, 시장 변화에 대한 학습 지속.</li>
            <li><strong className="font-bold text-navy-light">절세 전략 숙지:</strong> 연금저축, ISA, 비과세 상품 등 다양한 절세 혜택을 활용하여 세금 부담 최소화.</li>
          </ul>
        </AccordionItem>

        <AdBanner slot="insights-mid-asset" format="rectangle" className="my-4" />

        {/* ── 자산 격차 심층 분석 ─────────────────────────── */}
        <AccordionItem title="🏠 대한민국 자산 분포의 현주소" bgColor={pastelColors[4]}>
          <p>
            2026년 통계청 가계금융복지조사에 따르면, 대한민국 전체 가구의 평균 순자산은 약 4억 7,144만 원으로 집계되었습니다. 하지만 이 수치는 극소수의 초고자산 가구에 의해 크게 왜곡된 결과입니다. 실제로 가구 순자산의 중위값은 약 2억 3,800만 원으로, 평균의 절반 수준에 불과합니다. 이는 곧 대한민국 전체 가구의 절반 이상이 평균 순자산에 미치지 못한다는 의미이며, 자산 불평등이 얼마나 심각한 수준인지를 보여줍니다.
          </p>
          <p className="mt-3">
            특히 상위 10% 가구가 전체 순자산의 약 46%를 보유하고 있으며, 상위 1%만으로도 전체의 약 20%를 차지합니다. 하위 50% 가구의 자산 비중은 전체의 5%에도 미치지 못하는데, 이러한 양극화 현상은 지난 10년간 꾸준히 심화되어 왔습니다. 부동산 가격 상승, 금융자산 수익률 격차, 상속 및 증여의 세습 효과가 복합적으로 작용한 결과입니다.
          </p>
        </AccordionItem>

        <AccordionItem title="📈 중산층의 기준은 어떻게 변했나" bgColor={pastelColors[5]}>
          <p>
            전통적으로 한국 사회에서 중산층이란 &apos;내 집 한 채, 안정적인 직업, 자녀 교육을 감당할 수 있는 소득&apos;을 갖춘 계층을 의미했습니다. 하지만 2026년 현재, 중산층의 정의는 크게 달라졌습니다. OECD 기준 중위소득 75~200% 구간을 중산층으로 분류하면, 1인 가구 기준 월 약 200만~530만 원, 4인 가구 기준 월 약 390만~1,040만 원의 소득을 올려야 중산층에 해당합니다.
          </p>
          <p className="mt-3">
            그러나 소득만으로는 중산층 여부를 판단하기 어렵습니다. 순자산 기준으로 보면, 중위값인 약 2억 3,800만 원 전후가 하나의 기준점이 될 수 있습니다. 문제는 수도권 아파트 가격이 이미 이 기준을 훌쩍 넘어섰다는 점입니다. 서울 아파트 평균 매매가는 약 12억 원에 달하며, 이에 따라 &apos;집 한 채 가진 사람&apos;이 자동으로 상위 30%에 진입하는 기형적 구조가 형성되어 있습니다.
          </p>
        </AccordionItem>

        <AccordionItem title="👶 연령대별 자산 격차와 세대 간 불평등" bgColor={pastelColors[6]}>
          <p>
            자산 격차는 연령대에 따라서도 극명하게 나타납니다. 60대 이상 가구주의 평균 순자산은 약 5억 8,000만 원으로 가장 높은 반면, 30대 미만 가구주의 평균 순자산은 약 1억 2,000만 원에 불과합니다. 40대는 약 4억 3,000만 원, 50대는 약 5억 5,000만 원 수준입니다.
          </p>
          <p className="mt-3">
            특히 MZ세대(밀레니얼+Z세대)에게 자산 형성은 과거 세대보다 훨씬 어려운 과제가 되었습니다. 높은 주거비, 학자금 대출, 불안정한 고용 시장 속에서 종잣돈을 마련하는 것 자체가 큰 도전입니다. 반면 부모 세대의 자산 이전(증여, 상속) 여부가 자산 격차를 결정짓는 핵심 변수로 부상하고 있어, &apos;금수저-흙수저&apos; 담론이 단순한 유행어를 넘어 구조적 현실이 되었습니다.
          </p>
        </AccordionItem>

        <AdBanner slot="insights-mid-asset2" format="rectangle" className="my-4" />

        <AccordionItem title="📍 지역별 자산 격차: 서울과 비서울의 벽" bgColor={pastelColors[7]}>
          <p>
            지역 간 자산 격차도 심각한 수준입니다. 서울 거주 가구의 평균 순자산은 약 7억 4,000만 원으로 전국 평균을 크게 상회합니다. 경기도는 약 4억 8,000만 원, 세종시는 약 5억 2,000만 원 수준인 반면, 전남은 약 3억 원, 강원은 약 2억 8,000만 원에 그칩니다.
          </p>
          <p className="mt-3">
            이러한 지역 간 격차의 핵심 원인은 부동산입니다. 한국 가구의 자산 구성에서 부동산이 차지하는 비중은 평균 약 68%에 달하는데, 서울·수도권의 높은 부동산 가격이 곧 자산 격차로 직결됩니다. 이는 &apos;어디에 사느냐&apos;가 곧 &apos;얼마나 부유한가&apos;를 결정짓는 구조적 문제이며, 금융자산 비중을 높이지 않는 한 해결이 어려운 과제입니다.
          </p>
        </AccordionItem>

        <AccordionItem title="🔑 자산 격차를 줄이기 위한 개인 전략" bgColor={pastelColors[8]}>
          <p>
            거시적인 자산 격차를 개인이 바꿀 수는 없지만, 자신의 자산 순위를 높이기 위한 전략적 접근은 가능합니다. 첫째, 소득의 일정 비율을 반드시 저축 및 투자에 배분하는 &apos;선저축 후소비&apos; 습관이 필수적입니다. 둘째, 부동산에 편중된 자산 구조를 벗어나 주식, ETF, 채권 등 금융자산으로의 분산 투자가 필요합니다. 셋째, 세제 혜택이 있는 연금저축, ISA 계좌를 최대한 활용하여 절세 효과를 극대화해야 합니다.
          </p>
          <p className="mt-3">
            무엇보다 중요한 것은 자신의 현재 위치를 정확히 파악하는 것입니다. 부자연구소의 자산 상위 % 계산기는 바로 이 목적을 위해 만들어졌습니다. 통계청 공식 데이터를 기반으로 나이, 지역, 자산, 소득을 종합적으로 분석하여, 여러분이 대한민국에서 어디쯤 서 있는지를 객관적으로 보여드립니다.
          </p>
        </AccordionItem>
      </div>
      <p className="mt-8 text-xs font-medium text-gray-300 text-center leading-relaxed">
        데이터 출처: 2026년 통계청·금융감독원·한국은행 &apos;가계금융복지조사&apos; 보도자료 재구성
      </p>
    </section>
  );
}
