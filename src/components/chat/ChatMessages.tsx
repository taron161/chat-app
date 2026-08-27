'use client';

import { useAuth } from '@/context/AuthContext';
import { Message } from '@/hooks/useMessages';
import TypingIndicator from './TypingIndicator';

interface ChatMessagesProps {
  messages: Message[];
  styles: any;
  theme: string;
  error: string;
}

export default function ChatMessages({ messages, styles, theme, error }: ChatMessagesProps) {
  const { user } = useAuth();

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 chat-messages-area relative">
      {error && (
        <div className="bg-red-900/30 border border-red-500/50 p-3 mb-4">
          <p className="text-red-400 text-sm text-center">{error}</p>
        </div>
      )}
      
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className={`text-xl animate-pulse ${styles.text}`}>
            {theme === 'cyberpunk' ? 'NO MESSAGES...' : theme === 'retro' ? '> NO MESSAGES_' : theme === 'rainy' ? 'Silence... only rain outside...' : 'NO MESSAGES...'}
          </div>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.userId === user?.id ? 'justify-end' : 'justify-start'}`}
          >
            {message.userId !== user?.id && (
              <div className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center text-lg font-bold border-2 mr-2 flex-shrink-0 ${
                theme === 'cyberpunk'
                  ? 'border-purple-500 bg-gradient-to-r from-purple-600 to-cyan-600'
                  : theme === 'retro'
                  ? 'border-[#ffbf00] bg-[#33ff33] text-black'
                  : theme === 'rainy'
                  ? 'border-[#4a6b8a] bg-[#2a3545]'
                  : 'border-[#ffffff] bg-[#ff0000] text-white'
              }`}>
                {message.user?.avatar ? (
                  <img src={message.user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  message.user?.name?.charAt(0).toUpperCase() || message.user?.username?.charAt(0).toUpperCase() || '?'
                )}
              </div>
            )}
            <div
              className={`max-w-[70%] p-4 border ${
                message.userId === user?.id
                  ? styles.messageUser
                  : styles.messageOther
              }`}
            >
              <div className={`text-xs mb-2 opacity-70 ${styles.text}`}>
                {message.user?.name || message.user?.username || 'Unknown'}
              </div>
              <p className={`mb-2 ${styles.text}`}>{message.content}</p>
              <div className={`text-xs opacity-50 ${styles.text}`}>
                {new Date(message.createdAt).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))
      )}
      
      <TypingIndicator styles={styles} />
      <div id="messages-end" />
    </div>
  );
}