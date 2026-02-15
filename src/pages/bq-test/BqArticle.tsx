import AccordionItem from "../../components/AccordionItem";
import AdBanner from "../../components/AdBanner";

const pastelColors = ["#FFFBEB", "#FFF7ED", "#FEF3C7", "#FFF0F5", "#F0FFF4", "#F0F4FF", "#F5F0FF", "#FEF2F2", "#ECFDF5"];

export default function BqArticle() {
  return (
    <section className="max-w-[600px] mx-auto px-5 pb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl">📝</span>
        <div>
          <h2 className="text-[28px] sm:text-[32px] font-black text-navy leading-tight">
            연구소의 비밀 노트
          </h2>
          <p className="text-sm font-medium text-gray-400 mt-1">부자 지수의 비밀과 실천 방안</p>
        </div>
      </div>
      <div className="space-y-5">
        <AccordionItem title="📚 토마스 스탠리와 '이웃집 백만장자'의 교훈" bgColor={pastelColors[0]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">미국의 부(富) 연구가 토마스 J. 스탠리 박사가 20년 넘게 백만장자를 연구한 결과, 부에 대한 고정관념을 완전히 뒤집었습니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">핵심 발견:</strong> 진정한 부자는 화려한 소비를 하는 사람이 아니라, 조용히 자산을 축적하는 사람입니다.</li>
            <li><strong className="font-bold text-navy-light">실제 백만장자:</strong> 고급 외제차 대신 중고차, 명품보다 실용적 브랜드, 호화 저택 대신 평범한 동네에 거주.</li>
            <li><strong className="font-bold text-navy-light">공통 원칙:</strong> &apos;소득 대비 소비를 최소화&apos;하고, &apos;절약한 돈을 체계적으로 투자&apos;하는 습관.</li>
            <li><strong className="font-bold text-navy-light">저서:</strong> 1996년 &lt;이웃집 백만장자(The Millionaire Next Door)&gt; — 전 세계 400만 부 이상 판매.</li>
          </ul>
        </AccordionItem>

        <AccordionItem title="📊 부자 지수(Wealth Index)란 무엇인가" bgColor={pastelColors[1]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">스탠리 박사의 &apos;기대 순자산&apos; 공식과 부자연구소의 BQ 테스트 원리를 알아봅니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">기대 순자산 공식:</strong> 나이 × 세전 연소득 ÷ 10. 예) 40세, 연봉 5,000만 원 → 기대 순자산 2억 원.</li>
            <li><strong className="font-bold text-navy-light">PAW (우수 축적자):</strong> 실제 순자산이 기대치의 2배 이상인 사람.</li>
            <li><strong className="font-bold text-navy-light">UAW (부진 축적자):</strong> 실제 순자산이 기대치의 절반 이하인 사람.</li>
            <li><strong className="font-bold text-navy-light">한국형 BQ:</strong> 소비 습관 + 투자 성향 + 경제 지식, 세 축으로 &apos;부자 잠재력&apos;을 종합 측정.</li>
          </ul>
        </AccordionItem>

        <AccordionItem title="✅ PAW가 되기 위한 7가지 핵심 습관" bgColor={pastelColors[2]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">스탠리 박사가 발견한 자산 축적자(PAW)들의 7가지 공통 습관입니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">1. 가계부 작성:</strong> 매월 수입과 지출을 정확히 파악하고, 목표 저축률을 반드시 지킵니다.</li>
            <li><strong className="font-bold text-navy-light">2. 과시 소비 배제:</strong> 새 차보다 중고차, 유행 명품보다 가성비 좋은 제품을 선택합니다.</li>
            <li><strong className="font-bold text-navy-light">3. 소득의 15~20% 투자:</strong> 수입의 일정 비율을 꾸준히 투자에 배분합니다.</li>
            <li><strong className="font-bold text-navy-light">4. 배우자와 목표 공유:</strong> 재무 목표를 함께 설정하고 실천합니다.</li>
            <li><strong className="font-bold text-navy-light">5. 자녀 과잉 지원 자제:</strong> 성인 자녀에 대한 정기적 경제 지원은 오히려 자산 형성 능력을 약화시킵니다.</li>
            <li><strong className="font-bold text-navy-light">6. 절세 전략:</strong> 세금 최적화를 위해 전문가의 조언을 활용합니다.</li>
            <li><strong className="font-bold text-navy-light">7. 장기 투자 관점:</strong> 단기적 시장 변동에 흔들리지 않습니다.</li>
          </ul>
        </AccordionItem>

        <AdBanner slot="bq-insights-mid1" format="rectangle" className="my-4" />

        <AccordionItem title="💳 소비 심리학: 왜 우리는 과소비하는가" bgColor={pastelColors[3]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">행동경제학이 밝혀낸 과소비의 심리적 트리거와, 이를 극복하기 위한 실전 전략입니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">앵커링 효과:</strong> &apos;원래 50만 원인데 70% 할인&apos; 같은 높은 기준점이 판단을 왜곡합니다. 할인율이 아니라 실제 필요 여부로 판단하세요.</li>
            <li><strong className="font-bold text-navy-light">소셜 미디어 효과:</strong> SNS에서 타인의 소비를 보면 &apos;나도 해야 한다&apos;는 사회적 압력이 발생합니다. 비교 대상을 자신의 과거로 바꾸세요.</li>
            <li><strong className="font-bold text-navy-light">현재 편향:</strong> 미래의 100만 원보다 지금의 10만 원을 더 가치 있게 느끼는 본능. 자동이체로 저축을 &apos;디폴트&apos;로 설정하면 극복 가능.</li>
            <li><strong className="font-bold text-navy-light">쿨링오프 원칙:</strong> 10만 원 이상 구매 시 24시간, 100만 원 이상은 1주일의 대기 시간을 스스로에게 부여하세요.</li>
          </ul>
        </AccordionItem>

        <AccordionItem title="🇰🇷 한국형 부자 지수: 우리만의 특수한 변수들" bgColor={pastelColors[4]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">한국의 부자 방정식에는 미국과 다른 세 가지 특수한 변수가 존재합니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">부동산 편중:</strong> 한국 가구 자산 중 부동산 비중은 약 68%로, 미국(약 30%)의 두 배. &apos;부동산 보유 여부&apos;가 자산 순위를 결정짓는 가장 큰 변수입니다.</li>
            <li><strong className="font-bold text-navy-light">교육비 부담:</strong> 가구당 월평균 사교육비 약 55만 원(OECD 최상위권). 자녀 1인당 대학 졸업까지 약 2억 원 추산.</li>
            <li><strong className="font-bold text-navy-light">높은 가계부채:</strong> GDP 대비 약 105%로 세계 최상위권. 순자산(자산-부채)으로 파악하는 것이 중요한 이유입니다.</li>
          </ul>
        </AccordionItem>

        <AccordionItem title="📉 부자가 절대 하지 않는 5가지 재무 실수" bgColor={pastelColors[5]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">수천 명의 자산가를 연구한 결과, 진짜 부자들이 공통적으로 피하는 치명적 실수들입니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">1. 소득에 맞춰 소비 확장:</strong> 연봉이 오르면 자동으로 생활 수준을 올리는 &apos;라이프스타일 인플레이션&apos;. 소득이 늘면 저축률을 먼저 올리세요.</li>
            <li><strong className="font-bold text-navy-light">2. 고금리 부채 방치:</strong> 신용카드 할부, 캐피탈 대출 등 연 15% 이상 부채를 투자보다 먼저 상환해야 합니다.</li>
            <li><strong className="font-bold text-navy-light">3. 비상금 없이 투자:</strong> 3~6개월 생활비 비상금 없이 투자하면, 급전이 필요할 때 손절 매도의 악순환에 빠집니다.</li>
            <li><strong className="font-bold text-navy-light">4. 감정적 투자:</strong> 공포에 팔고 탐욕에 사는 패턴. 자동 적립식 투자로 감정을 배제하세요.</li>
            <li><strong className="font-bold text-navy-light">5. 보험 과다 가입:</strong> 월 보험료가 소득의 10%를 초과하면 과다. 필수 보장만 남기고 나머지는 투자로 전환.</li>
          </ul>
        </AccordionItem>

        <AdBanner slot="bq-insights-mid2" format="rectangle" className="my-4" />

        <AccordionItem title="🧮 순자산 vs 총자산: 진짜 부자를 가리는 기준" bgColor={pastelColors[6]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">총자산이 10억이어도 부채가 8억이면 순자산은 2억. 진짜 부의 척도는 순자산입니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">순자산 공식:</strong> 총자산(부동산 + 금융 + 기타) - 총부채(주택담보대출 + 신용대출 + 기타). 이 숫자가 당신의 진짜 재산입니다.</li>
            <li><strong className="font-bold text-navy-light">부채비율 관리:</strong> 총부채/총자산 비율이 40% 이하가 건전, 60% 이상이면 위험 신호.</li>
            <li><strong className="font-bold text-navy-light">좋은 부채 vs 나쁜 부채:</strong> 자산 가치 상승이 기대되는 주택담보대출(좋은 부채) vs 소비를 위한 신용대출(나쁜 부채)을 구분하세요.</li>
            <li><strong className="font-bold text-navy-light">한국 가구 평균:</strong> 평균 총자산 약 5.7억 원, 평균 부채 약 9,400만 원 → 평균 순자산 약 4.7억 원. 중위값은 약 2.4억 원.</li>
          </ul>
        </AccordionItem>

        <AccordionItem title="🌱 복리의 마법: 시간이 만드는 부의 차이" bgColor={pastelColors[7]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">아인슈타인이 &apos;인류 최고의 발명&apos;이라 부른 복리 효과는, 시간이 지날수록 기하급수적으로 커집니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">72의 법칙:</strong> 72 ÷ 연수익률(%) = 자산이 2배가 되는 기간. 연 7% 수익률이면 약 10.3년마다 자산 2배.</li>
            <li><strong className="font-bold text-navy-light">25세 vs 35세:</strong> 25세에 월 30만 원 투자 시작(연 7%) → 60세에 약 5.7억. 35세 시작 시 → 약 2.7억. 10년 차이가 2배 차이.</li>
            <li><strong className="font-bold text-navy-light">매일 1% 성장:</strong> 매일 1%씩 성장하면 1년 후 37.8배. 매일 1%씩 퇴보하면 0.03배. 작은 습관의 차이가 거대한 격차를 만듭니다.</li>
            <li><strong className="font-bold text-navy-light">가장 중요한 변수:</strong> 수익률보다 &apos;시간&apos;. 지금 당장 작은 금액이라도 시작하는 것이 완벽한 타이밍을 기다리는 것보다 낫습니다.</li>
          </ul>
        </AccordionItem>

        <AccordionItem title="🗺️ 부자 지수를 높이는 실전 로드맵" bgColor={pastelColors[8]}>
          <p className="mb-3">
            <strong className="font-bold text-navy">BQ 결과에 관계없이 지금 당장 실천할 수 있는 3단계 로드맵입니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-bold text-navy-light">1단계 (1~3개월):</strong> 소비 패턴 진단. 3개월간 모든 지출을 기록, 필수 소비와 욕구 소비를 분리. 욕구 소비 30% 이상 줄이기 목표.</li>
            <li><strong className="font-bold text-navy-light">2단계 (3~6개월):</strong> 비상금 확보 + 자동 투자 시작. 월 소득 10%를 자동이체로 투자 계좌에. 연금저축과 ISA 계좌 먼저 채우기.</li>
            <li><strong className="font-bold text-navy-light">3단계 (6개월 이후):</strong> 소득 증가. 부업, 자기계발, 이직으로 소득의 절대치를 높이는 것이 장기적으로 가장 강력한 자산 축적 전략입니다.</li>
          </ul>
        </AccordionItem>
      </div>
      <p className="mt-8 text-xs font-medium text-gray-300 text-center leading-relaxed">
        데이터 출처: Thomas J. Stanley &apos;The Millionaire Next Door&apos;, 2026년 통계청 가계금융복지조사 재구성
      </p>
    </section>
  );
}
