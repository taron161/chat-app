'use client';

import { useTheme } from '@/context/ThemeContext';
import type { ThemeType } from '@/context/ThemeContext';

const themes: { id: ThemeType; label: string; icon: string }[] = [
  { id: 'cyberpunk', label: 'Киберпанк', icon: '🌆' },
  { id: 'retro', label: 'Ретро', icon: '🕹️' },
  { id: 'rainy', label: 'Дождливый', icon: '🌧️' },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`px-3 py-1 text-sm transition-all ${
            theme === t.id
              ? 'bg-opacity-50 border-2'
              : 'bg-opacity-20 border border-transparent hover:bg-opacity-30'
          } ${
            theme === 'cyberpunk'
              ? 'bg-purple-600 border-cyan-500 text-cyan-400'
              : theme === 'retro'
              ? 'bg-green-900 border-green-400 text-green-400'
              : 'bg-blue-900 border-blue-400 text-blue-300'
          }`}
          title={t.label}
        >
          <span className="mr-1">{t.icon}</span>
          <span className="hidden sm:inline">{t.label}</span>
        </button>
      ))}
    </div>
  );
}