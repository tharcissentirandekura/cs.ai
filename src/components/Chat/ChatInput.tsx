import { useState } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput('');
  };

  return (
    <div className="border-top p-3 bg-white">
      <div className="d-flex gap-2 align-items-center">
        <div className="flex-grow-1">
          <input
            type="text"
            className="form-control form-control-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Start typing a prompt"
            disabled={disabled}
            style={{ borderRadius: '24px' }}
          />
        </div>
        <button
          className="btn btn-primary rounded-pill"
          onClick={handleSend}
          disabled={disabled || !input.trim()}
        >
          {disabled ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Sending...
            </>
          ) : (
            'Run'
          )}
        </button>
      </div>
    </div>
  );
}