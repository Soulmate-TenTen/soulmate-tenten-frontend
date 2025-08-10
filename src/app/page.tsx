"use client";

import Footer from "@/components/Footer";
import useGetCount from "@/hooks/useGetCount";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { data: count } = useGetCount();
  const { data: session } = useSession();
  const router = useRouter();

  const goChat = () => {
    router.push("/chat");
  };

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formatted = `${year}년 ${month}월 ${day}일`;

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* 커스텀 애니메이션 정의 */}
      <style>
        {`
          @keyframes swayX {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(10px); }
          }
        `}
      </style>

      <div className="px-6 mt-8 flex-1 flex flex-col justify-between my-5">
        {/* 로고 */}
        <Image src="/logo.svg" width={80} height={10} alt="로고" />

        {/* 텍스트 */}
        <div className="text-[22px] text-center font-semibold">
          {session?.user.name}님과 저는 {count}번의
          <br />
          선택을 함께했어요!
        </div>

        <div className=" relative flex flex-col items-center justify-center">
          {/* 말풍선 */}
          <div className="relative">
            <div className="absolute mt-3.5 ml-2 text-[14px] text-[#343434] font-semibold">오늘은 {formatted}이에요.</div>
            <Image className="ml-[-10%]" src="/home-chat.svg" width={233} height={63} alt={`오늘은 ${formatted}이에요.`} />
          </div>
          {/* 캐릭터 */}
          <Image className="ml-[40%] mt-10 [animation:swayX_2s_ease-in-out_infinite]" src="/home-char.svg" width={158} height={146} alt="캐릭터" />
        </div>

        {/* 채팅 바로가기 */}
        <div className="w-full flex justify-between items-center gap-5 p-4 mx-auto bg-[#27272A] rounded-xl cursor-pointer" onClick={goChat}>
          <Image src="/star.svg" width={50} height={50} alt="별 캐릭터" />
          <div>
            <p className="font-bold">오늘은 어떤 선택이 있으신가요?</p>
            <p className="text-[12px] mt-1">틀린 선택은 없어요. 저와 함께 이야기해봐요.</p>
          </div>
          <Image src="/right-arrow.svg" width={20} height={20} alt="오른쪽 화살표" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
