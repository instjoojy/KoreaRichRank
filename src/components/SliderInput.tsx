import { useRef, useEffect, useState, useCallback, type CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { type Stop, stopsToValue, valueToStops } from "../utils/sliderStops";

interface SliderInputProps {
  label: string;
  icon: LucideIcon;
  unit: string;
  value: number | "";
  placeholder?: string;
  min?: number;
  step?: number;
  stops: Stop[];
  accentColor: string;
  accentColorRgb: string;
  onChange: (value: number | "") => void;
  formatBadge?: (value: number) => string;
  minLabel?: string;
  maxLabel?: string;
}

export default function SliderInput({
  label,
  icon: Icon,
  unit,
  value,
  placeholder,
  min = 0,
  step = 1,
  stops,
  accentColor,
  accentColorRgb,
  onChange,
  formatBadge,
  minLabel,
  maxLabel,
}: SliderInputProps) {
  const sliderRef = useRef<HTMLInputElement>(null);
  const [badgeLeft, setBadgeLeft] = useState(0);

  const numericValue = typeof value === "number" ? value : 0;
  const sliderPos = valueToStops(numericValue, stops);
  const hasValue = value !== "" && value !== 0;

  const updateBadgePosition = useCallback(() => {
    if (!sliderRef.current) return;
    const thumbRadius = 12;
    const trackWidth = sliderRef.current.offsetWidth;
    const usable = trackWidth - thumbRadius * 2;
    setBadgeLeft(thumbRadius + (sliderPos / 100) * usable);
  }, [sliderPos]);

  useEffect(() => {
    updateBadgePosition();
  }, [updateBadgePosition]);

  useEffect(() => {
    if (!sliderRef.current) return;
    const ro = new ResizeObserver(updateBadgePosition);
    ro.observe(sliderRef.current);
    return () => ro.disconnect();
  }, [updateBadgePosition]);

  const handleSliderChange = (pos: number) => {
    onChange(stopsToValue(pos, stops));
  };

  const handleInputChange = (raw: string) => {
    if (raw === "") {
      onChange("");
      return;
    }
    const num = Number(raw);
    if (!isNaN(num)) onChange(Math.max(min, num));
  };

  const badgeText = hasValue
    ? formatBadge
      ? formatBadge(numericValue)
      : numericValue.toLocaleString("ko-KR")
    : "";

  const cssVars = {
    "--slider-color": accentColor,
    "--slider-color-rgb": accentColorRgb,
  } as CSSProperties;

  return (
    <div className="mb-1">
      {/* Label */}
      <label className="block text-[15px] font-bold text-navy mb-3 flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5 text-gray-400" />
        {label}
      </label>

      {/* Text input + unit */}
      <div className="flex items-center gap-2.5 mb-4">
        <input
          type="number"
          min={min}
          step={step}
          value={value}
          placeholder={placeholder}
          onChange={(e) => handleInputChange(e.target.value)}
          className="w-full border border-gray-200 rounded-2xl px-4 py-4 text-lg font-bold text-navy bg-[#F9FAFB] placeholder:text-gray-300 placeholder:font-medium transition-all duration-200"
        />
        <span className="text-gray-400 font-bold text-[15px] shrink-0 w-10">
          {unit}
        </span>
      </div>

      {/* Slider + floating badge */}
      <div className="relative" style={cssVars}>
        {/* Floating badge */}
        {hasValue && (
          <div
            className="absolute -top-7 -translate-x-1/2 px-2.5 py-1 rounded-full text-[11px] font-black text-white whitespace-nowrap pointer-events-none transition-all duration-150 z-10"
            style={{ left: `${badgeLeft}px`, backgroundColor: accentColor }}
          >
            {badgeText}
          </div>
        )}

        <input
          ref={sliderRef}
          type="range"
          min={0}
          max={100}
          value={sliderPos}
          onChange={(e) => handleSliderChange(+e.target.value)}
        />
      </div>

      {/* Min / Current / Max labels */}
      <div className="flex justify-between text-sm font-medium text-gray-400 mt-2.5">
        <span>{minLabel}</span>
        <span
          className="font-bold px-3 py-1 rounded-full text-xs"
          style={{
            backgroundColor: `${accentColor}15`,
            color: accentColor,
          }}
        >
          {hasValue ? (formatBadge ? formatBadge(numericValue) : `${numericValue.toLocaleString("ko-KR")}${unit}`) : `-`}
        </span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
