export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: Array<{
      type: 'text';
      text: string;
    }>;
    isLastMessage?: boolean;
}
  
export interface ChatRequest {
    messages: ChatMessage[];
    topP?: number;
    topK?: number;
    maxTokens?: number;
    temperature?: number;
    repetitionPenalty?: number;
    stop?: string[];
    seed?: number;
    includeAiFilters?: boolean;
}