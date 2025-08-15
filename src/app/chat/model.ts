import { signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { ChatMessage } from './type';
import { useChatStore } from '../../store/useChatStore';
import { chat, resetChatMemory, getChatHistory } from './api';
import { useSession } from 'next-auth/react';
import { Mode } from './type';
import { useQuery } from "@tanstack/react-query";

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
export async function invoke(memberId: number, question: string, useStream: boolean=true): Promise<void> {
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
        if (event.data) {
          /* 리포트 메시지 처리 */
          if (event.data.startsWith('REPORT')) {
            updateLastMessage('REPORT');
          } else if (event.data.startsWith('roadId :')) {
            const roadId = event.data.split(':')[1]?.trim();
            setRoadId(Number(roadId));
          } else {
            /* 채팅 메시지 스트림 처리 (event.data format example)
              data:id:39a13b0f-a2ed-4780-bd3a-4405f710db17
              data:event:token
              data:data:{"message":{"role":"assistant","content":"요즘"},"finishReason":null,"created":1755269271,"seed":2821919132,"usage":null}
            */
            const lines = event.data.split('\n');
            for (const line of lines) {
              if (line.startsWith('data:')) {
                const jsonData = line.substring(5); // 'data:' 제거
                const parsed = JSON.parse(jsonData);
                if (parsed.message && parsed.message.content) {
                  const content = parsed.message.content;
                  await delay(30);
                  updateLastMessage(content);
                }
              }
            }
          }
        }
      },
      onerror() {
        signOut({ callbackUrl: '/login?error=session_expired' });
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
      signOut({ callbackUrl: '/login?error=session_expired' });
      setIsLoading(false);
    }
  }
}

/* 대화이력 조회 */
export const useGetChatHistory = (roadId: number) => {
  return useQuery({
    queryKey: ['chatHistory', roadId],
    queryFn: () => getChatHistory(roadId),
    enabled: !!roadId, // roadId가 있을 때만 실행
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
};

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
  }, [session?.user?.id]);
}