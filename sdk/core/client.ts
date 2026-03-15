/**
 * responsible for making client requests
 */

import type {  ChatRequest, ChatResponse, StreamChunk } from '../types'

/**
 * Any client instance, should have two args
 * 1. baseURL: Which api server url
 * 2. timeout: To control how long should client wait for server response?. Howerver, this is optional, you can choose to provide or not
 */
export interface ClientConfig{
    baseUrl:string;
    timeout?:number;
}

/**
 * This class is responsible for making a model chat client request,response
 * We don't have to use a class but it is more easier to things of the design with OOP 
 * My future implementation would be to try to see if I can use react query Tanstack which has very cool features to make requests
 * @link https://tanstack.com/query/latest
 * What to look into: Mutations on requests
 */
export class ChatClient{
    private config: ClientConfig;

    constructor(config:ClientConfig){
        this.config = config;
    }
    /**
     * This function is to return the text asynchoneously as the server generates
     * If you are not familiar with asynch generators functions or any functional programming, you may be wondering
     * why we put * before the function name. This is a way to tell is this is an async generator function and it should yield values asynchronousl, one at a time as they become available
     * 
     * Since we want to show data as they become avaible, so we want this function to have these behaviors.
     * 
     * Let's say you remove * and define is just like this: async streamChat, it will complain and you will run into this issue:
     * Error: Type 'AsyncGenerator' is not a valid async function return type in ES5 because it does not refer to a Promise-compatible constructor value.ts(1055)
     * You can always check this to see the power of async generator:
     * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator
     * @param request The request data types for the model
     * @param signal The abort signal. I have added it so that I can be able to stop the model from generating content 
     * @returns Chunks of text as they become available
     */
    async *streamChat(request:ChatRequest, signal?: AbortSignal):AsyncGenerator<StreamChunk, void, unknown>{
        /**
         * Make an api request on the api baseUrl/api/chat and we are making a post request
         * The api baseUrl is define in vite.config.ts, in the proxy server config
         * 
         */
        // const res = await fetch(`/api/search?q=${encodeURIComponent("what is chatgpt")}`);
        const response = await fetch(`${this.config.baseUrl}/api/chat`,{
            method: 'POST', 
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({...request,stream:true}), // stringify the body
            signal,
        });

        if (!response.ok){
            throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }
        if(!response.body){
            throw new Error('No response body');
        }

        /**
         * Ok, now we have gotten some data from the server as it gets generated and you may know what this data type is if you took a class or read things on functional programming
         * Stream: A stream is a data type where you can read forever, it is like a flow and you can only have access to the current data, not the next one. 
         * @link on wikipedia: https://en.wikipedia.org/wiki/Stream_(abstract_data_type)
         * Stream api: @link https://developer.mozilla.org/en-US/docs/Web/API/Streams_API
         */
        // const searchData = await searchInternet(request.messages[0].content);
        // console.log("Internet search:",searchData)
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        try {
            while (true){
                if (signal?.aborted) { // If we aborted, cancel the reading and stop the loop
                    reader.cancel();
                    break;
                }
                const {done,value} = await reader.read(); 
                if(done) break; //Stop if there is not text to read (the model finished reading)

                // Otherwise, we append our text to the buffer
                buffer += decoder.decode(value,{stream:true});
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines){
                    if (!line.trim()) continue; // For empty lines, we move on
                    try {
                        const json:ChatResponse = JSON.parse(line);
                        if(json.message?.content){
                            yield{ // Since we are using asnc genetarot, can use yield inside it to emit values one at a time as they become available
                                content:json.message.content,
                                done:json.done ||false
                            };
                        }

                        if (json.done) return;
                    } catch (error) {
                        // skip the json invalid error
                        // TODO: Handle the error somehow, no time to do it and no interest of doing it
                        continue
                    }
                }

            }
        } finally {
            // When we use getReader() on a stream, it locks a stream so only reader can read from it
            // so, we need to free the stream for other operations other than read to access it
            reader.releaseLock();
        }
    }
    /**
     * Send a message to the server using our streamChat
     * @param request  The message the user pass in. The message (chat request) has:
     * 1.model: Which model we are using (gptoss,...)
     * messages: message or question,... 
     * stream: whether or not we want data as the model generates but htis is optional and default is true
     * 
     * You may realise the difference between the *streamChat and sendMessage async definitoon
     * sendMessage function doesn't have * and this is just an async function and can access content using await
     * *streamChat is an async generator function and can access contents with yield
     * @returns All contents
     */
    async sendMessage(request:ChatRequest): Promise<string>{
        let fullContent = '';
        const chunks = this.streamChat(request);
        for await (const chunk of chunks){
            fullContent += chunk.content;
        }
        return fullContent;
    }


}