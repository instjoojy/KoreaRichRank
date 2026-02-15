import AccordionItem from "../../components/AccordionItem";
import AdBanner from "../../components/AdBanner";

const pastelColors = ["#FFF0F5", "#FFE4E6", "#FEF2F2", "#F0F4FF", "#F5F0FF", "#FFFBEB", "#FFF7ED", "#ECFDF5", "#F0FFF4"];

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

        <AdBanner slot="wage-insights-mid1" format="rectangle" className="my-4" />

        <AccordionItem title="🧠 시간의 가치: 워런 버핏이 알려주는 진짜 시급의 의미" bgColor={pastelColors[3]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">워런 버핏은 &apos;시간은 살 수 없는 유일한 자원&apos;이라 말합니다. 시간당 가치를 아는 것이 부의 출발점입니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">기회비용 사고:</strong> 1시간을 야근에 쓸 때 포기하는 것은 단순히 휴식이 아니라, 자기계발·부업·투자 공부의 기회입니다.</li>
            <li><strong className="font-bold text-navy-light">시급 기반 의사결정:</strong> &apos;이 일을 직접 할까, 외주를 줄까?&apos; 판단 시 자신의 진짜 시급과 비교하면 합리적 선택이 가능합니다.</li>
            <li><strong className="font-bold text-navy-light">시간 부자:</strong> 진짜 부자는 돈의 부자가 아니라 &apos;시간의 부자&apos;. 자본 소득이 생활비를 넘는 순간, 시간은 온전히 자신의 것이 됩니다.</li>
            <li><strong className="font-bold text-navy-light">첫 번째 단계:</strong> 진짜 시급을 계산해서 자신의 시간 가치를 정확히 파악하는 것. 그래야 더 현명한 선택이 가능합니다.</li>
          </ul>
        </AccordionItem>

        <AccordionItem title="🔄 노동 소득에서 자본 소득으로의 전환 전략" bgColor={pastelColors[4]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">현실적인 3단계 전환 전략으로 경제적 자유에 한 발짝 다가갈 수 있습니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">1단계 — 종잣돈 마련:</strong> 노동 소득에서 최소 20%를 저축. 부업이나 프리랜서 활동도 적극 고려.</li>
            <li><strong className="font-bold text-navy-light">2단계 — 포트폴리오 구축:</strong> 연금저축(연 900만 원 한도) + ISA 계좌 먼저 채우고, 국내외 ETF에 분산 투자.</li>
            <li><strong className="font-bold text-navy-light">3단계 — 현금 흐름 자산:</strong> 배당주, REITs, 임대 수익 등 매월 정기 수입이 생활비를 초과하는 순간이 &apos;경제적 자유&apos;의 시작점.</li>
          </ul>
        </AccordionItem>

        <AccordionItem title="🏃 사이드 허슬의 시대: 부업으로 시급을 높이는 전략" bgColor={pastelColors[5]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">본업의 시급에 한계가 있다면, 부업(Side Hustle)으로 시간당 가치를 극적으로 높일 수 있습니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">시간 판매형:</strong> 배달, 대리운전, 과외 등. 즉시 수입이 가능하지만, 시간의 한계가 동일하게 적용됩니다.</li>
            <li><strong className="font-bold text-navy-light">전문성 판매형:</strong> 프리랜서 디자인, 개발, 번역, 컨설팅 등. 본업 스킬을 활용하면 시급이 2~5배 높아질 수 있습니다.</li>
            <li><strong className="font-bold text-navy-light">시스템 구축형:</strong> 블로그, 유튜브, 온라인 강의, 전자책 등. 초기 투자 시간이 필요하지만, 수면 중에도 수익이 발생하는 구조.</li>
            <li><strong className="font-bold text-navy-light">핵심 원칙:</strong> 부업 수입의 100%를 저축·투자에 투입하세요. 생활비는 본업으로, 자산 형성은 부업으로 분리하면 효과가 극대화됩니다.</li>
          </ul>
        </AccordionItem>

        <AdBanner slot="wage-insights-mid2" format="rectangle" className="my-4" />

        <AccordionItem title="⚖️ 워라밸과 시급의 관계: 행복한 부자가 되는 법" bgColor={pastelColors[6]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">높은 연봉이 반드시 높은 시급을 의미하지 않습니다. 워라밸이 무너진 고연봉은 독이 될 수 있습니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">연봉의 함정:</strong> 연봉 6,000만 원(주 40시간) vs 연봉 8,000만 원(주 65시간+야근). 진짜 시급은 전자가 더 높을 수 있습니다.</li>
            <li><strong className="font-bold text-navy-light">건강 비용:</strong> 과로로 인한 의료비, 스트레스성 소비(폭식, 충동구매), 번아웃 후 휴직 등 &apos;보이지 않는 비용&apos;이 시급을 갉아먹습니다.</li>
            <li><strong className="font-bold text-navy-light">최적 전략:</strong> 적정 노동시간 내에서 시급을 최대화하고, 남는 시간에 자본 소득 시스템을 구축하는 것이 장기적으로 가장 현명합니다.</li>
            <li><strong className="font-bold text-navy-light">행복 연구:</strong> 소득이 일정 수준(약 연 7,500만 원)을 넘으면 추가 소득의 행복 증가 효과가 급격히 감소합니다(카너먼 연구).</li>
          </ul>
        </AccordionItem>

        <AccordionItem title="📈 시급을 높이는 것과 시간을 사는 것" bgColor={pastelColors[7]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">가장 현명한 전략은 노동 소득의 시급을 높이면서, 동시에 자본으로 전환하는 병행 전략입니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">시급 극대화:</strong> 이직, 승진, 전문성 강화로 노동 소득의 시간당 가치를 높이세요.</li>
            <li><strong className="font-bold text-navy-light">자본이 일하게:</strong> 높아진 소득의 일부를 자본으로 전환하여 복리 효과를 누리세요.</li>
            <li><strong className="font-bold text-navy-light">첫걸음:</strong> 진짜 시급을 정확히 파악하는 것. 자신의 시간 가치를 알 때 더 현명한 선택이 가능합니다.</li>
          </ul>
        </AccordionItem>

        <AccordionItem title="🌍 글로벌 시급 비교: 한국 직장인의 현주소" bgColor={pastelColors[8]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">OECD 국가 간 시급과 노동시간을 비교하면, 한국 직장인의 현주소가 더 선명하게 보입니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">연간 노동시간:</strong> 한국 약 1,872시간으로 OECD 평균(1,716시간)보다 156시간 더 일합니다. 약 한 달치 추가 근무.</li>
            <li><strong className="font-bold text-navy-light">시간당 노동생산성:</strong> 한국은 OECD 38개국 중 28위. 오래 일하지만 생산성은 낮은 구조적 문제가 있습니다.</li>
            <li><strong className="font-bold text-navy-light">최저임금 비교:</strong> 한국 10,030원(2026) vs 일본 약 1,113엔(약 10,000원) vs 호주 $24.10(약 21,000원) vs 독일 €12.82(약 18,800원).</li>
            <li><strong className="font-bold text-navy-light">시사점:</strong> &apos;얼마나 오래 일하는가&apos;보다 &apos;시간당 얼마나 가치를 만드는가&apos;에 집중해야 합니다. 생산성 향상이 곧 시급 향상입니다.</li>
          </ul>
        </AccordionItem>
      </div>
      <p className="mt-8 text-xs font-medium text-gray-300 text-center leading-relaxed">
        데이터 출처: 2026년 고용노동부 최저임금 고시, 통계청 경제활동인구조사, OECD Employment Outlook 재구성
      </p>
    </section>
  );
}
