import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Message } from '@cs.ai/sdk';

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

// Custom code component for syntax highlighting
const CodeBlock = ({ 
  node, 
  inline, 
  className, 
  children, 
  ...props 
}: any) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : 'text';
  const codeString = String(children).replace(/\n$/, '');

  if (inline) {
    return (
      <code 
        className={className}
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <SyntaxHighlighter
      language={language}
      style={oneLight}
      customStyle={{ borderRadius: '6px', padding: '12px', margin: '8px 0' }}
      PreTag="div"
      {...props}
    >
      {codeString}
    </SyntaxHighlighter>
  );
};

const renderContent = (content: string) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code: CodeBlock,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
/**
 * Main ChatMessaging component
 * @param param0 The message to display 
 * @returns message template display
 */
export const  ChatMessage = ({ message, isLoading }: ChatMessageProps) =>{
  const isUser = message.role === 'user';

  return (
    <div className="mb-4">
      <div className="d-flex align-items-start gap-3">
        <div className="flex-grow-1">
          <div className="fw-semibold mb-2 small text-muted">
            {isUser ? 'User' : 'Model'}
          </div>
          <div className="mb-2" style={{ lineHeight: '1.6' }}>
            {isLoading && !message.content ? (
              <span className="text-muted">
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Thinking...
              </span>
            ) : (
              message.content ? renderContent(message.content) : null
            )}
          </div>
          {/* {!isUser && message.content && (
            <div className="d-flex gap-2 mt-2">
              <button className="btn btn-sm btn-outline-secondary p-1">👍</button>
              <button className="btn btn-sm btn-outline-secondary p-1">👎</button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}