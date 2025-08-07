import { create } from 'zustand';
import { ChatMessage } from '@/app/chat/type';

const INITIAL_MESSAGE: ChatMessage = {
  role: 'assistant',
  content: [{ type: 'text', text: '반가워요! 결정하지 못한 일이 머릿속을 맴돌고 있다면, 저와 함께 천천히 정리해볼까요?' }]
};

interface ChatStore {
  messages: ChatMessage[];
  isLoading: boolean;
  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;
  updateLastMessage: (content: string) => void;
  setIsLoading: (loading: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [INITIAL_MESSAGE],
  isLoading: false,
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
  
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  clearMessages: () => set({ messages: [INITIAL_MESSAGE] }),
}));
