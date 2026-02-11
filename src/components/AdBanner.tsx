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
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-sm text-gray-400">
          광고 영역 ({slot} / {format})
        </div>
      ) : (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
}
