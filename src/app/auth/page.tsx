'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

export default function AuthPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [mounted, setMounted] = useState(false);
  const { login, register, isLoading } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    console.log('Auth page mounted, theme:', theme);
  }, [theme]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = mode === 'login' 
      ? await login(username, password)
      : await register(username, password);
    
    if (success) {
      router.push('/');
    } else {
      setError(mode === 'login' 
        ? 'Invalid credentials. Access denied.' 
        : 'Registration failed. User already exists.');
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
    setPassword('');
  };

  const getThemeStyles = () => {
    switch (theme) {
      case 'cyberpunk':
        return {
          bg: 'bg-[#0a0a0f]',
          card: 'bg-[#0d0d1a]/90 border-cyan-500/30 shadow-[0_0_50px_rgba(0,255,255,0.3)]',
          title: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400',
          input: 'bg-[#0a0a0f] text-gray-200 border-cyan-500/30 focus:border-cyan-400',
          button: 'bg-gradient-to-r from-purple-600 to-cyan-600',
          text: 'text-gray-400',
          link: 'text-gray-400 hover:text-white',
        };
      case 'retro':
        return {
          bg: 'bg-[#1a1a1a] crt',
          card: 'bg-[#0a0a0a] border-[#33ff33] shadow-[0_0_50px_rgba(51,255,51,0.3)]',
          title: 'text-[#33ff33] glow-green',
          input: 'bg-[#0a0a0a] text-[#33ff33] border-[#33ff33] focus:border-[#ffbf00]',
          button: 'bg-[#33ff33] text-black hover:bg-[#ffbf00]',
          text: 'text-[#33ff33]',
          link: 'text-[#33ff33] hover:text-[#ffbf00]',
        };
      case 'rainy':
        return {
          bg: 'bg-[#0a0e14]',
          card: 'bg-[#1a2533]/80 border-[#4a6b8a]/30 shadow-[0_0_50px_rgba(74,107,138,0.2)]',
          title: 'text-[#a8b2c0]',
          input: 'bg-[#0a0e14]/50 text-[#a8b2c0] border-[#4a6b8a]/30 focus:border-[#6b8baa]',
          button: 'bg-[#2a3545] hover:bg-[#3a4555]',
          text: 'text-[#8b95a5]',
          link: 'text-[#8b95a5] hover:text-[#a8b2c0]',
        };
      case '8bit':
        return {
          bg: 'bg-[#000000]',
          card: 'bg-[#1a1a1a] border-[#ffffff] shadow-[0_0_50px_rgba(255,255,255,0.5)]',
          title: 'text-[#ffff00]',
          input: 'bg-[#000000] text-[#ffffff] border-[#ffffff] focus:border-[#ffff00]',
          button: 'bg-[#ff0000] text-white hover:bg-[#ffff00] hover:text-black',
          text: 'text-[#ffffff]',
          link: 'text-[#ffffff] hover:text-[#ffff00]',
        };
      default:
        return {
          bg: 'bg-[#0a0a0f]',
          card: 'bg-[#0d0d1a]/90 border-cyan-500/30 shadow-[0_0_50px_rgba(0,255,255,0.3)]',
          title: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400',
          input: 'bg-[#0a0a0f] text-gray-200 border-cyan-500/30 focus:border-cyan-400',
          button: 'bg-gradient-to-r from-purple-600 to-cyan-600',
          text: 'text-gray-400',
          link: 'text-gray-400 hover:text-white',
        };
    }
  };

  const styles = getThemeStyles();

  // Показываем заглузку до монтирования
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-gray-400 text-xl animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative flex items-center justify-center p-4 ${styles.bg}`}>
      <div className={`relative z-10 w-full max-w-md backdrop-blur-md border p-8 ${styles.card}`}>
        
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 opacity-50">
            {theme === 'cyberpunk' ? '🌆' : theme === 'retro' ? '🕹️' : theme === 'rainy' ? '🌧️' : '👾'}
          </div>
          <h1 className={`text-3xl font-bold mb-2 ${styles.title}`}>
            {mode === 'login' ? 'System Access' : 'Registration'}
          </h1>
          <p className={`text-sm italic ${styles.text}`}>
            {mode === 'login' 
              ? 'Enter your credentials to continue' 
              : 'Create a new account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm mb-2 ${styles.text}`}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-4 py-3 border focus:outline-none transition-all ${styles.input}`}
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className={`block text-sm mb-2 ${styles.text}`}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 border focus:outline-none transition-all ${styles.input}`}
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-500/50 p-3">
              <p className="text-red-400 text-sm text-center">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-6 py-3 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${styles.button}`}
          >
            {isLoading ? 'Processing...' : mode === 'login' ? 'Login' : 'Create Account'}
          </button>

          <button
            type="button"
            onClick={toggleMode}
            className={`w-full text-center text-sm transition-colors italic ${styles.link}`}
          >
            {mode === 'login' 
              ? 'No account? Register' 
              : 'Already have an account? Login'}
          </button>
        </form>
      </div>
    </div>
  );
}