export interface Model {
    id: string;
    name: string;
    provider: 'ollama' | 'openai' | 'local' | 'tinydolphin';
    description?: string;
    version?: string;
    modelName?: string; // Actual model name for the API (e.g., 'llama3.2')
}

export interface ModelInfo{
    model:string;
    available:boolean;
    details?: Record<string,unknown>
}

