export default function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 transition-all duration-200 hover:shadow-2xl">
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 bg-gold-50 text-gold-dark">
        {icon}
      </div>
      <p className="text-sm font-medium text-gray-400 mb-1">{label}</p>
      <p className="text-xl font-black text-navy">{value}</p>
      <p className="text-sm font-medium text-gray-400 mt-1">{sub}</p>
    </div>
  );
}
