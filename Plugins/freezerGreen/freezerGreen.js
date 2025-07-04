/**
 * FreezerGreen.js - Quantum 3D Animation Engine
 * Версия: 2.5
 * Дата: 2025-07-03
 * Зависимости: Three.js (r168), GSAP 3.12 ,PlayGreen Theme Engine 4.5+
 * GitHub: https://github.com/Leha2cool
 */

class FreezerGreen {
  constructor(playGreenInstance) {
    // Ядро Three.js
    this.scene = new THREE.Scene();
    this.camera = null;
    this.renderer = null;
    this.composer = null;
    this.clock = new THREE.Clock();
    
    // Интеграция с PlayGreen
    this.playGreen = playGreenInstance;
    this.themeObserver = null;
    
    // Системы плагина
    this.particleSystems = new Map();
    this.holograms = new Map();
    this.quantumObjects = new Map();
    this.audioReactors = new Map();
    this.uiControls = new Map();
    this.dynamicMaterials = new Map();
    
    // Конфигурация
    this.config = {
      mode: 'adaptive', // 'performance', 'quality', 'adaptive'
      shadows: true,
      reflections: true,
      physics: true,
      antialias: true,
      defaultEnvironment: true,
      themeSync: true,
      emotionReaction: true,
      audioReactivity: true,
      quantumEffects: true,
      holographicUI: true
    };
    
    // Состояние
    this.isInitialized = false;
    this.isRendering = false;
    this.currentEmotion = 'neutral';
    this.performanceStats = {
      fps: 0,
      objects: 0,
      drawCalls: 0,
      memory: 0
    };
  }

  // ==================== ИНИЦИАЛИЗАЦИЯ ====================
  async init(canvas, userConfig = {}) {
    if (this.isInitialized) return;
    
    // Объединение конфигураций
    this.config = {...this.config, ...userConfig};
    
    // Создание рендерера
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: this.config.antialias,
      alpha: true,
      powerPreference: this.config.mode === 'performance' ? 'low-power' : 'high-performance'
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.shadowMap.enabled = this.config.shadows;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Настройка камеры
    this.camera = new THREE.PerspectiveCamera(
      75, 
      canvas.clientWidth / canvas.clientHeight, 
      0.1, 
      1000
    );
    this.camera.position.set(0, 2, 5);
    
    // Инициализация систем
    this.initEnvironment();
    this.initLighting();
    this.initPostProcessing();
    if (this.config.physics) this.initPhysics();
    
    // Интеграция с PlayGreen
    if (this.playGreen && this.config.themeSync) {
      this.setupThemeIntegration();
    }
    
    // Запуск рендеринга
    this.startRendering();
    
    // Реакция на размер окна
    window.addEventListener('resize', () => this.onWindowResize(canvas));
    
    this.isInitialized = true;
    console.log('FreezerGreen успешно инициализирован');
    return this;
  }

  initEnvironment() {
    // Skybox
    if (this.config.defaultEnvironment) {
      const textureLoader = new THREE.TextureLoader();
      const skyboxTextures = [
        'px.jpg', 'nx.jpg',
        'py.jpg', 'ny.jpg',
        'pz.jpg', 'nz.jpg'
      ].map(file => textureLoader.load(`/assets/skybox/${file}`));
      
      const skyboxGeometry = new THREE.BoxGeometry(100, 100, 100);
      const skyboxMaterial = skyboxTextures.map(texture => 
        new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide })
      );
      
      const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
      this.scene.add(skybox);
    }
    
    // Пол
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: this.playGreen?.currentPalette?.surface || 0x222222,
      roughness: 0.8,
      metalness: 0.2
    });
    
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);
  }

  initLighting() {
    // Основное освещение
    this.ambientLight = new THREE.AmbientLight(
      this.playGreen?.currentPalette?.surface || 0xFFFFFF, 
      0.4
    );
    this.scene.add(this.ambientLight);
    
    // Направленный свет
    this.directionalLight = new THREE.DirectionalLight(
      this.playGreen?.currentPalette?.primary || 0x4FC3F7, 
      1.0
    );
    this.directionalLight.position.set(5, 10, 7);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.mapSize.width = 2048;
    this.directionalLight.shadow.mapSize.height = 2048;
    this.scene.add(this.directionalLight);
    
    // Точечный свет
    this.pointLight = new THREE.PointLight(
      this.playGreen?.currentPalette?.accent || 0xFF9800, 
      0.8
    );
    this.pointLight.position.set(-3, 4, -2);
    this.scene.add(this.pointLight);
  }

  initPostProcessing() {
    if (!this.config.reflections) return;
    
    this.composer = new THREE.EffectComposer(this.renderer);
    
    const renderPass = new THREE.RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);
    
    // Эффект свечения
    const bloomPass = new THREE.BloomPass(
      1.2,   // Яркость
      25,    // Размытие
      0.5    // Сила
    );
    this.composer.addPass(bloomPass);
    
    // Цветовая коррекция
    const colorCorrection = new THREE.ShaderPass(THREE.ColorCorrectionShader);
    colorCorrection.uniforms['brightness'].value = 0.05;
    this.composer.addPass(colorCorrection);
    
    // Эффект пленки
    const filmPass = new THREE.FilmPass(
      0.35,   // Шум
      0.025,  // Интенсивность сканирования
      648,    // Сканирующая линия
      false   // Грейскейл
    );
    this.composer.addPass(filmPass);
  }

  initPhysics() {
    this.physicsWorld = new CANNON.World();
    this.physicsWorld.gravity.set(0, -9.82, 0);
    this.physicsWorld.broadphase = new CANNON.NaiveBroadphase();
    this.physicsWorld.solver.iterations = 10;
    
    // Физический пол
    const groundShape = new CANNON.Plane();
    const groundBody = new CANNON.Body({ mass: 0 });
    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromAxisAngle(
      new CANNON.Vec3(1, 0, 0), 
      -Math.PI / 2
    );
    this.physicsWorld.addBody(groundBody);
    
    setInterval(() => this.updatePhysics(), 1000 / 60);
  }

  setupThemeIntegration() {
    // Реакция на изменение темы
    this.themeObserver = this.playGreen.on('pg-theme-changed', ({ theme }) => {
      this.applyThemeSettings(theme);
    });
    
    // Реакция на изменение палитры
    this.playGreen.on('pg-palette-update', ({ palette }) => {
      this.updateMaterials(palette);
    });
    
    // Реакция на эмоции
    if (this.config.emotionReaction) {
      this.playGreen.on('pg-emotion-detected', ({ emotion }) => {
        this.applyEmotionEffects(emotion);
      });
    }
    
    // Аудио-реактивные эффекты
    if (this.config.audioReactivity) {
      this.playGreen.on('pg-volume-change', ({ volume }) => {
        this.applyAudioEffects(volume);
      });
    }
    
    // Применение начальных настроек
    this.applyThemeSettings(this.playGreen.currentTheme);
    this.updateMaterials(this.playGreen.currentPalette);
  }

  // ==================== РЕНДЕРИНГ И ЦИКЛ ====================
  startRendering() {
    if (this.isRendering) return;
    this.isRendering = true;
    
    const render = () => {
      if (!this.isRendering) return;
      
      const delta = this.clock.getDelta();
      
      // Обновление систем
      this.updateParticles(delta);
      this.updateHolograms(delta);
      this.updateQuantumEffects(delta);
      this.updateUIElements(delta);
      
      // Рендеринг
      if (this.composer) {
        this.composer.render(delta);
      } else {
        this.renderer.render(this.scene, this.camera);
      }
      
      // Обновление статистики
      this.updatePerformanceStats();
      
      requestAnimationFrame(render);
    };
    
    render();
  }

  stopRendering() {
    this.isRendering = false;
  }

  updatePerformanceStats() {
    this.performanceStats = {
      fps: Math.round(1 / this.clock.getDelta()),
      objects: this.scene.children.length,
      drawCalls: this.renderer.info.render.calls,
      memory: this.renderer.info.memory.programs
    };
  }

  onWindowResize(canvas) {
    this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    
    if (this.composer) {
      this.composer.setSize(canvas.clientWidth, canvas.clientHeight);
    }
  }

  // ==================== УНИКАЛЬНЫЕ ФУНКЦИИ ====================
  
  // ======== СИСТЕМА ЧАСТИЦ ========
  createParticleSystem(name, config) {
    const systemConfig = {
      count: 1000,
      size: 0.05,
      color: this.playGreen?.currentPalette?.primary || 0x4CAF50,
      velocity: () => new THREE.Vector3(
        (Math.random() - 0.5) * 0.1,
        Math.random() * 0.2,
        (Math.random() - 0.5) * 0.1
      ),
      position: () => new THREE.Vector3(
        (Math.random() - 0.5) * 5,
        Math.random() * 3,
        (Math.random() - 0.5) * 5
      ),
      lifetime: 5,
      opacityCurve: [0, 1, 0],
      ...config
    };
    
    // Геометрия
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(systemConfig.count * 3);
    const colors = new Float32Array(systemConfig.count * 3);
    const sizes = new Float32Array(systemConfig.count);
    const alphas = new Float32Array(systemConfig.count);
    const ages = new Float32Array(systemConfig.count);
    
    for (let i = 0; i < systemConfig.count; i++) {
      const i3 = i * 3;
      const pos = systemConfig.position();
      
      positions[i3] = pos.x;
      positions[i3 + 1] = pos.y;
      positions[i3 + 2] = pos.z;
      
      // Цвета
      if (typeof systemConfig.color === 'function') {
        const color = systemConfig.color(i);
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
      } else {
        const color = new THREE.Color(systemConfig.color);
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
      }
      
      sizes[i] = systemConfig.size;
      alphas[i] = systemConfig.opacityCurve[0];
      ages[i] = Math.random() * systemConfig.lifetime;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
    geometry.setAttribute('age', new THREE.BufferAttribute(ages, 1));
    
    // Материал
    const material = new THREE.PointsMaterial({
      vertexColors: true,
      size: systemConfig.size,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const particleSystem = new THREE.Points(geometry, material);
    this.scene.add(particleSystem);
    
    // Сохранение системы
    this.particleSystems.set(name, {
      system: particleSystem,
      config: systemConfig,
      data: { positions, colors, sizes, alphas, ages }
    });
    
    return particleSystem;
  }

  updateParticles(delta) {
    for (const [name, { system, config, data }] of this.particleSystems) {
      const positions = data.positions;
      const alphas = data.alphas;
      const ages = data.ages;
      const count = config.count;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Обновление возраста
        ages[i] += delta;
        
        // Перерождение частиц
        if (ages[i] > config.lifetime) {
          ages[i] = 0;
          const newPos = config.position();
          positions[i3] = newPos.x;
          positions[i3 + 1] = newPos.y;
          positions[i3 + 2] = newPos.z;
        }
        
        // Обновление позиции
        positions[i3 + 1] += config.velocity().y * delta;
        
        // Обновление прозрачности
        const ageRatio = ages[i] / config.lifetime;
        alphas[i] = this.calculateCurveValue(
          config.opacityCurve, 
          ageRatio
        );
      }
      
      system.geometry.attributes.position.needsUpdate = true;
      system.geometry.attributes.alpha.needsUpdate = true;
    }
  }

  // ======== ГОЛОГРАФИЧЕСКИЕ ИНТЕРФЕЙСЫ ========
  createHologram(name, content, options = {}) {
    const hologramGroup = new THREE.Group();
    const config = {
      radius: 1.0,
      thickness: 0.05,
      color: this.playGreen?.currentPalette?.accent || 0x00FFFF,
      rotationSpeed: 0.5,
      ...options
    };
    
    // Создание основного кольца
    const ringGeometry = new THREE.RingGeometry(
      config.radius - config.thickness, 
      config.radius, 
      64
    );
    
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: config.color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7
    });
    
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    hologramGroup.add(ring);
    
    // Создание центрального дисплея
    if (content) {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const context = canvas.getContext('2d');
      
      // Отрисовка контента
      context.fillStyle = 'rgba(0, 0, 0, 0.7)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      context.font = '48px Arial';
      context.fillStyle = '#ffffff';
      context.textAlign = 'center';
      context.fillText(content, canvas.width / 2, canvas.height / 2);
      
      const texture = new THREE.CanvasTexture(canvas);
      const displayGeometry = new THREE.CircleGeometry(config.radius * 0.7, 64);
      const displayMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
      });
      
      const display = new THREE.Mesh(displayGeometry, displayMaterial);
      display.rotation.x = Math.PI / 2;
      hologramGroup.add(display);
    }
    
    // Добавление лучей
    const rayCount = 8;
    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 2;
      const rayLength = config.radius * 1.5;
      
      const rayGeometry = new THREE.CylinderGeometry(0.01, 0.01, rayLength, 8);
      const rayMaterial = new THREE.MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: 0.5
      });
      
      const ray = new THREE.Mesh(rayGeometry, rayMaterial);
      ray.position.set(
        Math.cos(angle) * config.radius * 1.2,
        0,
        Math.sin(angle) * config.radius * 1.2
      );
      ray.lookAt(hologramGroup.position);
      hologramGroup.add(ray);
    }
    
    // Анимация
    hologramGroup.userData = {
      rotationSpeed: config.rotationSpeed,
      pulsePhase: 0
    };
    
    this.scene.add(hologramGroup);
    this.holograms.set(name, hologramGroup);
    return hologramGroup;
  }

  updateHolograms(delta) {
    for (const [name, hologram] of this.holograms) {
      // Плавное вращение
      hologram.rotation.y += hologram.userData.rotationSpeed * delta;
      
      // Пульсация
      hologram.userData.pulsePhase += delta;
      const pulse = Math.sin(hologram.userData.pulsePhase * 2) * 0.1 + 1;
      hologram.scale.set(pulse, pulse, pulse);
      
      // Адаптация к эмоциям
      if (this.config.emotionReaction) {
        const emotionFactor = this.getEmotionFactor();
        hologram.children.forEach(child => {
          if (child.material) {
            child.material.opacity = 0.5 + emotionFactor * 0.3;
          }
        });
      }
    }
  }

  // ======== КВАНТОВЫЕ ЭФФЕКТЫ ========
  createQuantumObject(name, geometry, options = {}) {
    const config = {
      material: new THREE.MeshStandardMaterial({
        color: this.playGreen?.currentPalette?.primary || 0x4CAF50,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x000000,
        emissiveIntensity: 0.5
      }),
      position: new THREE.Vector3(0, 1, 0),
      scale: 1,
      quantumState: 0,
      ...options
    };
    
    const mesh = new THREE.Mesh(geometry, config.material);
    mesh.position.copy(config.position);
    mesh.scale.set(config.scale, config.scale, config.scale);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    
    // Квантовые свойства
    mesh.userData = {
      quantumState: config.quantumState,
      probabilityWave: 0,
      entanglement: null,
      observerEffect: false
    };
    
    this.scene.add(mesh);
    this.quantumObjects.set(name, mesh);
    return mesh;
  }

  entangleObjects(name1, name2) {
    const obj1 = this.quantumObjects.get(name1);
    const obj2 = this.quantumObjects.get(name2);
    
    if (!obj1 || !obj2) return;
    
    obj1.userData.entanglement = obj2;
    obj2.userData.entanglement = obj1;
    
    // Создание визуальной связи
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: this.playGreen?.currentPalette?.secondary || 0x2196F3,
      transparent: true,
      opacity: 0.7
    });
    
    const line = new THREE.Line(lineGeometry, lineMaterial);
    this.scene.add(line);
    
    obj1.userData.connectionLine = line;
  }

  updateQuantumEffects(delta) {
    for (const [name, object] of this.quantumObjects) {
      // Квантовые колебания
      object.userData.probabilityWave += delta;
      const waveFactor = Math.sin(object.userData.probabilityWave * 2);
      
      // Визуализация вероятностной волны
      if (object.material.emissive) {
        const intensity = 0.3 + Math.abs(waveFactor) * 0.3;
        object.material.emissive.setHex(
          this.playGreen?.currentPalette?.accent || 0xFF9800
        );
        object.material.emissiveIntensity = intensity;
      }
      
      // Эффект запутанности
      if (object.userData.entanglement) {
        const entangledObj = object.userData.entanglement;
        const distance = object.position.distanceTo(entangledObj.position);
        
        // Обновление линии связи
        const line = object.userData.connectionLine;
        if (line) {
          const positions = [
            object.position.x, object.position.y, object.position.z,
            entangledObj.position.x, entangledObj.position.y, entangledObj.position.z
          ];
          line.geometry.setAttribute(
            'position', 
            new THREE.Float32BufferAttribute(positions, 3)
          );
          
          // Цвет в зависимости от расстояния
          const colorIntensity = Math.min(1, distance / 10);
          line.material.color.lerp(
            new THREE.Color(0xFF0000), 
            colorIntensity
          );
        }
        
        // Синхронизированное движение
        if (Math.random() < 0.02) {
          const syncDirection = new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
          ).normalize();
          
          object.position.add(syncDirection.clone().multiplyScalar(0.1));
          entangledObj.position.add(syncDirection.clone().multiplyScalar(0.1));
        }
      }
    }
  }

  // ======== ИНТЕРАКТИВНЫЕ ЭЛЕМЕНТЫ UI ========
  createUIControl(name, type, options = {}) {
    const config = {
      position: new THREE.Vector3(0, 0, 0),
      size: 1,
      color: this.playGreen?.currentPalette?.primary || 0x4CAF50,
      label: '',
      onClick: () => {},
      ...options
    };
    
    let control;
    
    switch (type.toLowerCase()) {
      case 'button':
        control = this.createUIButton(config);
        break;
      case 'slider':
        control = this.createUISlider(config);
        break;
      case 'toggle':
        control = this.createUIToggle(config);
        break;
      default:
        throw new Error(`Тип элемента UI