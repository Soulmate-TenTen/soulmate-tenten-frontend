import { create } from 'zustand';
import { ChatMessage } from '@/app/chat/type';

const INITIAL_MESSAGE: ChatMessage = {
  role: 'assistant',
  content: [{ type: 'text', text: "반가워요! 이렇게 시작해보세요.\n\n1. 지금 처한 상황을 간단히 설명해주세요.\n\n2. 고민되는 선택지나 조건을 알려주세요.\n\n3. SOULMATE가 함께 분석하고, 당신만의 답을 찾아드립니다.  \n\n선택은 혼자 하는 게 아니에요.\n오늘, 당신의 고민을 함께 들어줄게요." }]
};

interface ChatStore {
  messages: ChatMessage[];
  isLoading: boolean;
  roadId: number;
  abortController: AbortController | null;
  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;
  updateLastMessage: (content: string) => void;
  removeLastMessage: () => void;
  setIsLoading: (loading: boolean) => void;
  setRoadId: (roadId: number) => void;
  resetStore: () => void;
  setAbortController: (controller: AbortController | null) => void;
  abortCurrentRequest: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [INITIAL_MESSAGE],
  isLoading: false,
  roadId: 0,
  abortController: null,
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),
  updateLastMessage: (content) => set((state) => {
    if (state.messages.length === 0) return state;

    const lastMessage = state.messages[state.messages.length - 1];
    if (lastMessage.role !== 'assistant') return state;
    
    const updatedText = lastMessage.content[0].text + content;
    
    const newMessages = state.messages.map((msg, index) => {
      if (index === state.messages.length - 1) {
        return {
          ...msg,
          content: [
            {
              ...msg.content[0],
              text: updatedText
            }
          ]
        };
      }
      return msg;
    });
    
    return { messages: newMessages };
  }),
  
  removeLastMessage: () => set((state) => {
    if (state.messages.length === 0) return state;
    return {
      messages: state.messages.slice(0, -1)
    };
  }),
  
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  setRoadId: (roadId: number) => set({ roadId }),
  
  setAbortController: (controller) => set({ abortController: controller }),
  
  abortCurrentRequest: () => {
    const state = get();
    if (state.abortController) {
      state.abortController.abort();
      set({ abortController: null });
    }
  },
  
  resetStore: () => set({ 
    messages: [INITIAL_MESSAGE], 
    isLoading: false, 
    roadId: 0,
    abortController: null
  }),
}));
