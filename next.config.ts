import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
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
    ];
  },
};

export default nextConfig;
