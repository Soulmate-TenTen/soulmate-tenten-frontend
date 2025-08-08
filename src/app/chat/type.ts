export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: Array<{
      type: 'text';
      text: string;
    }>;
    isLastMessage?: boolean;
}
  
export interface ChatRequest {
    question: string;
    memberId: number;
}