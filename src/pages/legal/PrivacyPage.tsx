import { Helmet } from "@dr.pogodin/react-helmet";
import { Link } from "react-router-dom";

export default function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>개인정보처리방침 | 대한민국 부자연구소</title>
        <meta
          name="description"
          content="대한민국 부자연구소(korearichlab.com)의 개인정보 수집·이용·보호에 관한 방침입니다."
        />
        <link rel="canonical" href="https://korearichlab.com/privacy" />
      </Helmet>

      <div className="max-w-[600px] mx-auto px-5 py-16 sm:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm font-bold text-gray-400 hover:text-indigo mb-8 transition-colors"
        >
          &larr; 홈으로
        </Link>

        <h1 className="text-[28px] sm:text-[32px] font-black text-navy mb-10">
          개인정보처리방침
        </h1>

        <div className="space-y-8 text-[15px] font-medium text-gray-500 leading-[1.8]">
          <section>
            <h2 className="text-lg font-black text-navy mb-3">
              제1조 (개인정보의 처리 목적)
            </h2>
            <p>
              대한민국 부자연구소(이하 &quot;서비스&quot;, 웹사이트:
              korearichlab.com)는 다음의 목적을 위해 최소한의 개인정보를
              처리합니다.
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>서비스 이용 통계 분석 및 품질 개선</li>
              <li>광고 게재 및 마케팅(Google AdSense)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black text-navy mb-3">
              제2조 (수집하는 개인정보 항목)
            </h2>
            <p>
              본 서비스는 회원가입 절차가 없으며, 이용자가 입력하는 정보(나이,
              자산, 소득 등)는 서버에 저장되지 않고 브라우저에서만 처리됩니다.
            </p>
            <p className="mt-2">
              다만, 서비스 이용 과정에서 다음의 정보가 자동으로 수집될 수
              있습니다.
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>접속 IP 주소, 브라우저 종류, 운영체제 정보</li>
              <li>방문 일시, 페이지 조회 기록</li>
              <li>쿠키(Cookies) 정보</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black text-navy mb-3">
              제3조 (쿠키의 사용)
            </h2>
            <p>
              본 서비스는 Google AdSense 및 Google Analytics를 통해 쿠키를
              사용할 수 있습니다. 쿠키는 이용자의 브라우저에 저장되는 소량의
              데이터로, 서비스 이용 통계 수집 및 맞춤형 광고 제공에
              활용됩니다.
            </p>
            <p className="mt-2">
              이용자는 브라우저 설정을 통해 쿠키를 거부하거나 삭제할 수
              있습니다. 다만, 쿠키를 거부할 경우 서비스의 일부 기능이 제한될
              수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-navy mb-3">
              제4조 (제3자 제공)
            </h2>
            <p>
              서비스는 이용자의 개인정보를 외부에 제공하지 않습니다. 다만,
              다음의 경우에는 예외로 합니다.
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>법령에 의거하여 수사 목적으로 관계 기관의 요구가 있는 경우</li>
              <li>Google AdSense 등 광고 파트너에 의한 쿠키 기반 비식별 정보 수집</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black text-navy mb-3">
              제5조 (개인정보의 보유 및 파기)
            </h2>
            <p>
              본 서비스는 회원가입 기능이 없으므로 별도의 개인정보를 서버에
              보유하지 않습니다. 자동 수집되는 접속 로그는 통계 분석 후 최대
              1년간 보관한 뒤 파기합니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-navy mb-3">
              제6조 (이용자의 권리)
            </h2>
            <p>
              이용자는 언제든지 자신의 개인정보 수집·이용·제공에 대해 동의를
              철회할 수 있으며, 브라우저 쿠키를 삭제함으로써 추적을 중단할 수
              있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-navy mb-3">
              제7조 (개인정보 보호책임자)
            </h2>
            <p>
              서비스의 개인정보 보호에 관한 문의사항은 아래로 연락해주시기
              바랍니다.
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>서비스명: 대한민국 부자연구소</li>
              <li>웹사이트: korearichlab.com</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black text-navy mb-3">
              제8조 (방침의 변경)
            </h2>
            <p>
              본 개인정보처리방침이 변경될 경우, 변경 사항을 웹사이트에
              공지하며, 변경된 방침은 공지일로부터 7일 후 효력이
              발생합니다.
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
