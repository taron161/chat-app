'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type ThemeType = 'cyberpunk' | 'retro' | 'rainy' | '8bit';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getStoredTheme = (): ThemeType => {
  if (typeof window === 'undefined') return 'cyberpunk';
  
  const storedTheme = localStorage.getItem('chat_theme');
  if (storedTheme === 'cyberpunk' || storedTheme === 'retro' || storedTheme === 'rainy' || storedTheme === '8bit') {
    return storedTheme;
  }
  return 'cyberpunk';
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>(() => getStoredTheme());

  useEffect(() => {
    document.body.classList.remove('theme-cyberpunk', 'theme-retro', 'theme-rainy', 'theme-8bit');
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem('chat_theme', theme);
  }, [theme]);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}