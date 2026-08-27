'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  username: string;
  email: string;
  name?: string | null;
  avatar?: string | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (name: string, avatar: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  const storedUser = localStorage.getItem('cyber_user');
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      return {
        id: String(parsedUser.id || ''),
        username: String(parsedUser.username || ''),
        email: String(parsedUser.email || ''),
        name: parsedUser.name ? String(parsedUser.name) : null,
        avatar: parsedUser.avatar ? String(parsedUser.avatar) : null,
      };
    } catch (error) {
      console.error('Error parsing user:', error);
      localStorage.removeItem('cyber_user');
    }
  }
  return null;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getStoredUser());
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const login = async (username: string, password: string): Promise<boolean> => {
    console.log('Login attempt...');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      console.log('Login response status:', response.status);
      
      const data = await response.json();
      console.log('Login data:', data);
      
      if (data.user) {
        console.log('Saving user...');
        setUser(data.user);
        localStorage.setItem('cyber_user', JSON.stringify(data.user));
        console.log('User saved');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, password: string): Promise<boolean> => {
    console.log('Registration attempt...');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      console.log('Registration response status:', response.status);
      
      const data = await response.json();
      console.log('Registration data:', data);
      
      if (data.user) {
        console.log('Saving user...');
        setUser(data.user);
        localStorage.setItem('cyber_user', JSON.stringify(data.user));
        console.log('User saved');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (name: string, avatar: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          name,
          avatar,
        }),
      });

      const data = await response.json();

      if (data.user) {
        setUser(data.user);
        localStorage.setItem('cyber_user', JSON.stringify(data.user));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error updating profile:', error);
      return false;
    }
  };

  const logout = () => {
    console.log('Logging out...');
    setUser(null);
    localStorage.removeItem('cyber_user');
    router.push('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}