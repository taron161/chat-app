'use client';

import { useState, useCallback, useEffect } from 'react';

export interface Message {
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

export function useMessages(userId: string | undefined) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastMessageId, setLastMessageId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const loadMessages = useCallback(async () => {
    try {
      const response = await fetch('/api/messages');
      const data = await response.json();
      
      if (data.messages) {
        setMessages(data.messages);
        if (data.messages.length > 0) {
          setLastMessageId(data.messages[data.messages.length - 1].id);
        }
        
        setTimeout(() => {
          const messagesEnd = document.querySelector('#messages-end');
          messagesEnd?.scrollIntoView({ behavior: 'auto' });
        }, 200);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      setError('Failed to load messages');
    }
  }, []);

  const loadNewMessages = useCallback(async () => {
    if (!lastMessageId) return;
    
    try {
      const response = await fetch('/api/messages?after=' + lastMessageId);
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
  }, [lastMessageId]);

  const sendMessage = useCallback(async (content: string) => {
    if (!userId || !content.trim()) return null;
    
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          userId,
        }),
      });

      const data = await response.json();

      if (data.message) {
        setMessages(prevMessages => [...prevMessages, data.message]);
        setLastMessageId(data.message.id);
        return data.message;
      }
      return null;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }, [userId]);

  return {
    messages,
    error,
    loadMessages,
    loadNewMessages,
    sendMessage,
  };
}