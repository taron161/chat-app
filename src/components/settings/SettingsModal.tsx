'use client';

import { useTheme } from '@/context/ThemeContext';
import ProfileEditor from './ProfileEditor';
import ThemeSelector from './ThemeSelector';
import LogoutButton from './LogoutButton';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/10" />
      
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`relative z-10 w-full max-w-md p-6 border overflow-y-auto max-h-[90vh] ${
          theme === 'cyberpunk'
            ? 'bg-[#0d0d1a]/90 border-cyan-500/50 shadow-[0_0_50px_rgba(0,255,255,0.3)]'
            : theme === 'retro'
            ? 'bg-[#0a0a0a]/90 border-[#33ff33] shadow-[0_0_50px_rgba(51,255,51,0.3)]'
            : theme === 'rainy'
            ? 'bg-[#1a2533]/90 border-[#4a6b8a]/50 shadow-[0_0_50px_rgba(74,107,138,0.3)]'
            : theme === '8bit'
            ? 'bg-[#000000]/90 border-[#ffffff] shadow-[0_0_50px_rgba(255,255,255,0.5)]'
            : 'bg-white/95 border-pink-300/50 shadow-[0_0_50px_rgba(255,107,157,0.3)]'
        }`}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${
            theme === 'cyberpunk'
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400'
              : theme === 'retro'
              ? 'text-[#33ff33] glow-green'
              : theme === 'rainy'
              ? 'text-[#a8b2c0]'
              : theme === '8bit'
              ? 'text-[#ffffff]'
              : 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500'
          }`}>
            Settings
          </h2>
          <button
            onClick={onClose}
            className={`text-2xl cursor-pointer ${
              theme === 'retro' ? 'text-[#ff3333] hover:text-[#ffbf00]' : 'hover:opacity-70'
            }`}
          >
            ×
          </button>
        </div>

        <ProfileEditor />
        <ThemeSelector />
        <LogoutButton />
      </div>
    </div>
  );
}