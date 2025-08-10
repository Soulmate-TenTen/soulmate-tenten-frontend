import { useEffect } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { ChatMessage } from './type';
import { useChatStore } from '../../store/useChatStore';
import { chat, resetChatMemory } from './api';
import { useSession } from 'next-auth/react';
import { Mode } from './type';

/* 스트리밍 속도 조절을 위한 유틸리티 함수 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/* 입력창 크기 조절 훅 */
export function useResizeInput(
  textareaRef: React.RefObject<HTMLTextAreaElement | null>,
  input: string
): void {
  useEffect(() => {
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
  }, [input, textareaRef]);
}

/* 채팅 호출 함수 */
export async function invoke(memberId: number, question: string, useStream: boolean): Promise<void> {
  const { addMessage, updateLastMessage, setIsLoading, setRoadId, setAbortController, abortCurrentRequest } = useChatStore.getState();

  abortCurrentRequest(); // 기존 요청 중단 
  const controller = new AbortController(); // 새로운 AbortController 생성
  setAbortController(controller);

  const userMessage: ChatMessage = {
    role: 'user',
    content: [{ type: 'text', text: question }]
  };
  addMessage(userMessage);

  setIsLoading(true);
  
  const assistantMessage: ChatMessage = {
    role: 'assistant',
    content: [{ type: 'text', text: '' }]
  };
  addMessage(assistantMessage);

  if (useStream) {
    return await fetchEventSource('/api/chatting/sse/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
        'x-api-route': 'true'
      },
      body: JSON.stringify({
        question: question,
        memberId: memberId
      }),
      signal: controller.signal, // AbortController signal 추가
      async onmessage(event) {
        if (event.data && event.data !== '[DONE]') {
          try {
            const parsed = JSON.parse(event.data);
            if (parsed.message && parsed.message.content) {
              const content = parsed.message.content;
              await delay(30);
              updateLastMessage(content);
            }
          } catch (error) {
            console.error('Failed to parse streaming data:', error);
          }
        }
      },
      onerror(err) {
        console.error('Chat API Error:', err);
        setIsLoading(false);
      },
      onclose() {
        setIsLoading(false);
      },
    });
  } else {
    try {
      const response = await chat(memberId, question, controller.signal); // signal 전달
      updateLastMessage(response.message);
      setRoadId(response.roadId);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }
}

/* 스크롤 훅 */
export function useScrollToBottom(
  scrollRef: React.RefObject<HTMLDivElement | null>,
  messages: ChatMessage[]
): void {
  useEffect(() => {
    const containerElement = scrollRef.current;
    if (!containerElement) return;
    containerElement.scrollTop = containerElement.scrollHeight;
  }, [messages, scrollRef]);
}

export function useInitChat(mode: Mode) {
  const { resetStore, abortCurrentRequest } = useChatStore.getState();
  const { data: session } = useSession();

  useEffect(() => {
    resetStore();
    
    return () => {
      abortCurrentRequest();
      if (mode === Mode.CHAT) {
        resetChatMemory(Number(session?.user?.id));
      }
    }
  }, [mode, session?.user?.id]);
}