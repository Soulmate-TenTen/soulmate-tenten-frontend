import { useState, useRef } from "react";
import Image from "next/image";
import arrowUpIcon from "@/assets/images/arrow-up-icon.svg";
import { useResizeInput } from "../model";
import { useSession } from "next-auth/react";
import { invoke } from "../model";

export default function ChatInput() {

    const { data: session } = useSession();
    const [input, setInput] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSend = () => {
        if (input.trim() === "" || !session?.user?.id) return;
        invoke(Number(session.user.id), input, false);
        setInput("");
    };

    useResizeInput(textareaRef, input);

    return (
        <div className="bg-[#27272A] rounded-tl-[12px] rounded-tr-[12px] min-h-[111px] flex px-8 gap-2 items-center">
            <div className="flex-1 bg-white rounded-[29px] p-2 min-h-[38px] mb-[20px]">
                <textarea
                    ref={textareaRef}
                    placeholder="메시지를 입력하세요..."
                    className="w-full bg-transparent text-black focus:outline-none resize-none pr-4 pl-4"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#CBD5E0 transparent',
                        height: '22px'
                    }}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <button className="bg-[#FFFBC0] rounded-full p-2 h-[38px] mb-[20px]" onClick={handleSend}>
                <Image src={arrowUpIcon} alt="arrow-up" width={22} height={22} />
            </button>
        </div>       
    )
}