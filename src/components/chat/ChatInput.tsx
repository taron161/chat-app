'use client';

import { ThemeStyles } from "@/types/theme";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isSending: boolean;
  styles: ThemeStyles;
  theme: string;
}

export default function ChatInput({ value, onChange, onSend, isSending, styles, theme }: ChatInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className={`p-4 border-t ${styles.header}`}>
      <div className="flex space-x-4">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          disabled={isSending}
          className={`flex-1 px-4 py-3 border focus:outline-none transition-all disabled:opacity-50 ${styles.inputBg}`}
        />
        <button
          onClick={onSend}
          disabled={isSending}
          className={`px-6 py-3 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${styles.button}`}
        >
          {isSending ? '...' : theme === 'retro' ? '[SEND]' : 'SEND'}
        </button>
      </div>
    </div>
  );
}