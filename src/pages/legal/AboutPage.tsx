import { Helmet } from "@dr.pogodin/react-helmet";
import { Link } from "react-router-dom";
import {
  Award,
  BarChart3,
  BookOpen,
  Shield,
  Target,
  Users,
} from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>연구소 소개 — 대한민국 부자연구소를 만든 이유 | 대한민국 부자연구소</title>
        <meta
          name="description"
          content="13년 차 금융 데이터 전문가가 만든 대한민국 부자연구소. 통계청 공식 데이터를 누구나 쉽게 활용할 수 있도록, 신뢰할 수 있는 무료 금융 도구를 제공합니다."
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
          <div
            className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-3xl mb-6"
            role="img"
            aria-label="연구소 소개 아이콘"
          >
            <BookOpen className="w-7 h-7 text-indigo" />
          </div>
          <h1 className="text-[28px] sm:text-[32px] font-black text-navy leading-tight">
            대한민국 부자연구소를
            <br />
            만든 이유
          </h1>
          <p className="mt-4 text-[15px] font-medium text-gray-400 leading-[1.7]">
            &quot;숫자 앞에서는 누구나 평등하다&quot;
          </p>
        </div>

        {/* ── 본문 ────────────────────────────────────── */}
        <div className="space-y-10 text-[15px] font-medium text-gray-500 leading-[1.9]">
          {/* 설립 배경 */}
          <section>
            <h2 className="text-xl font-black text-navy mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo" />
              설립 배경
            </h2>
            <p>
              저는 13년간 금융 데이터 분석과 경제 통계 분야에서 일해 온
              전문가입니다. 증권사 리서치센터에서 시작해, 핀테크 스타트업의
              데이터 팀을 거치며, 수천 건의 가계 자산 데이터를 다뤄왔습니다.
            </p>
            <p className="mt-3">
              그 과정에서 한 가지 아쉬운 점을 발견했습니다. 통계청, 한국은행,
              금융감독원이 매년 방대한 양의 경제 데이터를 공개하지만, 대부분의
              사람들은 이 데이터를 자신의 상황에 적용하는 방법을 모른다는
              것입니다. &apos;내 자산이 전국에서 어느 수준인지&apos;,
              &apos;내가 실제로 시간당 얼마를 벌고 있는지&apos;, &apos;언제쯤
              경제적 자유를 달성할 수 있는지&apos; — 이런 근본적인 질문에
              답하려면 전문 지식과 데이터 분석 능력이 필요했습니다.
            </p>
          </section>

          {/* 미션 */}
          <section>
            <h2 className="text-xl font-black text-navy mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-dark" />
              우리의 미션
            </h2>
            <p>
              대한민국 부자연구소는 이 간극을 메우기 위해 만들어졌습니다.
              복잡한 통계 데이터를 누구나 1분 안에 활용할 수 있는 직관적인
              도구로 바꾸는 것이 목표입니다. 단순한 흥미 위주의 테스트가
              아니라, 실제 통계청 가계금융복지조사 원시 데이터를 기반으로
              계산하는 정확한 분석 도구를 지향합니다.
            </p>
            <p className="mt-3">
              동시에 결과를 딱딱하게 전달하지 않습니다. 유머와 위트를 더해
              결과를 보는 순간 웃음이 나오되, 그 안에 담긴 인사이트는 진지하게
              남도록 설계했습니다. &apos;돈에 대해 진지하게, 결과는
              유쾌하게&apos; — 이것이 부자연구소의 철학입니다.
            </p>
          </section>

          {/* 핵심 가치 */}
          <section>
            <h2 className="text-xl font-black text-navy mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald" />
              핵심 가치
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: BarChart3,
                  title: "데이터 기반 신뢰성",
                  desc: "모든 계산은 통계청·한국은행 공식 데이터를 기반으로 합니다. 추측이 아닌 팩트로 말합니다.",
                  color: "#6366F1",
                },
                {
                  icon: Users,
                  title: "누구나 무료로",
                  desc: "금융 리터러시는 특권이 아닙니다. 회원가입 없이, 비용 없이 모든 도구를 제공합니다.",
                  color: "#F59E0B",
                },
                {
                  icon: Shield,
                  title: "개인정보 보호",
                  desc: "입력하신 정보는 서버에 저장되지 않습니다. 브라우저에서만 계산되고 즉시 사라집니다.",
                  color: "#10B981",
                },
                {
                  icon: BookOpen,
                  title: "교육적 콘텐츠",
                  desc: "계산 결과와 함께 깊이 있는 금융 인사이트를 제공하여 경제적 의사결정을 돕습니다.",
                  color: "#F43F5E",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
                  >
                    <div
                      className="inline-flex items-center justify-center w-9 h-9 rounded-xl mb-3"
                      style={{ backgroundColor: `${item.color}12` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <h3 className="text-sm font-black text-navy mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-gray-400 leading-[1.7]">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 제공 도구 */}
          <section>
            <h2 className="text-xl font-black text-navy mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-rose" />
              제공 도구
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-lg shrink-0">🏆</span>
                <div>
                  <p className="font-black text-navy text-sm">
                    자산 상위 % 계산기
                  </p>
                  <p className="text-[13px] text-gray-400 mt-0.5">
                    2026 가계금융복지조사 기반, 나이·지역·소득별 자산 백분위 분석
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg shrink-0">🌱</span>
                <div>
                  <p className="font-black text-navy text-sm">
                    부자 지수(BQ) 테스트
                  </p>
                  <p className="text-[13px] text-gray-400 mt-0.5">
                    소비·투자·경제 지식 10문항 기반 부자 잠재력 진단
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg shrink-0">⏰</span>
                <div>
                  <p className="font-black text-navy text-sm">
                    진짜 시급 계산기
                  </p>
                  <p className="text-[13px] text-gray-400 mt-0.5">
                    출퇴근·야근·업무 연락까지 포함한 실제 시급 산출
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg shrink-0">🔥</span>
                <div>
                  <p className="font-black text-navy text-sm">
                    FIRE 조기 은퇴 계산기
                  </p>
                  <p className="text-[13px] text-gray-400 mt-0.5">
                    4% 룰 기반 경제적 자립 시점 시뮬레이션
                  </p>
                </div>
              </li>
            </ul>
          </section>

          {/* 데이터 출처 */}
          <section>
            <h2 className="text-xl font-black text-navy mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-navy-light" />
              데이터 출처 및 면책
            </h2>
            <p>
              본 서비스의 자산·소득 통계는 통계청·금융감독원·한국은행이 공동으로
              발표하는 &apos;가계금융복지조사(2026년 기준)&apos; 보도자료를
              재구성하여 사용합니다. 진짜 시급 계산기의 최저임금 정보는
              고용노동부 고시를 참조합니다.
            </p>
            <p className="mt-3">
              본 서비스에서 제공하는 모든 계산 결과는 통계적 추정치이며, 개인의
              실제 재무 상황을 정확히 반영하지 않을 수 있습니다. 투자 또는 재무
              의사결정의 최종 근거로 사용하지 마시고, 전문 금융 상담사와
              상의하시기를 권장합니다.
            </p>
          </section>

          {/* 마무리 */}
          <section className="bg-indigo-50 rounded-3xl p-7 text-center">
            <p className="text-lg font-black text-navy mb-2">
              숫자는 거짓말하지 않습니다.
            </p>
            <p className="text-[15px] text-gray-500 leading-[1.8]">
              하지만 숫자를 해석하는 방식이 당신의 미래를 바꿉니다.
              <br />
              대한민국 부자연구소가 그 해석을 돕겠습니다.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-indigo hover:bg-indigo-dark text-white font-bold px-6 py-3 rounded-2xl mt-6 transition-colors text-sm"
            >
              도구 사용하러 가기 &rarr;
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
