export interface OllamaMessage{
    role:'user' | 'assistant' | 'system';
    content: string;
    timestamp?: Date;
}

export interface OllamaGenerateRequest{
    model: 'gpt-oss' | 'llama3.2' | 'mistral-small3.2'
    prompt:string;
    stream:boolean;
}

export interface OllamaGenerateResponse{
    model:string;
    created_at:string;
    response: string;
    done: boolean;
    context?:number[];
    total_duration?: number;
    load_duration?: number;
    prompt_eval_count?: number;
    prompt_eval_duration?: number;
    eval_count?: number;
    eval_duration?: number;
}

export interface OllamaStreamResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

export interface ChatSession {
  id: string;
  messages: OllamaMessage[];
  model: 'gpt-oss' | 'llama3.2' | 'mistral-small3.2';
  createdAt: Date;
}

export interface ModelInfo {
  name: string;
  displayName: string;
  description: string;
}

export const AVAILABLE_MODELS: ModelInfo[] = [
  {
    name: 'gpt-oss',
    displayName: 'GPT-OSS',
    description: 'Open source GPT model'
  },
  {
    name: 'llama3.2',
    displayName: 'Llama 3.2',
    description: 'Meta\'s Llama 3.2 model'
  },
  {
    name: 'mistral-small3.2',
    displayName: 'Mistral Small 3.2',
    description: 'Mistral\'s small language model'
  }
];