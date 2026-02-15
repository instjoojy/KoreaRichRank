export default function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-5 py-3">
      <p className="text-sm font-bold text-navy">{label}</p>
      <p className="text-sm font-medium text-gray-500">
        전체 가구의 <span className="font-bold text-navy">{payload[0].value}%</span>
      </p>
    </div>
  );
}
