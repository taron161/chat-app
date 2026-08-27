'use client';

import { useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { usePathname } from 'next/navigation';

export default function RainEffect() {
  const { theme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    if (theme !== 'rainy') return;

    let timeoutId: NodeJS.Timeout;
    
    // Добавляем задержку для полной загрузки DOM
    timeoutId = setTimeout(() => {
      const isMobile = window.innerWidth <= 1024;
      const isAuthPage = pathname === '/auth';
      
      // Очищаем предыдущие эффекты
      cleanupEffects();

      if (!isMobile || isAuthPage) {
        // Десктопная версия или страница авторизации - дождь по всему экрану
        createDesktopRain();
      } else {
        // Мобильная версия на главной - дождь в окне чата
        createMobileRain();
      }
    }, 100);

    // Обработчик изменения размера окна
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const newIsMobile = window.innerWidth <= 1024;
        const isAuthPage = pathname === '/auth';
        cleanupEffects();
        if (newIsMobile && !isAuthPage) {
          createMobileRain();
        } else {
          createDesktopRain();
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      cleanupEffects();
    };
  }, [theme, pathname]);

  const createDesktopRain = () => {
    console.log('Creating desktop rain effects');
    
    // Создаем контейнер для дождя
    let rainContainer = document.getElementById('rain-container') as HTMLDivElement;
    if (!rainContainer) {
      rainContainer = document.createElement('div');
      rainContainer.className = 'rain-container';
      rainContainer.id = 'rain-container';
      document.body.appendChild(rainContainer);
    }

    // Создаем дождевые капли
    const numDrops = 150;
    for (let i = 0; i < numDrops; i++) {
      const drop = document.createElement('div');
      drop.className = 'raindrop';
      drop.style.left = Math.random() * 100 + '%';
      drop.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';
      drop.style.animationDelay = (Math.random() * 2) + 's';
      drop.style.height = (Math.random() * 20 + 10) + 'px';
      drop.style.opacity = (Math.random() * 0.5 + 0.3).toString();
      rainContainer.appendChild(drop);
    }

    // Создаем молнию
    let lightning = document.getElementById('lightning-flash') as HTMLDivElement;
    if (!lightning) {
      lightning = document.createElement('div');
      lightning.className = 'lightning-flash';
      lightning.id = 'lightning-flash';
      document.body.appendChild(lightning);
    }

    // Создаем туман
    let fog = document.getElementById('fog') as HTMLDivElement;
    if (!fog) {
      fog = document.createElement('div');
      fog.className = 'fog';
      fog.id = 'fog';
      document.body.appendChild(fog);
    }
  };

  const createMobileRain = () => {
    console.log('Creating mobile rain effects');
    
    // Находим основной контейнер чата
    const chatMainContainer = document.querySelector('.relative.z-10.w-full.max-w-4xl') as HTMLElement;
    
    if (chatMainContainer) {
      // Создаем контейнер для дождя поверх всего окна чата
      let rainContainer = document.getElementById('rain-container-mobile') as HTMLDivElement;
      if (!rainContainer) {
        rainContainer = document.createElement('div');
        rainContainer.className = 'rain-container-mobile';
        rainContainer.id = 'rain-container-mobile';
        chatMainContainer.appendChild(rainContainer);
      }

      // Создаем дождевые капли
      const numDrops = 80;
      for (let i = 0; i < numDrops; i++) {
        const drop = document.createElement('div');
        drop.className = 'raindrop-mobile';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';
        drop.style.animationDelay = (Math.random() * 2) + 's';
        drop.style.height = (Math.random() * 15 + 8) + 'px';
        drop.style.opacity = (Math.random() * 0.5 + 0.3).toString();
        rainContainer.appendChild(drop);
      }

      // Создаем молнию в шапке
      const header = document.querySelector('.chat-header') as HTMLElement;
      if (header) {
        let lightning = document.getElementById('lightning-in-header') as HTMLDivElement;
        if (!lightning) {
          lightning = document.createElement('div');
          lightning.className = 'lightning-in-header';
          lightning.id = 'lightning-in-header';
          header.appendChild(lightning);
        }
      }
    }
  };

  const cleanupEffects = () => {
    // Удаляем десктопные элементы
    const rainContainer = document.getElementById('rain-container');
    if (rainContainer) rainContainer.remove();

    const lightning = document.getElementById('lightning-flash');
    if (lightning) lightning.remove();

    const fog = document.getElementById('fog');
    if (fog) fog.remove();

    // Удаляем мобильные элементы
    const rainContainerMobile = document.getElementById('rain-container-mobile');
    if (rainContainerMobile) rainContainerMobile.remove();

    const lightningInHeader = document.getElementById('lightning-in-header');
    if (lightningInHeader) lightningInHeader.remove();
  };

  return null;
}