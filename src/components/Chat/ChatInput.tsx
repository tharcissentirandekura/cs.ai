import { useState } from 'react';

interface ChatInputOptions {
  onSend: (message: string) => void;
  onStop: () => void;
  disabled: boolean;
}

export function ChatInput({ onSend, onStop, disabled }: ChatInputOptions) {
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
        {disabled ? (
          <button
            className="btn btn-danger rounded-pill"
            onClick={onStop}
          >
            Stop
          </button>
        ) : (
          <button
            className="btn btn-primary rounded-pill"
            onClick={handleSend}
            disabled={!input.trim()}
          >
            Run
          </button>
        )}
      </div>
    </div>
  );
}