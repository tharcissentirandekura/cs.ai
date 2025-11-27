// import { useState } from 'react';
import type { Message } from '@cs.ai/sdk';
import { ChatMessage } from './ChatMessage'
// import { TermsAndConditionsModal } from '../UsageDetails/TermsAndConditionsModal'

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
    // const [showTerms,setShowTerms] = useState(true);
  return (
    <div className="flex-grow-1 p-4 overflow-auto">
      {messages.length === 0 && (
        <div className="text-muted text-center p-5">
          <div className="mb-3 fs-1"></div>
          <div>No messages yet. Start a conversation!</div>
        </div>
      )}
      <h1 className='text-center text-muted'>Howdy! Welcome </h1>
      {/* <TermsAndConditionsModal show={showTerms} onClose={() => setShowTerms(false)} /> */}
      {messages.map((msg: Message, idx: number) => (
        <ChatMessage
          key={idx}
          message={msg}
          isLoading={idx === messages.length - 1 && isLoading && msg.role === 'system'}
        />
      ))}
    </div>
  );
}