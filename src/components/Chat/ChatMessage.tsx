import type { Message } from '@cs.ai/sdk';

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

export function ChatMessage({ message, isLoading }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className="mb-4">
      <div className="d-flex align-items-start gap-3">
        <div className="flex-grow-1">
          <div className="fw-semibold mb-2 small text-muted">
            {isUser ? 'User' : 'Model'}
          </div>
          <div className="mb-2" style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
            {message.content || (isLoading ? (
              <span className="text-muted">
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Thinking...
              </span>
            ) : '')}
          </div>
          {!isUser && message.content && (
            <div className="d-flex gap-2 mt-2">
              <button className="btn btn-sm btn-outline-secondary p-1">👍</button>
              <button className="btn btn-sm btn-outline-secondary p-1">👎</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}