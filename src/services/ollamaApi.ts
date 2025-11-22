import type { OllamaGenerateRequest, OllamaGenerateResponse } from '../types/ollama';

// Use the proxy URL instead of direct URL
const OLLAMA_URL = '/api';

export async function generateResponse(
    model: 'gpt-oss' | 'llama3.2' | 'mistral-small3.2',
    prompt: string
): Promise<OllamaGenerateResponse> {
    const request: OllamaGenerateRequest = {
        model,
        prompt,
        stream: false
    };
    
    const response = await fetch(`${OLLAMA_URL}/generate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
}