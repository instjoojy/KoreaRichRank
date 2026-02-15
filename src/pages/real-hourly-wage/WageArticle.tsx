import AdBanner from "../../components/AdBanner";

export default function WageArticle() {
  return (
    <article className="max-w-[600px] mx-auto px-5 pb-20">
      <div className="bg-white rounded-3xl shadow-lg p-7 sm:p-10">
        <span className="inline-block text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full mb-5">
          부자연구소 칼럼
        </span>
        <h2 className="text-[24px] sm:text-[28px] font-black text-navy leading-snug mb-2">
          노동 소득의 한계와 자본 소득으로 넘어가는 법
        </h2>
        <p className="text-sm font-medium text-gray-400 mb-8">
          시간을 팔아 돈을 벌다 vs. 돈이 돈을 벌게 하다
        </p>

        <div className="space-y-6 text-[15px] sm:text-base font-medium text-gray-500 leading-[1.85]">
          <section>
            <h3 className="text-lg font-black text-navy mb-3">왜 열심히 일해도 부자가 되기 어려운가</h3>
            <p>
              대한민국의 평균 직장인은 하루 약 10시간 이상을 일(출퇴근 포함)에 투자합니다. 주 5일, 월 22일, 연 264일. 20대 중반에 취업하여 60세에 퇴직한다고 가정하면, 약 35년간 총 9,240일, 시간으로 환산하면 약 92,400시간을 노동에 바치는 셈입니다. 하지만 이 막대한 시간 투자에도 불구하고, 노동 소득만으로 상위 10% 자산가에 진입하는 것은 극히 어렵습니다.
            </p>
            <p className="mt-3">
              그 이유는 명확합니다. 노동 소득은 &apos;시간&apos;이라는 절대적 제약에 묶여 있기 때문입니다. 하루는 24시간이고, 인간의 체력과 집중력에는 한계가 있습니다. 아무리 높은 시급을 받더라도, 투입할 수 있는 시간에 상한선이 있는 이상, 노동 소득의 성장에는 필연적으로 천장이 존재합니다. 반면 자본 소득은 이 제약에서 자유롭습니다. 내가 잠을 자는 동안에도, 여행을 가는 동안에도, 자본은 24시간 쉬지 않고 일합니다.
            </p>
          </section>

          <AdBanner slot="wage-article-mid1" format="rectangle" className="my-8" />

          <section>
            <h3 className="text-lg font-black text-navy mb-3">&apos;진짜 시급&apos;으로 보는 노동의 현실</h3>
            <p>
              많은 직장인들이 자신의 시급을 &apos;월급 ÷ 근무시간&apos;으로 단순 계산합니다. 하지만 이는 실제 투입 시간을 크게 과소평가한 결과입니다. 부자연구소의 진짜 시급 계산기가 측정하는 &apos;숨겨진 시간&apos;에는 왕복 출퇴근 시간, 일평균 야근 시간, 퇴근 후 업무 연락 응대, 업무 준비 및 자기계발 시간이 포함됩니다.
            </p>
            <p className="mt-3">
              실제로 서울 직장인의 평균 왕복 출퇴근 시간은 약 1시간 28분이며, 일평균 야근 시간은 약 52분입니다. 여기에 퇴근 후 카카오톡이나 이메일로 처리하는 업무 시간(평균 약 23분), 출근 준비 시간까지 더하면, 실제 &apos;일을 위해 쓰는 시간&apos;은 공식 근무시간의 1.4~1.8배에 달합니다. 이를 반영한 진짜 시급은 명목 시급보다 30~45% 낮게 계산되는 것이 일반적입니다.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-black text-navy mb-3">자본 소득의 세 가지 유형</h3>
            <p>
              노동 소득의 한계를 극복하기 위해서는 자본 소득을 만들어야 합니다. 자본 소득은 크게 세 가지 유형으로 나뉩니다. 첫째는 &apos;금융 투자 소득&apos;입니다. 주식, 채권, ETF, 펀드 등 금융상품에 투자하여 배당금이나 시세 차익을 얻는 것입니다. 특히 장기 분산 투자를 통한 복리 효과는 시간이 지날수록 극적인 결과를 만들어냅니다.
            </p>
            <p className="mt-3">
              둘째는 &apos;부동산 임대 소득&apos;입니다. 부동산을 매입하여 월세 수입을 얻는 전통적인 방식입니다. 한국에서 부동산은 여전히 가장 보편적인 자본 소득원이지만, 높은 진입 장벽(자본금)과 규제 리스크, 유동성 제한이라는 단점이 있습니다. 셋째는 &apos;사업 및 콘텐츠 소득&apos;입니다. 자신의 전문성이나 노하우를 상품화하여 반복적 수익을 만드는 방식입니다. 온라인 강의, 전자책, 뉴스레터, SaaS 서비스 등이 대표적입니다.
            </p>
          </section>

          <AdBanner slot="wage-article-mid2" format="rectangle" className="my-8" />

          <section>
            <h3 className="text-lg font-black text-navy mb-3">노동 소득에서 자본 소득으로의 전환 전략</h3>
            <p>
              자본 소득으로의 전환은 하루아침에 이루어지지 않습니다. 현실적인 단계별 전략이 필요합니다. 1단계는 &apos;종잣돈 마련&apos;입니다. 노동 소득에서 최소 20%를 저축하여 투자 원금을 확보합니다. 생활비를 줄이는 것보다 소득을 늘리는 것이 더 효과적이라면, 부업이나 프리랜서 활동도 적극 고려해야 합니다.
            </p>
            <p className="mt-3">
              2단계는 &apos;금융 자산 포트폴리오 구축&apos;입니다. 연금저축(연 900만 원 한도)과 ISA 계좌를 먼저 채우고, 나머지는 국내외 ETF에 분산 투자합니다. S&P 500, KOSPI 200, 미국 채권 ETF 등을 활용한 포트폴리오가 대표적입니다. 3단계는 &apos;현금 흐름 자산 확보&apos;입니다. 배당주, REITs(부동산투자신탁), 임대 수익 등 매월 정기적으로 현금이 들어오는 자산을 늘려갑니다. 이 현금 흐름이 생활비를 초과하는 순간이 바로 &apos;경제적 자유&apos;의 시작점입니다.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-black text-navy mb-3">시급을 높이는 것과 시간을 사는 것</h3>
            <p>
              마지막으로 강조하고 싶은 것은, 노동 소득과 자본 소득이 &apos;이것 아니면 저것&apos;의 문제가 아니라는 점입니다. 가장 현명한 전략은 먼저 노동 소득의 시급을 최대한 높이고(이직, 승진, 전문성 강화), 동시에 그 소득의 일부를 자본으로 전환하는 병행 전략입니다. 진짜 시급 계산기로 자신의 현재 시급을 정확히 파악했다면, 다음 질문은 이것입니다: &apos;내 한 시간의 가치를 어떻게 더 높일 것인가?&apos; 그리고 그 대답은 결국 스스로에게 투자하는 것, 그리고 자본이 일하게 만드는 것, 이 두 가지로 귀결됩니다.
            </p>
            <p className="mt-3">
              부자연구소는 여러분의 경제적 여정에 필요한 객관적 데이터와 인사이트를 제공하기 위해 만들어졌습니다. 진짜 시급을 파악하는 것은 그 여정의 첫걸음입니다. 자신의 시간 가치를 정확히 알 때, 비로소 더 현명한 선택을 할 수 있습니다.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
