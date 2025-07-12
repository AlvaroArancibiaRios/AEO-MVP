# 🚀 AEO Platform - Answer Engine Optimization Dashboard

> **Plataforma avanzada de optimización para Answer Engines (LLMs) que permite a las marcas monitorear, analizar y optimizar su posicionamiento en respuestas de modelos de IA.**

![AEO Platform](https://img.shields.io/badge/AEO-Platform-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=for-the-badge&logo=vite)

## 📋 Índice

- [🎯 Características Principales](#-características-principales)
- [🛠️ Tecnologías](#️-tecnologías)
- [⚡ Instalación y Configuración](#-instalación-y-configuración)
- [🎨 Componentes Principales](#-componentes-principales)
- [📊 Funcionalidades Detalladas](#-funcionalidades-detalladas)
- [🔧 Desarrollo](#-desarrollo)
- [📱 Responsive Design](#-responsive-design)
- [🎭 Animaciones y UX](#-animaciones-y-ux)
- [📈 Métricas y Analytics](#-métricas-y-analytics)
- [🚀 Despliegue](#-despliegue)

## 🎯 Características Principales

### 🎪 Dashboard Principal
- **Vista panorámica** de métricas AEO globales
- **Score AEO general** con tendencias y crecimiento
- **Métricas de rendimiento** por categorías (visibilidad, calidad, técnica, competitiva)
- **Top 3 LLMs** con análisis detallado
- **Acciones rápidas** para análisis temporal y comparativo

### 🔍 Análisis Detallado de LLMs
Organizado en **4 tabs principales**:

#### 📊 **Vista General**
- **Ranking de rendimiento** con logos reales de LLMs
- **Análisis comparativo** de precisión, menciones y sentimiento
- **Calidad de contexto** por modelo
- **Análisis de tendencias** (mejorando/estable/bajando)

#### ⚡ **Performance**
- **Análisis individual** por modelo con métricas de:
  - Precisión y consistencia
  - Tiempo de respuesta
  - Calidad y reliability index
- **Comparativas clave**: mejor precisión, velocidad, consistencia
- **Niveles de performance** (Excelente → Necesita Mejora)

#### 📈 **Distribución**
- **Gráfico de torta** interactivo con participación de mercado
- **Análisis individual** con clasificaciones (Dominante/Líder/Competitivo/Emergente/Nicho)
- **Evolución temporal** con gráfico de barras de últimos 7 días
- **Panel de insights** con tendencias resumidas

#### 🏆 **Competidores**
- **Podium visual** estilo olimpiadas para top 3
- **Layout por cards** responsivo y interactivo
- **Tu marca destacada** con ring primary
- **Progress bars animadas** por posición
- **Detalles expandibles** con accordion

### ⏰ Monitoreo Temporal
- **Historial de posiciones** con análisis de tendencias
- **Detección de cambios** significativos
- **Tests de variabilidad** ejecutando misma consulta múltiples veces
- **Predicciones** y análisis de volatilidad
- **Monitoreo en tiempo real** (simulado)

### 🎨 Sistema de Design
- **BentoGrid Layout** modular y responsivo
- **Logos reales** de LLMs (OpenAI, Claude, Gemini, Perplexity, DeepSeek)
- **Animaciones fluidas** con Framer Motion
- **Dark/Light mode** automático
- **Gradientes dinámicos** y efectos glassmorphism

## 🛠️ Tecnologías

### Core Stack
```json
{
  "frontend": "React 18+ con TypeScript 5+",
  "bundler": "Vite 5+ con HMR",
  "styling": "Tailwind CSS con CSS Variables",
  "animations": "Framer Motion",
  "charts": "Recharts",
  "icons": "Lucide React + SVG reales",
  "state": "React Hooks + LocalStorage"
}
```

### Arquitectura
- **Componentes funcionales** con hooks personalizados
- **TypeScript interfaces** estrictas para type safety
- **Modular design** con componentes reutilizables
- **Performance optimizado** con lazy loading y memoización

## ⚡ Instalación y Configuración

### Prerrequisitos
```bash
Node.js 18+
npm o yarn
Git
```

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/AlvaroArancibiaRios/AEO-MVP.git
cd AEO-MVP/AEO

# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev

# Abrir en navegador
http://localhost:5173
```

### Scripts Disponibles
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Linting con ESLint
npm run typecheck    # Verificación de tipos
```

## 🎨 Componentes Principales

### 📱 Layout Components
```typescript
// BentoGrid System
<BentoGrid className="grid-cols-1 md:grid-cols-6">
  <BentoGridItem
    title="Título"
    description="Descripción"
    icon={<Icon />}
    logoUrl="/path/to/logo.svg"
    size="small|medium|large"
    gradient="from-color to-color"
    onClick={handler}
  />
</BentoGrid>
```

### 📊 Analytics Components
- **AEOMetricsGrid**: Dashboard principal con métricas clave
- **AEOLLMComparisonGrid**: Comparación detallada entre LLMs
- **AEOPerformanceAnalysis**: Análisis de performance individual
- **AEOMentionsDistribution**: Distribución y participación de mercado
- **AEOCompetitorRanking**: Ranking competitivo por LLM
- **AEOTemporalAnalysis**: Monitoreo temporal y variabilidad

### 🎭 UI Components
- **Logos LLM**: Sistema de logos con fallbacks
- **Motion Cards**: Cards animadas con hover effects
- **Progress Bars**: Barras animadas con colores semánticos
- **Tooltips**: Tooltips interactivos con datos detallados

## 📊 Funcionalidades Detalladas

### 🎯 Score AEO Global
Algoritmo que combina múltiples métricas:
```typescript
score = (
  brand_visibility * 0.25 +
  content_quality * 0.25 +
  technical_optimization * 0.25 +
  competitive_strength * 0.25
)
```

### 📈 Métricas de Performance
- **Precisión**: Exactitud de las respuestas del LLM
- **Consistencia**: Estabilidad en resultados múltiples
- **Tiempo de Respuesta**: Velocidad de procesamiento
- **Reliability Index**: Índice de confiabilidad combinado
- **User Satisfaction**: Satisfacción simulada del usuario

### 🏆 Sistema de Ranking
- **Posiciones**: 1-5 con iconografía (Crown/Trophy/Medal)
- **Market Share**: Participación calculada dinámicamente
- **Tendencias**: up/down/stable con indicadores visuales
- **Crecimiento**: Porcentajes de cambio temporal

### ⏱️ Base de Datos Temporal
```typescript
// LocalStorage-based DB para MVP
class TemporalDB {
  savePositionRecord(record: PositionRecord): void
  getPositionRecords(filters: Filters): PositionRecord[]
  getPositionTrends(brand: string, query: string): Trend[]
  saveVariabilityTest(test: VariabilityTest): void
  getVariabilityTests(filters: Filters): VariabilityTest[]
}
```

## 🔧 Desarrollo

### Estructura del Proyecto
```
src/
├── components/
│   ├── generated/          # Componentes principales
│   │   ├── AEOMetricsGrid.tsx
│   │   ├── AEOLLMComparisonGrid.tsx
│   │   ├── AEOPerformanceAnalysis.tsx
│   │   ├── AEOMentionsDistribution.tsx
│   │   ├── AEOCompetitorRanking.tsx
│   │   └── AEOTemporalAnalysis.tsx
│   └── ui/                 # Componentes base
│       ├── bento-grid.tsx
│       ├── llm-logos.tsx
│       └── Logos Llm/      # SVGs reales
├── lib/
│   ├── utils.ts           # Utilidades
│   └── temporalDB.ts      # Base de datos temporal
└── App.tsx               # Aplicación principal
```

### Convenciones de Código
- **Naming**: PascalCase para componentes, camelCase para funciones
- **Props**: Interfaces TypeScript estrictas
- **Styling**: Tailwind CSS con clases semánticas
- **State**: React Hooks con tipos explícitos

### Agregando Nuevos LLMs
```typescript
// 1. Agregar logo SVG a /src/components/ui/Logos Llm/
// 2. Actualizar mapping en llm-logos.tsx
const logoMap = {
  'NuevoLLM': NuevoLLMLogo,
  // ...
}

// 3. Agregar datos mock en componentes
const llmModels = [
  {
    name: 'NuevoLLM',
    // ... otros campos
  }
]
```

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
sm: 640px   /* Tablet */
md: 768px   /* Laptop */
lg: 1024px  /* Desktop */
xl: 1280px  /* Wide Desktop */
```

### Grid Responsivo
- **Mobile**: 1 columna, stack vertical
- **Tablet**: 2 columnas balanceadas
- **Desktop**: 3-6 columnas según contenido
- **Wide**: Layout expandido con más detalles

## 🎭 Animaciones y UX

### Framer Motion Patterns
```typescript
// Entrada escalonada
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
}

// Card hover
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
```

### Estados Interactivos
- **Hover**: Scale, shadow, color changes
- **Active**: Tap animations con scale
- **Loading**: Skeleton states y spinners
- **Success**: Check animations y confirmaciones

## 📈 Métricas y Analytics

### KPIs Monitoreados
- **Brand Visibility**: Qué tan visible es la marca
- **Content Quality**: Calidad percibida del contenido
- **Technical Score**: Optimización técnica
- **Competitive Position**: Posición vs competencia
- **Trend Analysis**: Análisis de tendencias temporales

### Datos Mock Realistas
Todos los componentes usan datos simulados que replican:
- **Variaciones temporales** realistas
- **Distribuciones de mercado** coherentes
- **Tendencias** con lógica de negocio
- **Correlaciones** entre métricas

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
# Genera dist/ optimizado para producción
```

### Optimizaciones Incluidas
- **Tree shaking** automático
- **Code splitting** por rutas
- **Asset optimization** (CSS, JS, SVGs)
- **Gzip compression** ready

### Variables de Entorno
```env
# .env.local (opcional)
VITE_API_URL=https://api.ejemplo.com
VITE_APP_NAME=AEO Platform
```

---

## 🤝 Contribuciones

1. **Fork** el repositorio
2. **Crea** una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Abre** un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 🎯 Roadmap

### 🔄 Próximas Funcionalidades
- [ ] **API Integration**: Conexión con APIs reales de LLMs
- [ ] **Real-time Updates**: WebSocket para monitoreo en tiempo real
- [ ] **Export Features**: PDF, Excel, CSV exports
- [ ] **User Management**: Sistema de usuarios y permisos
- [ ] **Alertas**: Notificaciones por cambios significativos
- [ ] **A/B Testing**: Comparación de diferentes estrategias
- [ ] **SEO Integration**: Conexión con métricas SEO tradicionales

### 🛠️ Mejoras Técnicas
- [ ] **PWA**: Progressive Web App capabilities
- [ ] **Offline Mode**: Funcionalidad sin conexión
- [ ] **Performance**: Optimizaciones adicionales
- [ ] **Testing**: Cobertura de tests completa
- [ ] **Documentation**: Storybook para componentes

---

**Desarrollado con ❤️ para revolutionar el Answer Engine Optimization**

*AEO Platform - Donde la IA se encuentra con la estrategia de marca*