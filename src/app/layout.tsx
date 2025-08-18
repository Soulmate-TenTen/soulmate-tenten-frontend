import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@/app/globals.css";

import Head from "./head";
import QueryClientProvider from "./QueryClientProvider";
import NextAuthProvider from "./NextAuthProvider";
import { LoadingProvider } from "./LoadingProvider";

export const metadata = {
  manifest: "/manifest.json",
  themeColor: "#000414",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SOULMATE",
  },
  icons: {
    icon: [
      { url: "star.png", sizes: "192x192", type: "image/png" },
      { url: "star.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "star.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <Head />
      <body suppressHydrationWarning={true}>
        <NextAuthProvider>
          <QueryClientProvider>
            <LoadingProvider>
              <div className="mx-auto flex w-screen max-w-[402px] flex-col bg-[#000414] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
                {children}
              </div>
              <ReactQueryDevtools />
            </LoadingProvider>
          </QueryClientProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
