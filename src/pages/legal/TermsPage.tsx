import { Helmet } from "@dr.pogodin/react-helmet";
import { Link } from "react-router-dom";

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>이용약관 | 대한민국 부자연구소</title>
        <meta
          name="description"
          content="대한민국 부자연구소(korearichlab.com)의 서비스 이용약관입니다."
        />
        <link rel="canonical" href="https://korearichlab.com/terms" />
      </Helmet>

      <div className="max-w-[600px] mx-auto px-5 py-16 sm:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm font-bold text-gray-400 hover:text-indigo mb-8 transition-colors"
        >
          &larr; 홈으로
        </Link>

        <h1 className="text-[28px] sm:text-[32px] font-black text-navy mb-10">
          이용약관
        </h1>

        <div className="space-y-8 text-[15px] font-medium text-gray-500 leading-[1.8]">
          <section>
            <h2 className="text-lg font-black text-navy mb-3">
              제1조 (목적)
            </h2>
            <p>
              본 약관은 대한민국 부자연구소(이하 &quot;서비스&quot;)가
              제공하는 웹사이트(korearichlab.com) 및 관련 서비스의 이용 조건과
              절차, 이용자와 서비스 간의 권리·의무 및 책임사항을 규정함을
              목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-navy mb-3">
              제2조 (정의)
            </h2>
            <p>
              1. &quot;서비스&quot;란 대한민국 부자연구소가 운영하는 웹사이트
              및 이를 통해 제공하는 금융 분석 도구(자산 순위 계산기, 부자 지수
              테스트, 진짜 시급 계산기, FIRE 은퇴 계산기 등)를 말합니다.
            </p>
            <p className="mt-2">
              2. &quot;이용자&quot;란 본 서비스에 접속하여 본 약관에 따라
              서비스를 이용하는 모든 자를 말합니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-navy mb-3">
              제3조 (약관의 효력 및 변경)
            </h2>
            <p>
              1. 본 약관은 서비스를 이용하고자 하는 모든 이용자에 대해
              효력이 발생합니다.
            </p>
            <p className="mt-2">
              2. 서비스는 관련 법령에 위배되지 않는 범위에서 본 약관을 변경할
              수 있으며, 변경된 약관은 웹사이트에 공지함으로써 효력이
              발생합니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-navy mb-3">
              제4조 (서비스의 제공 및 제한)
            </h2>
            <p>
              1. 서비스는 통계청 공개 데이터를 기반으로 한 금융 분석 도구를
              무료로 제공합니다.
            </p>
            <p className="mt-2">
              2. 본 서비스에서 제공하는 계산 결과 및 분석 내용은 통계적
              추정치이며, 개인의 실제 자산 상태나 재무 상황을 정확히 반영하지
              않을 수 있습니다. 투자·재무 의사결정의 근거로 사용해서는 안
              됩니다.
            </p>
            <p className="mt-2">
              3. 서비스는 시스템 점검, 장비 교체, 기타 운영상의 이유로 일시적
              중단될 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-navy mb-3">
              제5조 (이용자의 의무)
            </h2>
            <p>
              1. 이용자는 서비스를 이용함에 있어 관련 법령 및 본 약관을
              준수해야 합니다.
            </p>
            <p className="mt-2">
              2. 이용자는 서비스의 콘텐츠를 무단으로 복제·배포·수정하여
              상업적으로 이용할 수 없습니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-navy mb-3">
              제6조 (면책조항)
            </h2>
            <p>
              1. 서비스는 제공되는 정보의 정확성, 완전성, 적시성을 보장하지
              않으며, 이용자가 서비스를 통해 얻은 정보에 의한 투자 손실 등에
              대해 책임을 지지 않습니다.
            </p>
            <p className="mt-2">
              2. 서비스는 천재지변, 시스템 장애 등 불가항력적 사유로 인한
              서비스 중단에 대해 책임을 지지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-navy mb-3">
              제7조 (광고 게재)
            </h2>
            <p>
              서비스는 운영을 위해 서비스 페이지 내에 Google AdSense 등
              제3자 광고를 게재할 수 있으며, 이용자는 서비스 이용 시 노출되는
              광고에 대해 동의한 것으로 간주합니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-navy mb-3">
              제8조 (준거법 및 관할)
            </h2>
            <p>
              본 약관은 대한민국 법률에 따라 해석되며, 서비스 이용과 관련하여
              발생하는 분쟁에 대해서는 민사소송법에 따른 관할법원을 전속적
              관할법원으로 합니다.
            </p>
          </section>

          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-400">
              시행일: 2025년 1월 1일
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
