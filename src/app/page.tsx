'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { useMessages } from '@/hooks/useMessages';
import { useTyping } from '@/hooks/useTyping';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatMessages from '@/components/chat/ChatMessages';
import ChatInput from '@/components/chat/ChatInput';
import SettingsModal from '@/components/settings/SettingsModal';
import dynamic from 'next/dynamic';

function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { theme, styles } = useThemeStyles();
  const { messages, error, loadMessages, loadNewMessages, sendMessage } = useMessages(user?.id);
  const { typingUsers, loadTypingUsers, handleTyping, sendTypingStatus } = useTyping(user?.id, user?.username, user?.name);
  const [inputValue, setInputValue] = useState('');
  const [mounted, setMounted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
      loadTypingUsers();
      
      const interval = setInterval(() => {
        loadNewMessages();
        loadTypingUsers();
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [mounted, user]);

  const handleSend = async () => {
    if (!inputValue.trim() || isSending) return;

    setIsSending(true);
    sendTypingStatus(false);

    try {
      const message = await sendMessage(inputValue);
      if (message) {
        setInputValue('');
        setTimeout(() => {
          document.querySelector('#messages-end')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${styles.bg}`}>
      <div className={`relative z-10 w-full max-w-4xl h-[90vh] backdrop-blur-xl border flex flex-col ${styles.container}`}>
        <ChatHeader 
          styles={styles} 
          theme={theme} 
          onSettingsClick={() => setIsSettingsOpen(true)} 
        />
        
        <ChatMessages 
          messages={messages} 
          styles={styles} 
          theme={theme} 
          error={error}
          typingUsers={typingUsers}
        />
        
        <ChatInput 
          value={inputValue}
          onChange={(value) => {
            setInputValue(value);
            handleTyping(value);
          }}
          onSend={handleSend}
          isSending={isSending}
          styles={styles}
          theme={theme}
        />
      </div>

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