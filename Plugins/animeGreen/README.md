### AnimeGreen Plugin: Документация

**Описание плагина:**
AnimeGreen - это революционный плагин, создающий глубокую интеграцию между адаптивной системой тем PlayGreen и мощной анимационной библиотекой Anime.js. Он позволяет создавать контекстно-зависимые, тематически адаптивные анимации, которые автоматически подстраиваются под текущие условия: время суток, погоду, эмоциональное состояние пользователя, системные настройки доступности и цветовую палитру.

**Ключевые особенности:**
1. Автоматическая адаптация анимаций к текущей теме и палитре PlayGreen
2. Контекстно-зависимые анимации (реагируют на время суток, погоду, эмоции)
3. Интеллектуальная оптимизация производительности
4. Поддержка режимов доступности (включая reduced-motion)
5. Готовые адаптивные пресеты анимаций
6. Динамические эффекты, синхронизированные с системой тем

---

### Инструкция по применению

#### 1. Установка и инициализация
```html
<!-- Подключаем зависимости -->
<script src="https://cdn.jsdelivr.net/gh/Leha2cool/playGreen@main/main%20libraries/version%204.5/playGreen.js"></script>
<script src="anime.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Leha2cool/playGreen@main/Plugins/animeGreen/animeGreen.js"></script>

<script>
// Инициализируем PlayGreen с плагином
const pg = new PlayGreen({
  plugins: {
    animeGreen: true // активируем плагин
  }
});

pg.init().then(() => {
  const animeGreen = pg.getPlugin('animeGreen');
  // Теперь можно использовать плагин
});
</script>
```

#### 2. Базовое использование: создание адаптивной анимации
```javascript
// Создаем пульсирующую анимацию для кнопок
animeGreen.createAnimation('.btn', 'pulse', {
  scale: [1, 1.1],
  duration: 1200,
  backgroundColor: [
    pg.currentPalette.primary,
    pg.currentPalette.accent
  ]
});

// Анимация для карточек с волновым эффектом
animeGreen.createAnimation('.card', 'thematicWave');
```

#### 3. Контекстно-зависимые анимации
```javascript
// Анимация меняет свойства в зависимости от контекста
animeGreen.createContextSensitiveAnimation('.weather-widget', {
  // Для ночи и ясной погоды
  'time:night && weather:clear': { 
    rotate: '5deg', 
    boxShadow: '0 0 20px rgba(255,255,200,0.8)',
    filter: 'hue-rotate(-20deg)'
  },
  
  // Для дождливой погоды
  'weather:rainy': { 
    translateY: '10px', 
    filter: 'blur(1px) saturate(0.8)'
  },
  
  // Для солнечной погоды днем
  'time:day && weather:sunny': {
    scale: 1.05,
    filter: 'brightness(1.1)'
  },
  
  // Правило по умолчанию
  'default': {
    opacity: 0.95,
    filter: 'none'
  }
});
```

#### 4. Специальные эффекты
```javascript
// Плавный переход между темами
document.getElementById('theme-toggle').addEventListener('click', () => {
  animeGreen.createThemeTransition();
});

// Интеллектуальный параллакс для фоновых элементов
animeGreen.applyIntelligentParallax('.parallax-layer', 0.3);

// Динамический градиент для заголовка
animeGreen.createDynamicGradient('header', [
  pg.currentPalette.primary,
  pg.currentPalette.secondary,
  pg.currentPalette.accent
]);
```

#### 5. Работа с пользовательскими пресетами
```javascript
// Регистрируем кастомный пресет
animeGreen.registerCustomPreset('magicFloat', {
  targets: null,
  translateY: ['-10px', '10px'],
  rotate: [-3, 3],
  duration: 3000,
  easing: 'easeInOutSine',
  direction: 'alternate',
  loop: true
});

// Используем кастомный пресет
animeGreen.createAnimation('.feature-icon', 'magicFloat', {
  scale: [0.9, 1.1],
  delay: animeGreen.anime.stagger(200)
});
```

#### 6. Управление анимациями
```javascript
// Пауза всех анимаций при открытии модального окна
document.querySelector('.modal').addEventListener('show', () => {
  animeGreen.pauseAllAnimations();
});

// Возобновление анимаций
document.querySelector('.modal').addEventListener('hide', () => {
  animeGreen.resumeAllAnimations();
});

// Оптимизация для мобильных устройств
if (window.matchMedia('(max-width: 768px)').matches) {
  animeGreen.optimizeForPerformance();
}
```

---

### Примеры реального использования

**1. Адаптивный баннер с погодозависимой анимацией**
```javascript
animeGreen.createContextSensitiveAnimation('.promo-banner', {
  'weather:sunny': {
    background: `linear-gradient(120deg, 
      ${pg.lightenDarkenColor(pg.currentPalette.accent, 20)}, 
      ${pg.currentPalette.primary})`,
    animation: 'sunny-pulse 2s infinite alternate'
  },
  'weather:rainy': {
    background: `linear-gradient(120deg, 
      ${pg.currentPalette.secondary}, 
      ${pg.lightenDarkenColor(pg.currentPalette.primary, -30)})`,
    animation: 'rainy-drip 3s infinite'
  },
  'weather:snowy': {
    filter: 'blur(0.8px)',
    background: `linear-gradient(120deg, 
      ${pg.currentPalette.background}, 
      ${pg.lightenDarkenColor(pg.currentPalette.secondary, 10)})`,
    animation: 'snow-fall 5s infinite linear'
  }
});
```

**2. Эмоционально-адаптивный интерфейс**
```javascript
// Определяем эмоцию пользователя (в реальном приложении - через AI)
pg.updateContext({ emotion: 'excited' });

// Применяем анимацию в зависимости от эмоции
animeGreen.createContextSensitiveAnimation('.call-to-action', {
  'emotion:excited': {
    scale: [1, 1.15],
    duration: 800,
    easing: 'spring(1, 100, 10, 0)'
  },
  'emotion:calm': {
    opacity: [0.8, 1],
    duration: 1500,
    easing: 'easeOutElastic'
  },
  'emotion:sad': {
    translateY: ['0px', '-5px'],
    duration: 2000,
    easing: 'easeInOutQuad'
  }
});
```

**3. Анимации, адаптивные к времени суток**
```javascript
animeGreen.createAnimation('.moon-sun-icon', 'colorShift', {
  targets: '.moon-sun-icon',
  rotate: () => pg.contextData.timeOfDay === 'night' ? [0, 180] : [180, 0],
  backgroundColor: () => [
    pg.contextData.timeOfDay === 'night' ? '#FFD54F' : '#5C6BC0',
    pg.contextData.timeOfDay === 'night' ? '#FFA726' : '#7E57C2'
  ],
  duration: 2000,
  easing: 'easeInOutBack'
});
```

---

### Лучшие практики

1. **Используйте контекстные правила** для создания уникального UX под разные условия
2. **Связывайте анимации с цветами палитры** через `pg.currentPalette`
3. **Учитывайте производительность** - используйте `optimizeForPerformance()` на мобильных устройствах
4. **Уважайте настройки доступности** - плагин автоматически реагирует на `reduced-motion`
5. **Комбинируйте пресеты** для создания сложных эффектов
6. **Используйте динамические значения** в параметрах анимации:
```javascript
translateY: () => animeGreen.getContextFloatValues(),
duration: () => animeGreen.getPerformanceAwareDuration(1500)
```

AnimeGreen открывает новые возможности для создания живых, адаптивных интерфейсов, которые гармонично сочетаются с динамической тематикой PlayGreen. Плагин особенно эффективен в сочетании с другими модулями PlayGreen создавая по-настоящему интеллектуальную систему анимаций.
