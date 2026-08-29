'use client';

import { useTheme } from '@/context/ThemeContext';
import { ThemeStyles } from '@/types/theme';

export function useThemeStyles() {
  const { theme } = useTheme();

  const getThemeStyles = (): ThemeStyles => {
    switch (theme) {
      case 'cyberpunk':
        return {
          bg: 'bg-[#0a0a0f]',
          container: 'bg-[#0d0d1a]/90 border-cyan-500/30 shadow-[0_0_50px_rgba(0,255,255,0.3)]',
          header: 'border-cyan-500/30 bg-[#1a1a2e]/50',
          title: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400',
          text: 'text-gray-200',
          inputBg: 'bg-[#0d0d1a] placeholder-cyan-400/50 border-cyan-500/30',
          button: 'bg-gradient-to-r from-purple-600 to-cyan-600',
          messageUser: 'from-purple-600/30 to-cyan-600/30 border-cyan-500/50',
          messageOther: 'bg-[#1a1a2e]/80 border-purple-500/50',
          userButton: 'hover:bg-cyan-500/20',
          avatarBg: 'bg-gradient-to-r from-purple-600 to-cyan-600',
          typingColor: 'text-cyan-400',
        };
      case 'retro':
        return {
          bg: 'bg-[#1a1a1a] crt',
          container: 'bg-[#0a0a0a] border-[#33ff33] shadow-[0_0_50px_rgba(51,255,51,0.3)]',
          header: 'border-[#33ff33] bg-[#0a0a0a]',
          title: 'text-[#33ff33] glow-green',
          text: 'text-[#33ff33]',
          inputBg: 'bg-[#0a0a0a] placeholder-[#33ff33] border-[#33ff33]',
          button: 'bg-[#33ff33] text-black hover:bg-[#ffbf00]',
          messageUser: 'border-[#33ff33] bg-[#003300]',
          messageOther: 'border-[#ffbf00] bg-[#1a1a00]',
          userButton: 'hover:bg-[#003300]',
          avatarBg: 'bg-[#33ff33] text-black',
          typingColor: 'text-[#33ff33]',
        };
      case 'rainy':
        return {
          bg: 'bg-[#0a0e14]',
          container: 'bg-[#1a2533]/80 border-[#4a6b8a]/30 shadow-[0_0_50px_rgba(74,107,138,0.2)]',
          header: 'border-[#4a6b8a]/30 bg-[#1a2533]/50',
          title: 'text-[#a8b2c0]',
          text: 'text-[#a8b2c0]',
          inputBg: 'bg-[#0a0e14]/50 placeholder-[#6b7a8a] border-[#4a6b8a]/30',
          button: 'bg-[#2a3545] hover:bg-[#3a4555]',
          messageUser: 'border-[#4a6b8a]/40 bg-[#1a2533]/60',
          messageOther: 'border-[#3a4555]/30 bg-[#1a2028]/40',
          userButton: 'hover:bg-[#1a2533]',
          avatarBg: 'bg-[#2a3545]',
          typingColor: 'text-[#8b95a5]',
        };
      case '8bit':
        return {
          bg: 'bg-[#000000]',
          container: 'bg-[#1a1a1a] border-[#ffffff] shadow-[0_0_50px_rgba(255,255,255,0.5)]',
          header: 'border-[#ffffff] bg-[#000000]',
          title: 'text-[#ffff00]',
          text: 'text-[#ffffff]',
          inputBg: 'bg-[#000000] placeholder-[#ffffff] border-[#ffffff]',
          button: 'bg-[#ff0000] text-white hover:bg-[#ffff00] hover:text-black',
          messageUser: 'border-[#00ff00] bg-[#003300]',
          messageOther: 'border-[#ffffff] bg-[#1a1a1a]',
          userButton: 'hover:bg-[#ff0000]',
          avatarBg: 'bg-[#ff0000] text-white',
          typingColor: 'text-[#ffff00]',
        };
      case 'kpop':
        return {
          bg: 'bg-[#fff5f7]',
          container: 'bg-white/90 border-pink-300/50 shadow-[0_0_50px_rgba(255,107,157,0.3)]',
          header: 'border-pink-200 bg-pink-50/50',
          title: 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500',
          text: 'text-gray-700',
          inputBg: 'bg-white placeholder-pink-300 border-pink-200',
          button: 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600',
          messageUser: 'from-pink-100 to-purple-100 border-pink-300',
          messageOther: 'bg-gray-50 border-gray-200',
          userButton: 'hover:bg-pink-100',
          avatarBg: 'bg-gradient-to-r from-pink-500 to-purple-500',
          typingColor: 'text-pink-500',
        };
      case 'mechanical':
        return {
          bg: 'bg-[#1a1a1a]',
          container: 'bg-[#2a2a2a] border-[#4a4a4a] shadow-[0_0_30px_rgba(0,0,0,0.5)]',
          header: 'border-[#3a3a3a] bg-[#2a2a2a]',
          title: 'text-[#00ff88]',
          text: 'text-[#e0e0e0]',
          inputBg: 'bg-[#1a1a1a] placeholder-[#6a6a6a] border-[#4a4a4a] focus:border-[#00ff88]',
          button: 'bg-[#4a4a4a] text-[#e0e0e0] hover:bg-[#5a5a5a] border-[#5a5a5a]',
          messageUser: 'border-[#00ff88] bg-[#2a3a2a]',
          messageOther: 'border-[#4a4a4a] bg-[#2a2a2a]',
          userButton: 'hover:bg-[#3a3a3a]',
          avatarBg: 'bg-[#4a4a4a]',
          typingColor: 'text-[#00ff88]',
        };
      default:
        return {
          bg: 'bg-[#0a0a0f]',
          container: 'bg-[#0d0d1a]/90 border-cyan-500/30 shadow-[0_0_50px_rgba(0,255,255,0.3)]',
          header: 'border-cyan-500/30 bg-[#1a1a2e]/50',
          title: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400',
          text: 'text-gray-200',
          inputBg: 'bg-[#0d0d1a] placeholder-cyan-400/50 border-cyan-500/30',
          button: 'bg-gradient-to-r from-purple-600 to-cyan-600',
          messageUser: 'from-purple-600/30 to-cyan-600/30 border-cyan-500/50',
          messageOther: 'bg-[#1a1a2e]/80 border-purple-500/50',
          userButton: 'hover:bg-cyan-500/20',
          avatarBg: 'bg-gradient-to-r from-purple-600 to-cyan-600',
          typingColor: 'text-cyan-400',
        };
    }
  };

  return {
    theme,
    styles: getThemeStyles(),
  };
}