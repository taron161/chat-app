'use client';

import { useState, useCallback, useRef } from 'react';

export interface TypingUser {
  userId: string;
  username: string;
  name: string | null;
  timestamp: number;
}

export function useTyping(userId: string | undefined, username: string | undefined, name: string | null | undefined) {
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const loadTypingUsers = useCallback(async () => {
    try {
      const response = await fetch('/api/typing');
      const data = await response.json();
      
      if (data.typingUsers) {
        setTypingUsers(data.typingUsers.filter((u: TypingUser) => u.userId !== userId));
      }
    } catch (error) {
      console.error('Error loading typing users:', error);
    }
  }, [userId]);

  const sendTypingStatus = useCallback(async (isTyping: boolean) => {
    if (!userId) return;
    
    try {
      await fetch('/api/typing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          username,
          name,
          isTyping,
        }),
      });
    } catch (error) {
      console.error('Error sending typing status:', error);
    }
  }, [userId, username, name]);

  const handleTyping = useCallback((value: string) => {
    if (value.length > 0) {
      sendTypingStatus(true);
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      typingTimeoutRef.current = setTimeout(() => {
        sendTypingStatus(false);
      }, 2000);
    } else {
      sendTypingStatus(false);
    }
  }, [sendTypingStatus]);

  return {
    typingUsers,
    loadTypingUsers,
    sendTypingStatus,
    handleTyping,
  };
}