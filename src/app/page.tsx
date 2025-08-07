"use client";

import { useSession, signOut } from "next-auth/react";
import Footer from "@/components/Footer";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

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
