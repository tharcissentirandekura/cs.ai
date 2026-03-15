
import { useState, useCallback, useRef } from "react";
import { ChatClient } from "@cs.ai/sdk";
import type { Message } from "@cs.ai/sdk";
import type { Model } from "@cs.ai/sdk";
// import axios from "axios";
// import 'dotenv/config';

export function useChat(model: Model | string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  const client = new ChatClient({ baseUrl: '' });
  // const apiKey = import.meta.env.VITE_OLLAMA_API_KEY;
  // console.log(apiKey)
  // Get the actual model name for the API
  const getModelName = (model: Model | string): string => {
    console.log('Model name :',model)
    if (typeof model === 'string') {
      // Fallback: if string is passed, use it directly (for backward compatibility)
      return model;
    }
    // Use modelName if available, otherwise fall back to name or id
    return model.modelName || model.name || model.id;
  };

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || loading) return;

    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    // Create new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      let accumulatedContent = '';
      const actualModelName = getModelName(model);
      
      for await (const chunk of client.streamChat({
        model: actualModelName, // Use the actual Ollama model name
        messages: [...messages, userMessage],
        stream: true,
      }, abortController.signal)) {
        // Check if request was aborted
        if (abortController.signal.aborted) {
          break;
        }
        accumulatedContent += chunk.content;
        setMessages(prev => {
          const newMessages = [...prev];
          const lastIndex = newMessages.length - 1;
          if (lastIndex >= 0 && newMessages[lastIndex].role === 'assistant') {
            newMessages[lastIndex] = { ...newMessages[lastIndex], content: accumulatedContent };
          }
          return newMessages;
        });
      }
    } catch (error) {
      // Don't show error if it was aborted
      if (abortController.signal.aborted) {
        return;
      }
      console.error('Chat error:', error);
      setMessages(prev => {
        const newMessages = [...prev];
        const lastIndex = newMessages.length - 1;
        if (lastIndex >= 0 && newMessages[lastIndex].role === 'assistant') {
          newMessages[lastIndex] = {
            ...newMessages[lastIndex],
            content: `Error: ${error instanceof Error ? error.message : 'Failed to send message'}`,
          };
        }
        return newMessages;
      });
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [messages, loading, model]);

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, []);

  return { messages, loading, sendMessage, stopGeneration };
}