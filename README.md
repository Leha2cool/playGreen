# playGreen
playGreen — это не просто инструмент для периодической смены палитр, а целая платформа «умного» оформления.


## PlayGreen - Advanced Adaptive Theme Engine

PlayGreen - это инновационная библиотека для создания адаптивных, контекстно-зависимых тем в веб-приложениях. Она автоматически адаптирует дизайн под условия окружения (время суток, погоду, сезон), предпочтения пользователя и технические возможности устройства.

### Основные возможности:
- Автоматическая адаптация к времени суток и сезону
- Интеграция с погодными сервисами
- Динамическая генерация цветовых палитр
- Поддержка доступности (контрастность, режимы для слабовидящих)
- Микро-анимации и интерактивные эффекты
- Голосовое управление и эмоциональная адаптация
- Оптимизация производительности

---

### Полное руководство по использованию

#### 1. Инициализация
```javascript
const pg = new PlayGreen({
  theme: 'adaptive',       // 'light' | 'dark' | 'adaptive'
  colorScheme: 'harmony',  // Предустановленная палитра
  weatherIntegration: true,
  apiKeys: {
    openWeather: 'ВАШ_API_КЛЮЧ'
  },
  debugMode: true
});
```

#### 2. Основные методы

**setColorScheme(schemeName)**
Устанавливает цветовую схему из предопределенных палитр:
```javascript
pg.setColorScheme('summer'); // Доступные схемы: 
// harmony, contrast, pastel, spring, 
// summer, autumn, winter, christmas, halloween
```

**generateDynamicPalette(baseColor, type)**
Генерирует динамическую палитру на основе базового цвета:
```javascript
const newPalette = pg.generateDynamicPalette('#4CAF50', 'triadic');
pg.applyPalette(newPalette);
```
Типы палитр: `'monochromatic'`, `'complementary'`, `'triadic'`, `'analogous'`

**applyGradientTheme(colors, angle)**
Применяет градиентный фон:
```javascript
pg.applyGradientTheme(['#FF9800', '#FFEB3B'], 45);
```

**setBaseTheme(theme)**
Ручное управление темой:
```javascript
pg.setBaseTheme('dark'); // 'light' | 'dark' | 'adaptive'
```

**applyAccessibilityMode(mode)**
Включает режимы доступности:
```javascript
pg.applyAccessibilityMode('high-contrast');
// Режимы: 'high-contrast', 'color-blind', 
// 'dyslexia-friendly', 'reduced-motion'
```

#### 3. Работа с контекстом

**Обновление контекста вручную:**
```javascript
pg.updateContext({
  timeOfDay: 'night',
  weather: 'snowy',
  emotion: 'calm'
});
```

**Автоматическое определение контекста:**
Библиотека автоматически определяет:
- Время суток (утро/день/вечер/ночь)
- Сезон (весна/лето/осень/зима)
- Погоду (через OpenWeatherMap API)
- Эмоциональную окраску контента

**Пользовательские правила:**
```javascript
pg.addContextRule(
  // Условие
  context => context.weather === 'rainy' && context.timeOfDay === 'night',
  
  // Действие
  engine => {
    engine.applyPalette({
      primary: '#5C9DD9',
      background: '#0A1E30'
    });
    engine.applyAnimationPreset('smooth');
  }
);
```

#### 4. Микро-взаимодействия

**Регистрация интерактивных элементов:**
```javascript
// Эффект при наведении
pg.registerMicroInteraction('.btn', 'hover', {
  intensity: 0.3
});

// Эффект при клике
pg.registerMicroInteraction('.card', 'click', {
  depth: 0.2
});

// Эффект при фокусе
pg.registerMicroInteraction('input, select', 'focus');
```

#### 5. События

**Подписка на события:**
```javascript
pg.on('pg-weather-update', data => {
  console.log('Погода обновилась:', data);
});

pg.on('pg-palette-update', palette => {
  console.log('Новая палитра:', palette);
});
```

**Основные события:**
- `pg-init` - инициализация завершена
- `pg-theme-changed` - изменена тема
- `pg-context-updated` - обновлен контекст
- `pg-weather-update` - новые данные погоды
- `pg-emotion-detected` - обнаружена эмоция

#### 6. Плагины

**Регистрация кастомного плагина:**
```javascript
const myPlugin = {
  init: engine => {
    console.log('Мой плагин инициализирован');
    engine.on('pg-palette-update', handlePaletteChange);
  }
};

pg.registerPlugin('myPlugin', myPlugin);
```

**Получение плагина:**
```javascript
const plugin = pg.getPlugin('myPlugin');
```

#### 7. Генерация ссылок с темой

```javascript
const themeLink = pg.generateThemeLink();
console.log('Ссылка с текущей темой:', themeLink);
// Пример: https://example.com/?theme=dark&palette={...}&context={...}
```

#### 8. Оптимизация производительности

Включение режима производительности:
```javascript
const pg = new PlayGreen({
  performanceMode: true
});
```

Особенности режима:
- Приостанавливает анимации вне области видимости
- Отложенная загрузка изображений
- Оптимизация рендеринга

#### 9. Интеграция с погодой

Ручной запрос погоды:
```javascript
pg.activeModules.contextHandler.getWeatherByCity('Москва')
  .then(result => {
    if(result) console.log('Погода обновлена');
  });
```

#### 10. Настройка анимаций

**Применение пресета анимаций:**
```javascript
pg.applyAnimationPreset('energetic'); // subtle | energetic | smooth
```

**Кастомные пресеты:**
```javascript
const pg = new PlayGreen({
  animationPresets: {
    custom: {
      duration: 500,
      easing: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)'
    }
  }
});
```

---

### CSS Переменные

Библиотека использует набор CSS-переменных для управления стилями:

```css
:root {
  --pg-primary: #4CAF50;
  --pg-secondary: #2196F3;
  --pg-accent: #FF9800;
  --pg-background: #FFFFFF;
  --pg-text: #212121;
  --pg-surface: #F5F5F5;
  
  /* Размеры */
  --pg-spacing-md: 16px;
  --pg-radius-md: 8px;
  
  /* Анимации */
  --pg-transition-normal: 0.3s ease;
}
```

Пример использования в CSS:
```css
.button {
  background-color: var(--pg-primary);
  color: var(--pg-text-on-primary);
  padding: var(--pg-spacing-md);
  border-radius: var(--pg-radius-md);
  transition: background-color var(--pg-transition-normal);
}
```

---

### Рекомендации по использованию

1. **Автоматическая адаптация**  
Включите основные адаптивные функции:
```javascript
const pg = new PlayGreen({
  timeBasedTheming: true,
  weatherIntegration: true,
  colorAnalysis: true,
  accessibilityChecks: true
});
```

2. **Кастомизация**  
Добавьте собственные цветовые палитры:
```javascript
const pg = new PlayGreen({
  colorPalettes: {
    corporate: {
      primary: '#3F51B5',
      secondary: '#FF4081',
      background: '#F5F7FA'
    }
  }
});
```

3. **Оптимизация**  
Для мобильных устройств включите:
```javascript
const pg = new PlayGreen({
  performanceMode: true,
  dynamicInteractions: false
});
```

4. **Доступность**  
Всегда включайте проверку контрастности:
```javascript
const pg = new PlayGreen({
  accessibilityChecks: true
});
```

5. **Расширение функционала**  
Создавайте плагины для специфических задач:
```javascript
pg.registerPlugin('analytics', {
  init: engine => {
    engine.on('pg-theme-changed', trackThemeChange);
  }
});
```

PlayGreen предоставляет мощный инструментарий для создания адаптивных, живых интерфейсов, которые реагируют на окружающую среду и предпочтения пользователей. Библиотека активно развивается и поддерживается - следите за обновлениями на официальном сайте.
