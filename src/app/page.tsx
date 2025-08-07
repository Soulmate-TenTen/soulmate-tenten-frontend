"use client";

import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">홈 페이지</h1>
          <p className="text-sm text-gray-500">🚧공사중🚧</p>
        </div>
        <Footer />
    </div>
  );
}
