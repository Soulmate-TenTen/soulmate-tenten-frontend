// next-pwa.d.ts
declare module "next-pwa" {
  import type { NextConfig } from "next";

  export interface RuntimeCachingHandlerParams {
    url: URL;
    request: Request;
    event?: ExtendableEvent;
  }

  export interface RuntimeCachingOption {
    urlPattern: RegExp | ((options: RuntimeCachingHandlerParams) => boolean);
    handler: "CacheFirst" | "NetworkFirst" | "StaleWhileRevalidate";
    options?: {
      cacheName?: string;
      expiration?: {
        maxEntries?: number;
        maxAgeSeconds?: number;
      };
      networkTimeoutSeconds?: number;
    };
  }

  export interface PWAConfig {
    dest: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    buildExcludes?: RegExp[];
    runtimeCaching?: RuntimeCachingOption[];
    [key: string]: unknown;
  }

  export default function withPWA(config: PWAConfig): (nextConfig: NextConfig) => NextConfig;
}
