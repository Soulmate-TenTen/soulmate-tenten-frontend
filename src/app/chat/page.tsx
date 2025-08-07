"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Message from "./_components/Message";
import { getTodayDate } from "@/lib/utils";
import { useState } from "react";
import ChatInput from "./_components/Input";

enum Mode {
    CHAT = "chat",
    REPORT = "report"
}

export default function ChatPage() {
    const [mode] = useState(Mode.CHAT);
    const [messages] = useState([
        {
            content: "반가워요! 결정하지 못한 일이 머릿속을 맴돌고 있다면, 저와 함께 천천히 정리해볼까요?",
            role: "assistant"
        }
    ]);

  return (
    <div className="flex flex-col h-screen bg-[#000414]">
      <Header title={getTodayDate()} />
      
      {/* 채팅 메시지 영역 */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message, index) => (
          <Message
            key={index}
            content={message.content}
            role={message.role}
          />
        ))}
      </div>

      {/* 메시지 입력 영역 */}
      {mode === Mode.CHAT ? <ChatInput /> : <Footer />}
    </div>
  );
}