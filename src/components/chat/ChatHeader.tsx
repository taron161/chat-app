'use client';

import { useAuth } from '@/context/AuthContext';
import { ThemeStyles } from '@/types/theme';

interface ChatHeaderProps {
  styles: ThemeStyles;
  theme: string;
  onSettingsClick: () => void;
}

export default function ChatHeader({ styles, theme, onSettingsClick }: ChatHeaderProps) {
  const { user } = useAuth();

  const getTitle = () => {
    switch (theme) {
      case 'cyberpunk': return 'NEON CHAT';
      case 'retro': return 'RETRO CHAT';
      case 'rainy': return 'Rainy Chat';
      case '8bit': return '8-BIT CHAT';
      case 'mechanical': return 'MECH CHAT';
      default: return 'K-POP CHAT';
    }
  };

  return (
    <div className={`flex items-center justify-between p-4 border-b ${styles.header} chat-header relative`}>
      <div className="flex items-center space-x-3 flex-shrink-0">
        {theme === 'mechanical' ? (
          <>
            <span className="mech-switch mech-rgb-text" style={{ color: '#00ff88' }} />
            <h1 className={`text-2xl font-bold mech-rgb-text`}>
              MECH CHAT
            </h1>
            <span className="mech-led" style={{ color: '#00ff88' }} />
          </>
        ) : (
          <h1 className={`text-2xl font-bold ${styles.title}`}>
            {getTitle()}
          </h1>
        )}
      </div>
      
      <div className="flex-1 relative overflow-hidden">
        {/* Анимации */}
      </div>
      
      <button
        onClick={onSettingsClick}
        className={`flex items-center space-x-2 px-3 py-2 border transition-all flex-shrink-0 ml-auto ${styles.userButton} ${
          theme === 'cyberpunk' 
            ? 'border-cyan-500/30' 
            : theme === 'retro'
            ? 'border-[#33ff33]/30'
            : theme === 'rainy'
            ? 'border-[#4a6b8a]/30'
            : theme === '8bit'
            ? 'border-[#ffffff]/30'
            : theme === 'kpop'
            ? 'border-pink-300/50'
            : 'border-[#4a4a4a]'
        }`}
      >
        <div className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center text-lg font-bold border-2 ${
          theme === 'cyberpunk'
            ? 'border-cyan-500'
            : theme === 'retro'
            ? 'border-[#33ff33]'
            : theme === 'rainy'
            ? 'border-[#4a6b8a]'
            : theme === '8bit'
            ? 'border-[#ffffff]'
            : theme === 'kpop'
            ? 'border-pink-300'
            : 'border-[#00ff88]'
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