"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {status === "authenticated" ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">환영합니다!</h1>
          <p className="mb-4">안녕하세요, {session?.user?.name}님</p>
          
          <div className="space-y-3 mb-6">
            <Link 
              href="/chat"
              className="block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              채팅 시작하기
            </Link>
            <Link 
              href="/test"
              className="block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              테스트 페이지
            </Link>
          </div>
          
          <button 
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">소울메이트 텐텐</h1>
          <p className="mb-6 text-gray-600">당신의 소울메이트를 찾아보세요</p>
          
          <div className="space-y-3">
            <Link 
              href="/login"
              className="block bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition-colors"
            >
              로그인하기
            </Link>
            <p className="text-sm text-gray-500">
              로그인하면 모든 기능을 이용할 수 있습니다
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
