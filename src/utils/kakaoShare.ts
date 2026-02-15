const KAKAO_KEY = "50b0bd620c60846528260bc97eb320d7";
const SITE_URL = "https://www.korearichlab.com";
const OG_IMAGE = `${SITE_URL}/icon-192.png`;

function ensureInit() {
  const K = window.Kakao;
  if (!K) return false;
  if (!K.isInitialized()) K.init(KAKAO_KEY);
  return true;
}

interface ShareOptions {
  title: string;
  description: string;
  path: string;
  buttonText?: string;
}

export function shareKakao({ title, description, path, buttonText = "나도 해보기" }: ShareOptions) {
  if (!ensureInit()) {
    alert("카카오 SDK 로딩 중입니다. 잠시 후 다시 시도해주세요.");
    return;
  }

  const url = `${SITE_URL}${path}`;

  window.Kakao!.Share.sendDefault({
    objectType: "feed",
    content: {
      title,
      description,
      imageUrl: OG_IMAGE,
      link: { mobileWebUrl: url, webUrl: url },
    },
    buttons: [
      {
        title: buttonText,
        link: { mobileWebUrl: url, webUrl: url },
      },
    ],
  });
}
