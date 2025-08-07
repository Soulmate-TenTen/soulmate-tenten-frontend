"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { signOut, useSession } from "next-auth/react";
import { getCount } from "./api";

export default function MyPage() {
  const { data: session } = useSession();

  const [count, setCount] = useState(0);

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  useEffect(() => {
    getCount().then((count) => setCount(count));
  }, []);

  return (
    <>
      <Header showBackButton={false} />
      <div className="flex-1 px-8 pb-20">
        <div className="mt-8">
          <div className="bg-[#FFFFF6] rounded-lg p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-[69px] h-[69px] bg-[#D9D9D9] rounded-full overflow-hidden">
                {session?.user?.image ? (
                  <Image 
                    src={session.user.image} 
                    alt={`${session.user.name}님의 프로필`}
                    width={69} 
                    height={69}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-[#D9D9D9] rounded-full flex items-center justify-center">
                    <span className="text-[#6C6C6C] text-sm">프로필</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-[#000414] font-bold text-base mb-2">
                  {session?.user?.name}님의 선택을 응원합니다!
                </h2>
                <p className="text-[#6C6C6C] text-sm">
                  함께한 선택 {count}개
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-6">
          {/* 내 가치관 및 기준 재설정 */}
          <div className="border-b border-[#252525] pb-4">
            <button className="text-[#FFFFF6] font-bold text-base text-left w-full">
              내 가치관 및 기준 재설정
            </button>
          </div>

          {/* 개인정보 동의 및 이용약관 */}
          <div className="border-b border-[#252525] pb-4">
            <button className="text-[#FFFFF6] font-bold text-base text-left w-full">
              개인정보 동의 및 이용약관
            </button>
          </div>

          {/* 버전 정보 */}
          <div className="pt-4">
            <p className="text-black font-bold text-base">
              버전 정보
            </p>
          </div>

          {/* 로그아웃 */}
          <div className="pt-8">
            <button 
              onClick={handleLogout}
              className="text-[#919191] text-sm"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <Footer />
    </>
  );
}