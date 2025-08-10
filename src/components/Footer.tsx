"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { HomeIcon, ChatIcon, DiaryIcon, ProfileIcon } from "./Icons";

const Footer: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <footer className="sticky bottom-0 w-full bg-[#000414] border-t border-[#252525] rounded-t-xl z-50">
      <div className="max-w-md mx-auto px-8 py-4">
        <div className="flex justify-around items-center">
          {/* 홈 버튼 */}
          <div className="flex flex-col items-center space-y-1 cursor-pointer group" onClick={() => router.push("/")}>
            <div className="w-8 h-8 flex items-center justify-center">
              <HomeIcon className={`${pathname === "/" ? "text-[#FFFBC0]" : "text-[#6C6C6C]"} group-hover:text-[#FFFBC0] transition-colors`} />
            </div>
            <span className={`${pathname === "/" ? "text-[#FFFBC0]" : "text-[#6C6C6C]"} group-hover:text-[#FFFBC0] transition-colors`}>홈</span>
          </div>

          {/* 대화 버튼 */}
          <div className="flex flex-col items-center space-y-1 cursor-pointer group" onClick={() => router.push("/chat")}>
            <div className="w-8 h-8 flex items-center justify-center">
              <ChatIcon className={`${pathname === "/chat" ? "text-[#FFFBC0]" : "text-[#6C6C6C]"} group-hover:text-[#FFFBC0] transition-colors`} />
            </div>
            <span className={`${pathname === "/chat" ? "text-[#FFFBC0]" : "text-[#6C6C6C]"} group-hover:text-[#FFFBC0] transition-colors`}>대화</span>
          </div>

          {/* 다이어리 버튼 */}
          <div className="flex flex-col items-center space-y-1 cursor-pointer group" onClick={() => router.push("/diary")}>
            <div className="w-8 h-8 flex items-center justify-center">
              <DiaryIcon className={`${pathname === "/diary" ? "text-[#FFFBC0]" : "text-[#6C6C6C]"} group-hover:text-[#FFFBC0] transition-colors`} />
            </div>
            <span className={`${pathname === "/diary" ? "text-[#FFFBC0]" : "text-[#6C6C6C]"} group-hover:text-[#FFFBC0] transition-colors`}>
              다이어리
            </span>
          </div>

          {/* 내 정보(마이페이지) 버튼 */}
          <div className="flex flex-col items-center space-y-1 cursor-pointer group" onClick={() => router.push("/mypage")}>
            <div className="w-8 h-8 flex items-center justify-center">
              <ProfileIcon
                className={`${pathname === "/mypage" ? "text-[#FFFBC0]" : "text-[#6C6C6C]"} group-hover:text-[#FFFBC0] transition-colors`}
              />
            </div>
            <span className={`${pathname === "/mypage" ? "text-[#FFFBC0]" : "text-[#6C6C6C]"} group-hover:text-[#FFFBC0] transition-colors`}>
              내 정보
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
