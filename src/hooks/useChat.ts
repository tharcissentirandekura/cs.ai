
import { useState, useCallback } from "react";
import { ChatClient } from "@cs.ai/sdk";
import type { Message } from "@cs.ai/sdk";
import type { Model } from "@cs.ai/sdk";

export function useChat(model: Model | string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  
  const client = new ChatClient({ baseUrl: '' });

  // Get the actual model name for the API
  const getModelName = (model: Model | string): string => {
    if (typeof model === 'string') {
      // Fallback: if string is passed, use it directly (for backward compatibility)
      return model;
    }
    // Use modelName if available, otherwise fall back to name or id
    return model.modelName || model.name || model.id;
  };

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || loading) return;

    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    try {
      let accumulatedContent = '';
      const actualModelName = getModelName(model);
      
      for await (const chunk of client.streamChat({
        model: actualModelName, // Use the actual Ollama model name
        messages: [...messages, userMessage],
        stream: true,
      })) {
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
    }
  }, [messages, loading, model]);

  return { messages, loading, sendMessage };
}