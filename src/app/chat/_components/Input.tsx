import { useState, useRef } from "react";
import Image from "next/image";
import arrowUpIcon from "@/assets/images/arrow-up-icon.svg";
import { invoke, useResizeInput } from "../model";

export default function ChatInput() {

    const [input, setInput] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSend = () => {
        if (input.trim() === "") return;
        invoke(input);
        setInput("");
    };

    useResizeInput(textareaRef as React.RefObject<HTMLTextAreaElement>, input);

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
                    onKeyDown={handleKeyDown}
                />
            </div>
            <button className="bg-[#FFFBC0] rounded-full p-2" onClick={handleSend}>
                <Image src={arrowUpIcon} alt="arrow-up" width={22} height={22} />
            </button>
        </div>       
    )
}