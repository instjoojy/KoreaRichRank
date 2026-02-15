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
          <p className="mb-3">
            <strong className="font-bold text-navy">FIRE(Financial Independence, Retire Early)는 경제적 자립을 달성하여 조기 은퇴를 실현하는 삶의 전략으로, 전 세계적 무브먼트로 확산되었습니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">기원:</strong> 1992년 비키 로빈과 조 도밍게즈의 &apos;돈이냐 인생이냐(Your Money or Your Life)&apos;에서 시작, 2010년대 &apos;Mr. Money Mustache&apos; 블로그로 전 세계 확산.</li>
            <li><strong className="font-bold text-navy-light">핵심 원리:</strong> 소득의 50~70%를 저축 → 인덱스 펀드 등에 투자 → 복리 효과 극대화 → 투자 수익만으로 생활비 충당 시점에 은퇴.</li>
            <li><strong className="font-bold text-navy-light">한국 MZ세대:</strong> &apos;파이어족&apos; 열풍 — &apos;퇴사 후 배당금으로 생활&apos;, &apos;30대 조기 은퇴&apos; 키워드가 큰 관심.</li>
            <li><strong className="font-bold text-navy-light">한국형 적용:</strong> 높은 주거비·교육비·건강보험 구조를 고려, 미국식 FIRE를 한국 현실에 맞게 수정하는 것이 중요합니다.</li>
          </ul>
        </AccordionItem>

        <AccordionItem title="📐 4% 룰의 원리와 한계" bgColor={pastelColors[1]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">1998년 트리니티 대학교 연구(Trinity Study)에서 도출된 4% 룰은 FIRE의 핵심 공식이지만, 한계점도 존재합니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">4% 룰:</strong> 주식 60% + 채권 40% 포트폴리오에서 매년 초기 자산의 4%를 인출하면, 30년간 자금 고갈 확률이 약 5%에 불과.</li>
            <li><strong className="font-bold text-navy-light">25배 법칙:</strong> 연간 생활비의 25배 = FIRE 목표 금액. 월 소비 200만 원 → 연 2,400만 원 × 25 = 6억 원.</li>
            <li><strong className="font-bold text-navy-light">한계 1 — 수익률:</strong> 미국 주식시장 역사적 수익률(연평균 약 10%) 기반이며, 한국 시장이나 글로벌 분산 투자 시 수익률 상이.</li>
            <li><strong className="font-bold text-navy-light">한계 2 — 인플레이션:</strong> 한국의 의료비·교육비 인플레이션은 일반 물가 상승률보다 높아 실질 구매력 감소 위험.</li>
            <li><strong className="font-bold text-navy-light">안전 마진:</strong> 30년 이상 초장기 은퇴 시 3~3.5% 인출률 적용이 더 안전합니다.</li>
          </ul>
        </AccordionItem>

        <AdBanner slot="fire-insights-mid1" format="rectangle" className="my-4" />

        <AccordionItem title="💰 FIRE의 다섯 가지 유형" bgColor={pastelColors[2]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">FIRE는 하나의 방식이 아닙니다. 개인의 성향과 목표에 따라 다섯 가지 유형으로 나뉩니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">Fat FIRE:</strong> 현재 생활 수준을 유지·향상하며 은퇴. 높은 소득과 저축률 필요, 목표 자산 10억 원 이상.</li>
            <li><strong className="font-bold text-navy-light">Lean FIRE:</strong> 극단적 절약으로 최소 자산 은퇴. 월 100~150만 원 생활 시 목표 금액 3~4.5억 원.</li>
            <li><strong className="font-bold text-navy-light">Barista FIRE:</strong> 투자 수익으로 생활비 절반 충당 + 파트타임·프리랜서로 나머지. 풀타임 탈출의 현실적 대안.</li>
            <li><strong className="font-bold text-navy-light">Coast FIRE:</strong> 추가 저축 없이도 기존 투자 자산이 복리로 성장하여 55~60세에 충분한 자산 도달. 저축 압박에서 해방.</li>
            <li><strong className="font-bold text-navy-light">Flamingo FIRE:</strong> 목표의 절반 달성 후 반은퇴 전환. 최근 가장 현실적인 대안으로 주목받는 유형.</li>
          </ul>
        </AccordionItem>

        <AccordionItem title="🇰🇷 한국에서 FIRE 하려면 얼마가 필요할까?" bgColor={pastelColors[3]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">한국의 FIRE 목표 금액은 주거 형태와 거주 지역에 따라 크게 달라지며, 추가 비용도 반드시 고려해야 합니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">기본 목표금액:</strong> 2인 가구 월 소비 287만 원 → 약 8.6억 원, 1인 가구 월 167만 원 → 약 5억 원 (4% 룰 기준).</li>
            <li><strong className="font-bold text-navy-light">건강보험료:</strong> 소득이 없어도 지역가입자로서 월 10~30만 원 납부 필수. 국민연금 임의가입 여부도 결정 필요.</li>
            <li><strong className="font-bold text-navy-light">부동산 변수:</strong> 한국 가구 자산의 약 68%가 부동산 집중. 자가 시 주거비 절감, 전월세 시 목표금액 상향 조정 필요.</li>
            <li><strong className="font-bold text-navy-light">서울 1인 기준:</strong> 자가 없이 최소 7~8억 원, 자가 포함 시 12~15억 원 순자산 필요. 지방 거주 시 상당히 절감 가능.</li>
          </ul>
        </AccordionItem>

        <AdBanner slot="fire-insights-mid2" format="rectangle" className="my-4" />

        <AccordionItem title="🗺️ FIRE를 앞당기는 실전 전략 5가지" bgColor={pastelColors[4]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">FIRE까지 걸리는 시간은 소득이 아니라 저축률에 달려 있습니다. 다섯 가지 실전 전략으로 은퇴를 앞당기세요.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">1. 저축률 높이기:</strong> 저축률 10%면 은퇴까지 약 51년, 30%면 28년, 50%면 17년, 70%면 8.5년. 5%p만 올려도 2~5년 단축.</li>
            <li><strong className="font-bold text-navy-light">2. 투자 수익률 최적화:</strong> 단기 트레이딩보다 글로벌 인덱스 펀드 장기 투자. S&P 500 지난 30년 연평균 약 10%, 실질 약 7%.</li>
            <li><strong className="font-bold text-navy-light">3. 추가 소득원 확보:</strong> 부업·사이드 프로젝트로 본업 한계 돌파. 추가 소득은 저축률을 높이는 가장 빠른 방법.</li>
            <li><strong className="font-bold text-navy-light">4. 3대 고정비 최적화:</strong> 주거비·교통비·보험료가 전체 지출의 50% 이상. 한 번의 결정으로 매달 수십만 원 절약 가능.</li>
            <li><strong className="font-bold text-navy-light">5. 세제 혜택 활용:</strong> 연금저축(연 최대 900만 원, 세액공제 13.2~16.5%), ISA(비과세 한도 200~400만 원), IRP로 세후 수익 극대화.</li>
          </ul>
        </AccordionItem>
      </div>
      <p className="mt-8 text-xs font-medium text-gray-300 text-center leading-relaxed">
        데이터 출처: Trinity Study(1998), 2026년 통계청 가계금융복지조사 및 한국은행 보도자료 재구성
      </p>
    </section>
  );
}
