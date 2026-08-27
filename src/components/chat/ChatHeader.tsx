'use client';

import { useAuth } from '@/context/AuthContext';

interface ChatHeaderProps {
  styles: any;
  theme: string;
  onSettingsClick: () => void;
}

export default function ChatHeader({ styles, theme, onSettingsClick }: ChatHeaderProps) {
  const { user } = useAuth();

  return (
    <div className={`flex items-center justify-between p-4 border-b ${styles.header} chat-header relative`}>
      <div className="flex items-center space-x-3">
        <h1 className={`text-2xl font-bold ${styles.title}`}>
          {theme === 'cyberpunk' ? 'NEON CHAT' : theme === 'retro' ? 'RETRO CHAT' : theme === 'rainy' ? 'Rainy Chat' : theme === '8bit' ? '8-BIT CHAT' : 'K-POP CHAT'}
        </h1>
      </div>
      
      <button
        onClick={onSettingsClick}
        className={`flex items-center space-x-2 px-3 py-2 border transition-all ${styles.userButton} ${
          theme === 'cyberpunk' 
            ? 'border-cyan-500/30' 
            : theme === 'retro'
            ? 'border-[#33ff33]/30'
            : theme === 'rainy'
            ? 'border-[#4a6b8a]/30'
            : 'border-[#ffffff]/30'
        }`}
      >
        <div className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center text-lg font-bold border-2 ${
          theme === 'cyberpunk'
            ? 'border-cyan-500'
            : theme === 'retro'
            ? 'border-[#33ff33]'
            : theme === 'rainy'
            ? 'border-[#4a6b8a]'
            : 'border-[#ffffff]'
        } ${styles.avatarBg}`}>
          {user?.avatar ? (
            <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            user?.name?.charAt(0).toUpperCase() || user?.username?.charAt(0).toUpperCase() || '?'
          )}
        </div>
        <span className={`text-sm ${styles.text}`}>
          {user?.name || user?.username || 'Loading...'}
        </span>
      </button>
    </div>
  );
}