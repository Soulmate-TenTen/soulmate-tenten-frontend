"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import kakaoIcon from "../../assets/images/kakao-icon.png";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  
  return (
    <div className="relative min-h-screen bg-[#000414] flex flex-col items-center justify-center overflow-hidden">
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 px-8">
        {/* Logo Area */}
        <div className="text-center mb-12">
          {/* Logo Text */}
          <div className="mb-8">
            <div className="text-[#FFFFF6] font-bold text-3xl mb-1 font-pretendard">SOUL MATE</div>
          </div>
        </div>

        {/* Tagline */}
        <div className="text-center mb-16 px-4">
          <p className="text-[#FFFFF6] text-base leading-relaxed font-suit font-bold">
            후회를 줄이고 싶은 사람들을 위한,<br />
            결정의 순간을 함께하는 단 하나의 파트너
          </p>
        </div>

        {/* Kakao Login Button */}
        <div className="relative z-10">
          <button 
            onClick={() => signIn("kakao", { callbackUrl: callbackUrl || "/" })}
            className="w-[338px] h-[46px] bg-[#FFEC45] hover:bg-[#FFE600] text-[#3C1E1E] font-extrabold rounded-[30px] transition-colors duration-200 flex items-center justify-center gap-3 shadow-lg"
          >
            <div className="flex items-center gap-2">
              <Image 
                src={kakaoIcon} 
                alt="카카오 아이콘" 
                width={16} 
                height={16}
                className="w-4 h-4"
              />
              <span className="text-base font-extrabold font-pretendard">카카오로 시작하기</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
