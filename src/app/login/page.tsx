"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import kakaoIcon from "../../assets/images/kakao-icon.png";
import title from "../../assets/images/title.svg";
import character from "../../assets/images/character.gif";
import { motion } from "motion/react";
import PageTransition from "@/components/PageTransition";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const [showError, setShowError] = useState(false);
  
  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'session_expired') {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  }, [searchParams]);

  return (
    <PageTransition className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center justify-center flex-1 px-8">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image src={title} alt="소울메이트 로고" />
        </motion.div>
        
        <motion.div 
          className="text-center mb-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <p className="text-[#FFFFF6] text-base leading-relaxed font-suit font-bold">
            후회를 줄이고 싶은 사람들을 위한,
            <br />
            결정의 순간을 함께하는 단 하나의 파트너
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <Image src={character} alt="소울메이트 캐릭터" />
        </motion.div>
        
        <motion.div 
          className="relative z-10"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={() => signIn("kakao", { callbackUrl: "/login-redirect" })}
            className="w-[338px] h-[46px] bg-[#FFEC45] mt-[43px] hover:bg-[#FFE600] text-[#3C1E1E] font-extrabold rounded-[30px] transition-colors duration-200 flex items-center justify-center shadow-lg cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Image src={kakaoIcon} alt="카카오 아이콘" width={16} height={16} className="w-4 h-4" />
              <span className="text-base font-extrabold font-suit">카카오로 시작하기</span>
            </div>
          </button>
        </motion.div>
      </div>
      
      {/* 에러 알림 */}
      {showError && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-red-500/80 backdrop-blur-sm text-white text-center px-8 py-5 rounded-lg shadow-lg flex items-center justify-center gap-4">
            <svg className="w-6 h-6 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-base font-medium w-[200px]">
              세션이 만료되었습니다
            </p>
          </div>
        </motion.div>
      )}
    </PageTransition>
  );
}
