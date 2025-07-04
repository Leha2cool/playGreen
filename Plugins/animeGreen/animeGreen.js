/**
 * AnimeGreen - Advanced Adaptive Animation Plugin for PlayGreen
 * Версия: 1.0
 * Дата: 2025-07-03
 * Зависимости: PlayGreen 4.5+, Anime.js 3.7+
 * Автор animejs: https://github.com/juliangarnier
 * Автор playGreen: https://github.com/Leha2cool
 */

class AnimeGreenPlugin {
  constructor(playGreen) {
    this.pg = playGreen;
    this.anime = window.anime;
    this.animations = new Map();
    this.contextSensitiveAnimations = [];
    this.performanceMode = false;
    
    // Пресеты анимаций, адаптированные под PlayGreen
    this.presets = {
      pulse: {
        targets: null,
        scale: [1, 1.05],
        duration: 800,
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true
      },
      thematicWave: {
        targets: null,
        translateX: () => ['0px', this.getThemeValue('waveDistance', '20px')],
        rotate: () => [0, this.getThemeValue('waveRotation', 5)],
        duration: 1500,
        delay: (el, i) => i * 100,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutQuad'
      },
      colorShift: {
        targets: null,
        backgroundColor: () => [
          this.pg.currentPalette.primary,
          this.pg.currentPalette.accent
        ],
        color: () => [
          this.pg.currentPalette.text,
          this.pg.currentPalette.background
        ],
        duration: 2000,
        easing: 'easeInOutCirc',
        direction: 'alternate',
        loop: true
      },
      contextFloat: {
        targets: null,
        translateY: () => this.getContextFloatValues(),
        rotate: () => this.getContextRotation(),
        duration: 3000,
        delay: (el, i) => i * 150,
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true
      },
      intelligentStagger: {
        targets: null,
        opacity: [0, 1],
        translateY: ['20px', '0px'],
        duration: 1200,
        delay: this.anime.stagger(100, {start: 200}),
        easing: 'spring(1, 80, 10, 0)'
      }
    };
  }

  init() {
    if (!this.anime) {
      this.pg.log('Anime.js не найден! Плагин не будет работать', 'error');
      return;
    }

    this.performanceMode = this.pg.config.performanceMode;
    
    // Регистрация обработчиков событий
    this.pg.on('pg-palette-update', this.handlePaletteUpdate.bind(this));
    this.pg.on('pg-theme-changed', this.handleThemeChange.bind(this));
    this.pg.on('pg-context-updated', this.handleContextUpdate.bind(this));
    this.pg.on('pg-accessibility-mode-changed', this.handleAccessibilityChange.bind(this));
    
    this.pg.log('Плагин AnimeGreen успешно инициализирован');
  }

  // ==================== АДАПТИВНЫЕ ФУНКЦИИ ====================
  
  getThemeValue(property, defaultValue) {
    const style = getComputedStyle(document.documentElement);
    return style.getPropertyValue(`--pg-${property}`) || defaultValue;
  }
  
  getContextFloatValues() {
    const context = this.pg.contextData;
    const baseValue = this.performanceMode ? 5 : 15;
    
    if (context.weather === 'windy') return [`-${baseValue}px`, `${baseValue * 2}px`];
    if (context.timeOfDay === 'night') return [`-${baseValue}px`, `${baseValue}px`];
    return [`-${baseValue / 2}px`, `${baseValue}px`];
  }
  
  getContextRotation() {
    const context = this.pg.contextData;
    
    if (context.emotion === 'excited') return [-3, 8];
    if (context.weather === 'stormy') return [-10, 10];
    return [-2, 2];
  }
  
  getPerformanceAwareDuration(baseDuration) {
    if (this.performanceMode) return baseDuration * 0.7;
    if (this.pg.contextData.weather === 'rainy') return baseDuration * 1.3;
    return baseDuration;
  }

  // ==================== ОСНОВНЫЕ МЕТОДЫ ====================
  
  createAnimation(selector, animationType, options = {}) {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return null;
    
    const preset = this.presets[animationType];
    if (!preset) {
      this.pg.log(`Неизвестный тип анимации: ${animationType}`, 'warn');
      return null;
    }
    
    const animationConfig = {
      ...preset,
      targets: elements,
      ...options
    };
    
    // Динамическое обновление параметров
    if (animationType === 'thematicWave') {
      animationConfig.duration = this.getPerformanceAwareDuration(animationConfig.duration);
    }
    
    const animation = this.anime(animationConfig);
    this.animations.set(animation, { selector, animationType });
    
    return animation;
  }
  
  createContextSensitiveAnimation(selector, contextRules) {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return null;
    
    const animation = {
      targets: elements,
      update: () => this.updateContextAnimation(animation, contextRules)
    };
    
    this.contextSensitiveAnimations.push(animation);
    this.updateContextAnimation(animation, contextRules);
    
    return animation;
  }
  
  updateContextAnimation(animation, contextRules) {
    const context = this.pg.contextData;
    let activeRule = null;
    
    // Поиск подходящего правила
    for (const [condition, properties] of Object.entries(contextRules)) {
      if (this.evaluateCondition(condition, context)) {
        activeRule = properties;
        break;
      }
    }
    
    if (!activeRule) return;
    
    // Применение свойств анимации
    Object.entries(activeRule).forEach(([property, value]) => {
      this.anime.set(animation.targets, { [property]: value });
    });
  }
  
  evaluateCondition(condition, context) {
    // Поддержка сложных условий типа "time:night && weather:rainy"
    const conditions = condition.split('&&').map(c => c.trim());
    
    return conditions.every(cond => {
      const [key, value] = cond.split(':').map(p => p.trim());
      return context[key] === value;
    });
  }
  
  applyAdaptiveAnimation(element, baseAnimation) {
    const context = this.pg.contextData;
    const animation = { ...baseAnimation };
    
    // Адаптация под контекст
    if (context.timeOfDay === 'night') {
      animation.duration = animation.duration * 1.2;
      animation.easing = 'easeOutQuad';
    }
    
    if (context.emotion === 'calm') {
      animation.scale = animation.scale.map(s => s * 0.8);
    }
    
    // Адаптация под тему
    if (this.pg.currentTheme === 'dark') {
      animation.backgroundColor = [
        this.pg.currentPalette.surface,
        this.pg.lightenDarkenColor(this.pg.currentPalette.surface, 15)
      ];
    }
    
    return animation;
  }

  // ==================== УПРАВЛЕНИЕ АНИМАЦИЯМИ ====================
  
  pauseAllAnimations() {
    this.animations.forEach((_, animation) => animation.pause());
    this.pg.log('Все анимации приостановлены');
  }
  
  resumeAllAnimations() {
    this.animations.forEach((_, animation) => animation.play());
    this.pg.log('Все анимации возобновлены');
  }
  
  updateAnimationsOnThemeChange() {
    this.animations.forEach((config, animation) => {
      if (config.animationType === 'colorShift') {
        animation.restart();
      }
    });
  }
  
  optimizeForPerformance() {
    this.performanceMode = true;
    
    this.animations.forEach((_, animation) => {
      animation.update = (anim) => {
        anim.duration = anim.duration * 0.7;
        if (anim.delay) anim.delay = anim.delay * 0.5;
      };
    });
    
    this.pg.log('Анимации оптимизированы для производительности');
  }

  // ==================== ИНТЕГРАЦИЯ С PLAYGREEN ====================
  
  handlePaletteUpdate(event) {
    const { palette } = event.detail;
    
    // Обновляем анимации, зависящие от цвета
    this.animations.forEach((config, animation) => {
      if (config.animationType === 'colorShift') {
        animation.restart();
      }
    });
    
    this.pg.log('Анимации обновлены по изменению палитры');
  }
  
  handleThemeChange(event) {
    const { theme } = event.detail;
    
    if (theme === 'dark') {
      this.anime({
        targets: 'body',
        duration: 1000,
        easing: 'easeOutQuad',
        backgroundColor: [this.pg.currentPalette.background, '#111111'],
        color: [this.pg.currentPalette.text, '#f0f0f0']
      });
    }
    
    this.updateAnimationsOnThemeChange();
  }
  
  handleContextUpdate(contextData) {
    // Обновляем контекстно-зависимые анимации
    this.contextSensitiveAnimations.forEach(animation => {
      if (animation.update) animation.update();
    });
    
    // Адаптируем параметры анимаций
    if (contextData.weather === 'rainy') {
      this.anime.speed(0.8);
    } else if (contextData.weather === 'sunny') {
      this.anime.speed(1.2);
    } else {
      this.anime.speed(1);
    }
  }
  
  handleAccessibilityChange(event) {
    const { mode } = event.detail;
    
    if (mode === 'reduced-motion') {
      this.pauseAllAnimations();
      this.anime.speed(0.3);
    } else {
      this.resumeAllAnimations();
      this.anime.speed(1);
    }
  }
  
  // ==================== СПЕЦИАЛЬНЫЕ ЭФФЕКТЫ ====================
  
  createThemeTransition() {
    return this.anime({
      targets: document.documentElement,
      duration: 1500,
      easing: 'easeInOutQuad',
      backgroundColor: [
        this.pg.currentPalette.background,
        this.pg.currentPalette.surface
      ],
      color: [
        this.pg.currentPalette.text,
        this.pg.lightenDarkenColor(this.pg.currentPalette.text, 30)
      ],
      complete: () => {
        this.pg.dispatchEvent('pg-theme-transition-complete', {});
      }
    });
  }
  
  applyIntelligentParallax(selector, intensity = 0.5) {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return;
    
    const contextIntensity = this.pg.contextData.weather === 'windy' ? 
      intensity * 1.3 : intensity;
    
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      elements.forEach(el => {
        const speed = parseFloat(el.dataset.speed) || contextIntensity;
        const yPos = -(scrollY * speed);
        this.anime.set(el, { translateY: yPos });
      });
    }, { passive: true });
  }
  
  createDynamicGradient(selector, colors) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    const gradientAnimation = this.anime({
      targets: element,
      background: [
        `linear-gradient(45deg, ${colors.join(', ')})`,
        `linear-gradient(135deg, ${colors.reverse().join(', ')})`
      ],
      duration: 8000,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      loop: true
    });
    
    // Связываем с палитрой PlayGreen
    this.animations.set(gradientAnimation, {
      selector,
      animationType: 'dynamicGradient'
    });
    
    return gradientAnimation;
  }
  
  // ==================== УТИЛИТЫ ====================
  
  registerCustomPreset(name, config) {
    this.presets[name] = config;
    this.pg.log(`Добавлен пользовательский пресет анимации: ${name}`);
  }
  
  getAnimationByElement(element) {
    for (const [animation, config] of this.animations) {
      if (Array.from(config.targets).includes(element)) {
        return animation;
      }
    }
    return null;
  }
}

// Автоматическая регистрация плагина при загрузке
if (window.PlayGreen) {
  const playGreen = window.PlayGreen;
  
  playGreen.registerPlugin('animeGreen', (pgInstance) => {
    return new AnimeGreenPlugin(pgInstance);
  });
} else {
  console.warn('PlayGreen не найден. AnimeGreen не будет зарегистрирован.');
}