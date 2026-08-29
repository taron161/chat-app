'use client';

import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

export default function LogoutButton() {
  const { theme } = useTheme();
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className={`w-full p-3 font-bold transition-all cursor-pointer ${
        theme === 'cyberpunk'
          ? 'bg-red-600/20 text-red-400 border border-red-500/50 hover:bg-red-600/30'
          : theme === 'retro'
          ? 'bg-[#330000] text-[#ff3333] border border-[#ff3333] hover:bg-[#440000]'
          : theme === 'rainy'
          ? 'bg-[#1a1015] text-[#c08090] border border-[#8a4a5a]/50 hover:bg-[#2a1515]'
          : theme === '8bit'
          ? 'bg-[#330000] text-[#ff0000] border border-[#ff0000] hover:bg-[#440000]'
          : theme === 'kpop'
          ? 'bg-red-50 text-red-400 border border-red-200 hover:bg-red-100'
          : 'bg-[#3a1a1a] text-[#ff4444] border border-[#5a2a2a] hover:bg-[#4a2a2a]'
      }`}
    >
      Logout
    </button>
  );
}