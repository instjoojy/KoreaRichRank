interface AdBannerProps {
  slot: string;
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  className?: string;
}

export default function AdBanner({
  slot,
  format = "auto",
  className = "",
}: AdBannerProps) {
  const isDev = import.meta.env.DEV;

  return (
    <div className={`ad-banner ${className}`}>
      {isDev ? (
        <div className="bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-2xl p-4 text-center">
          <p className="text-sm text-gray-400">광고 영역 ({slot} / {format})</p>
          <p className="text-[11px] text-indigo-300 font-medium mt-1">연구소 운영에 큰 힘이 됩니다!</p>
        </div>
      ) : (
        <div>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive="true"
          />
          <p className="text-center text-[11px] text-gray-300 font-medium mt-1.5">
            연구소 운영에 큰 힘이 됩니다!
          </p>
        </div>
      )}
    </div>
  );
}
