export interface ChatMessage {
  id: string;
  prompt: string;
  response: string;
  timestamp: Date;
  model: string;
}