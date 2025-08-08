"use client";
import { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getTodayDate } from "@/lib/utils";
import { useChatStore } from "@/store/useChatStore";
import Message from "./_components/Message";
import ChatInput from "./_components/Input";
import ReportPage from "./_components/Report";
import { LongButton } from "@/components/buttons";
import { useScrollToBottom, initChat } from "./model";
import { Mode } from "./type";

export default function ChatPage() {
  const { messages } = useChatStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState(Mode.CHAT);

  initChat(mode);
  useScrollToBottom(scrollRef, messages);
  
  return (
    <div className="flex flex-col h-screen">
      <Header title={getTodayDate()} />

      {/* 채팅 메시지 영역 */}
      {mode === Mode.CHAT ? (
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 chat-scroll-area" ref={scrollRef}>
          {messages
            .filter((message) => message.content[0].text !== "REPORT")
            .map((message, index) => (
              <Message
                key={index}
                content={[{ type: 'text', text: message.content[0].text }]}
                role={message.role}
                isLastMessage={index === messages.filter(m => m.content[0].text !== "REPORT").length - 1}
              />
            ))}
          {messages.length > 0 && messages[messages.length - 1].content[0].text === "REPORT" && (
            <LongButton onClick={() => setMode(Mode.REPORT)}>오늘의 선택에 대한 리포트가 도착했어요</LongButton>
          )}
        </div>) : <ReportPage />
      }

      {/* 메시지 입력 영역 */}
      {mode === Mode.CHAT ? <ChatInput /> : <Footer />}
    </div>
  );
}
