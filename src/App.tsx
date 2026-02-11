import { Calculator } from "lucide-react";
import AdBanner from "./components/AdBanner";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 상단 광고 */}
      <AdBanner slot="top-banner" className="w-full" />

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* 헤더 */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            대한민국 자산 상위 % 계산기
          </h1>
          <p className="mt-2 text-gray-500">
            내 자산은 상위 몇 %일까?
          </p>
        </header>

        {/* 계산기 영역 (추후 구현) */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <p className="text-center text-gray-400">
            계산기 컴포넌트가 여기에 들어갑니다.
          </p>
        </div>

        {/* 하단 광고 */}
        <AdBanner slot="bottom-banner" className="mt-8 w-full" />
      </div>
    </div>
  );
}

export default App;
