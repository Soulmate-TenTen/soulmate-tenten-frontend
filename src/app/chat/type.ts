export enum Mode {
  CHAT = "chat",
  REPORT = "report",
}

export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: Array<{
      type: 'text';
      text: string;
    }>;
    isLastMessage?: boolean;
}

export interface Report {
    thinkingContent: string;
    titleA: string;
    titleB: string;
    contentA: string;
    contentB: string;
    conclusionTitle: string;
    conclusion: string;
    result: string | null;
    review: string | null;
}