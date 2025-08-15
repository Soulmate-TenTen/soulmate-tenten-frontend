"use client";
import { useState, useRef } from "react";
import { motion } from "motion/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getTodayDate } from "@/lib/utils";
import { useChatStore } from "@/store/useChatStore";
import Message from "./_components/Message";
import ChatInput from "./_components/Input";
import ReportPage from "./_components/Report";
import { LongButton } from "@/components/buttons";
import { useScrollToBottom, useInitChat } from "./model";
import { Mode } from "./type";
import PageTransition from "@/components/PageTransition";

export default function ChatPage() {
  const { messages } = useChatStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState(Mode.CHAT);

  useInitChat(mode);
  useScrollToBottom(scrollRef, messages);
  
  return (
    <PageTransition className="flex flex-col h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Header title={getTodayDate()} />
      </motion.div>

      {/* 채팅 메시지 영역 */}
      {mode === Mode.CHAT ? (
        <motion.div 
          className="flex-1 overflow-y-auto px-4 py-6 space-y-4 chat-scroll-area" 
          ref={scrollRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          {messages
            .filter((message) => message.content[0].text !== "REPORT")
            .map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: message.role === "user" ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1,
                  ease: "easeOut" 
                }}
              >
                <Message
                  content={[{ type: 'text', text: message.content[0].text }]}
                  role={message.role}
                  isLastMessage={index === messages.filter(m => m.content[0].text !== "REPORT").length - 1}
                />
              </motion.div>
            ))}
          {messages.length > 0 && messages[messages.length - 1].content[0].text === "REPORT" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <LongButton onClick={() => setMode(Mode.REPORT)}>오늘의 선택에 대한 리포트가 도착했어요</LongButton>
            </motion.div>
          )}
        </motion.div>) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <ReportPage />
          </motion.div>
        )
      }

      {/* 메시지 입력 영역 */}
      { messages[messages.length -1].content[0].text !== "REPORT" && (mode === Mode.CHAT ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        >
          <ChatInput />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Footer />
        </motion.div>
      ))}
    </PageTransition>
  );
}
