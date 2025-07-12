"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Zap,
  Target,
  Brain,
  Search,
  Globe,
  Eye,
  CheckCircle,
  AlertTriangle,
  Info,
  Sparkles,
  Bot,
  MessageSquare,
  Lightbulb,
  FileText,
  Link,
  Hash
} from 'lucide-react';

interface QueryData {
  brand: string;
  query: string;
  website: string;
  screenshot?: string;
}

interface AEOSEOAnalysisProps {
  queryData: QueryData;
  onBack: () => void;
}

interface AEOMetrics {
  overall_aeo_score: number;
  llm_visibility: {
    score: number;
    chatgpt_mentions: number;
    claude_coverage: string;
    gemini_ranking: string;
    perplexity_presence: string;
  };
  content_readiness: {
    score: number;
    structured_data: string;
    answer_format: string;
    snippet_potential: string;
    voice_ready: string;
  };
  brand_authority: {
    score: number;
    entity_recognition: string;
    knowledge_graph: string;
    citation_quality: string;
    factual_accuracy: string;
  };
  technical_optimization: {
    score: number;
    llm_txt_status: string;
    robots_optimization: string;
    schema_markup: string;
    api_accessibility: string;
  };
  opportunities: {
    score: number;
    quick_wins: string[];
    medium_impact: string[];
    high_impact: string[];
  };
  recommendations: {
    immediate: string[];
    short_term: string[];
    long_term: string[];
  };
}

const AEOSEOAnalysis: React.FC<AEOSEOAnalysisProps> = ({ queryData, onBack }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AEOMetrics | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'recommendations'>('overview');

  useEffect(() => {
    // Auto-start analysis when component loads
    startAnalysis();
  }, [queryData]);

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate comprehensive AEO analysis
    setTimeout(() => {
      const mockResult: AEOMetrics = {
        overall_aeo_score: 78,
        llm_visibility: {
          score: 82,
          chatgpt_mentions: 7,
          claude_coverage: `${queryData.brand} aparece en 8/10 consultas relacionadas`,
          gemini_ranking: 'Posición promedio: #2-3 en respuestas',
          perplexity_presence: 'Citado como fuente confiable en 65% de consultas'
        },
        content_readiness: {
          score: 71,
          structured_data: 'Schema.org implementado parcialmente',
          answer_format: `Contenido optimizable para "${queryData.query}"`,
          snippet_potential: 'Alto potencial para featured snippets',
          voice_ready: 'Necesita optimización para búsquedas por voz'
        },
        brand_authority: {
          score: 85,
          entity_recognition: `${queryData.brand} reconocida como entidad confiable`,
          knowledge_graph: 'Presente en Knowledge Graph de Google y otros',
          citation_quality: 'Citada por fuentes de alta autoridad',
          factual_accuracy: 'Información consistente entre LLMs'
        },
        technical_optimization: {
          score: 63,
          llm_txt_status: 'No implementado - Oportunidad crítica',
          robots_optimization: 'Configuración básica, necesita mejoras',
          schema_markup: 'Implementación parcial de schema markup',
          api_accessibility: `${queryData.website} accesible para crawlers de IA`
        },
        opportunities: {
          score: 74,
          quick_wins: [
            'Implementar llm.txt en el sitio web',
            'Optimizar meta descriptions para LLMs',
            'Agregar FAQ estructurada sobre la marca'
          ],
          medium_impact: [
            'Crear contenido específico para voice search',
            'Mejorar schema markup para entidades',
            'Optimizar imágenes con alt text descriptivo'
          ],
          high_impact: [
            'Desarrollar API pública para acceso de LLMs',
            'Crear knowledge base estructurada',
            'Implementar programa de content partnerships'
          ]
        },
        recommendations: {
          immediate: [
            `Crear archivo llm.txt para ${queryData.website}`,
            'Implementar structured data para la marca',
            'Optimizar homepage para Answer Engine visibility',
            'Agregar brand entity markup con JSON-LD'
          ],
          short_term: [
            'Desarrollar contenido FAQ optimizado para LLMs',
            'Crear definiciones concisas de productos/servicios',
            'Implementar rich snippets para eventos y productos',
            'Optimizar site speed para mejor crawling de IA'
          ],
          long_term: [
            'Desarrollar API pública para acceso directo de LLMs',
            'Crear partnerships con knowledge providers',
            'Implementar real-time data feeds para LLMs',
            'Desarrollar contenido multimedia específico para IA'
          ]
        }
      };
      
      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 2500);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (score >= 60) return <TrendingUp className="w-4 h-4 text-yellow-500" />;
    return <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return 'Excelente';
    if (score >= 60) return 'Bueno';
    return 'Necesita mejoras';
  };

  if (isAnalyzing) {
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
            Análisis AEO en Progreso
          </h2>
          <p className="text-muted-foreground mb-4">
            Evaluando la presencia de "{queryData.brand}" en ecosistemas de IA...
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <Bot className="w-4 h-4 text-primary" />
              <span>Analizando visibilidad en LLMs</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Brain className="w-4 h-4 text-primary" />
              <span>Evaluando autoridad de marca</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <span>Identificando oportunidades AEO</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!analysisResult) return null;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Volver</span>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Análisis AEO Completo</h1>
            <p className="text-muted-foreground">
              Optimización para Answer Engines: "{queryData.brand}" • {queryData.website}
            </p>
          </div>
        </div>

        {/* Overall Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-card to-card/50 rounded-2xl p-8 mb-8 border"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Puntuación AEO Global</h3>
              <p className="text-muted-foreground">
                Evaluación completa de presencia en Answer Engines
              </p>
            </div>
            <div className="text-right">
              <div className={`text-5xl font-bold ${getScoreColor(analysisResult.overall_aeo_score)} mb-2`}>
                {analysisResult.overall_aeo_score}/100
              </div>
              <div className="flex items-center gap-2 justify-end">
                {getScoreIcon(analysisResult.overall_aeo_score)}
                <span className="text-lg font-medium text-foreground">
                  {getScoreStatus(analysisResult.overall_aeo_score)}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Visibilidad LLM', value: analysisResult.llm_visibility.score, icon: Bot },
              { label: 'Autoridad Marca', value: analysisResult.brand_authority.score, icon: Sparkles },
              { label: 'Optimización Técnica', value: analysisResult.technical_optimization.score, icon: Zap },
              { label: 'Oportunidades', value: analysisResult.opportunities.score, icon: Target }
            ].map((metric, index) => (
              <div key={index} className="bg-background/50 rounded-xl p-4 border border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <metric.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{metric.label}</span>
                </div>
                <div className={`text-2xl font-bold ${getScoreColor(metric.value)}`}>
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'overview', label: 'Vista General', icon: BarChart3 },
            { id: 'detailed', label: 'Análisis Detallado', icon: Search },
            { id: 'recommendations', label: 'Recomendaciones', icon: Lightbulb }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id
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
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* LLM Visibility */}
              <div className="bg-card rounded-xl p-6 border">
                <div className="flex items-center gap-3 mb-4">
                  <Bot className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">Visibilidad en LLMs</h4>
                  <span className={`text-sm font-medium ${getScoreColor(analysisResult.llm_visibility.score)}`}>
                    {analysisResult.llm_visibility.score}/100
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                    <span>ChatGPT: {analysisResult.llm_visibility.chatgpt_mentions} menciones</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-purple-500" />
                    <span>Claude: {analysisResult.llm_visibility.claude_coverage}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-green-500" />
                    <span>Gemini: {analysisResult.llm_visibility.gemini_ranking}</span>
                  </div>
                </div>
              </div>

              {/* Content Readiness */}
              <div className="bg-card rounded-xl p-6 border">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">Preparación de Contenido</h4>
                  <span className={`text-sm font-medium ${getScoreColor(analysisResult.content_readiness.score)}`}>
                    {analysisResult.content_readiness.score}/100
                  </span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• {analysisResult.content_readiness.structured_data}</p>
                  <p>• {analysisResult.content_readiness.answer_format}</p>
                  <p>• {analysisResult.content_readiness.snippet_potential}</p>
                </div>
              </div>

              {/* Brand Authority */}
              <div className="bg-card rounded-xl p-6 border">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">Autoridad de Marca</h4>
                  <span className={`text-sm font-medium ${getScoreColor(analysisResult.brand_authority.score)}`}>
                    {analysisResult.brand_authority.score}/100
                  </span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• {analysisResult.brand_authority.entity_recognition}</p>
                  <p>• {analysisResult.brand_authority.knowledge_graph}</p>
                  <p>• {analysisResult.brand_authority.citation_quality}</p>
                </div>
              </div>

              {/* Technical Optimization */}
              <div className="bg-card rounded-xl p-6 border">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">Optimización Técnica</h4>
                  <span className={`text-sm font-medium ${getScoreColor(analysisResult.technical_optimization.score)}`}>
                    {analysisResult.technical_optimization.score}/100
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    <span>{analysisResult.technical_optimization.llm_txt_status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-500" />
                    <span>{analysisResult.technical_optimization.robots_optimization}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-green-500" />
                    <span>{analysisResult.technical_optimization.schema_markup}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'detailed' && (
            <motion.div
              key="detailed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Opportunities */}
              <div className="bg-card rounded-xl p-6 border">
                <h4 className="text-xl font-semibold text-foreground mb-6">Oportunidades de Mejora</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h5 className="font-medium text-green-600 mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Victorias Rápidas
                    </h5>
                    <ul className="space-y-2">
                      {analysisResult.opportunities.quick_wins.map((item, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium text-yellow-600 mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Impacto Medio
                    </h5>
                    <ul className="space-y-2">
                      {analysisResult.opportunities.medium_impact.map((item, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium text-purple-600 mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Alto Impacto
                    </h5>
                    <ul className="space-y-2">
                      {analysisResult.opportunities.high_impact.map((item, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'recommendations' && (
            <motion.div
              key="recommendations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Recommendations Timeline */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-card rounded-xl p-6 border">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-green-500" />
                    Acción Inmediata
                  </h4>
                  <ul className="space-y-3">
                    {analysisResult.recommendations.immediate.map((rec, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-6 border">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-yellow-500" />
                    Corto Plazo (1-3 meses)
                  </h4>
                  <ul className="space-y-3">
                    {analysisResult.recommendations.short_term.map((rec, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-6 border">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    Largo Plazo (3-12 meses)
                  </h4>
                  <ul className="space-y-3">
                    {analysisResult.recommendations.long_term.map((rec, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={startAnalysis}
            className="px-6 py-3 border border-border rounded-xl text-foreground hover:bg-muted/50 transition-colors"
          >
            Reanalizar
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors">
            <FileText className="w-4 h-4" />
            Exportar Reporte AEO
          </button>
        </div>
      </div>
    </div>
  );
};

export default AEOSEOAnalysis;