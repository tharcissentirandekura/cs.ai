export interface Message{
    role: 'user' | 'assistant' | "system";
    content: string;
    timestamp?: number;
}

export interface ChatRequest{
    model:string;
    messages:Message[];
    stream?:boolean;
    temperature?:number; // not necessary for my case may be later

}

export interface ChatResponse{
    message?:{
        role:string;
        content:string;
    };
    done?:boolean;
    error?:string;
}

export interface StreamChunk{
    content:string;
    done:boolean;
}