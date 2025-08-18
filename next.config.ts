import type { NextConfig } from "next";
import nextPWA from "next-pwa";

const isProd = process.env.NODE_ENV === "production";

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: !isProd, // 개발 모드 비활성화
  buildExcludes: [/middleware-manifest\.json$/],

  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(gstatic|googleapis)\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts",
        expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
      },
    },
    {
      urlPattern: ({ request }) => request.destination === "document",
      handler: "NetworkFirst",
      options: { cacheName: "pages", networkTimeoutSeconds: 3 },
    },
    {
      urlPattern: ({ request }) => request.destination === "script" || request.destination === "style",
      handler: "StaleWhileRevalidate",
      options: { cacheName: "assets" },
    },
    {
      urlPattern: ({ request }) => request.destination === "image",
      handler: "StaleWhileRevalidate",
      options: { cacheName: "images" },
    },

    /** API 캐싱: GET & 동일 오리진만 (next-auth/프록시와 충돌 예방) */
    {
      urlPattern: ({ url, request }) => request.method === "GET" && url.origin === self.location.origin && url.pathname.startsWith("/api/"),
      handler: "NetworkFirst",
      options: { cacheName: "api", networkTimeoutSeconds: 5 },
    },
  ],
});

const nextConfig: NextConfig = {
  images: {
    /* 카카오톡 프로필 이미지(외부 이미지) 허용 */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "k.kakaocdn.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/kakao/unlink",
        destination: "https://kapi.kakao.com/v1/user/unlink",
      },
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
        has: [
          {
            type: "header",
            key: "x-api-route" /* next-auth랑 API 라우트 경로 충돌 방지 */,
            value: "true",
          },
        ],
      },
    ];
  },
};

export default withPWA(nextConfig);
