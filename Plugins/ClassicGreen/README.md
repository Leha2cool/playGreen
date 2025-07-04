### Описание плагина ClassicGreen для PlayGreen

**ClassicGreen** - революционный плагин, который переносит цифровой опыт в золотую эпоху вычислений 80-90-х годов. Этот уникальный модуль трансформирует современный интерфейс в ностальгический ретро-стиль, сочетая классическую эстетику с современными технологиями адаптивного дизайна PlayGreen.

Ключевые особенности:
- 🖥️ Аутентичные CRT-эффекты со сканирующими линиями и мерцанием
- 🔊 Цифровые звуки из эпохи 8-битных компьютеров
- 🎨 4 классические цветовые палитры (Windows 95, Macintosh Classic и др.)
- ✨ Уникальные ретро-анимации и эффекты печатающего текста
- 🕹️ Интерактивные 3D-кнопки с тактильной обратной связью
- 📺 Пиксельные текстуры и фильтры в стиле старых мониторов
- ⌨️ Моноширинные шрифты и аутентичные элементы интерфейса

### Инструкция по применению

#### 1. Подключение плагина
```html
<!-- После подключения PlayGreen -->
<script src="classicGreen.js"></script>
```

#### 2. Инициализация
```javascript
const pg = new PlayGreen();
const classic = pg.getPlugin('classicGreen');

// Автоматическая активация при инициализации
pg.on('pg-init', () => {
  classic.enableClassicMode('enhanced');
});
```

#### 3. Основные методы API

**Активация классического режима:**
```javascript
// Режимы: 'enhanced', 'full-retro', 'crt-only'
classic.enableClassicMode('full-retro');

// Отключение режима
classic.disableClassicMode();
```

**Применение классической темы:**
```javascript
pg.setColorScheme('windows-95'); // Доступные темы: 
                                // 'windows-95', 'macintosh-classic'
                                // 'retro-green', 'amiga-workbench'
```

**Добавление эффекта печатающего текста:**
```javascript
// К элементам с классом .terminal-text
classic.addTerminalTextEffect('.terminal-text');
```

**Создание ретро-кнопок:**
```javascript
// Базовый стиль
classic.addClassicButton('.btn-retro');

// С пиксельным эффектом
classic.addClassicButton('.btn-pixel', { pixelEffect: true });
```

**Управление звуками:**
```javascript
// Воспроизведение звуков вручную
classic.playSound('click'); // Типы: 'click', 'hover', 
                           // 'notification', 'success'
```

#### 4. Расширенные настройки
```javascript
// Изменение интенсивности CRT-эффекта
document.getElementById('pg-crt-effect').style.opacity = 0.5;

// Применение ретро-фильтра ко всей странице
classic.applyRetroFilter();

// Настройка анимации
pg.applyAnimationPreset('terminal-type');
```

#### 5. HTML-разметка для лучшей интеграции
```html
<!-- Кнопка с ретро-стилем -->
<button class="btn-retro">Click Me</button>

<!-- Текст с эффектом терминала -->
<h1 class="terminal-text">Welcome to 1995!</h1>

<!-- Контейнер в классическом стиле -->
<div class="card" style="width: 300px">
  <h3>Retro System</h3>
  <p>Authentic 90s experience</p>
</div>
```

#### 6. Рекомендуемые настройки PlayGreen
```javascript
const pg = new PlayGreen({
  theme: 'adaptive',
  colorScheme: 'retro-green',
  animationPreset: 'classic-fade',
  dynamicInteractions: true,
  plugins: {
    classicGreen: {
      soundVolume: 0.4,    // Громкость звуков (0-1)
      scanIntensity: 0.3,  // Интенсивность CRT-эффекта
      pixelDensity: 2      // Плотность пиксельной сетки
    }
  }
});
```

### Особенности использования
1. Для аутентичного опыта используйте тему `retro-green` с режимом `full-retro`
2. Эффект печатающего текста лучше работает с моноширинными шрифтами
3. Добавляйте атрибут `data-src` к изображениям для ретро-оптимизации
4. Используйте класс `.card` для создания аутентичных рамок
5. Для полного погружения активируйте звуковые эффекты hover и click

Плагин полностью совместим со всеми функциями PlayGreen, добавляя уникальный ретро-слой поверх современных адаптивных тем. ClassicGreen не просто изменяет внешний вид - он создает атмосферу, перенося пользователей в эпоху расцвета персональных компьютеров.