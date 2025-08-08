import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { /* 카카오톡 프로필 이미지(외부 이미지) 허용 */
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'k.kakaocdn.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/kakao/unlink',
        destination: 'https://kapi.kakao.com/v1/user/unlink',
      },
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
        has: [
          {
            type: 'header',
            key: 'x-api-route', /* next-auth랑 API 라우트 경로 충돌 방지 */
            value: 'true',
          },
        ],
      },
      // CLOVA Studio API 프록시 설정
      {
        source: '/api/clova/:path*',
        destination: 'https://clovastudio.stream.ntruss.com/:path*',
      }
    ];
  },
};

export default nextConfig;
