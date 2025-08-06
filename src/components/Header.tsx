"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface HeaderProps {
    title: string;
}

export default function Header({ title }: HeaderProps) {
    const router = useRouter();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4">
            <Image 
                className="cursor-pointer" 
                src="/back-icon.svg" 
                width={32} 
                height={32} 
                alt="뒤로" 
                onClick={() => router.back()} 
            />
            <h1 className="text-[#FFFFF6] font-semibold text-base leading-[1.44] text-center flex-1">{title}</h1>
            <div className="w-8"></div>
        </header>
    );
}