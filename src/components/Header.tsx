"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface HeaderProps {
    title?: string;           /* 헤더 타이틀 */
    showBackButton?: boolean; /* 뒤로가기 버튼 표시 여부 */
}

export default function Header({ title, showBackButton = true }: HeaderProps) {
    const router = useRouter();

    return (
        <header className="sticky h-[32px] mb-[13px] mt-[13px] top-0 z-50 flex items-center justify-between px-5 py-4">
            {showBackButton ? (
                <Image 
                    className="cursor-pointer" 
                    src="/back-icon.svg" 
                    width={32} 
                    height={32} 
                    alt="뒤로" 
                    onClick={() => router.back()} 
                />
            ) : (
                <div className="w-8"></div>
            )}
            {title && (
                <h1 className="text-[#FFFFF6] font-semibold text-base leading-[1.44] text-center flex-1">{title}</h1>
            )}
            <div className="w-8"></div>
        </header>
    );
}