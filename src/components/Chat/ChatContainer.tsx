
import { useChat } from '../../hooks/useChat';
import type { Model } from '@cs.ai/sdk';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';

interface ChatContainerOptions {
  model: Model | string;
}

export function ChatContainer({ model }: ChatContainerOptions) {
  const { messages, loading, sendMessage, stopGeneration } = useChat(model);

  return (
    <div className="d-flex flex-column h-100">
      <ChatMessages messages={messages} isLoading={loading} />
      <ChatInput onSend={sendMessage} onStop={stopGeneration} disabled={loading} />
    </div>
  );
}