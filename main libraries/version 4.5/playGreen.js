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
        