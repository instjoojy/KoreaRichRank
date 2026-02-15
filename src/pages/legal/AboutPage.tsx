import { Helmet } from "@dr.pogodin/react-helmet";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>연구소 소개 — 이런 데 왜 만들었냐고요? | 대한민국 부자연구소</title>
        <meta
          name="description"
          content="대한민국 부자연구소는 통계청 데이터를 누구나 재미있게 활용할 수 있도록 만든 무료 금융 도구 모음입니다. 만든 사람의 솔직한 이야기."
        />
        <link rel="canonical" href="https://korearichlab.com/about" />
      </Helmet>

      <div className="max-w-[600px] mx-auto px-5 py-16 sm:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm font-bold text-gray-400 hover:text-indigo mb-8 transition-colors"
        >
          &larr; 홈으로
        </Link>

        {/* ── 타이틀 ──────────────────────────────────── */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">🧪</div>
          <h1 className="text-[28px] sm:text-[32px] font-black text-navy leading-tight">
            이런 데 왜 만들었냐고요?
          </h1>
          <p className="mt-4 text-[15px] font-medium text-gray-400 leading-[1.7]">
            솔직히 말하면, 저도 궁금했거든요.
          </p>
        </div>

        {/* ── 본문 ────────────────────────────────────── */}
        <div className="space-y-10 text-[15px] font-medium text-gray-500 leading-[1.9]">
          {/* 시작 */}
          <section>
            <h2 className="text-xl font-black text-navy mb-4">
              시작은 단순한 궁금증이었습니다
            </h2>
            <p>
              어느 날 월급날, 통장을 보면서 문득 이런 생각이 들었습니다.
            </p>
            <p className="mt-3 text-lg font-black text-navy">
              &quot;나... 전국에서 몇 등이지?&quot;
            </p>
            <p className="mt-3">
              검색해봤더니 통계청에서 매년 데이터를 공개하고 있더라고요.
              그런데 PDF가 300페이지... 표가 200개... 읽다가 잠들 뻔했습니다.
              그래서 생각했죠. &apos;이걸 그냥 숫자 넣으면 바로 나오게
              만들면 안 되나?&apos;
            </p>
            <p className="mt-3">
              그게 부자연구소의 시작입니다. 거창한 미션 같은 건 없었어요.
              그냥 <span className="font-black text-navy">제가 쓰고 싶어서 만들었습니다.</span>
            </p>
          </section>

          {/* 정체 */}
          <section>
            <h2 className="text-xl font-black text-navy mb-4">
              만든 사람은 누구냐면요
            </h2>
            <p>
              금융 전문가 아닙니다. 재테크 유튜버도 아닙니다.
              주식으로 대박 친 적도 없고, 코인으로 람보르기니 산 적도 없습니다.
            </p>
            <p className="mt-3">
              그냥 <span className="font-black text-navy">돈에 대해 궁금한 게 많은 평범한 사람</span>입니다.
              &apos;내 자산이 전국에서 어디쯤이지?&apos;,
              &apos;내 진짜 시급은 얼마지?&apos;,
              &apos;나 진짜 은퇴할 수 있긴 한 거야?&apos; —
              이런 질문을 통계청 데이터로 답해보고 싶었을 뿐입니다.
            </p>
            <p className="mt-3">
              다만 코딩은 좀 할 줄 압니다. 그래서 궁금한 걸 직접 만들었습니다.
              전문가는 아니지만, <span className="font-black text-navy">데이터는 진짜입니다.</span> 통계청이 거짓말할 리는 없으니까요.
              (아마도요.)
            </p>
          </section>

          {/* 철학 */}
          <section>
            <h2 className="text-xl font-black text-navy mb-4">
              부자연구소의 철학 (거창하게 말하면)
            </h2>
            <div className="space-y-4">
              <div className="bg-indigo-50 rounded-2xl p-5">
                <p className="font-black text-navy text-sm mb-1">돈 얘기는 진지하게</p>
                <p className="text-[13px] text-gray-400 leading-[1.7]">
                  계산 결과는 통계청 공식 데이터 기반입니다. 대충 만든 심리 테스트가 아니에요.
                </p>
              </div>
              <div className="bg-amber-50 rounded-2xl p-5">
                <p className="font-black text-navy text-sm mb-1">결과는 유쾌하게</p>
                <p className="text-[13px] text-gray-400 leading-[1.7]">
                  &quot;기부 천사&quot;, &quot;시급 재벌&quot;, &quot;배달앱 삭제가 첫 걸음&quot; — 현실이 씁쓸해도 웃으면서 봐야죠.
                </p>
              </div>
              <div className="bg-emerald-50 rounded-2xl p-5">
                <p className="font-black text-navy text-sm mb-1">공짜로, 가입 없이</p>
                <p className="text-[13px] text-gray-400 leading-[1.7]">
                  회원가입? 없습니다. 이메일 수집? 안 합니다. 입력한 정보는 브라우저에서만 계산되고 바로 사라져요.
                </p>
              </div>
              <div className="bg-rose-50 rounded-2xl p-5">
                <p className="font-black text-navy text-sm mb-1">광고는 좀 있어요</p>
                <p className="text-[13px] text-gray-400 leading-[1.7]">
                  서버비는 공짜가 아니거든요... 넓은 마음으로 이해해주시면 연구소장이 감동의 눈물을 흘립니다.
                </p>
              </div>
            </div>
          </section>

          {/* 도구 소개 */}
          <section>
            <h2 className="text-xl font-black text-navy mb-4">
              지금 쓸 수 있는 도구들
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-lg shrink-0">🏆</span>
                <div>
                  <p className="font-black text-navy text-sm">자산 상위 % 계산기</p>
                  <p className="text-[13px] text-gray-400 mt-0.5">
                    내 자산이 전국 상위 몇 %인지 알려드립니다. 현실을 받아들일 준비 되셨나요?
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg shrink-0">🌱</span>
                <div>
                  <p className="font-black text-navy text-sm">부자 지수(BQ) 테스트</p>
                  <p className="text-[13px] text-gray-400 mt-0.5">
                    10문항으로 나의 부자 잠재력을 진단합니다. 결과가 낮아도 원망 메일은 받지 않습니다.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg shrink-0">⏰</span>
                <div>
                  <p className="font-black text-navy text-sm">진짜 시급 계산기</p>
                  <p className="text-[13px] text-gray-400 mt-0.5">
                    출퇴근·야근까지 포함한 진짜 시급. 알고 나면 좀 화날 수 있습니다.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg shrink-0">🔥</span>
                <div>
                  <p className="font-black text-navy text-sm">FIRE 조기 은퇴 계산기</p>
                  <p className="text-[13px] text-gray-400 mt-0.5">
                    나는 몇 살에 은퇴할 수 있을까? 결과 보고 멘탈 관리는 각자 알아서...
                  </p>
                </div>
              </li>
            </ul>
          </section>

          {/* 데이터 출처 */}
          <section>
            <h2 className="text-xl font-black text-navy mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-navy-light" />
              진지한 부분 (데이터 출처)
            </h2>
            <p>
              유머는 제가 넣었지만, 데이터는 아래 기관의 공식 자료를 사용합니다.
            </p>
            <ul className="mt-3 space-y-1.5 text-[14px]">
              <li className="flex items-start gap-2">
                <span className="text-gray-300 shrink-0">&#8226;</span>
                통계청·금융감독원·한국은행 공동 발표 &apos;가계금융복지조사(2026)&apos;
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-300 shrink-0">&#8226;</span>
                고용노동부 2026년 최저임금 고시
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-300 shrink-0">&#8226;</span>
                Trinity Study(1998) 4% 인출률 연구
              </li>
            </ul>
            <p className="mt-4 text-[13px] text-gray-400 leading-[1.7]">
              계산 결과는 통계적 추정치이며, 개인의 실제 재무 상황과 다를 수 있습니다.
              이걸 근거로 사표 쓰시거나 주식 올인하시면 안 됩니다. 제발요.
            </p>
          </section>

          {/* 마무리 */}
          <section className="bg-gradient-to-br from-indigo-50 to-amber-50 rounded-3xl p-7 text-center">
            <p className="text-4xl mb-4">🧪</p>
            <p className="text-lg font-black text-navy mb-2">
              모든 부자는 처음에 궁금한 사람이었다.
            </p>
            <p className="text-[15px] text-gray-500 leading-[1.8]">
              궁금해하는 당신, 이미 반은 성공입니다.
              <br />
              (나머지 반은... 저축하세요.)
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-indigo hover:bg-indigo-dark text-white font-bold px-6 py-3 rounded-2xl mt-6 transition-colors text-sm"
            >
              도구 써보러 가기 &rarr;
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
