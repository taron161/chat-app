'use client';

import { useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { usePathname } from 'next/navigation';

export default function KpopEffects() {
  const { theme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    if (theme !== 'kpop') return;

    let timeoutId: NodeJS.Timeout;
    
    timeoutId = setTimeout(() => {
      const isMobile = window.innerWidth <= 1024;
      const isAuthPage = pathname === '/auth';
      
      cleanupEffects();

      if (!isMobile || isAuthPage) {
        createDesktopEffects();
      } else {
        createMobileEffects();
      }
      
      // Создаем эквалайзер в шапке для всех версий
      createHeaderEqualizer();
    }, 100);

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const newIsMobile = window.innerWidth <= 1024;
        const isAuthPage = pathname === '/auth';
        cleanupEffects();
        if (newIsMobile && !isAuthPage) {
          createMobileEffects();
        } else {
          createDesktopEffects();
        }
        createHeaderEqualizer();
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      cleanupEffects();
    };
  }, [theme, pathname]);

  const createHeaderEqualizer = () => {
    const header = document.querySelector('.chat-header') as HTMLElement;
    if (!header) return;

    let equalizer = document.getElementById('kpop-equalizer') as HTMLDivElement;
    if (!equalizer) {
      equalizer = document.createElement('div');
      equalizer.className = 'kpop-equalizer';
      equalizer.id = 'kpop-equalizer';
      
      // Создаем полоски эквалайзера
      for (let i = 0; i < 20; i++) {
        const bar = document.createElement('div');
        bar.className = 'kpop-eq-bar';
        bar.style.animationDelay = (Math.random() * 1) + 's';
        bar.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';
        equalizer.appendChild(bar);
      }
      
      header.appendChild(equalizer);
    }
  };

  const createDesktopEffects = () => {
    console.log('Creating desktop K-pop effects');
    
    let effectsContainer = document.getElementById('kpop-effects-container') as HTMLDivElement;
    if (!effectsContainer) {
      effectsContainer = document.createElement('div');
      effectsContainer.className = 'kpop-effects';
      effectsContainer.id = 'kpop-effects-container';
      document.body.appendChild(effectsContainer);
    }

    const hearts = ['💖', '💕', '💗', '💓', '🩷', '💘'];
    const numHearts = 20;
    
    for (let i = 0; i < numHearts; i++) {
      const heart = document.createElement('div');
      heart.className = 'kpop-heart';
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.fontSize = (Math.random() * 25 + 15) + 'px';
      heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
      heart.style.animationDelay = (Math.random() * 5) + 's';
      effectsContainer.appendChild(heart);
    }

    const sparkles = ['✨', '⭐', '🌟', '💫'];
    const numSparkles = 15;
    
    for (let i = 0; i < numSparkles; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'kpop-sparkle';
      sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.fontSize = (Math.random() * 20 + 10) + 'px';
      sparkle.style.animationDelay = (Math.random() * 2) + 's';
      effectsContainer.appendChild(sparkle);
    }

    const notes = ['🎵', '🎶', '🎤', '🎸', '🎹', '🥁'];
    const numNotes = 10;
    
    for (let i = 0; i < numNotes; i++) {
      const note = document.createElement('div');
      note.className = 'kpop-star';
      note.textContent = notes[Math.floor(Math.random() * notes.length)];
      note.style.left = Math.random() * 100 + '%';
      note.style.top = Math.random() * 100 + '%';
      note.style.fontSize = (Math.random() * 20 + 15) + 'px';
      note.style.animationDelay = (Math.random() * 3) + 's';
      effectsContainer.appendChild(note);
    }
  };

  const createMobileEffects = () => {
    console.log('Creating mobile K-pop effects');
    
    const chatContainer = document.querySelector('.relative.z-10.w-full.max-w-4xl') as HTMLElement;
    
    if (chatContainer) {
      let effectsContainer = document.getElementById('kpop-effects-mobile') as HTMLDivElement;
      if (!effectsContainer) {
        effectsContainer = document.createElement('div');
        effectsContainer.className = 'kpop-effects-mobile';
        effectsContainer.id = 'kpop-effects-mobile';
        chatContainer.appendChild(effectsContainer);
      }

      const hearts = ['💖', '💕', '💗', '💓', '🩷', '💘'];
      const numHearts = 15;
      
      for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        heart.className = 'kpop-heart-mobile';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animationDuration = (Math.random() * 4 + 3) + 's';
        heart.style.animationDelay = (Math.random() * 4) + 's';
        effectsContainer.appendChild(heart);
      }
    }

    const header = document.querySelector('.chat-header') as HTMLElement;
    if (header) {
      let headerEffects = document.getElementById('kpop-header-effects') as HTMLDivElement;
      if (!headerEffects) {
        headerEffects = document.createElement('div');
        headerEffects.className = 'kpop-header-effects';
        headerEffects.id = 'kpop-header-effects';
        header.appendChild(headerEffects);
      }

      const mics = ['🎤', '🎙️'];
      for (let i = 0; i < 3; i++) {
        const mic = document.createElement('div');
        mic.className = 'kpop-mic';
        mic.textContent = mics[Math.floor(Math.random() * mics.length)];
        mic.style.left = (20 + i * 30) + '%';
        mic.style.animationDelay = (i * 0.5) + 's';
        headerEffects.appendChild(mic);
      }

      const notes = ['🎵', '🎶', '🎼'];
      for (let i = 0; i < 4; i++) {
        const note = document.createElement('div');
        note.className = 'kpop-note';
        note.textContent = notes[Math.floor(Math.random() * notes.length)];
        note.style.left = (10 + i * 25) + '%';
        note.style.animationDelay = (i * 0.3) + 's';
        headerEffects.appendChild(note);
      }

      const stars = ['⭐', '🌟', '✨'];
      for (let i = 0; i < 3; i++) {
        const star = document.createElement('div');
        star.className = 'kpop-star-header';
        star.textContent = stars[Math.floor(Math.random() * stars.length)];
        star.style.left = (30 + i * 20) + '%';
        star.style.animationDelay = (i * 0.7) + 's';
        headerEffects.appendChild(star);
      }

      const instruments = ['🎸', '🎹', '🥁', '🎻'];
      for (let i = 0; i < 2; i++) {
        const instrument = document.createElement('div');
        instrument.className = 'kpop-instrument';
        instrument.textContent = instruments[Math.floor(Math.random() * instruments.length)];
        instrument.style.left = (15 + i * 40) + '%';
        instrument.style.animationDelay = (i * 1) + 's';
        headerEffects.appendChild(instrument);
      }
    }
  };

  const cleanupEffects = () => {
    const effectsContainer = document.getElementById('kpop-effects-container');
    if (effectsContainer) effectsContainer.remove();

    const effectsMobile = document.getElementById('kpop-effects-mobile');
    if (effectsMobile) effectsMobile.remove();

    const headerEffects = document.getElementById('kpop-header-effects');
    if (headerEffects) headerEffects.remove();

    const equalizer = document.getElementById('kpop-equalizer');
    if (equalizer) equalizer.remove();
  };

  return null;
}