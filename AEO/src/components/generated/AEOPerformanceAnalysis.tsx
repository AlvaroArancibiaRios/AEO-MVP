"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BentoGrid, BentoGridItem } from '../ui/bento-grid';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Activity, 
  BarChart3, 
  Clock,
  Zap,
  Star,
  Award,
  Gauge,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

// Import logos
import OpenAILogo from '../ui/Logos Llm/openai.svg?url';
import ClaudeLogo from '../ui/Logos Llm/claude-color.svg?url';
import GeminiLogo from '../ui/Logos Llm/gemini-color.svg?url';
import PerplexityLogo from '../ui/Logos Llm/perplexity-color.svg?url';
import DeepSeekLogo from '../ui/Logos Llm/deepseek-color.svg?url';

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

interface PerformanceMetrics {
  responseTime: number;
  consistency: number;
  qualityScore: number;
  reliabilityIndex: number;
  userSatisfaction: number;
  technicalScore: number;
}

interface AEOPerformanceAnalysisProps {
  llmResults: LLMResult[];
}

const AEOPerformanceAnalysis: React.FC<AEOPerformanceAnalysisProps> = ({ llmResults }) => {
  
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
      'You.com': GeminiLogo,
    };
    return logoMap[name];
  };

  // Generate performance metrics for each LLM
  const getPerformanceMetrics = (llm: LLMResult): PerformanceMetrics => {
    const baseScore = llm.accuracy;
    return {
      responseTime: Math.round(Math.random() * 3 + 0.5), // 0.5-3.5s
      consistency: Math.round(baseScore + Math.random() * 10 - 5), // ±5 from accuracy
      qualityScore: Math.round(llm.relevance + Math.random() * 10 - 5),
      reliabilityIndex: Math.round(baseScore + (llm.citation_frequency * 0.2)),
      userSatisfaction: Math.round(85 + Math.random() * 15), // 85-100%
      technicalScore: Math.round(baseScore + (llm.position > 3 ? -10 : 10))
    };
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-yellow-500" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-blue-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return { level: 'Excelente', color: 'bg-green-500/20 text-green-600 border-green-500/30' };
    if (score >= 80) return { level: 'Muy Bueno', color: 'bg-blue-500/20 text-blue-600 border-blue-500/30' };
    if (score >= 70) return { level: 'Bueno', color: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30' };
    if (score >= 60) return { level: 'Regular', color: 'bg-orange-500/20 text-orange-600 border-orange-500/30' };
    return { level: 'Necesita Mejora', color: 'bg-red-500/20 text-red-600 border-red-500/30' };
  };

  return (
    <div className="space-y-8">
      {/* Performance Overview */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-6">Análisis de Performance por Modelo</h3>
        <BentoGrid className="grid-cols-1 md:grid-cols-5 min-h-[320px]">
          {llmResults.map((llm) => {
            const metrics = getPerformanceMetrics(llm);
            const overallScore = Math.round((llm.accuracy + metrics.consistency + metrics.qualityScore) / 3);
            const performanceLevel = getPerformanceLevel(overallScore);

            return (
              <BentoGridItem
                key={`performance-${llm.name}`}
                title={llm.name}
                description={`Score general: ${overallScore}%`}
                icon={React.createElement(llm.icon, { className: "w-6 h-6" })}
                logoUrl={getLLMLogoUrl(llm.name)}
                size="small"
                className="col-span-1 min-h-[300px]"
                gradient="from-primary to-primary/30"
              >
                <div className="space-y-4 mt-4">
                  {/* Performance Level Badge */}
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${performanceLevel.color} text-center`}>
                    {performanceLevel.level}
                  </div>

                  {/* Key Metrics */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Target className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Precisión</span>
                      </div>
                      <span className={`text-xs font-semibold ${getScoreColor(llm.accuracy)}`}>
                        {llm.accuracy}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Gauge className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Consistencia</span>
                      </div>
                      <span className={`text-xs font-semibold ${getScoreColor(metrics.consistency)}`}>
                        {metrics.consistency}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Respuesta</span>
                      </div>
                      <span className="text-xs font-semibold text-foreground">
                        {metrics.responseTime}s
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Calidad</span>
                      </div>
                      <span className={`text-xs font-semibold ${getScoreColor(metrics.qualityScore)}`}>
                        {metrics.qualityScore}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Activity className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Tendencia</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(llm.trending)}
                        <span className="text-xs font-semibold text-muted-foreground">
                          {llm.trending === 'up' ? 'Subiendo' : llm.trending === 'down' ? 'Bajando' : 'Estable'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Performance Bar */}
                  <div className="mt-4">
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${overallScore}%` }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className={`h-2 rounded-full ${
                          overallScore >= 90 ? 'bg-green-500' :
                          overallScore >= 80 ? 'bg-blue-500' :
                          overallScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                      />
                    </div>
                    <div className="text-center text-xs text-muted-foreground mt-1">
                      Score: {overallScore}%
                    </div>
                  </div>
                </div>
              </BentoGridItem>
            );
          })}
        </BentoGrid>
      </div>

      {/* Performance Comparison Charts */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-6">Comparativa de Métricas Clave</h3>
        <BentoGrid className="grid-cols-1 md:grid-cols-4 min-h-[240px]">
          {/* Best Accuracy */}
          <BentoGridItem
            title="Mejor Precisión"
            description="Modelo con mayor exactitud"
            icon={<Target className="w-6 h-6" />}
            size="small"
            className="col-span-1 min-h-[220px]"
            gradient="from-green-500 to-green-500/30"
          >
            <div className="mt-4 text-center">
              <div className="text-3xl font-bold text-green-500">
                {Math.max(...llmResults.map(l => l.accuracy))}%
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {llmResults.reduce((best, current) => current.accuracy > best.accuracy ? current : best).name}
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Promedio: {Math.round(llmResults.reduce((sum, l) => sum + l.accuracy, 0) / llmResults.length)}%
              </div>
            </div>
          </BentoGridItem>

          {/* Fastest Response */}
          <BentoGridItem
            title="Respuesta Más Rápida"
            description="Menor tiempo de procesamiento"
            icon={<Zap className="w-6 h-6" />}
            size="small"
            className="col-span-1 min-h-[220px]"
            gradient="from-blue-500 to-blue-500/30"
          >
            <div className="mt-4 text-center">
              <div className="text-3xl font-bold text-blue-500">
                0.8s
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Perplexity
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Promedio: 1.4s
              </div>
            </div>
          </BentoGridItem>

          {/* Best Consistency */}
          <BentoGridItem
            title="Mayor Consistencia"
            description="Resultados más estables"
            icon={<Gauge className="w-6 h-6" />}
            size="small"
            className="col-span-1 min-h-[220px]"
            gradient="from-purple-500 to-purple-500/30"
          >
            <div className="mt-4 text-center">
              <div className="text-3xl font-bold text-purple-500">
                96%
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                ChatGPT
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Variación: ±2 posiciones
              </div>
            </div>
          </BentoGridItem>

          {/* Best Overall */}
          <BentoGridItem
            title="Mejor General"
            description="Puntuación combinada más alta"
            icon={<Award className="w-6 h-6" />}
            size="small"
            className="col-span-1 min-h-[220px]"
            gradient="from-yellow-500 to-yellow-500/30"
          >
            <div className="mt-4 text-center">
              <div className="text-3xl font-bold text-yellow-500">
                {Math.round((llmResults[0].accuracy + 95 + llmResults[0].relevance) / 3)}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {llmResults[0].name}
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Score combinado
              </div>
            </div>
          </BentoGridItem>
        </BentoGrid>
      </div>
    </div>
  );
};

export default AEOPerformanceAnalysis;