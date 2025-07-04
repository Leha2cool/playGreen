/**
 * ClassicGreen - Retro Interface Enhancement Plugin for PlayGreen
 * Версия: 1.0
 * Дата: 2025-07-03
 * Автор: Leha2cool
 * GitHub: https://github.com/Leha2cool
 */

class ClassicGreenPlugin {
  constructor(playGreen) {
    this.pg = playGreen;
    this.isActive = false;
    this.classicMode = 'enhanced';
    this.retroSounds = {
      click: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFd1xRUlVbX2Rtc3h9gYaMkpibnqKmqKqtr7GztLW2t7i5ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2tvc3d7f4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/v8AAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/QEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaW1xdXl9gYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXp7fH1+f4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/'),
      hover: new Audio('data:audio/wav;base64,UklGRl4FAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQUFAACAg4R/dGZbVlVWWVteYWRnbnN5gIeMkpidoKWprK6ws7W3ubq8vb/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w=='),
      notification: new Audio('data:audio/wav;base64,UklGRl4FAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQUFAACAg4R/dGZbVlVWWVteYWRnbnN5gIeMkpidoKWprK6ws7W3ubq8vb/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w=='),
      success: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFd1xRUlVbX2Rtc3h9gYaMkpibnqKmqKqtr7GztLW2t7i5ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2tvc3d7f4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/v8AAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/QEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaW1xdXl9gYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXp7fH1+f4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/')
    };
    this.crtEffect = null;
  }

  init() {
    if (this.isActive) return;
    
    this.pg.log('Инициализация ClassicGreen...', 'info');
    
    // Регистрация классических тем
    this.registerClassicThemes();
    
    // Добавление классических анимаций
    this.addClassicAnimations();
    
    // Инициализация звуков
    this.setupSoundSystem();
    
    // Применение классического режима по умолчанию
    this.enableClassicMode(this.classicMode);
    
    // Инициализация CRT эффекта
    this.initCRTEffect();
    
    // Регистрация обработчиков событий
    this.setupEventListeners();
    
    this.isActive = true;
    this.pg.dispatchEvent('pg-classicgreen-init', { status: 'success' });
  }

  registerClassicThemes() {
    const classicPalettes = {
      'windows-95': {
        primary: '#008080',
        secondary: '#C0C0C0',
        accent: '#800000',
        background: '#C0C0C0',
        text: '#000000',
        surface: '#FFFFFF',
        highlight: '#000080'
      },
      'macintosh-classic': {
        primary: '#2C70B5',
        secondary: '#909090',
        accent: '#D00000',
        background: '#DDDDDD',
        text: '#000000',
        surface: '#FFFFFF',
        highlight: '#3C9AFF'
      },
      'retro-green': {
        primary: '#00AA00',
        secondary: '#008800',
        accent: '#AA5500',
        background: '#002200',
        text: '#00FF00',
        surface: '#004400',
        highlight: '#00FF88'
      },
      'amiga-workbench': {
        primary: '#0000AA',
        secondary: '#5555FF',
        accent: '#AA5500',
        background: '#AAAAAA',
        text: '#000000',
        surface: '#FFFFFF',
        highlight: '#FFFF00'
      }
    };

    // Добавление палитр в систему PlayGreen
    Object.entries(classicPalettes).forEach(([name, palette]) => {
      this.pg.config.colorPalettes[name] = palette;
    });

    this.pg.log('Классические темы зарегистрированы', 'info');
  }

  addClassicAnimations() {
    this.pg.config.animationPresets = {
      ...this.pg.config.animationPresets,
      'classic-fade': {
        duration: 400,
        easing: 'linear'
      },
      'retro-bounce': {
        duration: 600,
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      },
      'terminal-type': {
        duration: 100,
        easing: 'steps(4)'
      },
      'crt-scan': {
        duration: 3000,
        easing: 'linear'
      }
    };

    this.pg.log('Классические анимации добавлены', 'info');
  }

  setupSoundSystem() {
    // Приглушаем звуки для лучшего UX
    Object.values(this.retroSounds).forEach(sound => {
      sound.volume = 0.3;
    });

    // Настройка обработчиков звуков
    this.pg.on('pg-interaction-start', () => this.playSound('click'));
    this.pg.on('pg-hover-start', () => this.playSound('hover'));
    this.pg.on('pg-notification', () => this.playSound('notification'));
    this.pg.on('pg-success', () => this.playSound('success'));

    this.pg.log('Звуковая система инициализирована', 'info');
  }

  playSound(type) {
    if (!this.retroSounds[type]) return;
    
    try {
      const sound = this.retroSounds[type].cloneNode();
      sound.play().catch(e => console.warn('Ошибка воспроизведения звука:', e));
    } catch (e) {
      console.warn('Ошибка воспроизведения звука:', e);
    }
  }

  initCRTEffect() {
    this.crtEffect = document.createElement('div');
    this.crtEffect.id = 'pg-crt-effect';
    this.crtEffect.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      background: 
        repeating-linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.1) 0px,
          rgba(0, 0, 0, 0.1) 1px,
          transparent 1px,
          transparent 3px
        );
      mix-blend-mode: overlay;
      opacity: 0.3;
      animation: pg-crt-scan 3s infinite linear;
    `;
    
    // Добавление CSS-анимации
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pg-crt-scan {
        0% { background-position: 0 0; }
        100% { background-position: 0 100%; }
      }
    `;
    
    document.head.appendChild(style);
    this.pg.log('CRT эффект подготовлен', 'info');
  }

  setupEventListeners() {
    this.pg.on('pg-theme-changed', () => this.applyClassicStyles());
    this.pg.on('pg-palette-update', () => this.applyClassicStyles());
  }

  enableClassicMode(mode = 'enhanced') {
    this.classicMode = mode;
    
    // Применение стилей
    this.applyClassicStyles();
    
    // Активация CRT эффекта
    if (this.crtEffect && !document.body.contains(this.crtEffect)) {
      document.body.appendChild(this.crtEffect);
    }
    
    // Установка классических шрифтов
    this.setClassicFonts();
    
    // Применение ретро анимации
    this.pg.applyAnimationPreset('classic-fade');
    
    this.pg.dispatchEvent('pg-classic-mode-changed', { mode });
    this.pg.log(`Классический режим "${mode}" активирован`, 'info');
  }

  disableClassicMode() {
    this.classicMode = 'disabled';
    
    // Удаление CRT эффекта
    if (this.crtEffect && document.body.contains(this.crtEffect)) {
      document.body.removeChild(this.crtEffect);
    }
    
    // Восстановление стандартных шрифтов
    this.restoreDefaultFonts();
    
    // Удаление дополнительных стилей
    const classicStyles = document.getElementById('pg-classic-styles');
    if (classicStyles) classicStyles.remove();
    
    this.pg.dispatchEvent('pg-classic-mode-changed', { mode: 'disabled' });
    this.pg.log('Классический режим отключен', 'info');
  }

  setClassicFonts() {
    document.documentElement.style.setProperty(
      '--pg-font-family', 
      '"Courier New", Courier, "Lucida Console", Monaco, monospace'
    );
    
    document.documentElement.style.setProperty('--pg-font-size-base', '14px');
    document.documentElement.style.setProperty('--pg-letter-spacing', '0.5px');
  }

  restoreDefaultFonts() {
    document.documentElement.style.removeProperty('--pg-font-family');
    document.documentElement.style.removeProperty('--pg-font-size-base');
    document.documentElement.style.removeProperty('--pg-letter-spacing');
  }

  applyClassicStyles() {
    let styleElement = document.getElementById('pg-classic-styles');
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'pg-classic-styles';
      document.head.appendChild(styleElement);
    }
    
    const styles = `
      /* Общие классические стили */
      body {
        background-image: radial-gradient(circle, #0a3d0a 0.5px, transparent 0.5px);
        background-size: 10px 10px;
      }
      
      /* Кнопки в классическом стиле */
      button, .btn, [role="button"] {
        border: 2px solid var(--pg-primary) !important;
        background: linear-gradient(to bottom, var(--pg-surface), var(--pg-secondary)) !important;
        box-shadow: 2px 2px 0 var(--pg-primary) !important;
        padding: 6px 12px !important;
        font-weight: bold !important;
      }
      
      button:hover, .btn:hover, [role="button"]:hover {
        box-shadow: 1px 1px 0 var(--pg-primary) !important;
        transform: translate(1px, 1px) !important;
      }
      
      button:active, .btn:active, [role="button"]:active {
        box-shadow: inset 1px 1px 1px rgba(0,0,0,0.3) !important;
        background: linear-gradient(to top, var(--pg-surface), var(--pg-secondary)) !important;
      }
      
      /* Поля ввода */
      input, textarea, select {
        background-color: var(--pg-surface) !important;
        border: 2px solid var(--pg-primary) !important;
        padding: 4px 8px !important;
      }
      
      input:focus, textarea:focus, select:focus {
        outline: 2px solid var(--pg-accent) !important;
        outline-offset: -2px !important;
      }
      
      /* Карточки и контейнеры */
      .card, .panel, .container {
        border: 3px double var(--pg-primary) !important;
        background-color: var(--pg-surface) !important;
        box-shadow: 4px 4px 0 rgba(0,0,0,0.1) !important;
      }
      
      /* Заголовки */
      h1, h2, h3, h4, h5, h6 {
        text-shadow: 2px 2px 0 var(--pg-secondary) !important;
        letter-spacing: 1px !important;
      }
      
      /* Списки */
      ul, ol {
        border-left: 2px solid var(--pg-accent) !important;
        padding-left: 20px !important;
      }
      
      li {
        margin-bottom: 8px !important;
      }
      
      /* Анимация печатающего текста */
      .terminal-text {
        display: inline-block;
        overflow: hidden;
        border-right: 2px solid var(--pg-accent);
        white-space: nowrap;
        animation: pg-terminal-type 4s steps(40) infinite;
      }
      
      /* Анимация сканирования */
      @keyframes pg-crt-scan {
        0% { background-position: 0 0; }
        100% { background-position: 0 100%; }
      }
    `;
    
    styleElement.textContent = styles;
  }

  addTerminalTextEffect(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      el.classList.add('terminal-text');
      
      // Рассчитываем длительность анимации на основе длины текста
      const duration = Math.max(4, el.textContent.length / 10);
      el.style.animation = `pg-terminal-type ${duration}s steps(${el.textContent.length}) infinite`;
    });
  }

  applyRetroFilter() {
    document.documentElement.style.filter = `
      sepia(0.2) 
      contrast(1.1) 
      brightness(0.95) 
      saturate(1.2)
    `;
  }

  addClassicButton(selector, options = {}) {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach(button => {
      // Добавляем базовые стили
      button.style.border = '2px solid var(--pg-primary)';
      button.style.background = 'linear-gradient(to bottom, var(--pg-surface), var(--pg-secondary))';
      button.style.boxShadow = '2px 2px 0 var(--pg-primary)';
      button.style.padding = '6px 12px';
      button.style.fontWeight = 'bold';
      button.style.cursor = 'pointer';
      button.style.position = 'relative';
      button.style.overflow = 'hidden';
      
      // Добавляем 3D-эффект при нажатии
      button.addEventListener('mousedown', () => {
        button.style.boxShadow = 'inset 1px 1px 1px rgba(0,0,0,0.3)';
        button.style.background = 'linear-gradient(to top, var(--pg-surface), var(--pg-secondary))';
      });
      
      button.addEventListener('mouseup', () => {
        button.style.boxShadow = '2px 2px 0 var(--pg-primary)';
        button.style.background = 'linear-gradient(to bottom, var(--pg-surface), var(--pg-secondary))';
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.boxShadow = '2px 2px 0 var(--pg-primary)';
        button.style.background = 'linear-gradient(to bottom, var(--pg-surface), var(--pg-secondary))';
      });
      
      // Добавляем эффект пиксельной анимации
      if (options.pixelEffect) {
        const pixelOverlay = document.createElement('div');
        pixelOverlay.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.5;
        `;
        button.appendChild(pixelOverlay);
      }
    });
  }
}

// Регистрация плагина
if (window.PlayGreen) {
  window.PlayGreen.prototype.plugins = window.PlayGreen.prototype.plugins || {};
  window.PlayGreen.prototype.plugins.ClassicGreen = ClassicGreenPlugin;
} else {
  console.warn('PlayGreen не найден. ClassicGreen не может быть зарегистрирован.');
}

// Автоматическая регистрация при подключении
document.addEventListener('DOMContentLoaded', () => {
  if (window.PlayGreen) {
    const pg = new PlayGreen();
    const classicPlugin = new ClassicGreenPlugin(pg);
    pg.registerPlugin('classicGreen', classicPlugin);
  }
});