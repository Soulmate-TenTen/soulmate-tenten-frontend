"use client";
import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import { LongButton } from "@/components/buttons";
import { getTodayDate } from "@/lib/utils";
import { ChatMessage } from "../type";
import Message from "../_components/Message";
import { useScrollToBottom, useGetChatHistory } from "../model";

// 채팅 데이터 타입 정의
interface ChatData {
  message: string;
  chatType: 'M' | 'A';
}

export default function ChatPage() {
  const { id } = useParams();
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: chatHistoryData } = useGetChatHistory(Number(id));

  useEffect(() => {
    if (!chatHistoryData) return;
    
    const chatList = chatHistoryData?.chattingList || [];
    
    if (Array.isArray(chatList) && chatList.length > 0) {
      const convertedHistory: ChatMessage[] = chatList
        .filter((chat: ChatData) => chat.message && chat.message !== 'REPORT') // REPORT 메시지 제외
        .map((chat: ChatData) => ({
          role: chat.chatType === 'M' ? 'user' : 'assistant',
          content: [{ type: 'text', text: chat.message }]
        }));
      
      setChatHistory(convertedHistory);
    } else {
      setChatHistory([]);
    }
  }, [chatHistoryData]);

  useScrollToBottom(scrollRef, chatHistory);

  return (
    <div className="flex flex-col h-screen">
      <Header title={getTodayDate()} />

      {/* 채팅 메시지 영역 */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 chat-scroll-area" ref={scrollRef}>
        {chatHistory.length > 0 && (
          chatHistory.map((message, index) => (
            <Message
              key={index}
              content={message.content}
              role={message.role}
            />
          ))
        )}
        <LongButton onClick={() => router.back()}>확인</LongButton>
      </div>
    </div>
  );
}