export class OllamaWebSocketService {
    private ws: WebSocket | null = null;

    async streamChat(
        model: string,
        message: string,
        onChunk: (text: string) => void
    ): Promise<void> {
        // Use your proxy URL for streaming
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model,
                prompt: message,
                stream: true
            })
        });

        if (!response.body) throw new Error('No response body');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n').filter(line => line.trim());

            for (const line of lines) {
                try {
                    const data = JSON.parse(line);
                    if (data.response) {
                        onChunk(data.response);
                    }
                } catch (e) {
                    // Skip invalid JSON
                }
            }
        }
    }
}