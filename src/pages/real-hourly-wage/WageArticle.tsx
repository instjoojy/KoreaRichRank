import AccordionItem from "../../components/AccordionItem";
import AdBanner from "../../components/AdBanner";

const pastelColors = ["#FFF0F5", "#FFE4E6", "#FEF2F2", "#F0F4FF", "#F5F0FF"];

export default function WageArticle() {
  return (
    <section className="max-w-[600px] mx-auto px-5 pb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl">📝</span>
        <div>
          <h2 className="text-[28px] sm:text-[32px] font-black text-navy leading-tight">
            연구소의 비밀 노트
          </h2>
          <p className="text-sm font-medium text-gray-400 mt-1">노동 소득의 한계와 자본 소득의 비밀</p>
        </div>
      </div>
      <div className="space-y-5">
        <AccordionItem title="💼 왜 열심히 일해도 부자가 되기 어려운가" bgColor={pastelColors[0]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">35년간 약 92,400시간을 노동에 바쳐도, 노동 소득만으로 상위 10% 자산가에 진입하기 극히 어려운 이유입니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">시간의 한계:</strong> 하루 24시간, 인간의 체력·집중력에 상한선이 있어 노동 소득의 성장에는 천장이 존재합니다.</li>
            <li><strong className="font-bold text-navy-light">자본의 자유:</strong> 내가 잠을 자는 동안에도, 여행을 가는 동안에도, 자본은 24시간 쉬지 않고 일합니다.</li>
            <li><strong className="font-bold text-navy-light">평균 직장인:</strong> 하루 약 10시간 이상(출퇴근 포함), 주 5일, 월 22일, 연 264일을 일에 투자합니다.</li>
          </ul>
        </AccordionItem>

        <AccordionItem title="⏱️ '진짜 시급'으로 보는 노동의 현실" bgColor={pastelColors[1]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">실제 투입 시간을 반영하면, 진짜 시급은 명목 시급보다 30~45% 낮게 계산됩니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">평균 출퇴근:</strong> 서울 직장인 왕복 평균 약 1시간 28분.</li>
            <li><strong className="font-bold text-navy-light">일평균 야근:</strong> 약 52분.</li>
            <li><strong className="font-bold text-navy-light">퇴근 후 업무:</strong> 카카오톡·이메일 업무 처리 평균 약 23분.</li>
            <li><strong className="font-bold text-navy-light">실제 배수:</strong> 공식 근무시간의 1.4~1.8배를 &apos;일을 위해&apos; 사용하고 있습니다.</li>
          </ul>
        </AccordionItem>

        <AdBanner slot="wage-insights-mid1" format="rectangle" className="my-4" />

        <AccordionItem title="💰 자본 소득의 세 가지 유형" bgColor={pastelColors[2]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">노동 소득의 한계를 극복하기 위한 세 가지 자본 소득 유형입니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">금융 투자 소득:</strong> 주식, 채권, ETF, 펀드 등 금융상품 투자. 장기 분산 투자를 통한 복리 효과가 핵심입니다.</li>
            <li><strong className="font-bold text-navy-light">부동산 임대 소득:</strong> 월세 수입의 전통적 방식. 높은 진입 장벽과 규제 리스크, 유동성 제한이 단점입니다.</li>
            <li><strong className="font-bold text-navy-light">사업 및 콘텐츠 소득:</strong> 전문성·노하우를 상품화하여 반복적 수익 창출. 온라인 강의, 전자책, SaaS 등이 대표적입니다.</li>
          </ul>
        </AccordionItem>

        <AccordionItem title="🔄 노동 소득에서 자본 소득으로의 전환 전략" bgColor={pastelColors[3]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">현실적인 3단계 전환 전략으로 경제적 자유에 한 발짝 다가갈 수 있습니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">1단계 — 종잣돈 마련:</strong> 노동 소득에서 최소 20%를 저축. 부업이나 프리랜서 활동도 적극 고려.</li>
            <li><strong className="font-bold text-navy-light">2단계 — 포트폴리오 구축:</strong> 연금저축(연 900만 원 한도) + ISA 계좌 먼저 채우고, 국내외 ETF에 분산 투자.</li>
            <li><strong className="font-bold text-navy-light">3단계 — 현금 흐름 자산:</strong> 배당주, REITs, 임대 수익 등 매월 정기 수입이 생활비를 초과하는 순간이 &apos;경제적 자유&apos;의 시작점.</li>
          </ul>
        </AccordionItem>

        <AdBanner slot="wage-insights-mid2" format="rectangle" className="my-4" />

        <AccordionItem title="📈 시급을 높이는 것과 시간을 사는 것" bgColor={pastelColors[4]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">가장 현명한 전략은 노동 소득의 시급을 높이면서, 동시에 자본으로 전환하는 병행 전략입니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">시급 극대화:</strong> 이직, 승진, 전문성 강화로 노동 소득의 시간당 가치를 높이세요.</li>
            <li><strong className="font-bold text-navy-light">자본이 일하게:</strong> 높아진 소득의 일부를 자본으로 전환하여 복리 효과를 누리세요.</li>
            <li><strong className="font-bold text-navy-light">첫걸음:</strong> 진짜 시급을 정확히 파악하는 것. 자신의 시간 가치를 알 때 더 현명한 선택이 가능합니다.</li>
          </ul>
        </AccordionItem>
      </div>
      <p className="mt-8 text-xs font-medium text-gray-300 text-center leading-relaxed">
        데이터 출처: 2026년 고용노동부 최저임금 고시, 통계청 경제활동인구조사 재구성
      </p>
    </section>
  );
}
