
import { useChat } from '../../hooks/useChat';
import type { Model } from '@cs.ai/sdk';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';

interface ChatContainerProps {
  model: Model | string;
}

export function ChatContainer({ model }: ChatContainerProps) {
  const { messages, loading, sendMessage } = useChat(model);

  return (
    <div className="d-flex flex-column h-100">
      <ChatMessages messages={messages} isLoading={loading} />
      <ChatInput onSend={sendMessage} disabled={loading} />
    </div>
  );
}