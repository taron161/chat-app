'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import SettingsModal from '@/components/settings/SettingsModal';
import dynamic from 'next/dynamic';

interface Message {
  id: string;
  content: string;
  userId: string;
  user?: {
    id: string;
    username: string;
    name?: string | null;
    avatar?: string | null;
  };
  createdAt: string;
}

function Home() {
  const { user, isLoading } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState('');
  const [lastMessageId, setLastMessageId] = useState<string | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const loadMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      const data = await response.json();
      
      if (data.messages) {
        setMessages(data.messages);
        if (data.messages.length > 0) {
          setLastMessageId(data.messages[data.messages.length - 1].id);
        }
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      setError('Failed to load messages');
    }
  };

  const loadNewMessages = async () => {
    try {
      const response = await fetch('/api/messages?after=' + (lastMessageId || ''));
      const data = await response.json();
      
      if (data.messages && data.messages.length > 0) {
        setMessages(prevMessages => {
          const existingIds = new Set(prevMessages.map(m => m.id));
          const newMessages = data.messages.filter((m: Message) => !existingIds.has(m.id));
          const updatedMessages = [...prevMessages, ...newMessages];
          if (updatedMessages.length > 0) {
            setLastMessageId(updatedMessages[updatedMessages.length - 1].id);
          }
          return updatedMessages;
        });
      }
    } catch (error) {
      console.error('Error loading new messages:', error);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (mounted && user) {
      loadMessages();
      
      // Запускаем polling каждые 2 секунды
      pollingIntervalRef.current = setInterval(() => {
        loadNewMessages();
      }, 2000);
    }
    
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [mounted, user, lastMessageId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || !user || isSending) return;

    setIsSending(true);
    setError('');

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: inputValue,
          userId: user.id,
        }),
      });

      const data = await response.json();

      if (data.message) {
        setMessages(prevMessages => [...prevMessages, data.message]);
        setLastMessageId(data.message.id);
        setInputValue('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!mounted) {
    return (
      <div className={`min-h-screen flex items-center justify-center theme-${theme}`}>
        <div className="text-2xl animate-pulse">Loading...</div>
      </div>
    );
  }

  const getThemeStyles = () => {
    switch (theme) {
      case 'cyberpunk':
        return {
          bg: 'bg-[#0a0a0f]',
          container: 'bg-[#0d0d1a]/90 border-cyan-500/30 shadow-[0_0_50px_rgba(0,255,255,0.3)]',
          header: 'border-cyan-500/30 bg-[#1a1a2e]/50',
          title: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400',
          text: 'text-gray-200',
          inputBg: 'bg-[#0d0d1a] placeholder-cyan-400/50 border-cyan-500/30',
          button: 'bg-gradient-to-r from-purple-600 to-cyan-600',
          messageUser: 'from-purple-600/30 to-cyan-600/30 border-cyan-500/50',
          messageOther: 'bg-[#1a1a2e]/80 border-purple-500/50',
          userButton: 'hover:bg-cyan-500/20',
          avatarBg: 'bg-gradient-to-r from-purple-600 to-cyan-600',
        };
      case 'retro':
        return {
          bg: 'bg-[#1a1a1a] crt',
          container: 'bg-[#0a0a0a] border-[#33ff33] shadow-[0_0_50px_rgba(51,255,51,0.3)]',
          header: 'border-[#33ff33] bg-[#0a0a0a]',
          title: 'text-[#33ff33] glow-green',
          text: 'text-[#33ff33]',
          inputBg: 'bg-[#0a0a0a] placeholder-[#33ff33] border-[#33ff33]',
          button: 'bg-[#33ff33] text-black hover:bg-[#ffbf00]',
          messageUser: 'border-[#33ff33] bg-[#003300]',
          messageOther: 'border-[#ffbf00] bg-[#1a1a00]',
          userButton: 'hover:bg-[#003300]',
          avatarBg: 'bg-[#33ff33] text-black',
        };
      case 'rainy':
        return {
          bg: 'bg-[#0a0e14]',
          container: 'bg-[#1a2533]/80 border-[#4a6b8a]/30 shadow-[0_0_50px_rgba(74,107,138,0.2)]',
          header: 'border-[#4a6b8a]/30 bg-[#1a2533]/50',
          title: 'text-[#a8b2c0]',
          text: 'text-[#a8b2c0]',
          inputBg: 'bg-[#0a0e14]/50 placeholder-[#6b7a8a] border-[#4a6b8a]/30',
          button: 'bg-[#2a3545] hover:bg-[#3a4555]',
          messageUser: 'border-[#4a6b8a]/40 bg-[#1a2533]/60',
          messageOther: 'border-[#3a4555]/30 bg-[#1a2028]/40',
          userButton: 'hover:bg-[#1a2533]',
          avatarBg: 'bg-[#2a3545]',
        };
      case '8bit':
        return {
          bg: 'bg-[#000000]',
          container: 'bg-[#1a1a1a] border-[#ffffff] shadow-[0_0_50px_rgba(255,255,255,0.5)]',
          header: 'border-[#ffffff] bg-[#000000]',
          title: 'text-[#ffff00]',
          text: 'text-[#ffffff]',
          inputBg: 'bg-[#000000] placeholder-[#ffffff] border-[#ffffff]',
          button: 'bg-[#ff0000] text-white hover:bg-[#ffff00] hover:text-black',
          messageUser: 'border-[#00ff00] bg-[#003300]',
          messageOther: 'border-[#ffffff] bg-[#1a1a1a]',
          userButton: 'hover:bg-[#ff0000]',
          avatarBg: 'bg-[#ff0000] text-white',
        };
      default:
        return {
          bg: 'bg-[#0a0a0f]',
          container: 'bg-[#0d0d1a]/90 border-cyan-500/30 shadow-[0_0_50px_rgba(0,255,255,0.3)]',
          header: 'border-cyan-500/30 bg-[#1a1a2e]/50',
          title: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400',
          text: 'text-gray-200',
          inputBg: 'bg-[#0d0d1a] placeholder-cyan-400/50 border-cyan-500/30',
          button: 'bg-gradient-to-r from-purple-600 to-cyan-600',
          messageUser: 'from-purple-600/30 to-cyan-600/30 border-cyan-500/50',
          messageOther: 'bg-[#1a1a2e]/80 border-purple-500/50',
          userButton: 'hover:bg-cyan-500/20',
          avatarBg: 'bg-gradient-to-r from-purple-600 to-cyan-600',
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${styles.bg}`}>
      <div className={`relative z-10 w-full max-w-4xl h-[90vh] backdrop-blur-xl border flex flex-col ${styles.container}`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${styles.header} chat-header relative`}>
          <div className="flex items-center space-x-3">
            <h1 className={`text-2xl font-bold ${styles.title}`}>
              {theme === 'cyberpunk' ? 'NEON CHAT' : theme === 'retro' ? 'RETRO CHAT' : theme === 'rainy' ? 'Rainy Chat' : '8-BIT CHAT'}
            </h1>
          </div>
          
          {/* User Button */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className={`flex items-center space-x-2 px-3 py-2 border transition-all ${styles.userButton} ${
              theme === 'cyberpunk' 
                ? 'border-cyan-500/30' 
                : theme === 'retro'
                ? 'border-[#33ff33]/30'
                : theme === 'rainy'
                ? 'border-[#4a6b8a]/30'
                : 'border-[#ffffff]/30'
            }`}
          >
            <div className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center text-lg font-bold border-2 ${
              theme === 'cyberpunk'
                ? 'border-cyan-500'
                : theme === 'retro'
                ? 'border-[#33ff33]'
                : theme === 'rainy'
                ? 'border-[#4a6b8a]'
                : 'border-[#ffffff]'
            } ${styles.avatarBg}`}>
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                user?.name?.charAt(0).toUpperCase() || user?.username?.charAt(0).toUpperCase() || '?'
              )}
            </div>
            <span className={`text-sm ${styles.text}`}>
              {user?.name || user?.username || 'Loading...'}
            </span>
          </button>
        </div>

        {/* Messages Area */}
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
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={`p-4 border-t ${styles.header}`}>
          <div className="flex space-x-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              disabled={isSending}
              className={`flex-1 px-4 py-3 border focus:outline-none transition-all disabled:opacity-50 ${styles.inputBg}`}
            />
            <button
              onClick={handleSend}
              disabled={isSending}
              className={`px-6 py-3 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${styles.button}`}
            >
              {isSending ? '...' : theme === 'retro' ? '[SEND]' : 'SEND'}
            </button>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  );
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false
});