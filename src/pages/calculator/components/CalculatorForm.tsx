import {
  Wallet,
  MapPin,
  Briefcase,
  ChevronRight,
  User,
} from "lucide-react";
import { formatWon } from "../utils/formatWon";
import NumberStepper from "../../../components/NumberStepper";

interface CalculatorFormProps {
  age: number | "";
  region: string;
  assetEok: number;
  assetMan: number;
  incomeMan: number;
  netAsset: number;
  assetSliderPos: number;
  incomeSliderPos: number;
  regionOptions: { value: string; label: string }[];
  onAgeChange: (v: number | "") => void;
  onRegionChange: (v: string) => void;
  onAssetSlider: (pos: number) => void;
  onAssetEokChange: (v: number) => void;
  onAssetManChange: (v: number) => void;
  onIncomeSlider: (pos: number) => void;
  onIncomeManChange: (v: number) => void;
  onCalculate: () => void;
}

export default function CalculatorForm({
  age,
  region,
  assetEok,
  assetMan,
  incomeMan,
  netAsset,
  assetSliderPos,
  incomeSliderPos,
  regionOptions,
  onAgeChange,
  onRegionChange,
  onAssetSlider,
  onAssetEokChange,
  onAssetManChange,
  onIncomeSlider,
  onIncomeManChange,
  onCalculate,
}: CalculatorFormProps) {
  return (
    <section className="bg-white rounded-3xl shadow-xl p-7 sm:p-10">
      <h2 className="text-[32px] font-black text-navy mb-10 flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-50">
          <Wallet className="w-6 h-6 text-indigo" />
        </div>
        내 정보 입력
      </h2>

      {/* 나이 + 지역 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        <NumberStepper
          label="나이"
          icon={User}
          value={age}
          min={20}
          max={99}
          step={1}
          unit="세"
          accentColor="#6366F1"
          onChange={onAgeChange}
        />
        <div>
          <label className="block text-[15px] font-bold text-navy mb-3 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            거주 지역
          </label>
          <select
            value={region}
            onChange={(e) => onRegionChange(e.target.value)}
            className="w-full border border-gray-200 rounded-2xl px-4 py-4 text-lg font-bold text-navy bg-[#F9FAFB] appearance-none cursor-pointer transition-all duration-200"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%239ca3af' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 16px center",
            }}
          >
            {regionOptions.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-px bg-gray-100 my-10" />

      {/* 순자산 */}
      <div className="mb-10">
        <label className="block text-[15px] font-bold text-navy mb-3">
          순자산 (자산 - 부채)
        </label>
        <div className="flex items-center gap-2.5 mb-4">
          <input
            type="number"
            value={assetEok}
            onChange={(e) => onAssetEokChange(Math.max(0, +e.target.value || 0))}
            className="w-24 border border-gray-200 rounded-2xl px-3 py-3.5 text-center text-lg font-bold text-navy bg-[#F9FAFB] transition-all duration-200"
          />
          <span className="text-gray-400 font-bold text-[15px]">억</span>
          <input
            type="number"
            value={assetMan}
            step={100}
            onChange={(e) => onAssetManChange(Math.max(0, Math.min(9999, +e.target.value || 0)))}
            className="w-32 border border-gray-200 rounded-2xl px-3 py-3.5 text-center text-lg font-bold text-navy bg-[#F9FAFB] transition-all duration-200"
          />
          <span className="text-gray-400 font-bold text-[15px]">만원</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={assetSliderPos}
          onChange={(e) => onAssetSlider(+e.target.value)}
        />
        <div className="flex justify-between text-sm font-medium text-gray-400 mt-2.5">
          <span>0원</span>
          <span className="font-bold text-navy bg-indigo-50 px-3 py-1 rounded-full">{formatWon(netAsset)}</span>
          <span>100억+</span>
        </div>
      </div>

      {/* 연봉 */}
      <div className="mb-12">
        <label className="block text-[15px] font-bold text-navy mb-3 flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-gray-400" />
          연봉 (세전)
        </label>
        <div className="flex items-center gap-2.5 mb-4">
          <input
            type="number"
            value={incomeMan}
            step={100}
            onChange={(e) => onIncomeManChange(Math.max(0, +e.target.value || 0))}
            className="w-36 border border-gray-200 rounded-2xl px-3 py-3.5 text-center text-lg font-bold text-navy bg-[#F9FAFB] transition-all duration-200"
          />
          <span className="text-gray-400 font-bold text-[15px]">만원</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={incomeSliderPos}
          onChange={(e) => onIncomeSlider(+e.target.value)}
        />
        <div className="flex justify-between text-sm font-medium text-gray-400 mt-2.5">
          <span>0원</span>
          <span className="font-bold text-navy bg-indigo-50 px-3 py-1 rounded-full">{formatWon(incomeMan)}</span>
          <span>5억+</span>
        </div>
      </div>

      {/* CTA 버튼 - 64px height, gold gradient */}
      <button
        onClick={onCalculate}
        className="w-full group bg-gradient-to-r from-indigo-light to-indigo hover:from-indigo hover:to-indigo-dark text-white text-lg font-black h-16 rounded-2xl shadow-lg shadow-indigo/25 transition-all duration-300 active:scale-[0.98] hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
      >
        내 순위 계산하기
        <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </button>
    </section>
  );
}
