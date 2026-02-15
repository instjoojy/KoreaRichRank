import type { LucideIcon } from "lucide-react";
import { Minus, Plus } from "lucide-react";

interface NumberStepperProps {
  label: string;
  icon?: LucideIcon;
  value: number | "";
  min?: number;
  max?: number;
  step?: number;
  unit: string;
  accentColor?: string;
  onChange: (v: number | "") => void;
}

export default function NumberStepper({
  label,
  icon: Icon,
  value,
  min = 0,
  max = 99,
  step = 1,
  unit,
  accentColor = "#6366F1",
  onChange,
}: NumberStepperProps) {
  const numValue = typeof value === "number" ? value : 0;

  const handleDecrement = () => {
    const next = Math.max(min, numValue - step);
    onChange(next);
  };

  const handleIncrement = () => {
    const next = Math.min(max, numValue + step);
    onChange(next);
  };

  const handleInput = (raw: string) => {
    if (raw === "") {
      onChange("");
      return;
    }
    const num = Number(raw);
    if (!isNaN(num)) onChange(Math.max(min, Math.min(max, num)));
  };

  return (
    <div>
      <label className="block text-[15px] font-bold text-navy mb-3 flex items-center gap-1.5">
        {Icon && <Icon className="w-3.5 h-3.5 text-gray-400" />}
        {label}
      </label>
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Minus button */}
        <button
          type="button"
          onClick={handleDecrement}
          disabled={numValue <= min}
          className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl border border-gray-200 bg-[#F9FAFB] flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:border-gray-300"
          style={{ color: accentColor }}
        >
          <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Number input */}
        <div className="flex-1 relative min-w-0">
          <input
            type="number"
            inputMode="numeric"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => handleInput(e.target.value)}
            onBlur={() => {
              if (value === "") return;
              onChange(Math.max(min, Math.min(max, numValue)));
            }}
            className="w-full border border-gray-200 rounded-2xl px-3 py-3.5 sm:px-4 sm:py-4 text-center text-lg sm:text-xl font-black text-navy bg-[#F9FAFB] placeholder:text-gray-300 placeholder:font-medium transition-all duration-200 focus:ring-2 focus:ring-offset-0 focus:outline-none"
            style={{
              // @ts-expect-error CSS custom property
              "--tw-ring-color": `${accentColor}40`,
            }}
          />
          <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm sm:text-[15px] pointer-events-none">
            {unit}
          </span>
        </div>

        {/* Plus button */}
        <button
          type="button"
          onClick={handleIncrement}
          disabled={numValue >= max}
          className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl border border-gray-200 bg-[#F9FAFB] flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:border-gray-300"
          style={{ color: accentColor }}
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}
