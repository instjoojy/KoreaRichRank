import {
  Wallet,
  MapPin,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import { formatWon } from "../utils/formatWon";

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
    <section className="bg-white rounded-3xl shadow-lg p-7 sm:p-10">
      <h2 className="text-xl font-black text-navy mb-8 flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gold-50">
          <Wallet className="w-5 h-5 text-gold-dark" />
        </div>
        내 정보 입력
      </h2>

      {/* 나이 + 지역 */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-bold text-navy mb-2.5">
            나이
          </label>
          <input
            type="number"
            min={20}
            max={99}
            value={age}
            placeholder="나이 입력"
            onChange={(e) => {
              const v = e.target.value;
              if (v === "") { onAgeChange(""); return; }
              onAgeChange(+v);
            }}
            onBlur={() => {
              if (age === "") return;
              onAgeChange(Math.max(20, Math.min(99, age)));
            }}
            className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 text-lg font-bold text-navy bg-[#F9FAFB] placeholder:text-gray-300 placeholder:font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-navy mb-2.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            거주 지역
          </label>
          <select
            value={region}
            onChange={(e) => onRegionChange(e.target.value)}
            className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 text-lg font-bold text-navy bg-[#F9FAFB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-200 appearance-none cursor-pointer"
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

      <div className="h-px bg-gray-100 my-8" />

      {/* 순자산 */}
      <div className="mb-8">
        <label className="block text-sm font-bold text-navy mb-2.5">
          순자산 (자산 - 부채)
        </label>
        <div className="flex items-center gap-2.5 mb-4">
          <input
            type="number"
            value={assetEok}
            onChange={(e) => onAssetEokChange(Math.max(0, +e.target.value || 0))}
            className="w-20 border border-gray-200 rounded-2xl px-3 py-3 text-center text-lg font-bold text-navy bg-[#F9FAFB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-200"
          />
          <span className="text-gray-400 font-bold text-sm">억</span>
          <input
            type="number"
            value={assetMan}
            step={100}
            onChange={(e) => onAssetManChange(Math.max(0, Math.min(9999, +e.target.value || 0)))}
            className="w-28 border border-gray-200 rounded-2xl px-3 py-3 text-center text-lg font-bold text-navy bg-[#F9FAFB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-200"
          />
          <span className="text-gray-400 font-bold text-sm">만원</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={assetSliderPos}
          onChange={(e) => onAssetSlider(+e.target.value)}
        />
        <div className="flex justify-between text-xs font-medium text-gray-400 mt-2">
          <span>0원</span>
          <span className="font-bold text-navy bg-gold-50 px-3 py-1 rounded-full">{formatWon(netAsset)}</span>
          <span>100억+</span>
        </div>
      </div>

      {/* 연봉 */}
      <div className="mb-10">
        <label className="block text-sm font-bold text-navy mb-2.5 flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-gray-400" />
          연봉 (세전)
        </label>
        <div className="flex items-center gap-2.5 mb-4">
          <input
            type="number"
            value={incomeMan}
            step={100}
            onChange={(e) => onIncomeManChange(Math.max(0, +e.target.value || 0))}
            className="w-32 border border-gray-200 rounded-2xl px-3 py-3 text-center text-lg font-bold text-navy bg-[#F9FAFB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-200"
          />
          <span className="text-gray-400 font-bold text-sm">만원</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={incomeSliderPos}
          onChange={(e) => onIncomeSlider(+e.target.value)}
        />
        <div className="flex justify-between text-xs font-medium text-gray-400 mt-2">
          <span>0원</span>
          <span className="font-bold text-navy bg-gold-50 px-3 py-1 rounded-full">{formatWon(incomeMan)}</span>
          <span>5억+</span>
        </div>
      </div>

      {/* CTA 버튼 */}
      <button
        onClick={onCalculate}
        className="w-full group bg-gold hover:bg-gold-dark text-navy text-lg font-black py-4.5 rounded-2xl shadow-lg shadow-gold/25 transition-all duration-300 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
      >
        내 순위 계산하기
        <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </button>
    </section>
  );
}
