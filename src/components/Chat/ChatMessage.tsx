/**
 * This component is to handle one thing, display the messages, from model and from user
 * If there is one thing I have learned this past months of working with react/web, deviding tasks into smaller components is so much helpful
 * not only to organize code but also to have readable codebase and it is easy to produce reusable code that way
 */
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Message } from '@cs.ai/sdk';

/**
 * This is to define what options we pass to our message chat component
 * We should have a message and whether or not is is a load 
 */
interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

// Custom code component for syntax highlighting
// This is where copilot helped to get code formatted because I had no idea but it turned out well actually
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
/**
 * The content renderer function
 * Given content render that and format it using react markdown since the model returns some markdown data from json response
 * @param content The content a model generated
 * @returns a well formatted content
 */
const renderContent = (content: string) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code: CodeBlock, // For the code, we use codeBlock to formatt
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
              // Render the content if we do have that content
              message.content ? renderContent(message.content) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
}