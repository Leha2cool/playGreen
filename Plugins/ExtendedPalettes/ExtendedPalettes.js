// ExtendedPalettes.js - Плагин с 50 палитрами и 20 тематическими схемами

const ExtendedPalettes = {
    name: 'ExtendedPalettes',
    version: '1.5',
    description: 'Добавляет 50 новых цветовых палитр и 20 тематических схем',
    
    init(engine) {
        this.engine = engine;
        this.addPalettes();
        this.addThemes();
        this.engine.log('ExtendedPalettes plugin initialized');
    },
    
    addPalettes() {
        const palettes = {
            // Природные палитры (10)
            forest: {
                primary: '#2E7D32',
                secondary: '#558B2F',
                accent: '#9E9D24',
                background: '#F1F8E9',
                text: '#1B5E20',
                surface: '#DCEDC8'
            },
            ocean: {
                primary: '#0288D1',
                secondary: '#0097A7',
                accent: '#00BCD4',
                background: '#E1F5FE',
                text: '#01579B',
                surface: '#B3E5FC'
            },
            desert: {
                primary: '#FF9800',
                secondary: '#F57C00',
                accent: '#E65100',
                background: '#FFF3E0',
                text: '#EF6C00',
                surface: '#FFE0B2'
            },
            sunset: {
                primary: '#FF5252',
                secondary: '#FF4081',
                accent: '#E040FB',
                background: '#FCE4EC',
                text: '#C2185B',
                surface: '#F8BBD0'
            },
            mountain: {
                primary: '#5D4037',
                secondary: '#8D6E63',
                accent: '#A1887F',
                background: '#EFEBE9',
                text: '#4E342E',
                surface: '#D7CCC8'
            },
            coral_reef: {
                primary: '#FF5722',
                secondary: '#FF7043',
                accent: '#FFAB91',
                background: '#FBE9E7',
                text: '#BF360C',
                surface: '#FFCCBC'
            },
            arctic: {
                primary: '#29B6F6',
                secondary: '#4FC3F7',
                accent: '#81D4FA',
                background: '#E1F5FE',
                text: '#0288D1',
                surface: '#B3E5FC'
            },
            jungle: {
                primary: '#43A047',
                secondary: '#66BB6A',
                accent: '#A5D6A7',
                background: '#E8F5E9',
                text: '#2E7D32',
                surface: '#C8E6C9'
            },
            lavender_fields: {
                primary: '#7E57C2',
                secondary: '#9575CD',
                accent: '#D1C4E9',
                background: '#EDE7F6',
                text: '#512DA8',
                surface: '#B39DDB'
            },
            cherry_blossom: {
                primary: '#EC407A',
                secondary: '#F48FB1',
                accent: '#F8BBD0',
                background: '#FCE4EC',
                text: '#C2185B',
                surface: '#F8BBD0'
            },

            // Сезонные палитры (8)
            spring: {
                primary: '#66BB6A',
                secondary: '#AED581',
                accent: '#FFD54F',
                background: '#F1F8E9',
                text: '#33691E',
                surface: '#DCEDC8'
            },
            summer: {
                primary: '#29B6F6',
                secondary: '#4FC3F7',
                accent: '#FFEE58',
                background: '#E1F5FE',
                text: '#0288D1',
                surface: '#B3E5FC'
            },
            autumn: {
                primary: '#FFA726',
                secondary: '#FFB74D',
                accent: '#8D6E63',
                background: '#FFF3E0',
                text: '#EF6C00',
                surface: '#FFE0B2'
            },
            winter: {
                primary: '#90A4AE',
                secondary: '#B0BEC5',
                accent: '#E0E0E0',
                background: '#ECEFF1',
                text: '#37474F',
                surface: '#CFD8DC'
            },
            rainy_season: {
                primary: '#5C6BC0',
                secondary: '#7986CB',
                accent: '#9FA8DA',
                background: '#E8EAF6',
                text: '#3949AB',
                surface: '#C5CAE9'
            },
            golden_fall: {
                primary: '#FFB300',
                secondary: '#FFCA28',
                accent: '#7CB342',
                background: '#FFFDE7',
                text: '#F57F17',
                surface: '#FFF9C4'
            },
            frosty_morning: {
                primary: '#80DEEA',
                secondary: '#B2EBF2',
                accent: '#E0F7FA',
                background: '#E0F7FA',
                text: '#00838F',
                surface: '#B2EBF2'
            },
            blooming_spring: {
                primary: '#F06292',
                secondary: '#F48FB1',
                accent: '#CE93D8',
                background: '#FCE4EC',
                text: '#AD1457',
                surface: '#F8BBD0'
            },

            // Градиентные палитры (10)
            sunset_gradient: {
                primary: '#FF5252',
                secondary: '#FF4081',
                background: 'linear-gradient(135deg, #FF9A9E 0%, #FAD0C4 100%)'
            },
            ocean_gradient: {
                primary: '#4FC3F7',
                secondary: '#4DB6AC',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
            },
            forest_gradient: {
                primary: '#81C784',
                secondary: '#AED581',
                background: 'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)'
            },
            berry_gradient: {
                primary: '#EC407A',
                secondary: '#AB47BC',
                background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'
            },
            citrus_gradient: {
                primary: '#FFD54F',
                secondary: '#FFB74D',
                background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)'
            },
            deep_blue_gradient: {
                primary: '#29B6F6',
                secondary: '#5C6BC0',
                background: 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)'
            },
            lavender_gradient: {
                primary: '#7E57C2',
                secondary: '#BA68C8',
                background: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)'
            },
            fire_gradient: {
                primary: '#FF7043',
                secondary: '#FF5252',
                background: 'linear-gradient(135deg, #f83600 0%, #f9d423 100%)'
            },
            mint_gradient: {
                primary: '#26A69A',
                secondary: '#66BB6A',
                background: 'linear-gradient(135deg, #0fd850 0%, #f9f047 100%)'
            },
            twilight_gradient: {
                primary: '#9575CD',
                secondary: '#7986CB',
                background: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)'
            },

            // Праздничные палитры (7)
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
            },
            valentine: {
                primary: '#EC407A',
                secondary: '#F48FB1',
                accent: '#F8BBD0',
                background: '#FCE4EC',
                text: '#C2185B',
                surface: '#F8BBD0'
            },
            easter: {
                primary: '#BA68C8',
                secondary: '#AED581',
                accent: '#FFF176',
                background: '#F3E5F5',
                text: '#7B1FA2',
                surface: '#E1BEE7'
            },
            new_year: {
                primary: '#2196F3',
                secondary: '#E91E63',
                accent: '#FFC107',
                background: '#0D47A1',
                text: '#FFFFFF',
                surface: '#1976D2'
            },
            independence_day: {
                primary: '#1976D2',
                secondary: '#E53935',
                accent: '#FBC02D',
                background: '#BBDEFB',
                text: '#0D47A1',
                surface: '#FFCDD2'
            },
            thanksgiving: {
                primary: '#FF9800',
                secondary: '#7CB342',
                accent: '#5D4037',
                background: '#FFF3E0',
                text: '#E65100',
                surface: '#FFE0B2'
            },

            // Профессиональные палитры (15)
            corporate_blue: {
                primary: '#1976D2',
                secondary: '#2196F3',
                accent: '#FFC107',
                background: '#E3F2FD',
                text: '#0D47A1',
                surface: '#BBDEFB'
            },
            tech_purple: {
                primary: '#7B1FA2',
                secondary: '#9C27B0',
                accent: '#00BCD4',
                background: '#F3E5F5',
                text: '#4A148C',
                surface: '#E1BEE7'
            },
            finance_green: {
                primary: '#2E7D32',
                secondary: '#4CAF50',
                accent: '#FFC107',
                background: '#E8F5E9',
                text: '#1B5E20',
                surface: '#C8E6C9'
            },
            medical_teal: {
                primary: '#00897B',
                secondary: '#26A69A',
                accent: '#F44336',
                background: '#E0F2F1',
                text: '#00695C',
                surface: '#B2DFDB'
            },
            education_orange: {
                primary: '#EF6C00',
                secondary: '#FF9800',
                accent: '#1976D2',
                background: '#FFF3E0',
                text: '#E65100',
                surface: '#FFE0B2'
            },
            luxury_gold: {
                primary: '#FFD700',
                secondary: '#FFC400',
                accent: '#212121',
                background: '#FFFDE7',
                text: '#F57F17',
                surface: '#FFF9C4'
            },
            startup_violet: {
                primary: '#7E57C2',
                secondary: '#9575CD',
                accent: '#FF6E40',
                background: '#EDE7F6',
                text: '#512DA8',
                surface: '#D1C4E9'
            },
            eco_green: {
                primary: '#388E3C',
                secondary: '#66BB6A',
                accent: '#FFA000',
                background: '#E8F5E9',
                text: '#1B5E20',
                surface: '#C8E6C9'
            },
            consulting_navy: {
                primary: '#283593',
                secondary: '#3949AB',
                accent: '#FFA726',
                background: '#E8EAF6',
                text: '#1A237E',
                surface: '#C5CAE9'
            },
            creative_red: {
                primary: '#D32F2F',
                secondary: '#F44336',
                accent: '#FFC107',
                background: '#FFEBEE',
                text: '#B71C1C',
                surface: '#FFCDD2'
            },
            minimal_gray: {
                primary: '#616161',
                secondary: '#9E9E9E',
                accent: '#212121',
                background: '#FAFAFA',
                text: '#212121',
                surface: '#F5F5F5'
            },
            travel_cyan: {
                primary: '#0097A7',
                secondary: '#00BCD4',
                accent: '#FF9800',
                background: '#E0F7FA',
                text: '#006064',
                surface: '#B2EBF2'
            },
            food_orange: {
                primary: '#F57C00',
                secondary: '#FF9800',
                accent: '#7CB342',
                background: '#FFF3E0',
                text: '#E65100',
                surface: '#FFE0B2'
            },
            real_estate_brown: {
                primary: '#5D4037',
                secondary: '#8D6E63',
                accent: '#AED581',
                background: '#EFEBE9',
                text: '#3E2723',
                surface: '#D7CCC8'
            },
            entertainment_pink: {
                primary: '#D81B60',
                secondary: '#EC407A',
                accent: '#FBC02D',
                background: '#FCE4EC',
                text: '#880E4F',
                surface: '#F8BBD0'
            }
        };

        // Добавляем префикс для новых палитр
        const prefixedPalettes = {};
        for (const [key, value] of Object.entries(palettes)) {
            prefixedPalettes[`extended_${key}`] = value;
        }

        // Добавляем палитры в конфигурацию
        this.engine.config.colorPalettes = {
            ...this.engine.config.colorPalettes,
            ...prefixedPalettes
        };
    },
    
    addThemes() {
        const themes = {
            // Тематические схемы (20)
            professional: {
                animationPreset: 'subtle',
                interactionSettings: {
                    hoverIntensity: 0.15,
                    clickDepth: 0.05,
                    scrollSensitivity: 0.5
                },
                palette: 'extended_corporate_blue'
            },
            creative: {
                animationPreset: 'energetic',
                interactionSettings: {
                    hoverIntensity: 0.3,
                    clickDepth: 0.2,
                    scrollSensitivity: 0.8
                },
                palette: 'extended_startup_violet'
            },
            minimal: {
                animationPreset: 'smooth',
                interactionSettings: {
                    hoverIntensity: 0.1,
                    clickDepth: 0.02,
                    scrollSensitivity: 0.4
                },
                palette: 'extended_minimal_gray'
            },
            nature: {
                animationPreset: 'smooth',
                interactionSettings: {
                    hoverIntensity: 0.25,
                    clickDepth: 0.1,
                    scrollSensitivity: 0.7
                },
                palette: 'extended_forest'
            },
            luxury: {
                animationPreset: 'subtle',
                interactionSettings: {
                    hoverIntensity: 0.18,
                    clickDepth: 0.08,
                    scrollSensitivity: 0.6
                },
                palette: 'extended_luxury_gold'
            },
            tech: {
                animationPreset: 'energetic',
                interactionSettings: {
                    hoverIntensity: 0.22,
                    clickDepth: 0.15,
                    scrollSensitivity: 0.9
                },
                palette: 'extended_tech_purple'
            },
            ecommerce: {
                animationPreset: 'energetic',
                interactionSettings: {
                    hoverIntensity: 0.28,
                    clickDepth: 0.18,
                    scrollSensitivity: 0.85
                },
                palette: 'extended_cherry_blossom'
            },
            health: {
                animationPreset: 'smooth',
                interactionSettings: {
                    hoverIntensity: 0.12,
                    clickDepth: 0.03,
                    scrollSensitivity: 0.5
                },
                palette: 'extended_medical_teal'
            },
            education: {
                animationPreset: 'energetic',
                interactionSettings: {
                    hoverIntensity: 0.25,
                    clickDepth: 0.15,
                    scrollSensitivity: 0.7
                },
                palette: 'extended_education_orange'
            },
            travel: {
                animationPreset: 'smooth',
                interactionSettings: {
                    hoverIntensity: 0.2,
                    clickDepth: 0.1,
                    scrollSensitivity: 0.75
                },
                palette: 'extended_travel_cyan'
            },
            food: {
                animationPreset: 'energetic',
                interactionSettings: {
                    hoverIntensity: 0.3,
                    clickDepth: 0.2,
                    scrollSensitivity: 0.8
                },
                palette: 'extended_food_orange'
            },
            real_estate: {
                animationPreset: 'subtle',
                interactionSettings: {
                    hoverIntensity: 0.15,
                    clickDepth: 0.05,
                    scrollSensitivity: 0.6
                },
                palette: 'extended_real_estate_brown'
            },
            entertainment: {
                animationPreset: 'energetic',
                interactionSettings: {
                    hoverIntensity: 0.35,
                    clickDepth: 0.25,
                    scrollSensitivity: 0.9
                },
                palette: 'extended_entertainment_pink'
            },
            finance: {
                animationPreset: 'subtle',
                interactionSettings: {
                    hoverIntensity: 0.12,
                    clickDepth: 0.04,
                    scrollSensitivity: 0.5
                },
                palette: 'extended_finance_green'
            },
            eco: {
                animationPreset: 'smooth',
                interactionSettings: {
                    hoverIntensity: 0.2,
                    clickDepth: 0.1,
                    scrollSensitivity: 0.7
                },
                palette: 'extended_eco_green'
            },
            consulting: {
                animationPreset: 'subtle',
                interactionSettings: {
                    hoverIntensity: 0.14,
                    clickDepth: 0.06,
                    scrollSensitivity: 0.55
                },
                palette: 'extended_consulting_navy'
            },
            night_mode: {
                animationPreset: 'smooth',
                interactionSettings: {
                    hoverIntensity: 0.1,
                    clickDepth: 0.03,
                    scrollSensitivity: 0.4
                },
                palette: 'extended_twilight_gradient'
            },
            high_contrast: {
                animationPreset: 'subtle',
                interactionSettings: {
                    hoverIntensity: 0.35,
                    clickDepth: 0.25,
                    scrollSensitivity: 0.9
                },
                palette: 'extended_contrast_high'
            },
            seasonal_summer: {
                animationPreset: 'energetic',
                interactionSettings: {
                    hoverIntensity: 0.3,
                    clickDepth: 0.2,
                    scrollSensitivity: 0.8
                },
                palette: 'extended_summer'
            },
            seasonal_winter: {
                animationPreset: 'smooth',
                interactionSettings: {
                    hoverIntensity: 0.15,
                    clickDepth: 0.05,
                    scrollSensitivity: 0.5
                },
                palette: 'extended_winter'
            }
        };

        // Добавляем схемы в конфигурацию
        this.engine.config.themeSchemes = {
            ...(this.engine.config.themeSchemes || {}),
            ...themes
        };
    },
    
    applyThemeScheme(schemeName) {
        if (!this.engine.config.themeSchemes[schemeName]) {
            this.engine.log(`Theme scheme ${schemeName} not found`, 'warn');
            return false;
        }
        
        const scheme = this.engine.config.themeSchemes[schemeName];
        
        // Применяем настройки схемы
        if (scheme.palette) {
            this.engine.setColorScheme(scheme.palette);
        }
        
        if (scheme.animationPreset) {
            this.engine.applyAnimationPreset(scheme.animationPreset);
        }
        
        // Обновляем настройки взаимодействий
        if (scheme.interactionSettings) {
            this.engine.config.interactionSettings = {
                ...this.engine.config.interactionSettings,
                ...scheme.interactionSettings
            };
        }
        
        this.engine.dispatchEvent('pg-theme-scheme-changed', { scheme: schemeName });
        return true;
    },
    
    getPaletteNames() {
        return Object.keys(this.engine.config.colorPalettes).filter(
            name => name.startsWith('extended_')
        );
    },
    
    getThemeSchemeNames() {
        return Object.keys(this.engine.config.themeSchemes);
    }
};

// Автоматическая регистрация плагина при загрузке
if (typeof window !== 'undefined' && typeof window.PlayGreen !== 'undefined') {
    window.PlayGreen.prototype.registerPlugin('extendedPalettes', ExtendedPalettes);
    console.log('ExtendedPalettes plugin registered');
}

export default ExtendedPalettes;
