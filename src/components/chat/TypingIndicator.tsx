'use client';

import { useTyping } from '@/hooks/useTyping';

interface TypingIndicatorProps {
  styles: any;
}

export default function TypingIndicator({ styles }: TypingIndicatorProps) {
  const { typingUsers } = useTyping(undefined, undefined, undefined);

  if (typingUsers.length === 0) return null;

  return (
    <div className="flex items-center space-x-2">
      <div className={`text-sm italic ${styles.typingColor}`}>
        {typingUsers.map(u => u.name || u.username).join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing
      </div>
      <div className="flex space-x-1">
        <div className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}>•</div>
        <div className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}>•</div>
        <div className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}>•</div>
      </div>
    </div>
  );
}