/**
 * responsible for making client requests
 */

import type {  ChatRequest, ChatResponse, StreamChunk } from '../types'

export interface ClientConfig{
    baseUrl:string;
    timeout?:number;
}

export class ChatClient{
    private config: ClientConfig;

    constructor(config:ClientConfig){
        this.config = config;
    }

    async *streamChat(request:ChatRequest, signal?: AbortSignal):AsyncGenerator<StreamChunk, void, unknown>{
        const response = await fetch(`${this.config.baseUrl}/api/chat`,{
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({...request,stream:true}),
            signal,
        });

        if (!response.ok){
            throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }
        if(!response.body){
            throw new Error('No response body');
        }

        // chucnk the respinse
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        try {
            while (true){
                if (signal?.aborted) {
                    reader.cancel();
                    break;
                }
                const {done,value} = await reader.read();
                if(done) break; //Stop if there is not text to read

                // Otherwise, we append our text to the buffer
                buffer += decoder.decode(value,{stream:true});
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines){
                    if (!line.trim()) continue;
                    try {
                        const json:ChatResponse = JSON.parse(line);
                        if(json.message?.content){
                            yield{
                                content:json.message.content,
                                done:json.done ||false
                            };
                        }

                        if (json.done) return;
                    } catch (error) {
                        // skip the json invalid error
                        continue
                    }
                }

            }
        } finally {
            reader.releaseLock();
        }
    }

    async sendMessage(request:ChatRequest): Promise<string>{
        let fullContent = '';
        const chunks = this.streamChat(request);
        for await (const chunk of chunks){
            fullContent += chunk.content;
        }
        return fullContent;
    }


}