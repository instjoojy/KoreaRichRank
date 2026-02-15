interface AdBannerProps {
  slot: string;
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  className?: string;
}

const MIN_HEIGHTS: Record<string, string> = {
  rectangle: "250px",
  horizontal: "90px",
  vertical: "600px",
  auto: "100px",
};

export default function AdBanner({
  slot,
  format = "auto",
  className = "",
}: AdBannerProps) {
  const isDev = import.meta.env.DEV;
  const minH = MIN_HEIGHTS[format] ?? "100px";

  return (
    <aside
      className={`ad-banner ${className}`}
      aria-label="광고"
    >
      <p className="text-center text-[11px] text-gray-300 font-medium mb-1.5 select-none">
        광고
      </p>
      {isDev ? (
        <div
          className="bg-[#F3F4F6] border-2 border-dashed border-gray-200 rounded-3xl p-4 text-center flex items-center justify-center"
          style={{ minHeight: minH }}
        >
          <div>
            <p className="text-sm text-gray-400">광고 영역 ({slot} / {format})</p>
            <p className="text-[11px] text-gray-300 font-medium mt-1">Sponsored</p>
          </div>
        </div>
      ) : (
        <div
          className="bg-[#F9FAFB] rounded-3xl overflow-hidden"
          style={{ minHeight: minH }}
        >
          <ins
            className="adsbygoogle"
            style={{ display: "block", minHeight: minH }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive="true"
          />
        </div>
      )}
    </aside>
  );
}
