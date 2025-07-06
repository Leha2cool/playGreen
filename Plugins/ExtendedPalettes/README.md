# ExtendedPalettes Plugin for PlayGreen Theme Engine

## Обзор
ExtendedPalettes - это мощный плагин-расширение для PlayGreen Theme Engine, который добавляет **50 новых цветовых палитр** и **20 готовых тематических схем** для создания адаптивных интерфейсов. Плагин идеально интегрируется с основной библиотекой, расширяя её возможности без конфликтов.

## Ключевые особенности
- 🌈 **50 уникальных цветовых палитр** в 5 категориях
- 🎭 **20 тематических схем** для различных типов проектов
- ⚙️ Автоматическая интеграция с системой контекста PlayGreen
- 🔌 Полная совместимость со всеми функциями PlayGreen
- 🚀 Оптимизированная производительность

## Установка
```html
<!-- Подключение после основной библиотеки PlayGreen -->
<script src="https://cdn.jsdelivr.net/gh/Leha2cool/playGreen@main/main%20libraries/version%204.5/playGreen.js"></script> //делалась на весию 4.5+
<script src=https://cdn.jsdelivr.net/gh/Leha2cool/playGreen@main/Plugins/ExtendedPalettes/ExtendedPalettes.js"></script>
```

## Инициализация
Плагин автоматически регистрируется при наличии PlayGreen. Для ручной инициализации:
```javascript
const pg = new PlayGreen();
pg.init();
```

## Использование

### 1. Применение палитр
```javascript
// Применить конкретную палитру
pg.setColorScheme('extended_forest');

// Применить градиентную палитру
pg.setColorScheme('extended_ocean_gradient');
```

### 2. Применение тематических схем
```javascript
const palettePlugin = pg.getPlugin('extendedPalettes');

// Применить профессиональную схему
palettePlugin.applyThemeScheme('professional');

// Применить творческую схему
palettePlugin.applyThemeScheme('creative');
```

### 3. Получение списка доступных палитр и схем
```javascript
const palettes = palettePlugin.getPaletteNames();
console.log('Доступные палитры:', palettes);

const schemes = palettePlugin.getThemeSchemeNames();
console.log('Доступные схемы:', schemes);
```

### 4. Интеграция с контекстной системой
```javascript
// Автоматическое применение схемы по времени суток
pg.addContextRule(
  context => context.timeOfDay === 'night',
  engine => {
    engine.getPlugin('extendedPalettes').applyThemeScheme('night_mode');
  }
);

// Применение сезонной схемы
pg.addContextRule(
  context => context.season === 'summer',
  engine => {
    engine.getPlugin('extendedPalettes').applyThemeScheme('seasonal_summer');
  }
);
```

## Категории палитр

### 1. Природные палитры (10)
- `extended_forest` - Лесная палитра
- `extended_ocean` - Океанская палитра
- `extended_desert` - Пустынная палитра
- `extended_sunset` - Палитра заката
- ...и другие

### 2. Сезонные палитры (8)
- `extended_spring` - Весенняя
- `extended_summer` - Летняя
- `extended_autumn` - Осенняя
- `extended_winter` - Зимняя
- ...и другие

### 3. Градиентные палитры (10)
- `extended_sunset_gradient` - Градиент заката
- `extended_ocean_gradient` - Океанский градиент
- `extended_forest_gradient` - Лесной градиент
- ...и другие

### 4. Праздничные палитры (7)
- `extended_christmas` - Рождественская
- `extended_valentine` - Валентиновская
- `extended_new_year` - Новогодняя
- ...и другие

### 5. Профессиональные палитры (15)
- `extended_corporate_blue` - Корпоративный синий
- `extended_tech_purple` - Технологический фиолетовый
- `extended_medical_teal` - Медицинский бирюзовый
- ...и другие

## Тематические схемы

### Популярные схемы:
1. **Professional** - для корпоративных сайтов
2. **Creative** - для творческих проектов
3. **Minimal** - минималистичный дизайн
4. **Nature** - природная тематика
5. **Luxury** - премиум дизайн
6. **Tech** - технологический стиль
7. **Ecommerce** - для интернет-магазинов
8. **Health** - медицинская тематика
9. **Education** - образовательные проекты
10. **Night Mode** - ночной режим

Полный список из 20 схем доступен через `getThemeSchemeNames()`

## Лучшие практики

### Для градиентных палитр
```css
/* Добавьте в CSS для фона */
body {
  background: var(--pg-background);
  background-size: cover;
  background-attachment: fixed;
}
```

### Для профессиональных сайтов
```javascript
// При загрузке применить профессиональную схему
pg.init().then(() => {
  pg.getPlugin('extendedPalettes').applyThemeScheme('professional');
});
```

### Для сезонной адаптации
```javascript
// Автоматическое применение сезонных схем
pg.addContextRule(
  context => context.season === 'winter',
  engine => {
    engine.getPlugin('extendedPalettes').applyThemeScheme('seasonal_winter');
  }
);
```

## События плагина
Плагин генерирует событие при смене схемы:
```javascript
pg.on('pg-theme-scheme-changed', ({ scheme }) => {
  console.log(`Активирована схема: ${scheme}`);
});
```

## Производительность
Все палитры:
- Загружаются один раз при инициализации
- Не влияют на скорость работы
- Оптимизированы для мобильных устройств

## Пример использования
```javascript
// Инициализация PlayGreen с ExtendedPalettes
const pg = new PlayGreen({
  theme: 'adaptive',
  colorAnalysis: true,
  accessibilityChecks: true
});

// Применение тематической схемы после инициализации
pg.init().then(() => {
  const palettePlugin = pg.getPlugin('extendedPalettes');
  
  // Применить схему по типу устройства
  if (navigator.userAgent.match(/mobile/i)) {
    palettePlugin.applyThemeScheme('minimal');
  } else {
    palettePlugin.applyThemeScheme('creative');
  }
  
  // Смена схемы по кнопке
  document.getElementById('professional-btn').addEventListener('click', () => {
    palettePlugin.applyThemeScheme('professional');
  });
});
```

## Совместимость
- PlayGreen v4.5+
- Все современные браузеры
- Поддержка мобильных устройств

## Заключение
ExtendedPalettes значительно расширяет дизайнерские возможности PlayGreen Theme Engine, предоставляя готовые решения для различных сценариев использования. Благодаря тщательно подобранным цветовым сочетаниям и продуманным тематическим схемам, вы можете создавать адаптивные интерфейсы профессионального уровня с минимальными усилиями.
