'use client';

import { useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { usePathname } from 'next/navigation';

export default function PixelEffects() {
  const { theme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    if (theme !== '8bit') return;

    let timeoutId: NodeJS.Timeout;
    
    // Добавляем задержку для полной загрузки DOM
    timeoutId = setTimeout(() => {
      const isMobile = window.innerWidth <= 1024;
      const isAuthPage = pathname === '/auth';
      
      // Очищаем предыдущие эффекты
      cleanupEffects();

      if (!isMobile || isAuthPage) {
        // Десктопная версия или страница авторизации
        createDesktopEffects();
      } else {
        // Мобильная версия на главной
        createMobileEffects();
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
          createMobileEffects();
        } else {
          createDesktopEffects();
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

  const createDesktopEffects = () => {
    console.log('Creating desktop 8-bit effects');
    
    // Проверяем, существует ли уже контейнер
    let pixelContainer = document.getElementById('pixel-effects-container') as HTMLDivElement;
    if (!pixelContainer) {
      pixelContainer = document.createElement('div');
      pixelContainer.className = 'pixel-effects';
      pixelContainer.id = 'pixel-effects-container';
      document.body.appendChild(pixelContainer);
    }

    // Летающие пиксели
    const pixels = ['■', '□', '▪', '▫', '•', '◦'];
    const numPixels = 50;
    
    for (let i = 0; i < numPixels; i++) {
      const pixel = document.createElement('div');
      pixel.className = 'floating-pixel';
      pixel.textContent = pixels[Math.floor(Math.random() * pixels.length)];
      pixel.style.left = Math.random() * 100 + '%';
      pixel.style.top = Math.random() * 100 + '%';
      pixel.style.fontSize = (Math.random() * 20 + 10) + 'px';
      pixel.style.animationDuration = (Math.random() * 3 + 2) + 's';
      pixel.style.animationDelay = (Math.random() * 2) + 's';
      pixel.style.color = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'][Math.floor(Math.random() * 6)];
      pixel.style.opacity = (Math.random() * 0.3 + 0.1).toString();
      pixelContainer.appendChild(pixel);
    }

    // Пиксельное солнце
    const sun = document.createElement('div');
    sun.className = 'pixel-sun';
    sun.innerHTML = `
      <div class="sun-grid">
        ${Array(8).fill(0).map((_, i) => `
          <div class="sun-row">
            ${Array(8).fill(0).map((_, j) => `
              <div class="sun-pixel ${(i === 0 || i === 7 || j === 0 || j === 7 || (i >= 3 && i <= 4 && j >= 3 && j <= 4)) ? 'active' : ''}"></div>
            `).join('')}
          </div>
        `).join('')}
      </div>
    `;
    pixelContainer.appendChild(sun);

    // Пиксельные облака
    for (let c = 0; c < 3; c++) {
      const cloud = document.createElement('div');
      cloud.className = 'pixel-cloud';
      cloud.style.top = (10 + c * 15) + '%';
      cloud.style.animationDuration = (20 + c * 5) + 's';
      cloud.style.animationDelay = (c * 3) + 's';
      cloud.innerHTML = `
        <div class="cloud-grid">
          ${Array(3).fill(0).map((_, i) => `
            <div class="cloud-row">
              ${Array(6).fill(0).map((_, j) => `
                <div class="cloud-pixel ${(i === 0 && j >= 1 && j <= 4) || (i === 1 && j >= 0 && j <= 5) || (i === 2 && j >= 1 && j <= 4) ? 'active' : ''}"></div>
              `).join('')}
            </div>
          `).join('')}
        </div>
      `;
      pixelContainer.appendChild(cloud);
    }
  };

  const createMobileEffects = () => {
    console.log('Creating mobile 8-bit effects');
    
    // Находим основной контейнер чата
    const chatMainContainer = document.querySelector('.relative.z-10.w-full.max-w-4xl') as HTMLElement;
    
    if (chatMainContainer) {
      // Создаем контейнер для частиц поверх окна чата
      let particlesContainer = document.getElementById('mobile-particles-container') as HTMLDivElement;
      if (!particlesContainer) {
        particlesContainer = document.createElement('div');
        particlesContainer.className = 'mobile-particles';
        particlesContainer.id = 'mobile-particles-container';
        chatMainContainer.appendChild(particlesContainer);
      }

      // Создаем поднимающиеся частицы снизу
      const particles = ['■', '□', '▪', '▫', '•'];
      const numParticles = 30;
      
      for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'rising-particle';
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.fontSize = (Math.random() * 12 + 8) + 'px';
        particle.style.animationDuration = (Math.random() * 4 + 3) + 's';
        particle.style.animationDelay = (Math.random() * 5) + 's';
        particle.style.color = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'][Math.floor(Math.random() * 6)];
        particle.style.opacity = (Math.random() * 0.4 + 0.2).toString();
        particlesContainer.appendChild(particle);
      }
    }

    // Создаем анимированные фигурки в шапке
    const header = document.querySelector('.chat-header') as HTMLElement;
    if (header) {
      let headerFigures = document.getElementById('header-pixel-figures') as HTMLDivElement;
      if (!headerFigures) {
        headerFigures = document.createElement('div');
        headerFigures.className = 'header-pixel-figures';
        headerFigures.id = 'header-pixel-figures';
        
        const figures = [
          { type: 'star', color: '#ffff00', animation: 'spin' },
          { type: 'heart', color: '#ff00ff', animation: 'pulse' },
          { type: 'coin', color: '#ff8800', animation: 'spin' },
        ];

        figures.forEach((figure, index) => {
          const figureElement = document.createElement('div');
          figureElement.className = `pixel-figure pixel-figure-${figure.animation}`;
          figureElement.style.animationDelay = (index * 0.3) + 's';
          
          figureElement.innerHTML = createPixelFigure(figure.type, figure.color);
          
          headerFigures.appendChild(figureElement);
        });

        header.appendChild(headerFigures);
      }
    }
  };

  const createPixelFigure = (type: string, color: string) => {
    const patterns: Record<string, number[][]> = {
      star: [
        [0,0,1,0,0],
        [0,1,1,1,0],
        [1,1,1,1,1],
        [0,1,1,1,0],
        [0,0,1,0,0],
      ],
      heart: [
        [0,1,0,1,0],
        [1,1,1,1,1],
        [1,1,1,1,1],
        [0,1,1,1,0],
        [0,0,1,0,0],
      ],
      coin: [
        [0,1,1,1,0],
        [1,1,1,1,1],
        [1,1,1,1,1],
        [0,1,1,1,0],
        [0,0,1,0,0],
      ],
    };

    const pattern = patterns[type];
    if (!pattern) return '';

    return `
      <div class="pixel-figure-grid">
        ${pattern.map(row => `
          <div class="pixel-figure-row">
            ${row.map(cell => `
              <div class="pixel-figure-cell ${cell ? 'active' : ''}" style="background-color: ${cell ? color : 'transparent'}"></div>
            `).join('')}
          </div>
        `).join('')}
      </div>
    `;
  };

  const cleanupEffects = () => {
    const effectsContainer = document.getElementById('pixel-effects-container');
    if (effectsContainer) effectsContainer.remove();

    const particlesContainer = document.getElementById('mobile-particles-container');
    if (particlesContainer) particlesContainer.remove();

    const headerFigures = document.getElementById('header-pixel-figures');
    if (headerFigures) headerFigures.remove();
  };

  return null;
}