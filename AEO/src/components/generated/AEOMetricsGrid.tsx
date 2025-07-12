"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LLMLogo } from '../ui/llm-logos';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Activity, 
  BarChart3, 
  Crown, 
  Zap, 
  Eye,
  Star,
  Shield,
  Minus,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

// Import logos directly for URL access
import OpenAILogo from '../ui/Logos Llm/openai.svg?url';
import ClaudeLogo from '../ui/Logos Llm/claude-color.svg?url';
import GeminiLogo from '../ui/Logos Llm/gemini-color.svg?url';
import PerplexityLogo from '../ui/Logos Llm/perplexity-color.svg?url';
import DeepSeekLogo from '../ui/Logos Llm/deepseek-color.svg?url';
import { BentoGrid, BentoGridItem } from '../ui/bento-grid';
import { cn } from '@/lib/utils';

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
  performance_metrics: {
    brand_visibility: number;
    content_quality: number;
    technical_optimization: number;
    competitive_strength: number;
  };
}

interface AEOMetricsGridProps {
  llmResults: LLMResult[];
  analysisInsights: AnalysisInsights;
  onViewComparison?: () => void;
  onViewTemporal?: () => void;
  onViewDetailedAnalysis?: () => void;
}

const AEOMetricsGrid: React.FC<AEOMetricsGridProps> = ({
  llmResults,
  analysisInsights,
  onViewComparison,
  onViewTemporal,
  onViewDetailedAnalysis
}) => {
  // Helper function to get logo URL for LLM
  const getLLMLogoUrl = (name: string): string | undefined => {
    const logoMap: Record<string, string> = {
      'ChatGPT': OpenAILogo,
      'OpenAI': OpenAILogo,
      'Claude': ClaudeLogo,
      'Gemini': GeminiLogo,
      'Perplexity': PerplexityLogo,
      'DeepSpeak': DeepSeekLogo,
      'DeepSeek': DeepSeekLogo,
      'You.com': GeminiLogo, // Fallback
    };
    return logoMap[name];
  };
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-yellow-500" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-500';
      case 'negative': return 'text-red-500';
      case 'neutral': return 'text-yellow-500';
      default: return 'text-muted-foreground';
    }
  };

  // Métricas principales
  const totalMentions = llmResults.reduce((sum, llm) => sum + llm.mentions, 0);
  const avgAccuracy = Math.round(llmResults.reduce((sum, llm) => sum + llm.accuracy, 0) / llmResults.length);
  const topPerformer = llmResults.find(llm => llm.position === 1);

  return (
    <div className="space-y-8">
      {/* Métricas Principales */}
      <BentoGrid className="grid-cols-1 md:grid-cols-8">
        {/* Score AEO Global - Grande */}
        <BentoGridItem
          title="Score AEO Global"
          description="Puntuación general de optimización para Answer Engines"
          icon={<Crown className="w-6 h-6" />}
          size="large"
          className="col-span-4 md:col-span-3"
          gradient="from-primary to-primary/50"
        >
          <div className="flex items-end gap-4 mt-4">
            <div className="text-4xl font-bold text-primary">
              {analysisInsights.overall_score}
            </div>
            <div className="text-lg text-muted-foreground mb-1">/100</div>
            <div className="flex items-center gap-1 mb-1">
              {getTrendIcon(analysisInsights.growth_trend)}
              <span className="text-sm font-medium text-muted-foreground">
                {analysisInsights.growth_trend === 'up' ? 'Mejorando' : 
                 analysisInsights.growth_trend === 'down' ? 'Bajando' : 'Estable'}
              </span>
            </div>
          </div>
        </BentoGridItem>

        {/* Total Menciones */}
        <BentoGridItem
          title="Total Menciones"
          description="Menciones agregadas en todos los LLMs"
          icon={<Activity className="w-6 h-6" />}
          size="small"
          className="col-span-2 md:col-span-2"
          gradient="from-green-500 to-green-500/30"
        >
          <div className="text-3xl font-bold text-green-500 mt-2">
            {totalMentions}
          </div>
        </BentoGridItem>

        {/* Promedio Precisión */}
        <BentoGridItem
          title="Precisión Promedio"
          description="Precisión media entre todos los modelos"
          icon={<Target className="w-6 h-6" />}
          size="small"
          className="col-span-2 md:col-span-2"
          gradient="from-blue-500 to-blue-500/30"
        >
          <div className={`text-3xl font-bold mt-2 ${getScoreColor(avgAccuracy)}`}>
            {avgAccuracy}%
          </div>
        </BentoGridItem>

        {/* Mejor Modelo */}
        <BentoGridItem
          title="Mejor Modelo"
          description={`Posición #${topPerformer?.position} con ${topPerformer?.mentions} menciones`}
          icon={<Crown className="w-6 h-6" />}
          size="small"
          className="col-span-4 md:col-span-1"
          gradient="from-yellow-500 to-yellow-500/30"
          onClick={onViewDetailedAnalysis}
          actionText="Ver ranking"
        >
          <div className="text-xl font-bold text-yellow-500 mt-2">
            {topPerformer?.name || 'N/A'}
          </div>
        </BentoGridItem>
      </BentoGrid>

      {/* Métricas de Rendimiento */}
      <BentoGrid className="grid-cols-1 md:grid-cols-4">
        <BentoGridItem
          title="Visibilidad de Marca"
          description="Qué tan visible es tu marca en las respuestas"
          icon={<Eye className="w-6 h-6" />}
          size="small"
          className="col-span-1"
          gradient="from-purple-500 to-purple-500/30"
        >
          <div className="flex items-center justify-between mt-4">
            <div className={`text-2xl font-bold ${getScoreColor(analysisInsights.performance_metrics.brand_visibility)}`}>
              {analysisInsights.performance_metrics.brand_visibility}%
            </div>
            <div className="w-16 h-2 bg-muted/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${analysisInsights.performance_metrics.brand_visibility}%` }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="h-full bg-purple-500 rounded-full"
              />
            </div>
          </div>
        </BentoGridItem>

        <BentoGridItem
          title="Calidad de Contenido"
          description="Calidad percibida del contenido por los LLMs"
          icon={<Star className="w-6 h-6" />}
          size="small"
          className="col-span-1"
          gradient="from-green-500 to-green-500/30"
        >
          <div className="flex items-center justify-between mt-4">
            <div className={`text-2xl font-bold ${getScoreColor(analysisInsights.performance_metrics.content_quality)}`}>
              {analysisInsights.performance_metrics.content_quality}%
            </div>
            <div className="w-16 h-2 bg-muted/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${analysisInsights.performance_metrics.content_quality}%` }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-full bg-green-500 rounded-full"
              />
            </div>
          </div>
        </BentoGridItem>

        <BentoGridItem
          title="Optimización Técnica"
          description="Nivel de optimización técnica implementada"
          icon={<Zap className="w-6 h-6" />}
          size="small"
          className="col-span-1"
          gradient="from-orange-500 to-orange-500/30"
        >
          <div className="flex items-center justify-between mt-4">
            <div className={`text-2xl font-bold ${getScoreColor(analysisInsights.performance_metrics.technical_optimization)}`}>
              {analysisInsights.performance_metrics.technical_optimization}%
            </div>
            <div className="w-16 h-2 bg-muted/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${analysisInsights.performance_metrics.technical_optimization}%` }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="h-full bg-orange-500 rounded-full"
              />
            </div>
          </div>
        </BentoGridItem>

        <BentoGridItem
          title="Fortaleza Competitiva"
          description="Posición relativa vs competencia"
          icon={<Shield className="w-6 h-6" />}
          size="small"
          className="col-span-1"
          gradient="from-blue-500 to-blue-500/30"
        >
          <div className="flex items-center justify-between mt-4">
            <div className={`text-2xl font-bold ${getScoreColor(analysisInsights.performance_metrics.competitive_strength)}`}>
              {analysisInsights.performance_metrics.competitive_strength}%
            </div>
            <div className="w-16 h-2 bg-muted/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${analysisInsights.performance_metrics.competitive_strength}%` }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="h-full bg-blue-500 rounded-full"
              />
            </div>
          </div>
        </BentoGridItem>
      </BentoGrid>

      {/* Top 3 LLMs Performance */}
      <BentoGrid className="grid-cols-1 md:grid-cols-3">
        {llmResults.slice(0, 3).map((llm, index) => (
          <BentoGridItem
            key={llm.name}
            title={llm.name}
            description={`Posición #${llm.position} • ${llm.mentions} menciones`}
            icon={React.createElement(llm.icon, { className: "w-6 h-6" })}
            logoUrl={getLLMLogoUrl(llm.name)}
            size="medium"
            className="col-span-1"
            gradient="from-primary to-primary/30"
            onClick={onViewDetailedAnalysis}
            actionText="Ver detalles"
          >
            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Precisión</span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${getScoreColor(llm.accuracy)}`}>
                    {llm.accuracy}%
                  </span>
                  {getTrendIcon(llm.trending)}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Sentimiento</span>
                <span className={`text-sm font-medium ${getSentimentColor(llm.sentiment)}`}>
                  {llm.sentiment === 'positive' ? 'Positivo' : 
                   llm.sentiment === 'negative' ? 'Negativo' : 'Neutral'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Citaciones</span>
                <span className="text-sm font-medium text-foreground">
                  {llm.citation_frequency}%
                </span>
              </div>
              
              {index === 0 && (
                <div className="flex items-center gap-1 pt-2">
                  <Crown className="w-4 h-4 text-yellow-500" />
                  <span className="text-xs font-medium text-yellow-600">Mejor posición</span>
                </div>
              )}
            </div>
          </BentoGridItem>
        ))}
      </BentoGrid>

      {/* Acciones Rápidas */}
      <BentoGrid className="grid-cols-1 md:grid-cols-6">
        <BentoGridItem
          title="Análisis Temporal"
          description="Monitoreo de posiciones a lo largo del tiempo y variabilidad"
          icon={<BarChart3 className="w-6 h-6" />}
          size="large"
          className="col-span-3"
          gradient="from-indigo-500 to-indigo-500/30"
          onClick={onViewTemporal}
          actionText="Ver evolución"
        >
          <div className="flex items-center gap-4 mt-4">
            <div className="text-center">
              <div className="text-lg font-bold text-indigo-500">7d</div>
              <div className="text-xs text-muted-foreground">Seguimiento</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-indigo-500">±2</div>
              <div className="text-xs text-muted-foreground">Variabilidad</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-indigo-500">87%</div>
              <div className="text-xs text-muted-foreground">Consistencia</div>
            </div>
          </div>
        </BentoGridItem>

        <BentoGridItem
          title="Comparación Detallada"
          description="Análisis profundo entre diferentes LLMs"
          icon={<Eye className="w-6 h-6" />}
          size="medium"
          className="col-span-3"
          gradient="from-teal-500 to-teal-500/30"
          onClick={onViewComparison}
          actionText="Comparar LLMs"
        >
          <div className="text-sm text-muted-foreground mt-4">
            Análisis detallado de {llmResults.length} modelos con métricas avanzadas
          </div>
        </BentoGridItem>
      </BentoGrid>
    </div>
  );
};

export default AEOMetricsGrid;