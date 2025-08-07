import { useEffect } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { ChatRequest } from './type';
import { useChatStore } from '../../store/useChatStore';

/* 스트리밍 속도 조절을 위한 유틸리티 함수 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/* 채팅 호출 함수 */
export async function invoke(message: string): Promise<void> {
  const { addMessage } = useChatStore.getState();
  addMessage({
    role: 'user',
    content: [{ type: 'text', text: message }]
  });
  stream({
    messages: [{
      role: 'user',
      content: [{ type: 'text', text: message }]
    }]
  });
}

/* 입력창 크기 조절 훅 */
export function useResizeInput(
  textareaRef: React.RefObject<HTMLTextAreaElement>,
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
  }, [input]);
}

/* 스트리밍 함수 */
export async function stream(data: ChatRequest): Promise<void> {
  const apiKey = process.env.NEXT_PUBLIC_CLOVA_API_KEY;
  const requestId = crypto.randomUUID();
  const { addMessage, updateLastMessage, setIsLoading } = useChatStore.getState();

  setIsLoading(true);
  
  const assistantMessage: any = {
    role: 'assistant',
    content: [{ type: 'text', text: '' }]
  };
  addMessage(assistantMessage);

  return await fetchEventSource('/api/clova/v3/chat-completions/HCX-DASH-002', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'X-NCP-CLOVASTUDIO-REQUEST-ID': requestId,
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream',
    },
    body: JSON.stringify({
      messages: data.messages,
      topP: data.topP || 0.8,
      topK: data.topK || 0,
      maxTokens: data.maxTokens || 256,
      temperature: data.temperature || 0.5,
      repetitionPenalty: data.repetitionPenalty || 1.1,
      stop: data.stop || [],
      seed: data.seed || 0,
      includeAiFilters: data.includeAiFilters !== false,
    }),
    async onmessage(event) {
      if (event.event === 'token' && event.data && event.data !== '[DONE]') {
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
}