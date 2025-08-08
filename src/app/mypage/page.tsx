"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { signOut, useSession } from "next-auth/react";
import { getCount, deleteUser, unsubscribeKakao } from "./api";
import { useRouter } from "next/navigation";

export default function MyPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [count, setCount] = useState(0);

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  const handleWithdrawal = async () => {
    await unsubscribeKakao();
    await deleteUser();
    signOut({ callbackUrl: "/login" });
  };

  useEffect(() => {
    getCount().then((count) => setCount(count));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header showBackButton={false} />
      <div className="flex-1 mr-[32px] ml-[32px]">
        <div className="bg-[#FFFFF6] rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-[69px] h-[69px] bg-[#D9D9D9] rounded-full overflow-hidden shadow-inner">
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
                  <span className="text-[#6C6C6C] text-sm font-medium">프로필</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-[#000414] font-bold mb-1 leading-tight">
                {session?.user?.name}님의 선택을 응원합니다!
              </h2>
              <p className="text-[#6C6C6C] text-sm font-medium">
                함께한 선택 <span className="font-semibold text-[#5A5A5A]">{count}개</span>
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-0">
          <div className="border-b border-[#3A3A3A] hover:border-[#5A5A5A] transition-all duration-200">
            <button 
              onClick={() => router.push("/onboarding")} 
              className="text-[#FFFFF6] font-normal hover:font-bold text-base text-left w-full py-5 px-1 hover:text-[#FFFFFF] hover:bg-[#1A1A1A]/30 rounded-md transition-all duration-200 ease-in-out cursor-pointer"
            >
              내 가치관 및 기준 재설정
            </button>
          </div>
          <div className="border-b border-[#3A3A3A] hover:border-[#5A5A5A] transition-all duration-200">
            <button 
              onClick={() => window.open('https://www.notion.so/2492c69bf1d2807488cec076ae4e40dd?source=copy_link', '_blank')}
              className="text-[#FFFFF6] font-normal hover:font-bold text-base text-left w-full py-5 px-1 hover:text-[#FFFFFF] hover:bg-[#1A1A1A]/30 rounded-md transition-all duration-200 ease-in-out cursor-pointer"
            >
              이용약관
            </button>
          </div>
          <div className="border-b border-[#3A3A3A] hover:border-[#5A5A5A] transition-all duration-200">
            <button 
              onClick={() => window.open('https://www.notion.so/2492c69bf1d280929cd5c649d41f6be2?source=copy_link', '_blank')}
              className="text-[#FFFFF6] font-normal hover:font-bold text-base text-left w-full py-5 px-1 hover:text-[#FFFFFF] hover:bg-[#1A1A1A]/30 rounded-md transition-all duration-200 ease-in-out cursor-pointer"
            >
              개인정보처리방침
            </button>
          </div>
          <div className="border-b border-[#3A3A3A] hover:border-[#5A5A5A] transition-all duration-200">
            <button
              onClick={handleWithdrawal}
              className="text-[#FFFFF6] font-normal hover:font-bold text-base text-left w-full py-5 px-1 hover:text-[#FFFFFF] hover:bg-[#1A1A1A]/30 rounded-md transition-all duration-200 ease-in-out cursor-pointer"
            >
              회원탈퇴
            </button>
          </div>
        </div>
      </div>
      <div className="text-center mb-[70px] mt-8">
        <button
          onClick={handleLogout}
          className="text-[#919191] hover:text-[#B8B8B8] text-sm font-normal hover:font-bold underline underline-offset-2 hover:underline-offset-4 transition-all duration-200 ease-in-out cursor-pointer"
        >
          로그아웃
        </button>
      </div>
      <Footer />
    </div>
  );
}