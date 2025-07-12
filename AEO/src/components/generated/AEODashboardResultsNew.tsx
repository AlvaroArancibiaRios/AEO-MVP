"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AEOMetricsGrid from './AEOMetricsGrid';
import { 
  Search, 
  RotateCcw, 
  TrendingUp, 
  TrendingDown,
  Award, 
  Target, 
  Zap, 
  Activity, 
  BarChart3,
  PieChart,
  Eye,
  Bot,
  MessageSquare,
  Brain,
  Sparkles,
  Globe,
  Users,
  Calendar,
  Clock,
  Star,
  ArrowUp,
  ArrowDown,
  Minus,
  Info,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Share,
  Download,
  RefreshCw,
  Filter,
  MoreHorizontal,
  Lightbulb,
  Crown,
  Shield,
  Radar
} from 'lucide-react';

interface QueryData {
  brand: string;
  query: string;
  website: string;
  screenshot?: string;
}

interface AEODashboardResultsProps {
  queryData: QueryData;
  onNewSearch: () => void;
  onViewComparison?: () => void;
  onViewTemporal?: () => void;
}

interface LLMResult {
  name: string;
  mentions: number;
  accuracy: number;
  relevance: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  position: number;
  context_quality: string;
  citation_frequency: number;
  trending: 'up' | 'down' | 'stable';
  color: string;
  icon: React.ElementType;
}

interface AnalysisInsights {
  overall_score: number;
  market_position: string;
  growth_trend: 'up' | 'down' | 'stable';
  competitive_advantage: string;
  key_opportunities: string[];
  critical_issues: string[];
  recommendations: {
    immediate: string[];
    strategic: string[];
    long_term: string[];
  };
  performance_metrics: {
    brand_visibility: number;
    content_quality: number;
    technical_optimization: number;
    competitive_strength: number;
  };
}

const AEODashboardResults: React.FC<AEODashboardResultsProps> = ({
  queryData,
  onNewSearch,
  onViewComparison,
  onViewTemporal
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<'overview' | 'detailed' | 'insights'>('overview');
  const [selectedLLM, setSelectedLLM] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d');

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  // Enhanced mock data with comprehensive metrics
  const llmResults: LLMResult[] = [
    {
      name: 'ChatGPT',
      mentions: 15,
      accuracy: 94,
      relevance: 89,
      sentiment: 'positive',
      position: 1,
      context_quality: 'Excelente contexto con información detallada y actualizada',
      citation_frequency: 85,
      trending: 'up',
      color: '#10b981',
      icon: MessageSquare
    },
    {
      name: 'Claude',
      mentions: 12,
      accuracy: 91,
      relevance: 92,
      sentiment: 'positive',
      position: 2,
      context_quality: 'Respuestas muy bien estructuradas y contextualmente precisas',
      citation_frequency: 78,
      trending: 'up',
      color: '#8b5cf6',
      icon: Brain
    },
    {
      name: 'Gemini',
      mentions: 10,
      accuracy: 87,
      relevance: 85,
      sentiment: 'neutral',
      position: 3,
      context_quality: 'Información correcta pero menos detallada',
      citation_frequency: 72,
      trending: 'stable',
      color: '#f59e0b',
      icon: Sparkles
    },
    {
      name: 'Perplexity',
      mentions: 8,
      accuracy: 89,
      relevance: 88,
      sentiment: 'positive',
      position: 4,
      context_quality: 'Buenas citaciones con fuentes verificables',
      citation_frequency: 82,
      trending: 'up',
      color: '#3b82f6',
      icon: Search
    },
    {
      name: 'You.com',
      mentions: 5,
      accuracy: 83,
      relevance: 79,
      sentiment: 'neutral',
      position: 5,
      context_quality: 'Información básica, oportunidad de mejora',
      citation_frequency: 65,
      trending: 'down',
      color: '#ef4444',
      icon: Globe
    }
  ];

  const analysisInsights: AnalysisInsights = {
    overall_score: 87,
    market_position: `${queryData.brand} está posicionado como líder de reconocimiento en LLMs`,
    growth_trend: 'up',
    competitive_advantage: 'Excelente presencia en ChatGPT y Claude con contexto de alta calidad',
    key_opportunities: [
      'Mejorar presencia en Gemini con contenido más estructurado',
      'Optimizar para You.com con better SEO técnico',
      'Aumentar citation frequency en todos los LLMs',
      'Desarrollar contenido específico para trending topics'
    ],
    critical_issues: [
      'Baja presencia en plataformas emergentes',
      'Necesidad de actualizar structured data',
      'Oportunidad perdida en voice search optimization'
    ],
    recommendations: {
      immediate: [
        'Implementar llm.txt en el sitio web',
        'Optimizar meta descriptions para LLMs',
        'Crear FAQ estructurada para mejor citabilidad'
      ],
      strategic: [
        'Desarrollar partnerships con plataformas LLM',
        'Crear contenido específico para cada Answer Engine',
        'Implementar real-time data feeds para LLMs'
      ],
      long_term: [
        'Establecer API pública para acceso directo de LLMs',
        'Desarrollar AI-first content strategy',
        'Crear knowledge graph propio'
      ]
    },
    performance_metrics: {
      brand_visibility: 87,
      content_quality: 91,
      technical_optimization: 73,
      competitive_strength: 82
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-yellow-500" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-500';
      case 'negative': return 'text-red-500';
      case 'neutral': return 'text-yellow-500';
      default: return 'text-muted-foreground';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Analizando Resultados AEO
          </h2>
          <p className="text-muted-foreground mb-4">
            Procesando análisis completo de "{queryData.brand}" en ecosistemas LLM...
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              <span>Consolidando métricas AEO</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Radar className="w-4 h-4 text-primary" />
              <span>Generando insights competitivos</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Lightbulb className="w-4 h-4 text-primary" />
              <span>Preparando recomendaciones</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard AEO Completo</h1>
            <p className="text-muted-foreground">
              Análisis integral de "{queryData.brand}" • {queryData.query}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onNewSearch}
              className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Nueva Búsqueda
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors">
              <Download className="w-4 h-4" />
              Exportar Reporte
            </button>
          </div>
        </div>

        {/* Enhanced Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <AEOMetricsGrid
            llmResults={llmResults}
            analysisInsights={analysisInsights}
            onViewComparison={onViewComparison}
            onViewTemporal={onViewTemporal}
            onViewDetailedAnalysis={() => setActiveView('detailed')}
          />
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'overview', label: 'Vista General', icon: BarChart3 },
            { id: 'detailed', label: 'Análisis Detallado', icon: Eye },
            { id: 'insights', label: 'Insights y Recomendaciones', icon: Lightbulb }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeView === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:text-foreground hover:bg-card/80'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeView === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* LLM Performance Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card rounded-xl p-6 border">
                  <h4 className="text-xl font-semibold text-foreground mb-6">Rendimiento por LLM</h4>
                  
                  {/* Custom Bar Chart */}
                  <div className="space-y-4">
                    {llmResults.map((llm, index) => (
                      <motion.div
                        key={llm.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <llm.icon className="w-4 h-4" style={{ color: llm.color }} />
                            <span className="font-medium text-foreground">{llm.name}</span>
                            {getTrendIcon(llm.trending)}
                          </div>
                          <span className="text-sm font-medium text-foreground">{llm.mentions} menciones</span>
                        </div>
                        <div className="h-3 bg-muted/30 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(llm.mentions / 15) * 100}%` }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: llm.color }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="bg-card rounded-xl p-6 border">
                  <h4 className="text-xl font-semibold text-foreground mb-6">Métricas de Rendimiento</h4>
                  
                  <div className="space-y-4">
                    {[
                      { label: 'Visibilidad de Marca', value: analysisInsights.performance_metrics.brand_visibility, icon: Eye },
                      { label: 'Calidad de Contenido', value: analysisInsights.performance_metrics.content_quality, icon: Star },
                      { label: 'Optimización Técnica', value: analysisInsights.performance_metrics.technical_optimization, icon: Zap },
                      { label: 'Fortaleza Competitiva', value: analysisInsights.performance_metrics.competitive_strength, icon: Shield }
                    ].map((metric, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <metric.icon className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-foreground">{metric.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-muted/30 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${metric.value}%` }}
                              transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                              className={`h-full rounded-full ${
                                metric.value >= 85 ? 'bg-green-500' : 
                                metric.value >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                            />
                          </div>
                          <span className={`text-sm font-medium ${getScoreColor(metric.value)}`}>
                            {metric.value}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* LLM Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {llmResults.slice(0, 3).map((llm, index) => (
                  <motion.div
                    key={llm.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-xl p-6 border hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => setSelectedLLM(selectedLLM === llm.name ? null : llm.name)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${llm.color}20` }}>
                          <llm.icon className="w-5 h-5" style={{ color: llm.color }} />
                        </div>
                        <div>
                          <h5 className="font-semibold text-foreground">{llm.name}</h5>
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-muted-foreground">#{llm.position}</span>
                            {getTrendIcon(llm.trending)}
                          </div>
                        </div>
                      </div>
                      <Crown className={`w-5 h-5 ${llm.position === 1 ? 'text-yellow-500' : 'text-muted-foreground'}`} />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Menciones</span>
                        <span className="text-sm font-medium text-foreground">{llm.mentions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Precisión</span>
                        <span className={`text-sm font-medium ${getScoreColor(llm.accuracy)}`}>{llm.accuracy}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Sentimiento</span>
                        <span className={`text-sm font-medium ${getSentimentColor(llm.sentiment)}`}>
                          {llm.sentiment === 'positive' ? 'Positivo' : llm.sentiment === 'negative' ? 'Negativo' : 'Neutral'}
                        </span>
                      </div>
                    </div>

                    <AnimatePresence>
                      {selectedLLM === llm.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-border"
                        >
                          <p className="text-xs text-muted-foreground">{llm.context_quality}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeView === 'detailed' && (
            <motion.div
              key="detailed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Detailed Analysis Table */}
              <div className="bg-card rounded-xl p-6 border">
                <h4 className="text-xl font-semibold text-foreground mb-6">Análisis Detallado por LLM</h4>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-foreground">LLM</th>
                        <th className="text-center py-3 px-4 font-medium text-foreground">Menciones</th>
                        <th className="text-center py-3 px-4 font-medium text-foreground">Precisión</th>
                        <th className="text-center py-3 px-4 font-medium text-foreground">Relevancia</th>
                        <th className="text-center py-3 px-4 font-medium text-foreground">Citaciones</th>
                        <th className="text-center py-3 px-4 font-medium text-foreground">Tendencia</th>
                      </tr>
                    </thead>
                    <tbody>
                      {llmResults.map((llm, index) => (
                        <tr key={llm.name} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <llm.icon className="w-4 h-4" style={{ color: llm.color }} />
                              <span className="font-medium text-foreground">{llm.name}</span>
                              {llm.position === 1 && <Crown className="w-4 h-4 text-yellow-500" />}
                            </div>
                          </td>
                          <td className="text-center py-4 px-4">
                            <span className="text-sm font-medium text-foreground">{llm.mentions}</span>
                          </td>
                          <td className="text-center py-4 px-4">
                            <span className={`text-sm font-medium ${getScoreColor(llm.accuracy)}`}>
                              {llm.accuracy}%
                            </span>
                          </td>
                          <td className="text-center py-4 px-4">
                            <span className={`text-sm font-medium ${getScoreColor(llm.relevance)}`}>
                              {llm.relevance}%
                            </span>
                          </td>
                          <td className="text-center py-4 px-4">
                            <span className="text-sm font-medium text-foreground">{llm.citation_frequency}%</span>
                          </td>
                          <td className="text-center py-4 px-4">
                            {getTrendIcon(llm.trending)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Context Quality Analysis */}
              <div className="bg-card rounded-xl p-6 border">
                <h4 className="text-xl font-semibold text-foreground mb-6">Calidad de Contexto por LLM</h4>
                
                <div className="space-y-4">
                  {llmResults.map((llm, index) => (
                    <div key={llm.name} className="border border-border/50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <llm.icon className="w-5 h-5" style={{ color: llm.color }} />
                        <h5 className="font-medium text-foreground">{llm.name}</h5>
                        <span className={`text-sm px-2 py-1 rounded-full ${getSentimentColor(llm.sentiment)} bg-current/10`}>
                          {llm.sentiment === 'positive' ? 'Positivo' : llm.sentiment === 'negative' ? 'Negativo' : 'Neutral'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{llm.context_quality}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Market Position */}
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
                <h4 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Crown className="w-5 h-5 text-primary" />
                  Posición de Mercado
                </h4>
                <p className="text-foreground mb-4">{analysisInsights.market_position}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Ventaja competitiva:</span>
                  <span className="text-sm font-medium text-foreground">{analysisInsights.competitive_advantage}</span>
                </div>
              </div>

              {/* Opportunities & Issues */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card rounded-xl p-6 border">
                  <h5 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-green-500" />
                    Oportunidades Clave
                  </h5>
                  <ul className="space-y-2">
                    {analysisInsights.key_opportunities.map((opportunity, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {opportunity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-6 border">
                  <h5 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                    Áreas Críticas
                  </h5>
                  <ul className="space-y-2">
                    {analysisInsights.critical_issues.map((issue, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommendations Timeline */}
              <div className="bg-card rounded-xl p-6 border">
                <h4 className="text-xl font-semibold text-foreground mb-6">Plan de Acción Recomendado</h4>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {[
                    { title: 'Inmediato (0-30 días)', items: analysisInsights.recommendations.immediate, color: 'green' },
                    { title: 'Estratégico (1-6 meses)', items: analysisInsights.recommendations.strategic, color: 'blue' },
                    { title: 'Largo Plazo (6-12 meses)', items: analysisInsights.recommendations.long_term, color: 'purple' }
                  ].map((timeline, index) => (
                    <div key={index} className="space-y-3">
                      <h5 className={`font-medium text-${timeline.color}-600`}>{timeline.title}</h5>
                      <ul className="space-y-2">
                        {timeline.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle className={`w-4 h-4 text-${timeline.color}-500 mt-0.5 flex-shrink-0`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Actions */}
        <div className="flex justify-center gap-4 mt-8">
          <button className="flex items-center gap-2 px-6 py-3 border border-border rounded-xl text-foreground hover:bg-muted/50 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Actualizar Análisis
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors">
            <Share className="w-4 h-4" />
            Compartir Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AEODashboardResults;