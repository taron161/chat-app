'use client';

import { useTheme, ThemeType } from '@/context/ThemeContext';

const themes: { id: ThemeType; label: string; icon: string; description: string }[] = [
  { id: 'cyberpunk', label: 'Cyberpunk', icon: '🌆', description: 'Neon lights and futuristic vibes' },
  { id: 'retro', label: 'Retro', icon: '🕹️', description: 'Classic terminal aesthetics' },
  { id: 'rainy', label: 'Rainy', icon: '🌧️', description: 'Melancholic rainy atmosphere' },
  { id: '8bit', label: '8-Bit', icon: '👾', description: 'Retro pixel art style' },
  { id: 'kpop', label: 'K-pop', icon: '🎤', description: 'Cute and colorful Korean pop style' },
];

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="mb-6">
      <h3 className={`text-sm font-bold mb-3 uppercase ${
        theme === 'retro' ? 'text-[#33ff33]' : theme === '8bit' ? 'text-[#ffffff]' : theme === 'kpop' ? 'text-pink-500' : 'text-gray-400'
      }`}>
        Select Theme
      </h3>
      <div className="space-y-3">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`w-full p-3 border text-left transition-all cursor-pointer ${
              theme === t.id
                ? theme === 'cyberpunk'
                  ? 'border-cyan-500 bg-cyan-500/10'
                  : theme === 'retro'
                  ? 'border-[#33ff33] bg-[#003300]'
                  : theme === 'rainy'
                  ? 'border-[#4a6b8a] bg-[#1a2533]'
                  : theme === '8bit'
                  ? 'border-[#ffffff] bg-[#1a1a1a]'
                  : 'border-pink-400 bg-pink-50'
                : theme === 'cyberpunk'
                ? 'border-gray-700 hover:border-cyan-500/50'
                : theme === 'retro'
                ? 'border-gray-700 hover:border-[#33ff33]/50'
                : theme === 'rainy'
                ? 'border-gray-700 hover:border-[#4a6b8a]/50'
                : theme === '8bit'
                ? 'border-gray-700 hover:border-[#ffffff]/50'
                : 'border-gray-200 hover:border-pink-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-bold ${
                  theme === 'retro' ? 'text-[#33ff33]' : theme === '8bit' ? 'text-[#ffffff]' : theme === 'kpop' ? 'text-gray-800' : 'text-white'
                }`}>
                  {t.icon} {t.label}
                </p>
                <p className={`text-sm ${
                  theme === 'retro' ? 'text-[#33ff33] opacity-70' : theme === 'kpop' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {t.description}
                </p>
              </div>
              {theme === t.id && (
                <span className={`text-xl ${
                  theme === 'retro' ? 'text-[#33ff33]' : theme === '8bit' ? 'text-[#ffff00]' : theme === 'kpop' ? 'text-pink-500' : 'text-white'
                }`}>
                  ✓
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}