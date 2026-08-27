'use client';

import { useState, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

export default function ProfileEditor() {
  const { theme } = useTheme();
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setMessage('File size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 140;
        canvas.height = 140;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          const size = Math.min(img.width, img.height);
          const x = (img.width - size) / 2;
          const y = (img.height - size) / 2;
          
          ctx.drawImage(img, x, y, size, size, 0, 0, 140, 140);
          
          const resizedAvatar = canvas.toDataURL('image/jpeg', 0.8);
          setAvatar(resizedAvatar);
          setMessage('');
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setMessage('');
    
    const success = await updateProfile(name, avatar);
    
    if (success) {
      setMessage('Profile updated successfully!');
    } else {
      setMessage('Failed to update profile');
    }
    
    setIsSaving(false);
  };

  return (
    <div className={`mb-6 p-4 border ${
      theme === 'cyberpunk'
        ? 'border-cyan-500/30 bg-[#1a1a2e]/50'
        : theme === 'retro'
        ? 'border-[#33ff33] bg-[#003300]'
        : theme === 'rainy'
        ? 'border-[#4a6b8a]/30 bg-[#1a2533]/50'
        : 'border-[#ffffff] bg-[#1a1a1a]'
    }`}>
      <h3 className={`text-sm font-bold mb-3 uppercase ${
        theme === 'retro' ? 'text-[#33ff33]' : theme === '8bit' ? 'text-[#ffffff]' : 'text-gray-400'
      }`}>
        Profile Editor
      </h3>
      
      {/* Avatar Upload */}
      <div className="flex items-center space-x-4 mb-4">
        <div 
          onClick={handleAvatarClick}
          className={`w-20 h-20 rounded-full cursor-pointer overflow-hidden border-2 flex items-center justify-center text-3xl font-bold ${
            theme === 'cyberpunk'
              ? 'border-cyan-500 bg-gradient-to-r from-purple-600 to-cyan-600'
              : theme === 'retro'
              ? 'border-[#33ff33] bg-[#33ff33] text-black'
              : theme === 'rainy'
              ? 'border-[#4a6b8a] bg-[#2a3545]'
              : 'border-[#ffffff] bg-[#ff0000] text-white'
          }`}
        >
          {avatar ? (
            <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            user?.name?.charAt(0).toUpperCase() || user?.username?.charAt(0).toUpperCase() || '?'
          )}
        </div>
        <div>
          <button
            onClick={handleAvatarClick}
            className={`text-sm px-3 py-1 border cursor-pointer transition-all ${
              theme === 'cyberpunk'
                ? 'border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10'
                : theme === 'retro'
                ? 'border-[#33ff33]/30 text-[#33ff33] hover:bg-[#003300]'
                : theme === 'rainy'
                ? 'border-[#4a6b8a]/30 text-[#a8b2c0] hover:bg-[#1a2533]'
                : 'border-[#ffffff]/30 text-[#ffffff] hover:bg-[#1a1a1a]'
            }`}
          >
            Upload photo
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="hidden"
        />
      </div>

      {/* Name Input */}
      <div className="mb-4">
        <label className={`block text-sm mb-2 ${
          theme === 'retro' ? 'text-[#33ff33]' : 'text-gray-400'
        }`}>
          Display Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className={`w-full px-3 py-2 border focus:outline-none ${
            theme === 'cyberpunk'
              ? 'bg-[#0a0a0f] text-gray-200 border-cyan-500/30 focus:border-cyan-400'
              : theme === 'retro'
              ? 'bg-[#0a0a0a] text-[#33ff33] border-[#33ff33] focus:border-[#ffbf00]'
              : theme === 'rainy'
              ? 'bg-[#0a0e14]/50 text-[#a8b2c0] border-[#4a6b8a]/30 focus:border-[#6b8baa]'
              : 'bg-[#000000] text-[#ffffff] border-[#ffffff] focus:border-[#ffff00]'
          }`}
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSaveProfile}
        disabled={isSaving}
        className={`w-full px-4 py-2 font-bold transition-all disabled:opacity-50 cursor-pointer ${
          theme === 'cyberpunk'
            ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
            : theme === 'retro'
            ? 'bg-[#33ff33] text-black hover:bg-[#ffbf00]'
            : theme === 'rainy'
            ? 'bg-[#2a3545] text-[#a8b2c0] hover:bg-[#3a4555]'
            : 'bg-[#ff0000] text-white hover:bg-[#ffff00] hover:text-black'
        }`}
      >
        {isSaving ? 'Saving...' : 'Save Profile'}
      </button>

      {message && (
        <p className={`text-sm mt-2 text-center ${
          message.includes('success') 
            ? 'text-green-400' 
            : 'text-red-400'
        }`}>
          {message}
        </p>
      )}
    </div>
  );
}