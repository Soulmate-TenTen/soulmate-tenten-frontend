"use client";

import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ScratchCard from "react-scratchcard-v2";
import { motion } from "motion/react";
import PageTransition from "@/components/PageTransition";
import useGetTodayAdvice from "@/hooks/useGetTodayAdvice";
import useGetRemind from "@/hooks/useGetRemind";

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [isScratched, setIsScratched] = useState(false);
  const { data: todayAdvice } = useGetTodayAdvice({ memberId: Number(session?.user.id) });
  const { data: remind } = useGetRemind({ memberId: Number(session?.user.id) });

  const getTodayKey = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };
  const storageKey = `scratch_${session?.user?.id ?? "guest"}`;

  const msUntilNextMidnight = () => {
    const now = new Date();
    const next = new Date();
    next.setHours(24, 0, 0, 0);
    return next.getTime() - now.getTime();
  };

  const goChat = () => {
    router.push(`/chat/${remind?.roadId}`);
  };

  function getMiddle(text: string) {
    const m = text.match(/^.*?님\s*(.+?)\s*고민했어요(?:\.)?$/);
    return m ? m[1].trim() : "";
  }

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      const parsed = raw ? JSON.parse(raw) : null;
      const todayKey = getTodayKey();
      if (parsed?.date === todayKey) {
        setIsScratched(true);
      } else {
        setIsScratched(false);
      }
    } catch {
      setIsScratched(false);
    }

    const timer = setTimeout(() => {
      try {
        localStorage.removeItem(storageKey);
      } catch {}
      setIsScratched(false);
    }, msUntilNextMidnight());

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id]);

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

  const handleScratchComplete = () => {
    setIsScratched(true);
    localStorage.setItem(storageKey, JSON.stringify({ date: getTodayKey() }));
  };

  const settings = {
    width,
    height: 160, // 필요에 맞게 설정
    image: "/home-scratch-card.svg",
    finishPercent: 50,
    onComplete: handleScratchComplete,
  };

  return (
    <PageTransition className="flex flex-col min-h-[100dvh]">
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
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <Image src="/logo.svg" width={80} height={10} alt="로고" />
        </motion.div>

        <div className="flex flex-col gap-3.5 mt-11">
          {/* 그라데이션 텍스트 */}
          <motion.div
            className="font-semibold text-[14px] leading-[140%] bg-clip-text text-transparent"
            style={{
              background: "radial-gradient(373.82% 375.24% at 12.42% 212.5%, #25FBFF 0%, #95EEFC 30.35%, #FFE2F8 59.13%, #84FFC1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            아직 선택하지 못한 고민들을 알려드려요.
          </motion.div>
          <div className="flex justify-between">
            {/* 고민 텍스트 */}
            <motion.div
              className="grow text-[26px]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              {session?.user.name}님,
              <br />
              {getMiddle(remind?.title || "")}
              <br />
              <div className="flex gap-8 items-center">
                <div>고민했어요.</div>
                <span>
                  <Image src="home-right-arrow.svg" width={24} height={24} alt="채팅 바로가기" onClick={goChat} />
                </span>
              </div>
            </motion.div>
            {/* 캐릭터 */}
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            >
              <Image className="[animation:swayX_2s_ease-in-out_infinite]" src="/home-char.svg" width={130} height={120} alt="캐릭터" />
            </motion.div>
          </div>
        </div>

        <div className="mt-11">
          {/* 복권 텍스트 */}
          <motion.div
            className="text-[18px] font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          >
            오늘의 조언 복권을 긁어보세요!
          </motion.div>
          {/* 복권 */}
          <motion.div
            ref={containerRef}
            className="w-full mb-4"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
          >
            {width > 0 && (
              <>
                {isScratched ? (
                  <div
                    className="w-full h-[160px] rounded-xl flex items-center justify-center bg-[url('/home-scratch-bg.svg')] bg-cover bg-center"
                    aria-label="오늘의 조언"
                  >
                    <h1 className="text-[#000414] font-bold text-center">{todayAdvice}</h1>
                  </div>
                ) : (
                  <ScratchCard {...settings}>
                    <div className="w-full h-full rounded-xl flex items-center justify-center bg-[url('/home-scratch-bg.svg')] bg-cover bg-center">
                      <h1 className="text-[#000414] font-bold text-center">{todayAdvice}</h1>
                    </div>
                  </ScratchCard>
                )}
              </>
            )}
          </motion.div>
          {/* 팁 */}
          <div className="border border-[#2F2F2F] px-2 py-1 rounded-full text-[12px] font-semibold text-center">
            <span className="font-extrabold text-[#FFFBC0]">TIP</span>&nbsp;&nbsp;&nbsp;처음 선택한 가치관과 기준은 내 정보에서 수정 가능해요!
          </div>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
}
