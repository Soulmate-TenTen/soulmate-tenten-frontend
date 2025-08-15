"use client";

import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ScratchCard from "react-scratchcard-v2";

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  const goChat = () => {
    router.push("/chat");
  };

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    width,
    height: 160, // 필요에 맞게 설정
    image: "/home-scratch-card.svg",
    finishPercent: 50,
    onComplete: () => console.log("Completed!"),
  };

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

        <div className="flex flex-col gap-3.5 mt-11">
          {/* 그라데이션 텍스트 */}
          <div
            className="font-semibold text-[14px] leading-[140%] bg-clip-text text-transparent"
            style={{
              background: "radial-gradient(373.82% 375.24% at 12.42% 212.5%, #25FBFF 0%, #95EEFC 30.35%, #FFE2F8 59.13%, #84FFC1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            아직 선택하지 못한 고민들을 알려드려요.
          </div>
          <div className="flex justify-between">
            {/* 고민 텍스트 */}
            <div className="grow text-[26px]">
              {session?.user.name}님,
              <br />
              3일전에 퇴사를
              <br />
              <div className="flex gap-8 items-center">
                <div>고민했어요.</div>
                <span>
                  <Image src="home-right-arrow.svg" width={24} height={24} alt="채팅 바로가기" onClick={goChat} />
                </span>
              </div>
            </div>
            {/* 캐릭터 */}
            <Image className="[animation:swayX_2s_ease-in-out_infinite]" src="/home-char.svg" width={130} height={120} alt="캐릭터" />
          </div>
        </div>

        <div className="mt-11">
          {/* 복권 텍스트 */}
          <div className="text-[18px] font-bold mb-6">오늘의 조언 복권을 긁어보세요!</div>
          {/* 복권 */}
          <div ref={containerRef} className="w-full mb-4">
            {width > 0 && (
              <ScratchCard {...settings}>
                <div
                  className="w- full h-full rounded-xl flex items-center justify-center bg-[url('/home-scratch-bg.svg')] bg-cover bg-center"
                  style={{}}
                >
                  <h1 className="text-[#000414] font-bold text-center">
                    돌다리도 두들겨 보고 건너는게 필요해요.
                    <br />
                    신중하다고 나쁜 거 없는 하루에요!
                  </h1>
                </div>
              </ScratchCard>
            )}
          </div>
          {/* 팁 */}
          <div className="border border-[#2F2F2F] px-2 py-1 rounded-full text-[12px] font-semibold text-center">
            <span className="font-extrabold text-[#FFFBC0]">TIP</span>&nbsp;&nbsp;&nbsp;처음 선택한 가치관과 기준은 내 정보에서 수정 가능해요!
          </div>
        </div>

        {/* 채팅 바로가기 */}
        {/* <div className="w-full flex justify-between items-center gap-5 p-4 mx-auto bg-[#27272A] rounded-xl cursor-pointer" onClick={goChat}>
          <Image src="/star.svg" width={50} height={50} alt="별 캐릭터" />
          <div>
            <p className="font-bold">오늘 어떤 선택이 있나요?</p>
            <p className="text-[12px] mt-1">저와 함께 이야기해봐요!</p>
          </div>
          <Image src="/right-arrow.svg" width={20} height={20} alt="오른쪽 화살표" />
        </div> */}
      </div>
      <Footer />
    </div>
  );
}
