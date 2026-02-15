import AccordionItem from "../../components/AccordionItem";
import AdBanner from "../../components/AdBanner";

const pastelColors = ["#ECFDF5", "#F0FFF4", "#F0FDFA", "#F0F4FF", "#FFFBEB"];

export default function FireArticle() {
  return (
    <section className="max-w-[600px] mx-auto px-5 pb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl">📝</span>
        <div>
          <h2 className="text-[28px] sm:text-[32px] font-black text-navy leading-tight">
            연구소의 비밀 노트
          </h2>
          <p className="text-sm font-medium text-gray-400 mt-1">FIRE 무브먼트와 경제적 자유의 과학</p>
        </div>
      </div>
      <div className="space-y-5">
        <AccordionItem title="🔥 FIRE 무브먼트란? 경제적 자립 조기 은퇴의 모든 것" bgColor={pastelColors[0]}>
          <p>
            FIRE(Financial Independence, Retire Early)는 경제적 자립을 달성하여 조기 은퇴를 실현하는 삶의 전략입니다. 1992년 비키 로빈(Vicki Robin)과 조 도밍게즈(Joe Dominguez)가 출간한 &apos;돈이냐 인생이냐(Your Money or Your Life)&apos;에서 시작된 이 개념은, 2010년대 미국의 &apos;Mr. Money Mustache&apos; 블로그를 통해 전 세계적인 무브먼트로 확산되었습니다.
          </p>
          <p className="mt-3">
            핵심 원리는 단순합니다. 소득의 50~70%를 저축하고, 이를 인덱스 펀드 등에 투자하여 복리 효과를 극대화한 뒤, 투자 수익만으로 생활비를 충당할 수 있는 시점에 은퇴하는 것입니다. 한국에서도 MZ세대를 중심으로 &apos;파이어족&apos; 열풍이 불고 있으며, &apos;퇴사 후 배당금으로 생활&apos;, &apos;30대 조기 은퇴&apos; 같은 키워드가 큰 관심을 받고 있습니다. 다만, 한국의 높은 주거비, 교육비, 건강보험 구조를 고려하면, 미국식 FIRE를 그대로 적용하기보다는 한국 현실에 맞게 수정하는 것이 중요합니다.
          </p>
        </AccordionItem>

        <AccordionItem title="📐 4% 룰의 원리와 한계" bgColor={pastelColors[1]}>
          <p>
            4% 룰은 1998년 미국 트리니티 대학교의 연구(Trinity Study)에서 도출된 개념입니다. 주식 60% + 채권 40%로 구성된 포트폴리오에서, 매년 초기 자산의 4%를 인출하면 30년 동안 자금이 고갈되지 않을 확률이 약 95%라는 결론이었습니다. 이를 뒤집으면 &apos;25배 법칙&apos;이 됩니다. 즉, 연간 생활비의 25배에 해당하는 자산을 모으면 은퇴가 가능하다는 뜻입니다.
          </p>
          <p className="mt-3">
            예를 들어, 월 소비액이 200만 원이라면 연간 2,400만 원이고, 이의 25배인 6억 원이 FIRE 목표 금액이 됩니다(월 소비 x 300 = 6억). 하지만 이 룰에는 한계가 있습니다. 첫째, 미국 주식시장의 역사적 수익률(연평균 약 10%)을 기반으로 하며, 한국 시장이나 글로벌 분산 투자 시 수익률이 다를 수 있습니다. 둘째, 인플레이션을 고려해야 합니다. 특히 한국의 의료비와 교육비 인플레이션은 일반 물가 상승률보다 높습니다. 셋째, 30년 이상의 초장기 은퇴를 가정하면 자금 고갈 확률이 높아지므로, 3~3.5% 인출률을 적용하는 것이 더 안전합니다.
          </p>
        </AccordionItem>

        <AdBanner slot="fire-insights-mid1" format="rectangle" className="my-4" />

        <AccordionItem title="💰 FIRE의 다섯 가지 유형" bgColor={pastelColors[2]}>
          <p>
            FIRE는 하나의 방식만 있는 것이 아닙니다. 개인의 성향과 목표에 따라 다섯 가지 유형으로 나뉩니다. 첫째, &apos;Fat FIRE&apos;는 현재 생활 수준을 유지하거나 더 풍족하게 은퇴하는 방식입니다. 높은 소득과 높은 저축률을 동시에 요구하며, 목표 자산이 10억 원 이상인 경우가 많습니다. 둘째, &apos;Lean FIRE&apos;는 극단적인 절약을 통해 최소한의 자산으로 은퇴하는 방식입니다. 월 100~150만 원 수준의 생활비로 살 수 있다면, 목표 금액이 3~4.5억 원까지 낮아집니다.
          </p>
          <p className="mt-3">
            셋째, &apos;Barista FIRE&apos;는 기본 생활비의 절반 정도를 투자 수익으로 충당하고, 나머지는 파트타임이나 프리랜서로 벌어 채우는 방식입니다. 완전한 은퇴는 아니지만, 풀타임 직장에서 벗어나 여유로운 삶을 누릴 수 있습니다. 넷째, &apos;Coast FIRE&apos;는 더 이상 추가 저축을 하지 않아도, 기존에 투자한 자산이 복리로 성장하여 전통적인 은퇴 시점(55~60세)에 충분한 자산이 되는 상태입니다. 이 시점에 도달하면 저축 압박에서 해방됩니다. 다섯째, &apos;Flamingo FIRE&apos;는 목표의 절반 정도를 모은 후 반은퇴 상태로 전환하는 방식으로, 최근 가장 현실적인 대안으로 주목받고 있습니다.
          </p>
        </AccordionItem>

        <AccordionItem title="🇰🇷 한국에서 FIRE 하려면 얼마가 필요할까?" bgColor={pastelColors[3]}>
          <p>
            통계청에 따르면 2024년 기준 2인 이상 가구의 월평균 소비지출은 약 287만 원, 1인 가구는 약 167만 원입니다. 이를 4% 룰에 적용하면, 2인 가구의 FIRE 목표 금액은 약 8.6억 원, 1인 가구는 약 5억 원이 됩니다. 하지만 한국에는 추가로 고려해야 할 비용이 있습니다. 국민건강보험료는 소득이 없어도 지역가입자로서 월 10~30만 원을 납부해야 하며, 국민연금의 경우 임의가입 여부를 결정해야 합니다.
          </p>
          <p className="mt-3">
            또한 한국 가구 자산의 약 68%가 부동산에 집중되어 있다는 점도 중요합니다. 자가 주거자라면 월 주거비가 크게 줄어 FIRE 금액이 낮아지지만, 전월세 거주자라면 보증금과 월세를 반영하여 목표 금액을 상향 조정해야 합니다. 현실적으로, 서울에서 1인 가구가 자가 없이 FIRE를 달성하려면 최소 7~8억 원, 자가 포함 시 12~15억 원 수준의 순자산이 필요하다는 분석이 많습니다. 지방 거주 시 이 금액은 상당히 줄어들 수 있습니다.
          </p>
        </AccordionItem>

        <AdBanner slot="fire-insights-mid2" format="rectangle" className="my-4" />

        <AccordionItem title="🗺️ FIRE를 앞당기는 실전 전략 5가지" bgColor={pastelColors[4]}>
          <p>
            첫째, 저축률을 높이세요. FIRE까지 걸리는 시간은 소득이 아니라 저축률에 달려 있습니다. 저축률 10%면 은퇴까지 약 51년, 30%면 28년, 50%면 17년, 70%면 8.5년입니다. 저축률을 5%p만 올려도 은퇴 시점이 2~5년 앞당겨집니다. 둘째, 투자 수익률을 최적화하세요. 단기 트레이딩보다 글로벌 인덱스 펀드에 장기 투자하는 것이 검증된 방법입니다. S&P 500의 지난 30년 연평균 수익률은 약 10%이며, 인플레이션을 제하면 실질 약 7%입니다.
          </p>
          <p className="mt-3">
            셋째, 부업이나 사이드 프로젝트로 소득을 늘리세요. 본업의 시급이 한계에 도달했다면, 추가 소득원을 만드는 것이 저축률을 높이는 가장 빠른 방법입니다. 넷째, 3대 고정비(주거비, 교통비, 보험료)를 최적화하세요. 이 세 항목이 전체 지출의 50% 이상을 차지하는 경우가 많으며, 한 번의 결정으로 매달 수십만 원을 절약할 수 있습니다. 다섯째, 세제 혜택을 적극 활용하세요. 연금저축(연 최대 900만 원, 세액공제 13.2~16.5%), ISA(비과세 한도 200~400만 원), IRP(퇴직연금) 등은 같은 수익률에서도 세후 수익을 크게 높여줍니다. 이 다섯 가지를 꾸준히 실천한다면, FIRE는 꿈이 아닌 계획이 될 수 있습니다.
          </p>
        </AccordionItem>
      </div>
      <p className="mt-8 text-xs font-medium text-gray-300 text-center leading-relaxed">
        데이터 출처: Trinity Study(1998), 2026년 통계청 가계금융복지조사 및 한국은행 보도자료 재구성
      </p>
    </section>
  );
}
