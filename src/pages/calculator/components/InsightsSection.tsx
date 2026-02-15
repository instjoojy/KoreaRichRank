import { TrendingUp } from "lucide-react";
import AccordionItem from "../../../components/AccordionItem";

export default function InsightsSection() {
  return (
    <section className="max-w-2xl mx-auto px-4 pb-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gold-50">
          <TrendingUp className="w-5 h-5 text-gold-dark" />
        </div>
        <h2 className="text-xl font-black text-navy">
          자산 관리 인사이트
        </h2>
      </div>
      <div className="space-y-3">
        <AccordionItem title="2026 대한민국 평균 자산과 소득 (통계 분석)">
          <p className="mb-3">
            <strong className="font-bold text-navy">2026년 통계청 발표 기준, 대한민국의 자산 및 소득 분포는 다음과 같습니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-semibold text-navy-light">전국 가구 평균 순자산:</strong> 약 4억 7,144만 원</li>
            <li><strong className="font-semibold text-navy-light">전국 가구 순자산 중위값:</strong> 약 2억 3,800만 원 (중산층 기준)</li>
            <li><strong className="font-semibold text-navy-light">자산 불평등 심화:</strong> 상위 1%가 전체 순자산의 약 20% 보유, 상위 10%가 46% 보유. 이는 부동산, 금융자산, 상속/증여 등 복합적 요인에 기인합니다.</li>
            <li><strong className="font-semibold text-navy-light">중산층의 변화:</strong> 과거 &apos;내 집 마련&apos;, &apos;안정적 직업&apos;에서 현재는 &apos;포괄적 자산 포트폴리오&apos;와 &apos;재정적 안정성&apos;이 중요.</li>
          </ul>
        </AccordionItem>

        <AccordionItem title="상위 1% 부자들의 자산 배분 전략">
          <p className="mb-3">
            <strong className="font-bold text-navy">상위 1% 자산가들은 일반 가구와는 다른 자산 배분 전략을 통해 부를 증식합니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-semibold text-navy-light">부동산:</strong> 여전히 핵심 자산으로, 핵심 지역의 다주택 또는 상업용 부동산에 투자하여 임대 수익 및 시세 차익 추구.</li>
            <li><strong className="font-semibold text-navy-light">금융 자산:</strong> 주식, 채권, 펀드 외에도 헤지펀드, 사모펀드 등 대체 투자 비중을 높여 고수익 추구 및 위험 분산.</li>
            <li><strong className="font-semibold text-navy-light">사업체 투자:</strong> 직접 사업체를 운영하거나 유망 스타트업에 투자하여 지분 가치 상승을 통한 자산 증대.</li>
            <li><strong className="font-semibold text-navy-light">해외 투자:</strong> 국내 시장의 한계를 넘어 해외 부동산, 주식, 벤처 투자 등으로 포트폴리오 다변화.</li>
            <li><strong className="font-semibold text-navy-light">절세 전략:</strong> 법인 설립, 증여/상속 계획 등 전문가와 협력하여 합법적인 절세 전략 적극 활용.</li>
          </ul>
        </AccordionItem>

        <AccordionItem title="나이대별 권장 순자산 목표치">
          <p className="mb-3">
            <strong className="font-bold text-navy">개인의 재무 목표는 나이와 상황에 따라 달라지지만, 일반적으로 다음의 순자산 목표치를 참고할 수 있습니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-semibold text-navy-light">20대:</strong> 종잣돈 마련 및 부채 관리. 학자금 대출 상환, 비상금 확보(3~6개월 생활비).</li>
            <li><strong className="font-semibold text-navy-light">30대:</strong> 자산 형성의 기반 다지기. 주택 마련 자금, 결혼 및 출산 준비. 투자 시작 및 포트폴리오 구축.</li>
            <li><strong className="font-semibold text-navy-light">40대:</strong> 자산 증식 가속화. 은퇴 자산 마련의 중요성 증대. 적극적인 투자 및 자산 리밸런싱.</li>
            <li><strong className="font-semibold text-navy-light">50대:</strong> 은퇴 준비 마무리 단계. 안정적인 자산 유지 및 인출 계획 수립. 현금 흐름 확보.</li>
            <li><strong className="font-semibold text-navy-light">60대 이상:</strong> 자산 보존 및 효율적인 인출 전략. 건강 관리 비용, 여가 생활비 등 고려.</li>
          </ul>
          <p className="mt-3 text-xs text-gray-400 font-medium">
            *위 목표치는 일반적인 가이드라인이며, 개인의 소득, 소비 습관, 투자 성향에 따라 조절이 필요합니다.
          </p>
        </AccordionItem>

        <AccordionItem title="자산 상위 %를 높이기 위한 실전 재테크 팁">
          <p className="mb-3">
            <strong className="font-bold text-navy">자산 순위를 높이고 경제적 자유를 달성하기 위한 실질적인 재테크 팁입니다.</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-500">
            <li><strong className="font-semibold text-navy-light">체계적인 재무 계획:</strong> 목표 설정(주택, 은퇴, 교육 등), 예산 수립, 정기적인 재무 상태 점검.</li>
            <li><strong className="font-semibold text-navy-light">조기 투자 시작:</strong> 복리의 마법을 활용하여 소액이라도 일찍 시작하는 것이 중요.</li>
            <li><strong className="font-semibold text-navy-light">분산 투자 원칙:</strong> 주식, 채권, 부동산, 대체 투자 등 다양한 자산에 분산하여 위험 최소화.</li>
            <li><strong className="font-semibold text-navy-light">꾸준한 자기 계발:</strong> 소득 증대를 위한 능력 향상, 시장 변화에 대한 학습 지속.</li>
            <li><strong className="font-semibold text-navy-light">부채 현명하게 활용:</strong> 좋은 부채(투자 목적)와 나쁜 부채(소비 목적)를 구분하고, 이자율 낮은 대출 우선 상환.</li>
            <li><strong className="font-semibold text-navy-light">절세 전략 숙지:</strong> 연금저축, ISA, 비과세 상품 등 다양한 절세 혜택을 활용하여 세금 부담 최소화.</li>
            <li><strong className="font-semibold text-navy-light">부동산 인사이트:</strong> 거주 목적 외 투자 목적 부동산은 시장 분석 및 전문가 자문 필수.</li>
          </ul>
        </AccordionItem>
      </div>
    </section>
  );
}
