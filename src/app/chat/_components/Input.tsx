import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import arrowUpIcon from "@/assets/images/arrow-up-icon.svg";

export default function ChatInput() {

    const [input, setInput] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = '22px'; // 한 줄 높이로 초기화 (line-height 20px + 패딩 고려)
            const scrollHeight = textareaRef.current.scrollHeight;
            const lineHeight = 20; // 실제 줄 높이
            const maxHeight = lineHeight * 3; // 3줄까지
            
            if (scrollHeight > maxHeight) {
                textareaRef.current.style.height = maxHeight + 'px';
                textareaRef.current.style.overflowY = 'auto';
            } else {
                textareaRef.current.style.height = scrollHeight + 'px';
                textareaRef.current.style.overflowY = 'hidden';
            }
        }
    };

    useEffect(() => {
        adjustHeight();
    }, [input]);

    return (
        <div className="bg-[#27272A] rounded-tl-[12px] rounded-tr-[12px] h-[111px] flex items-center px-8 gap-2">
            <div className="flex-1 bg-white rounded-[29px] p-2 relative overflow-hidden">
                <textarea
                    ref={textareaRef}
                    placeholder="메시지를 입력하세요..."
                    className="w-full bg-transparent text-black h-[22px] focus:outline-none resize-none text-sm leading-5 pr-4 align-middle"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#CBD5E0 transparent',
                        verticalAlign: 'middle'
                    }}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>
            <button className="bg-[#FFFBC0] rounded-full p-2">
                <Image src={arrowUpIcon} alt="arrow-up" width={22} height={22} />
            </button>
        </div>       
    )
}