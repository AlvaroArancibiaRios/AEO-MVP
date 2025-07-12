"use client";

import React from 'react';
import { motion } from 'framer-motion';

// Import logos directly for URL access
import OpenAILogo from '../ui/Logos Llm/openai.svg?url';
import ClaudeLogo from '../ui/Logos Llm/claude-color.svg?url';
import GeminiLogo from '../ui/Logos Llm/gemini-color.svg?url';
import PerplexityLogo from '../ui/Logos Llm/perplexity-color.svg?url';
import DeepSeekLogo from '../ui/Logos Llm/deepseek-color.svg?url';
import { 
  MessageSquare, 
  Brain, 
  Sparkles, 
  Search, 
  Globe,
  TrendingUp,
  TrendingDown,
  Minus,
  Crown,
  Target,
  Activity,
  Star,
  Award,
  Zap
} from 'lucide-react';
import { BentoGrid, BentoGridItem } from '../ui/bento-grid';

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

interface AEOLLMComparisonGridProps {
  llmResults: LLMResult[];
  onSelectLLM?: (llm: string) => void;
  selectedLLM?: string | null;
}

const AEOLLMComparisonGrid: React.FC<AEOLLMComparisonGridProps> = ({
  llmResults,
  onSelectLLM,
  selectedLLM
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
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-blue-500';
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

  const getPositionBadge = (position: number) => {
    const colors = {
      1: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30',
      2: 'bg-gray-400/20 text-gray-600 border-gray-400/30',
      3: 'bg-orange-500/20 text-orange-600 border-orange-500/30',
      4: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
      5: 'bg-purple-500/20 text-purple-600 border-purple-500/30'
    };
    
    return colors[position as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  const getPerformanceLevel = (accuracy: number, mentions: number) => {
    const score = (accuracy * 0.6) + (mentions * 0.4);
    if (score >= 85) return { level: 'Excelente', color: 'text-green-500' };
    if (score >= 70) return { level: 'Bueno', color: 'text-blue-500' };
    if (score >= 55) return { level: 'Regular', color: 'text-yellow-500' };
    return { level: 'Bajo', color: 'text-red-500' };
  };

  return (
    <div className="space-y-8">
      {/* Top Performers */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-6">Ranking de Rendimiento</h3>
        <BentoGrid className="grid-cols-1 md:grid-cols-5 min-h-[280px]">
          {llmResults.map((llm, index) => {
            const performance = getPerformanceLevel(llm.accuracy, llm.mentions);
            const isSelected = selectedLLM === llm.name;
            
            return (
              <BentoGridItem
                key={llm.name}
                title={llm.name}
                description={`${llm.mentions} menciones • ${llm.accuracy}% precisión`}
                icon={React.createElement(llm.icon, { className: "w-6 h-6" })}
                logoUrl={getLLMLogoUrl(llm.name)}
                size="small"
                className={`col-span-1 ${isSelected ? 'ring-2 ring-primary border-primary/50' : ''}`}
                gradient="from-primary to-primary/30"
                onClick={() => onSelectLLM?.(llm.name)}
                actionText="Ver detalles"
              >
                <div className="space-y-3 mt-4">
                  {/* Position Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getPositionBadge(llm.position)}`}>
                      #{llm.position}
                    </div>
                    <div className="flex items-center gap-1">
                      {llm.position === 1 && <Crown className="w-4 h-4 text-yellow-500" />}
                      {getTrendIcon(llm.trending)}
                    </div>
                  </div>

                  {/* Performance Level */}
                  <div className="text-center">
                    <div className={`text-sm font-semibold ${performance.color}`}>
                      {performance.level}
                    </div>
                    <div className="text-xs text-muted-foreground">Rendimiento</div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-semibold text-foreground">{llm.relevance}%</div>
                      <div className="text-muted-foreground">Relevancia</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-foreground">{llm.citation_frequency}%</div>
                      <div className="text-muted-foreground">Citaciones</div>
                    </div>
                  </div>
                </div>
              </BentoGridItem>
            );
          })}
        </BentoGrid>
      </div>

      {/* Detailed Comparison */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-6">Análisis Comparativo Detallado</h3>
        <BentoGrid className="grid-cols-1 md:grid-cols-6 min-h-[220px]">
          {/* Best Accuracy */}
          <BentoGridItem
            title="Mayor Precisión"
            description={`${llmResults.reduce((best, current) => current.accuracy > best.accuracy ? current : best).name} lidera con ${Math.max(...llmResults.map(l => l.accuracy))}%`}
            icon={<Target className="w-6 h-6" />}
            size="medium"
            className="col-span-2 min-h-[200px]"
            gradient="from-green-500 to-green-500/30"
          >
            <div className="mt-4">
              <div className="text-2xl font-bold text-green-500">
                {Math.max(...llmResults.map(l => l.accuracy))}%
              </div>
              <div className="text-sm text-muted-foreground">
                Precisión promedio: {Math.round(llmResults.reduce((sum, l) => sum + l.accuracy, 0) / llmResults.length)}%
              </div>
            </div>
          </BentoGridItem>

          {/* Most Mentions */}
          <BentoGridItem
            title="Más Menciones"
            description={`${llmResults.reduce((best, current) => current.mentions > best.mentions ? current : best).name} con mayor presencia`}
            icon={<Activity className="w-6 h-6" />}
            size="medium"
            className="col-span-2"
            gradient="from-blue-500 to-blue-500/30"
          >
            <div className="mt-4">
              <div className="text-2xl font-bold text-blue-500">
                {Math.max(...llmResults.map(l => l.mentions))}
              </div>
              <div className="text-sm text-muted-foreground">
                Total menciones: {llmResults.reduce((sum, l) => sum + l.mentions, 0)}
              </div>
            </div>
          </BentoGridItem>

          {/* Best Sentiment */}
          <BentoGridItem
            title="Mejor Sentimiento"
            description={`${llmResults.filter(l => l.sentiment === 'positive').length} modelos con sentimiento positivo`}
            icon={<Star className="w-6 h-6" />}
            size="medium"
            className="col-span-2"
            gradient="from-purple-500 to-purple-500/30"
          >
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-green-500">Positivo</span>
                <span className="font-semibold text-green-500">
                  {llmResults.filter(l => l.sentiment === 'positive').length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-yellow-500">Neutral</span>
                <span className="font-semibold text-yellow-500">
                  {llmResults.filter(l => l.sentiment === 'neutral').length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-red-500">Negativo</span>
                <span className="font-semibold text-red-500">
                  {llmResults.filter(l => l.sentiment === 'negative').length}
                </span>
              </div>
            </div>
          </BentoGridItem>
        </BentoGrid>
      </div>

      {/* Context Quality Analysis */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-6">Análisis de Calidad de Contexto</h3>
        <BentoGrid className="grid-cols-1 md:grid-cols-3">
          {llmResults.slice(0, 3).map((llm) => (
            <BentoGridItem
              key={`context-${llm.name}`}
              title={`${llm.name} - Contexto`}
              description={llm.context_quality}
              icon={<llm.icon className="w-6 h-6" />}
              size="medium"
              className="col-span-1"
              gradient="from-primary to-primary/30"
            >
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Calidad</span>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    llm.position <= 2 ? 'bg-green-500/20 text-green-600' :
                    llm.position <= 3 ? 'bg-yellow-500/20 text-yellow-600' :
                    'bg-red-500/20 text-red-600'
                  }`}>
                    {llm.position <= 2 ? 'Excelente' : llm.position <= 3 ? 'Buena' : 'Regular'}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Citaciones</span>
                  <span className="text-sm font-semibold text-foreground">
                    {llm.citation_frequency}%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Relevancia</span>
                  <span className={`text-sm font-semibold ${getScoreColor(llm.relevance)}`}>
                    {llm.relevance}%
                  </span>
                </div>
              </div>
            </BentoGridItem>
          ))}
        </BentoGrid>
      </div>

      {/* Trending Analysis */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-6">Análisis de Tendencias</h3>
        <BentoGrid className="grid-cols-1 md:grid-cols-4">
          <BentoGridItem
            title="Mejorando"
            description={`${llmResults.filter(l => l.trending === 'up').length} modelos en tendencia ascendente`}
            icon={<TrendingUp className="w-6 h-6" />}
            size="small"
            className="col-span-1"
            gradient="from-green-500 to-green-500/30"
          >
            <div className="mt-4">
              <div className="text-2xl font-bold text-green-500">
                {llmResults.filter(l => l.trending === 'up').length}
              </div>
              {llmResults.filter(l => l.trending === 'up').map(llm => (
                <div key={llm.name} className="text-xs text-muted-foreground">
                  {llm.name}
                </div>
              ))}
            </div>
          </BentoGridItem>

          <BentoGridItem
            title="Estable"
            description={`${llmResults.filter(l => l.trending === 'stable').length} modelos mantienen posición`}
            icon={<Minus className="w-6 h-6" />}
            size="small"
            className="col-span-1"
            gradient="from-yellow-500 to-yellow-500/30"
          >
            <div className="mt-4">
              <div className="text-2xl font-bold text-yellow-500">
                {llmResults.filter(l => l.trending === 'stable').length}
              </div>
              {llmResults.filter(l => l.trending === 'stable').map(llm => (
                <div key={llm.name} className="text-xs text-muted-foreground">
                  {llm.name}
                </div>
              ))}
            </div>
          </BentoGridItem>

          <BentoGridItem
            title="Bajando"
            description={`${llmResults.filter(l => l.trending === 'down').length} modelos en tendencia descendente`}
            icon={<TrendingDown className="w-6 h-6" />}
            size="small"
            className="col-span-1"
            gradient="from-red-500 to-red-500/30"
          >
            <div className="mt-4">
              <div className="text-2xl font-bold text-red-500">
                {llmResults.filter(l => l.trending === 'down').length}
              </div>
              {llmResults.filter(l => l.trending === 'down').map(llm => (
                <div key={llm.name} className="text-xs text-muted-foreground">
                  {llm.name}
                </div>
              ))}
            </div>
          </BentoGridItem>

          <BentoGridItem
            title="Oportunidades"
            description="Áreas de mejora identificadas"
            icon={<Zap className="w-6 h-6" />}
            size="small"
            className="col-span-1"
            gradient="from-indigo-500 to-indigo-500/30"
          >
            <div className="mt-4 space-y-1 text-xs">
              <div className="text-muted-foreground">• Mejorar citaciones</div>
              <div className="text-muted-foreground">• Optimizar contexto</div>
              <div className="text-muted-foreground">• Aumentar relevancia</div>
            </div>
          </BentoGridItem>
        </BentoGrid>
      </div>
    </div>
  );
};

export default AEOLLMComparisonGrid;