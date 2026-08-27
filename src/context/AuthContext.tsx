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
    console.log('=== LOGIN ATTEMPT ===');
    console.log('Username:', username);
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
      console.log('Login response ok:', response.ok);
      
      const data = await response.json();
      console.log('Login data FULL:', JSON.stringify(data, null, 2));
      
      if (data.user) {
        console.log('Login successful, saving user...');
        setUser(data.user);
        localStorage.setItem('cyber_user', JSON.stringify(data.user));
        return true;
      }
      
      console.log('Login failed:', data.error || 'Unknown error');
      return false;
    } catch (error) {
      console.error('Login error:', error);
      console.error('Login error details:', JSON.stringify(error, null, 2));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, password: string): Promise<boolean> => {
    console.log('=== REGISTRATION ATTEMPT ===');
    console.log('Username:', username);
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
      console.log('Registration response ok:', response.ok);
      
      const data = await response.json();
      console.log('Registration data FULL:', JSON.stringify(data, null, 2));
      
      if (data.user) {
        console.log('Registration successful, saving user...');
        setUser(data.user);
        localStorage.setItem('cyber_user', JSON.stringify(data.user));
        return true;
      }
      
      console.log('Registration failed:', data.error || 'Unknown error');
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Registration error details:', JSON.stringify(error, null, 2));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (name: string, avatar: string): Promise<boolean> => {
    if (!user) return false;
    
    console.log('=== UPDATE PROFILE ===');
    console.log('Name:', name);
    console.log('Avatar length:', avatar.length);
    
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

      console.log('Update response status:', response.status);
      
      const data = await response.json();
      console.log('Update data FULL:', JSON.stringify(data, null, 2));

      if (data.user) {
        console.log('Profile updated successfully');
        setUser(data.user);
        localStorage.setItem('cyber_user', JSON.stringify(data.user));
        return true;
      }
      
      console.log('Profile update failed:', data.error || 'Unknown error');
      return false;
    } catch (error) {
      console.error('Error updating profile:', error);
      console.error('Update error details:', JSON.stringify(error, null, 2));
      return false;
    }
  };

  const logout = () => {
    console.log('=== LOGOUT ===');
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