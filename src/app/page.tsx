"use client";

import { useSession, signOut } from "next-auth/react";
import Footer from "@/components/Footer";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">환영합니다!</h1>
          <p className="mb-4">안녕하세요, {session?.user?.name}님</p>
          <button 
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            로그아웃
          </button>
        </div>
        <Footer />
    </div>
  );
}
