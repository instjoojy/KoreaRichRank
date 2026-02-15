/// <reference types="vite/client" />

interface KakaoShareButton {
  objectType: "feed";
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: { mobileWebUrl: string; webUrl: string };
  };
  buttons?: {
    title: string;
    link: { mobileWebUrl: string; webUrl: string };
  }[];
}

interface KakaoShare {
  sendDefault(settings: KakaoShareButton): void;
}

interface Kakao {
  init(key: string): void;
  isInitialized(): boolean;
  Share: KakaoShare;
}

interface Window {
  Kakao?: Kakao;
}
