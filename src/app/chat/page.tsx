"use client";
import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getTodayDate } from "@/lib/utils";
import { useChatStore } from "@/store/useChatStore";
import { useScrollToBottom } from "./model";
import Message from "./_components/Message";
import ChatInput from "./_components/Input";
import ReportPage from "./_components/Report";
import { LongButton } from "@/components/buttons";

enum Mode {
  CHAT = "chat",
  REPORT = "report",
}

export default function ChatPage() {
  const { messages, clearMessages } = useChatStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState(Mode.CHAT);

  useEffect(() => clearMessages(), []);
  useEffect(() => {
    clearMessages();
  }, [clearMessages]);

  useEffect(() => {
    if (messages.length > 10) {
      setMode(Mode.REPORT);
    }
  }, [messages]);
  useScrollToBottom(scrollRef, messages);
  
  return (
    <div className="flex flex-col h-screen">
      <Header title={getTodayDate()} />

      {/* 채팅 메시지 영역 */}
      {mode === Mode.CHAT ? (
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 chat-scroll-area" ref={scrollRef}>
          {messages.map((message, index) => (
            <Message
              key={index}
              content={[{ type: 'text', text: message.content[0].text }]}
              role={message.role}
              isLastMessage={index === messages.length - 1}
            />
          ))}
          {messages.length > 3 && <LongButton onClick={() => setMode(Mode.REPORT)}>오늘의 선택에 대한 리포트가 도착했어요</LongButton>}
        </div>) : <ReportPage />
      }

      {/* 메시지 입력 영역 */}
      {mode === Mode.CHAT ? <ChatInput /> : <Footer />}
    </div>
  );
}
