/**
 * PlayGreen - Advanced Adaptive Theme Engine
 * Версия: 4.5
 * Дата: 2025-07-03
 * GitHub: https://github.com/Leha2cool
 */

class PlayGreen {
  constructor(config = {}) {
    // Конфигурация по умолчанию
    this.defaultConfig = {
      autoInit: true,
      theme: 'adaptive',
      colorScheme: 'harmony',
      contextSensitivity: 0.85,
      colorAnalysis: true,
      weatherIntegration: false,
      timeBasedTheming: true,
      userPreferences: true,
      accessibilityChecks: true,
      dynamicInteractions: true,
      voiceIntegration: false,
      emotionDetection: false,
      performanceMode: false,
      debugMode: false,
      apiKeys: {},
      colorPalettes: {
        harmony: {
          primary: '#4CAF50',
          secondary: '#2196F3',
          accent: '#FF9800',
          background: '#FFFFFF',
          text: '#212121',
          surface: '#F5F5F5'
        },
        contrast: {
          primary: '#000000',
          secondary: '#FFFFFF',
          accent: '#FF5722',
          background: '#FFFFFF',
          text: '#000000',
          surface: '#EEEEEE'
        },
        pastel: {
          primary: '#81C784',
          secondary: '#64B5F6',
          accent: '#FFB74D',
          background: '#FFF9C4',
          text: '#455A64',
          surface: '#E1F5FE'
        },
        spring: {
          primary: '#81C784',
          secondary: '#F48FB1',
          accent: '#FFD54F',
          background: '#F1F8E9',
          text: '#2E7D32',
          surface: '#DCEDC8'
        },
        summer: {
          primary: '#4FC3F7',
          secondary: '#81C784',
          accent: '#FFF176',
          background: '#E1F5FE',
          text: '#0277BD',
          surface: '#B3E5FC'
        },
        autumn: {
          primary: '#FFB74D',
          secondary: '#A1887F',
          accent: '#FF8A65',
          background: '#FFF3E0',
          text: '#EF6C00',
          surface: '#FFCCBC'
        },
        winter: {
          primary: '#90CAF9',
          secondary: '#B39DDB',
          accent: '#80DEEA',
          background: '#E3F2FD',
          text: '#0D47A1',
          surface: '#BBDEFB'
        },
        christmas: {
          primary: '#E53935',
          secondary: '#43A047',
          accent: '#FDD835',
          background: '#F5F5F5',
          text: '#212121',
          surface: '#FFCDD2'
        },
        halloween: {
          primary: '#7B1FA2',
          secondary: '#FF9800',
          accent: '#212121',
          background: '#311B92',
          text: '#FFFFFF',
          surface: '#4527A0'
        }
      },
      animationPresets: {
        subtle: {
          duration: 300,
          easing: 'ease-out'
        },
        energetic: {
          duration: 150,
          easing: 'ease-in-out'
        },
        smooth: {
          duration: 500,
          easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)'
        }
      },
      interactionSettings: {
        hoverIntensity: 0.2,
        clickDepth: 0.1,
        scrollSensitivity: 0.7
      }
    };

    // Слияние конфигураций
    this.config = { ...this.defaultConfig, ...config };
    this.isInitialized = false;
    this.currentPalette = {};
    this.activeModules = {};
    this.userPreferences = {};
    this.contextData = {
      timeOfDay: 'day',
      weather: 'clear',
      season: 'summer',
      emotion: 'neutral',
      holiday: null
    };
    this.plugins = {};
    this.eventListeners = {};
    this.customRules = [];
    this.performanceMetrics = {};
    
    // Инициализация
    if (this.config.autoInit) this.init();
  }

  // ==================== ИНИЦИАЛИЗАЦИЯ ====================
  
  async init() {
    if (this.isInitialized) {
      this.log('PlayGreen уже инициализирован', 'warn');
      return;
    }
    
    this.log('Инициализация PlayGreen...');
    
    // Инициализация ядра
    this.initializeCore();
    
    // Загрузка расширений
    await this.loadExtensions();
    
    // Применение начальной конфигурации
    this.applyConfiguration();
    
    // Инициализация модулей
    this.initModules();
    
    // Запуск периодических задач
    this.startPeriodicTasks();
    
    this.isInitialized = true;
    this.log('PlayGreen успешно инициализирован');
    this.dispatchEvent('pg-init', { success: true });
  }
  
  initializeCore() {
    // Установка базовой темы
    this.setBaseTheme(this.config.theme);
    
    // Применение цветовой схемы
    this.setColorScheme(this.config.colorScheme);
    
    // Применение настроек анимации
    this.applyAnimationPreset(this.config.animationPreset || 'subtle');
    
    // Создание CSS-переменных
    this.createCSSVariables();
  }
  
  async loadExtensions() {
    // Загрузка пользовательских предпочтений
    await this.loadUserPreferences();
    
    // Загрузка плагинов
    if (typeof this.config.plugins === 'object') {
      for (const [name, plugin] of Object.entries(this.config.plugins)) {
        this.registerPlugin(name, plugin);
      }
    }
  }
  
  applyConfiguration() {
    // Применение контекстных правил
    this.applyContextRules();
  }
  
  initModules() {
    this.log('Инициализация модулей...');
    
    // Создание экземпляров модулей
    if (this.config.colorAnalysis) {
      this.activeModules.contentAnalyzer = new ContentAnalyzer(this);
      this.activeModules.contentAnalyzer.init();
    }
    
    if (this.config.timeBasedTheming || this.config.weatherIntegration) {
      this.activeModules.contextHandler = new ContextHandler(this);
      this.activeModules.contextHandler.init();
    }
    
    if (this.config.accessibilityChecks) {
      this.activeModules.colorAdvisor = new ColorAdvisor(this);
      this.activeModules.colorAdvisor.init();
    }
    
    if (this.config.dynamicInteractions) {
      this.activeModules.microInteractions = new MicroInteractions(this);
      this.activeModules.microInteractions.init();
    }
    
    if (this.config.voiceIntegration) {
      this.activeModules.voiceIntegration = new VoiceIntegration(this);
      this.activeModules.voiceIntegration.init();
    }
    
    if (this.config.emotionDetection) {
      this.activeModules.emotionDetector = new EmotionDetector(this);
      this.activeModules.emotionDetector.init();
    }
    
    if (this.config.performanceMode) {
      this.activeModules.performanceOptimizer = new PerformanceOptimizer(this);
      this.activeModules.performanceOptimizer.init();
    }
  }
  
  startPeriodicTasks() {
    // Обновление времени каждые 5 минут
    this.timeUpdateInterval = setInterval(() => {
      this.updateTimeContext();
      this.applyPalette(this.generateContextualPalette());
    }, 5 * 60 * 1000);
    
    // Проверка контраста каждые 30 секунд
    if (this.config.accessibilityChecks && this.activeModules.colorAdvisor) {
      this.contrastCheckInterval = setInterval(() => {
        this.activeModules.colorAdvisor.checkPageContrast();
      }, 30 * 1000);
    }
    
    // Обновление метрик производительности
    if (this.config.performanceMode) {
      this.performanceInterval = setInterval(() => {
        this.collectPerformanceMetrics();
      }, 10 * 1000);
    }
  }
  
  // ==================== ЦВЕТОВЫЕ ФУНКЦИИ ====================
  
  setColorScheme(schemeName) {
    if (this.config.colorPalettes[schemeName]) {
      this.currentPalette = { ...this.config.colorPalettes[schemeName] };
      this.applyPalette();
      return true;
    }
    return false;
  }
  
  generateDynamicPalette(baseColor, type = 'analogous') {
    const baseHsl = this.hexToHSL(baseColor);
    let palette = { primary: baseColor };

    switch (type) {
      case 'monochromatic':
        palette.secondary = this.HSLToHex(baseHsl.h, baseHsl.s, baseHsl.l * 0.8);
        palette.accent = this.HSLToHex(baseHsl.h, baseHsl.s * 0.7, baseHsl.l * 1.2);
        break;
      case 'complementary':
        palette.secondary = this.HSLToHex((baseHsl.h + 180) % 360, baseHsl.s, baseHsl.l);
        palette.accent = this.HSLToHex((baseHsl.h + 120) % 360, baseHsl.s, baseHsl.l);
        break;
      case 'triadic':
        palette.secondary = this.HSLToHex((baseHsl.h + 120) % 360, baseHsl.s, baseHsl.l);
        palette.accent = this.HSLToHex((baseHsl.h + 240) % 360, baseHsl.s, baseHsl.l);
        break;
      case 'analogous':
      default:
        palette.secondary = this.HSLToHex((baseHsl.h + 30) % 360, baseHsl.s, baseHsl.l);
        palette.accent = this.HSLToHex((baseHsl.h + 330) % 360, baseHsl.s, baseHsl.l);
    }

    palette.background = this.HSLToHex(baseHsl.h, baseHsl.s * 0.2, 0.95);
    palette.surface = this.HSLToHex(baseHsl.h, baseHsl.s * 0.3, 0.9);
    palette.text = this.HSLToHex(baseHsl.h, 0.8, 0.15);

    return palette;
  }
  
  applyGradientTheme(colors, angle = 135) {
    const gradient = `linear-gradient(${angle}deg, ${colors.join(', ')})`;
    document.documentElement.style.setProperty('--pg-background', gradient);
    this.dispatchEvent('pg-gradient-applied', { gradient });
  }
  
  hexToHSL(hex) {
    // Удаляем символ # если есть
    hex = hex.replace(/^#/, '');
    
    // Преобразуем в RGB
    let r, g, b;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    } else {
      throw new Error('Неверный формат HEX цвета');
    }
    
    // Нормализуем значения RGB
    r /= 255;
    g /= 255;
    b /= 255;
    
    // Находим min, max и delta
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    
    // Рассчитываем HSL
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;
    
    if (delta !== 0) {
      s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
      
      switch (max) {
        case r: h = (g - b) / delta + (g < b ? 6 : 0); break;
        case g: h = (b - r) / delta + 2; break;
        case b: h = (r - g) / delta + 4; break;
      }
      
      h /= 6;
    }
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }
  
  HSLToHex(h, s, l) {
    // Нормализация значений
    h = h % 360;
    s = Math.max(0, Math.min(100, s)) / 100;
    l = Math.max(0, Math.min(100, l)) / 100;
    
    // Если насыщенность равна 0, цвет оттенки серого
    if (s === 0) {
      const gray = Math.round(l * 255);
      return `#${gray.toString(16).padStart(2, '0').repeat(3)}`;
    }
    
    // Вспомогательная функция
    const hueToRGB = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    // Рассчитываем промежуточные значения
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    
    // Преобразуем в RGB
    const r = Math.round(hueToRGB(p, q, h/360 + 1/3) * 255);
    const g = Math.round(hueToRGB(p, q, h/360) * 255);
    const b = Math.round(hueToRGB(p, q, h/360 - 1/3) * 255);
    
    // Возвращаем HEX
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
  
  lightenDarkenColor(color, percent) {
    // Осветление/затемнение цвета
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);
    
    R = Math.min(255, Math.max(0, R + R * percent / 100));
    G = Math.min(255, Math.max(0, G + G * percent / 100));
    B = Math.min(255, Math.max(0, B + B * percent / 100));
    
    const RR = Math.round(R).toString(16).padStart(2, '0');
    const GG = Math.round(G).toString(16).padStart(2, '0');
    const BB = Math.round(B).toString(16).padStart(2, '0');
    
    return `#${RR}${GG}${BB}`;
  }
  
  // ==================== ТЕМЫ И ПАЛИТРЫ ====================
  
  setBaseTheme(theme) {
    const validThemes = ['light', 'dark', 'adaptive'];
    if (!validThemes.includes(theme)) {
      theme = 'adaptive';
    }
    
    // Удаляем предыдущие классы темы
    document.documentElement.classList.remove('pg-theme-light', 'pg-theme-dark');
    
    if (theme === 'adaptive') {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.currentTheme = isDarkMode ? 'dark' : 'light';
      document.documentElement.classList.add(isDarkMode ? 'pg-theme-dark' : 'pg-theme-light');
      this.log(`Адаптивная тема: ${isDarkMode ? 'темная' : 'светлая'}`);
    } else {
      this.currentTheme = theme;
      document.documentElement.classList.add(`pg-theme-${theme}`);
      this.log(`Тема установлена: ${theme}`);
    }
  }
  
  applyPalette(palette = this.currentPalette) {
    const root = document.documentElement;
    
    // Применяем все цвета из палитры
    Object.entries(palette).forEach(([key, value]) => {
      if (key.startsWith('--pg-')) {
        root.style.setProperty(key, value);
      } else {
        root.style.setProperty(`--pg-${key}`, value);
      }
    });
    
    // Обновляем текущую палитру
    this.currentPalette = { ...this.currentPalette, ...palette };
    
    // Событие обновления палитры
    this.dispatchEvent('pg-palette-update', { palette });
    
    this.log('Палитра применена');
  }
  
  generateContextualPalette() {
    const palette = { ...this.currentPalette };
    
    // Учет времени суток
    if (this.contextData.timeOfDay) {
      switch (this.contextData.timeOfDay) {
        case 'morning':
          palette.primary = '#FFB74D';
          palette.accent = '#E57373';
          break;
        case 'day':
          palette.primary = '#4CAF50';
          palette.accent = '#FF9800';
          break;
        case 'evening':
          palette.primary = '#7E57C2';
          palette.accent = '#FFA726';
          break;
        case 'night':
          palette.primary = '#5C6BC0';
          palette.accent = '#FF7043';
          break;
      }
    }
    
    // Учет погоды
    if (this.contextData.weather) {
      switch (this.contextData.weather) {
        case 'rainy':
          palette.primary = '#5C9DD9';
          palette.accent = '#4FC3F7';
          break;
        case 'sunny':
          palette.primary = '#FFD54F';
          palette.accent = '#FF8A65';
          break;
        case 'snowy':
          palette.primary = '#90A4AE';
          palette.accent = '#80DEEA';
          break;
      }
    }
    
    return palette;
  }
  
  // ==================== КОНТЕКСТ И АДАПТАЦИЯ ====================
  
  addContextRule(condition, action) {
    this.customRules.push({ condition, action });
    this.applyContextRules();
  }
  
  applyContextRules() {
    // Применение системных правил
    this.applySystemContextRules();
    
    // Применение пользовательских правил
    this.customRules.forEach(rule => {
      if (rule.condition(this.contextData)) {
        rule.action(this);
      }
    });
  }
  
  applySystemContextRules() {
    // Время суток
    if (this.contextData.timeOfDay) {
      const timePalettes = {
        morning: { primary: '#FFB74D', accent: '#E57373' },
        day: { primary: '#4CAF50', accent: '#FF9800' },
        evening: { primary: '#7E57C2', accent: '#FFA726' },
        night: { primary: '#5C6BC0', accent: '#FF7043' }
      };
      
      if (timePalettes[this.contextData.timeOfDay]) {
        this.applyPalette(timePalettes[this.contextData.timeOfDay]);
      }
    }
    
    // Погода
    if (this.contextData.weather) {
      const weatherPalettes = {
        rainy: { primary: '#5C9DD9', accent: '#4FC3F7' },
        sunny: { primary: '#FFD54F', accent: '#FF8A65' },
        snowy: { primary: '#90A4AE', accent: '#80DEEA' },
        cloudy: { primary: '#78909C', accent: '#B0BEC5' }
      };
      
      if (weatherPalettes[this.contextData.weather]) {
        this.applyPalette(weatherPalettes[this.contextData.weather]);
      }
    }
    
    // Эмоции
    if (this.contextData.emotion) {
      const emotionPalettes = {
        happy: { primary: '#FFD54F', secondary: '#81C784' },
        sad: { primary: '#90CAF9', secondary: '#B39DDB' },
        calm: { primary: '#80CBC4', secondary: '#A5D6A7' },
        energetic: { primary: '#FF8A65', secondary: '#FFD54F' }
      };
      
      if (emotionPalettes[this.contextData.emotion]) {
        this.applyPalette(emotionPalettes[this.contextData.emotion]);
      }
    }
  }
  
  updateContext(data) {
    this.contextData = { ...this.contextData, ...data };
    this.applyContextRules();
    this.dispatchEvent('pg-context-updated', this.contextData);
  }
  
  // ==================== ДОСТУПНОСТЬ ====================
  
  applyAccessibilityMode(mode) {
    switch (mode) {
      case 'high-contrast':
        this.applyPalette({
          primary: '#000000',
          secondary: '#FFFFFF',
          background: '#FFFFFF',
          text: '#000000',
          surface: '#EEEEEE'
        });
        document.documentElement.style.setProperty('--pg-font-size-base', '18px');
        document.documentElement.classList.add('pg-accessibility-high-contrast');
        break;
      
      case 'color-blind':
        this.applyPalette({
          primary: '#FFA500',
          secondary: '#0000FF',
          accent: '#FF0000'
        });
        break;
      
      case 'dyslexia-friendly':
        document.documentElement.style.setProperty('--pg-font-family', 'Comic Sans MS, sans-serif');
        document.documentElement.style.setProperty('--pg-letter-spacing', '0.05em');
        document.documentElement.style.setProperty('--pg-line-height-base', '1.8');
        document.documentElement.classList.add('pg-accessibility-dyslexia');
        break;
      
      case 'reduced-motion':
        this.applyAnimationPreset('subtle');
        document.documentElement.style.setProperty('--pg-transition-fast', '0s');
        document.documentElement.style.setProperty('--pg-transition-slow', '0s');
        document.documentElement.classList.add('pg-accessibility-reduced-motion');
        break;
    }
    
    this.dispatchEvent('pg-accessibility-mode-changed', { mode });
  }
  
  // ==================== РАСШИРЕНИЯ И ПЛАГИНЫ ====================
  
  registerPlugin(name, plugin) {
    if (typeof plugin.init === 'function') {
      plugin.init(this);
      this.plugins[name] = plugin;
      this.dispatchEvent('pg-plugin-registered', { name });
      return true;
    }
    return false;
  }
  
  getPlugin(name) {
    return this.plugins[name] || null;
  }
  
  // ==================== УТИЛИТЫ И ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================
  
  createCSSVariables() {
    const style = document.createElement('style');
    style.id = 'pg-core-variables';
    style.textContent = `
      :root {
        --pg-primary: ${this.currentPalette.primary || '#4CAF50'};
        --pg-secondary: ${this.currentPalette.secondary || '#2196F3'};
        --pg-accent: ${this.currentPalette.accent || '#FF9800'};
        --pg-background: ${this.currentPalette.background || '#FFFFFF'};
        --pg-text: ${this.currentPalette.text || '#212121'};
        --pg-surface: ${this.currentPalette.surface || '#F5F5F5'};
        
        /* Остальные переменные... */
      }
    `;
    document.head.appendChild(style);
  }
  
  // ==================== АНИМАЦИИ И ВЗАИМОДЕЙСТВИЯ ====================
  
  applyAnimationPreset(presetName) {
    const preset = this.config.animationPresets[presetName] || this.config.animationPresets.subtle;
    
    document.documentElement.style.setProperty(
      '--pg-transition-normal',
      `${preset.duration}ms ${preset.easing}`
    );
    
    this.dispatchEvent('pg-animation-preset-changed', { preset });
  }
  
  registerMicroInteraction(selector, type, config) {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return false;

    switch (type) {
      case 'hover':
        elements.forEach(el => {
          el.addEventListener('mouseenter', () => {
            const intensity = config.intensity || this.config.interactionSettings.hoverIntensity;
            this.applyElementEffect(el, 'hover', intensity);
          });
          el.addEventListener('mouseleave', () => {
            this.removeElementEffect(el, 'hover');
          });
        });
        break;
      
      case 'click':
        elements.forEach(el => {
          el.addEventListener('mousedown', () => {
            const depth = config.depth || this.config.interactionSettings.clickDepth;
            this.applyElementEffect(el, 'click', depth);
          });
          el.addEventListener('mouseup', () => {
            this.removeElementEffect(el, 'click');
          });
          el.addEventListener('mouseleave', () => {
            this.removeElementEffect(el, 'click');
          });
        });
        break;
      
      case 'focus':
        elements.forEach(el => {
          el.addEventListener('focus', () => {
            this.applyElementEffect(el, 'focus');
          });
          el.addEventListener('blur', () => {
            this.removeElementEffect(el, 'focus');
          });
        });
        break;
    }
    
    return true;
  }
  
  applyElementEffect(element, type, intensity = 0.1) {
    const style = getComputedStyle(element);
    const currentColor = style.backgroundColor;
    
    switch (type) {
      case 'hover':
        element.dataset.originalBg = currentColor;
        const hoverColor = this.lightenDarkenColor(currentColor, intensity * 100);
        element.style.backgroundColor = hoverColor;
        element.style.transform = 'scale(1.03)';
        break;
      
      case 'click':
        element.style.transform = `scale(${1 - intensity})`;
        element.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.2)';
        break;
      
      case 'focus':
        element.style.boxShadow = `0 0 0 3px ${this.currentPalette.accent}80`;
        element.style.outline = 'none';
        break;
    }
  }
  
  removeElementEffect(element, type) {
    switch (type) {
      case 'hover':
        if (element.dataset.originalBg) {
          element.style.backgroundColor = element.dataset.originalBg;
          delete element.dataset.originalBg;
        }
        element.style.transform = '';
        break;
      
      case 'click':
        element.style.transform = '';
        element.style.boxShadow = '';
        break;
      
      case 'focus':
        element.style.boxShadow = '';
        break;
    }
  }
  
  // ==================== СОБЫТИЯ И ЛОГИРОВАНИЕ ====================
  
  dispatchEvent(name, detail) {
    const event = new CustomEvent(name, { detail });
    document.dispatchEvent(event);
    
    if (this.eventListeners[name]) {
      this.eventListeners[name].forEach(callback => callback(detail));
    }
  }
  
  on(eventName, callback) {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = [];
    }
    this.eventListeners[eventName].push(callback);
  }
  
  log(message, level = 'info') {
    if (this.config.debugMode) {
      const levels = {
        info: console.info,
        warn: console.warn,
        error: console.error
      };
      (levels[level] || console.log)(`[PlayGreen] ${message}`);
    }
  }
  
  // ==================== API ДЛЯ РАЗРАБОТЧИКА ====================
  
  setTheme(theme) {
    this.setBaseTheme(theme);
    this.dispatchEvent('pg-theme-changed', { theme });
  }
  
  setFontFamily(fontFamily) {
    document.documentElement.style.setProperty('--pg-font-family', fontFamily);
    this.dispatchEvent('pg-font-changed', { fontFamily });
  }
  
  setBorderRadius(size) {
    const sizes = {
      sm: '4px',
      md: '8px',
      lg: '16px',
      xl: '24px',
      full: '9999px'
    };
    
    const radius = sizes[size] || size;
    document.documentElement.style.setProperty('--pg-radius-md', radius);
    this.dispatchEvent('pg-border-radius-changed', { radius });
  }
  
  getCurrentPalette() {
    return { ...this.currentPalette };
  }
  
  getContextData() {
    return { ...this.contextData };
  }
  
  generateThemeLink() {
    const params = new URLSearchParams();
    params.set('theme', this.currentTheme);
    params.set('palette', JSON.stringify(this.currentPalette));
    params.set('context', JSON.stringify(this.contextData));
    
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  }
}

// ==================== МОДУЛИ СИСТЕМЫ ====================

class ContentAnalyzer {
  constructor(playGreen) {
    this.pg = playGreen;
    this.imageColors = [];
    this.textTone = 'neutral';
  }

  init() {
    this.scanDOM();
    this.extractImagePalettes();
    this.analyzeTextTone();
  }

  scanDOM() {
    this.domElements = {
      headers: document.querySelectorAll('h1, h2, h3, h4, h5, h6'),
      buttons: document.querySelectorAll('button, [role="button"], .btn'),
      links: document.querySelectorAll('a'),
      cards: document.querySelectorAll('.card, .panel, .box'),
      forms: document.querySelectorAll('form, input, select, textarea')
    };
    
    this.pg.log(`Просканировано элементов: ${Object.values(this.domElements).flat().length}`);
  }

  extractImagePalettes() {
    const images = document.querySelectorAll('img, picture, video');
    if (images.length === 0) return;
    
    this.pg.log(`Извлечение цветов из ${images.length} медиа-элементов...`);
    
    // Упрощенная реализация (в реальности используется сложный алгоритм)
    this.imageColors = [];
    
    images.forEach(img => {
      // Для демонстрации - случайные цвета
      const hue = Math.floor(Math.random() * 360);
      const color = `hsl(${hue}, 70%, 50%)`;
      this.imageColors.push(color);
    });
    
    this.pg.dispatchEvent('pg-image-colors-extracted', { colors: this.imageColors });
  }

  analyzeTextTone() {
    const textContent = document.body.textContent || '';
    
    // Упрощенный анализ тональности
    const positiveWords = ['хорош', 'отличн', 'прекрасн', 'рад', 'успех', 'люб', 'счастл', 'великол', 'позитив'];
    const negativeWords = ['плох', 'ужасн', 'сложн', 'проблем', 'ошибк', 'негатив', 'трудн', 'печал'];
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    positiveWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      positiveCount += (textContent.match(regex) || []).length;
    });
    
    negativeWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      negativeCount += (textContent.match(regex) || []).length;
    });
    
    if (positiveCount > negativeCount * 1.5) {
      this.textTone = 'positive';
    } else if (negativeCount > positiveCount * 1.5) {
      this.textTone = 'negative';
    } else {
      this.textTone = 'neutral';
    }
    
    this.pg.log(`Тональность текста: ${this.textTone}`);
    this.pg.dispatchEvent('pg-text-tone-update', { tone: this.textTone });
  }
}

class ContextHandler {
  constructor(playGreen) {
    this.pg = playGreen;
    this.weatherData = null;
  }

  async init() {
    await this.updateTimeContext();
    if (this.pg.config.weatherIntegration) {
      await this.updateWeather();
    }
    this.detectSeason();
  }

  getTimeOfDay() {
    const hours = new Date().getHours();
    
    if (hours >= 5 && hours < 10) return 'morning';
    if (hours >= 10 && hours < 17) return 'day';
    if (hours >= 17 && hours < 21) return 'evening';
    return 'night';
  }

  async updateWeather(city = 'auto') {
    if (!this.pg.config.weatherIntegration) return;
    
    try {
      const apiKey = this.pg.config.apiKeys.openWeather || 'YOUR_API_KEY';
      let url;
      
      if (city === 'auto') {
        const position = await this.getPosition();
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric&lang=ru`;
      } else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=ru`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) throw new Error('Ошибка API погоды');
      
      this.weatherData = await response.json();
      this.pg.contextData.weather = this.weatherData.weather[0].main.toLowerCase();
      this.pg.contextData.temperature = this.weatherData.main.temp;
      
      this.pg.log(`Погода обновлена: ${this.pg.contextData.weather}, ${this.pg.contextData.temperature}°C`);
      this.pg.dispatchEvent('pg-weather-update', this.weatherData);
      
      return true;
    } catch (error) {
      console.error('Ошибка обновления погоды:', error);
      this.pg.contextData.weather = 'clear';
      return false;
    }
  }

  async getPosition() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Геолокация не поддерживается'));
        return;
      }
      
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 60 * 60 * 1000 // 1 час
      });
    });
  }

  async updateTimeContext() {
    this.pg.contextData.timeOfDay = this.getTimeOfDay();
    this.pg.log(`Контекст времени обновлен: ${this.pg.contextData.timeOfDay}`);
  }

  detectSeason() {
    const month = new Date().getMonth() + 1;
    
    if (month >= 3 && month <= 5) {
      this.pg.contextData.season = 'spring';
    } else if (month >= 6 && month <= 8) {
      this.pg.contextData.season = 'summer';
    } else if (month >= 9 && month <= 11) {
      this.pg.contextData.season = 'autumn';
    } else {
      this.pg.contextData.season = 'winter';
    }
    
    this.pg.log(`Сезон определен: ${this.pg.contextData.season}`);
  }

  getWeatherByCity(city) {
    return this.updateWeather(city);
  }
}

class ColorAdvisor {
  constructor(playGreen) {
    this.pg = playGreen;
    this.contrastIssues = [];
  }

  init() {
    this.checkPageContrast();
    this.setupAccessibilityBadge();
  }

  checkPageContrast() {
    this.contrastIssues = [];
    
    // Проверяем основные элементы
    this.checkElementContrast(document.body);
    
    // Проверяем текстовые элементы
    const textElements = document.querySelectorAll('p, span, li, h1, h2, h3, h4, h5, h6');
    textElements.forEach(el => this.checkElementContrast(el));
    
    // Проверяем интерактивные элементы
    const interactiveElements = document.querySelectorAll('button, a, input, select');
    interactiveElements.forEach(el => this.checkElementContrast(el));
    
    if (this.contrastIssues.length > 0) {
      this.pg.dispatchEvent('pg-contrast-issues', { issues: this.contrastIssues });
    }
    
    this.pg.log(`Проверка контраста завершена: найдено ${this.contrastIssues.length} проблем`);
  }

  checkElementContrast(element) {
    const style = getComputedStyle(element);
    const bgColor = this.findBackgroundColor(element);
    const textColor = style.color;
    
    if (!bgColor || !textColor) return;
    
    const contrast = this.calculateContrast(textColor, bgColor);
    const minContrast = element.tagName === 'BUTTON' ? 4.5 : 3; // Более строгие требования для кнопок
    
    if (contrast < minContrast) {
      const issue = {
        element,
        contrastRatio: contrast.toFixed(2),
        minRequired: minContrast,
        textColor,
        bgColor
      };
      
      this.contrastIssues.push(issue);
      
      // Показать предупреждение в UI
      if (this.pg.config.debugMode) {
        this.showContrastWarning(issue);
      }
    }
  }

  findBackgroundColor(element) {
    let current = element;
    while (current && current !== document.documentElement) {
      const bg = getComputedStyle(current).backgroundColor;
      if (bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        return bg;
      }
      current = current.parentElement;
    }
    return getComputedStyle(document.documentElement).backgroundColor;
  }

  calculateContrast(color1, color2) {
    const luminance1 = this.calculateLuminance(color1);
    const luminance2 = this.calculateLuminance(color2);
    
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  calculateLuminance(color) {
    const rgb = this.colorToRgb(color);
    if (!rgb) return 0.5;
    
    const [r, g, b] = rgb.map(c => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  colorToRgb(color) {
    // HEX формат
    if (color.startsWith('#')) {
      const hex = color.substring(1);
      const bigint = parseInt(hex, 16);
      return [
        (bigint >> 16) & 255,
        (bigint >> 8) & 255,
        bigint & 255
      ];
    }
    
    // RGB формат
    const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (rgbMatch) {
      return [
        parseInt(rgbMatch[1]),
        parseInt(rgbMatch[2]),
        parseInt(rgbMatch[3])
      ];
    }
    
    return null;
  }

  setupAccessibilityBadge() {
    const badge = document.createElement('div');
    badge.className = 'pg-accessibility-badge';
    badge.innerHTML = 'A';
    badge.title = 'Статус доступности';
    document.body.appendChild(badge);
    
    badge.addEventListener('click', () => {
      this.pg.dispatchEvent('pg-accessibility-report', { issues: this.contrastIssues });
    });
  }

  showContrastWarning(issue) {
    issue.element.style.outline = '2px solid red';
    issue.element.title = `Низкий контраст: ${issue.contrastRatio}:1 (требуется ${issue.minRequired}:1)`;
  }
}

class MicroInteractions {
  constructor(playGreen) {
    this.pg = playGreen;
    this.scrollProgress = 0;
  }

  init() {
    this.setupHoverEffects();
    this.setupScrollEffects();
  }

  setupHoverEffects() {
    document.querySelectorAll('.pg-hover-pulse').forEach(element => {
      element.addEventListener('mouseenter', () => {
        element.classList.add('pg-hover-active');
        this.pg.dispatchEvent('pg-hover-start', { element });
      });
      
      element.addEventListener('mouseleave', () => {
        element.classList.remove('pg-hover-active');
        this.pg.dispatchEvent('pg-hover-end', { element });
      });
    });
  }

  setupScrollEffects() {
    window.addEventListener('scroll', () => {
      const newProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      
      if (Math.abs(newProgress - this.scrollProgress) > 0.05) {
        this.scrollProgress = newProgress;
        this.updateScrollBasedColors();
      }
    }, { passive: true });
  }

  updateScrollBasedColors() {
    const hueShift = this.scrollProgress * 120;
    const newPrimaryHue = (120 + hueShift) % 360;
    
    this.pg.applyPalette({
      primary: `hsl(${newPrimaryHue}, 65%, 49%)`,
      'gradient-angle': 135 + this.scrollProgress * 90
    });
  }
}

class VoiceIntegration {
  constructor(playGreen) {
    this.pg = playGreen;
    this.audioContext = null;
    this.analyser = null;
    this.isActive = false;
  }

  async init() {
    try {
      await this.setupAudio();
      this.startAudioAnalysis();
      this.isActive = true;
      this.pg.log('Голосовая интеграция активирована');
    } catch (error) {
      console.error('Ошибка инициализации голосовой интеграции:', error);
    }
  }

  async setupAudio() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = this.audioContext.createMediaStreamSource(stream);
    
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 256;
    source.connect(this.analyser);
  }

  startAudioAnalysis() {
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const analyze = () => {
      if (!this.isActive) return;
      
      this.analyser.getByteFrequencyData(dataArray);
      
      // Рассчитываем среднюю громкость
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const averageVolume = sum / bufferLength;
      
      // Реагируем на изменение громкости
      this.handleVolumeChange(averageVolume);
      
      requestAnimationFrame(analyze);
    };
    
    analyze();
  }

  handleVolumeChange(volume) {
    const intensity = volume / 255; // 0-1
    
    // Изменяем насыщенность
    const saturationChange = intensity * 30; // 0-30%
    const newSaturation = Math.min(100, 65 + saturationChange);
    
    // Изменяем светлоту
    const lightnessChange = intensity > 0.7 ? -10 : 0;
    const newLightness = Math.max(20, Math.min(80, 49 + lightnessChange));
    
    this.pg.applyPalette({
      primary: `hsl(var(--pg-primary-h), ${newSaturation}%, ${newLightness}%)`
    });
  }

  stop() {
    this.isActive = false;
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}

class EmotionDetector {
  constructor(playGreen) {
    this.pg = playGreen;
    this.emotion = 'neutral';
  }

  init() {
    // В реальности здесь будет интеграция с API распознавания лиц
    this.detectEmotionFromText();
  }

  detectEmotionFromText() {
    // Упрощенное определение эмоций по тексту
    const textContent = document.body.textContent || '';
    
    const positiveWords = ['рад', 'счастлив', 'ура', 'отлично', 'прекрасно'];
    const negativeWords = ['грустно', 'плохо', 'ужасно', 'злюсь', 'разочарован'];
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    positiveWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      positiveCount += (textContent.match(regex) || []).length;
    });
    
    negativeWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      negativeCount += (textContent.match(regex) || []).length;
    });
    
    if (positiveCount > negativeCount) {
      this.emotion = 'happy';
    } else if (negativeCount > positiveCount) {
      this.emotion = 'sad';
    } else {
      this.emotion = 'neutral';
    }
    
    this.pg.contextData.emotion = this.emotion;
    this.pg.log(`Определена эмоция: ${this.emotion}`);
    this.pg.dispatchEvent('pg-emotion-detected', { emotion: this.emotion });
  }
}

class PerformanceOptimizer {
  constructor(playGreen) {
    this.pg = playGreen;
  }

  init() {
    this.optimizeAnimations();
    this.optimizeRendering();
  }

  optimizeAnimations() {
    document.querySelectorAll('*').forEach(el => {
      if (getComputedStyle(el).animationDuration) {
        el.style.animationPlayState = 'paused';
      }
    });
    
    window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
  }

  handleScroll() {
    const viewportHeight = window.innerHeight;
    document.querySelectorAll('*').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < viewportHeight * 1.5 && rect.bottom > 0) {
        el.style.animationPlayState = 'running';
      } else {
        el.style.animationPlayState = 'paused';
      }
    });
  }

  optimizeRendering() {
    // Отложенная загрузка изображений вне области просмотра
    const images = document.querySelectorAll('img[data-src]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => observer.observe(img));
  }
}

// Экспорт библиотеки
window.PlayGreen = PlayGreen;
