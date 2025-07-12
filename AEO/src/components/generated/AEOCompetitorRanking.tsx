"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BentoGrid, BentoGridItem } from '../ui/bento-grid';
import { 
  Crown,
  Trophy,
  Medal,
  TrendingUp,
  TrendingDown,
  Target,
  Users,
  Building,
  Star,
  Award,
  Zap,
  Eye,
  ArrowUp,
  ArrowDown,
  Minus,
  Filter,
  ChevronDown,
  ChevronUp,
  BarChart3
} from 'lucide-react';

// Import logos
import OpenAILogo from '../ui/Logos Llm/openai.svg?url';
import ClaudeLogo from '../ui/Logos Llm/claude-color.svg?url';
import GeminiLogo from '../ui/Logos Llm/gemini-color.svg?url';
import PerplexityLogo from '../ui/Logos Llm/perplexity-color.svg?url';
import DeepSeekLogo from '../ui/Logos Llm/deepseek-color.svg?url';

interface CompetitorBrand {
  name: string;
  domain: string;
  mentions: number;
  position: number;
  accuracy: number;
  growth: number;
  marketShare: number;
  category: string;
  trend: 'up' | 'down' | 'stable';
}

interface LLMCompetitorData {
  llmName: string;
  llmIcon: React.ElementType;
  competitors: CompetitorBrand[];
  totalBrands: number;
  avgPosition: number;
  marketDominance: number;
}

interface AEOCompetitorRankingProps {
  currentBrand: string;
  currentWebsite: string;
  query: string;
}

const AEOCompetitorRanking: React.FC<AEOCompetitorRankingProps> = ({ 
  currentBrand, 
  currentWebsite, 
  query 
}) => {
  const [selectedLLM, setSelectedLLM] = useState<string>('ChatGPT');
  const [expandedCompetitor, setExpandedCompetitor] = useState<string | null>(null);

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

  // Mock competitor data for different LLMs
  const competitorData: LLMCompetitorData[] = [
    {
      llmName: 'ChatGPT',
      llmIcon: Eye,
      competitors: [
        {
          name: 'TechCorp Solutions',
          domain: 'techcorp.com',
          mentions: 8,
          position: 1,
          accuracy: 96,
          growth: 15,
          marketShare: 32,
          category: 'Tecnología',
          trend: 'up'
        },
        {
          name: 'InnovateLab',
          domain: 'innovatelab.io',
          mentions: 6,
          position: 2,
          accuracy: 92,
          growth: 8,
          marketShare: 24,
          category: 'Tecnología',
          trend: 'stable'
        },
        {
          name: 'NextGen Industries',
          domain: 'nextgen.com',
          mentions: 4,
          position: 3,
          accuracy: 89,
          growth: -5,
          marketShare: 16,
          category: 'Manufactura',
          trend: 'down'
        },
        {
          name: currentBrand,
          domain: currentWebsite,
          mentions: 3,
          position: 4,
          accuracy: 87,
          growth: 12,
          marketShare: 12,
          category: 'Tecnología',
          trend: 'up'
        },
        {
          name: 'GlobalTech Partners',
          domain: 'globaltech.net',
          mentions: 2,
          position: 5,
          accuracy: 85,
          growth: 3,
          marketShare: 8,
          category: 'Consultoría',
          trend: 'stable'
        }
      ],
      totalBrands: 25,
      avgPosition: 3.2,
      marketDominance: 78
    },
    {
      llmName: 'Claude',
      llmIcon: Eye,
      competitors: [
        {
          name: 'InnovateLab',
          domain: 'innovatelab.io',
          mentions: 7,
          position: 1,
          accuracy: 94,
          growth: 18,
          marketShare: 35,
          category: 'Tecnología',
          trend: 'up'
        },
        {
          name: currentBrand,
          domain: currentWebsite,
          mentions: 5,
          position: 2,
          accuracy: 91,
          growth: 22,
          marketShare: 25,
          category: 'Tecnología',
          trend: 'up'
        },
        {
          name: 'TechCorp Solutions',
          domain: 'techcorp.com',
          mentions: 4,
          position: 3,
          accuracy: 88,
          growth: 5,
          marketShare: 20,
          category: 'Tecnología',
          trend: 'stable'
        },
        {
          name: 'NextGen Industries',
          domain: 'nextgen.com',
          mentions: 3,
          position: 4,
          accuracy: 86,
          growth: -8,
          marketShare: 15,
          category: 'Manufactura',
          trend: 'down'
        },
        {
          name: 'GlobalTech Partners',
          domain: 'globaltech.net',
          mentions: 1,
          position: 5,
          accuracy: 82,
          growth: -2,
          marketShare: 5,
          category: 'Consultoría',
          trend: 'down'
        }
      ],
      totalBrands: 22,
      avgPosition: 2.8,
      marketDominance: 82
    },
    {
      llmName: 'Gemini',
      llmIcon: Eye,
      competitors: [
        {
          name: 'NextGen Industries',
          domain: 'nextgen.com',
          mentions: 6,
          position: 1,
          accuracy: 93,
          growth: 25,
          marketShare: 40,
          category: 'Manufactura',
          trend: 'up'
        },
        {
          name: 'TechCorp Solutions',
          domain: 'techcorp.com',
          mentions: 4,
          position: 2,
          accuracy: 89,
          growth: 10,
          marketShare: 27,
          category: 'Tecnología',
          trend: 'up'
        },
        {
          name: 'GlobalTech Partners',
          domain: 'globaltech.net',
          mentions: 3,
          position: 3,
          accuracy: 85,
          growth: 8,
          marketShare: 20,
          category: 'Consultoría',
          trend: 'stable'
        },
        {
          name: currentBrand,
          domain: currentWebsite,
          mentions: 2,
          position: 4,
          accuracy: 83,
          growth: 15,
          marketShare: 13,
          category: 'Tecnología',
          trend: 'up'
        }
      ],
      totalBrands: 18,
      avgPosition: 3.5,
      marketDominance: 75
    },
    {
      llmName: 'Perplexity',
      llmIcon: Eye,
      competitors: [
        {
          name: currentBrand,
          domain: currentWebsite,
          mentions: 8,
          position: 1,
          accuracy: 95,
          growth: 35,
          marketShare: 42,
          category: 'Tecnología',
          trend: 'up'
        },
        {
          name: 'InnovateLab',
          domain: 'innovatelab.io',
          mentions: 5,
          position: 2,
          accuracy: 91,
          growth: 12,
          marketShare: 26,
          category: 'Tecnología',
          trend: 'stable'
        },
        {
          name: 'TechCorp Solutions',
          domain: 'techcorp.com',
          mentions: 3,
          position: 3,
          accuracy: 87,
          growth: -3,
          marketShare: 16,
          category: 'Tecnología',
          trend: 'down'
        },
        {
          name: 'NextGen Industries',
          domain: 'nextgen.com',
          mentions: 2,
          position: 4,
          accuracy: 84,
          growth: 2,
          marketShare: 11,
          category: 'Manufactura',
          trend: 'stable'
        },
        {
          name: 'GlobalTech Partners',
          domain: 'globaltech.net',
          mentions: 1,
          position: 5,
          accuracy: 80,
          growth: -10,
          marketShare: 5,
          category: 'Consultoría',
          trend: 'down'
        }
      ],
      totalBrands: 19,
      avgPosition: 1.8,
      marketDominance: 88
    },
    {
      llmName: 'DeepSpeak',
      llmIcon: Eye,
      competitors: [
        {
          name: 'GlobalTech Partners',
          domain: 'globaltech.net',
          mentions: 5,
          position: 1,
          accuracy: 90,
          growth: 20,
          marketShare: 38,
          category: 'Consultoría',
          trend: 'up'
        },
        {
          name: 'TechCorp Solutions',
          domain: 'techcorp.com',
          mentions: 3,
          position: 2,
          accuracy: 86,
          growth: 5,
          marketShare: 23,
          category: 'Tecnología',
          trend: 'stable'
        },
        {
          name: currentBrand,
          domain: currentWebsite,
          mentions: 2,
          position: 3,
          accuracy: 84,
          growth: 8,
          marketShare: 15,
          category: 'Tecnología',
          trend: 'up'
        },
        {
          name: 'InnovateLab',
          domain: 'innovatelab.io',
          mentions: 2,
          position: 4,
          accuracy: 82,
          growth: -5,
          marketShare: 15,
          category: 'Tecnología',
          trend: 'down'
        },
        {
          name: 'NextGen Industries',
          domain: 'nextgen.com',
          mentions: 1,
          position: 5,
          accuracy: 78,
          growth: -12,
          marketShare: 8,
          category: 'Manufactura',
          trend: 'down'
        }
      ],
      totalBrands: 15,
      avgPosition: 3.7,
      marketDominance: 70
    }
  ];

  const currentLLMData = competitorData.find(data => data.llmName === selectedLLM) || competitorData[0];
  const currentBrandData = currentLLMData.competitors.find(comp => comp.name === currentBrand);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-yellow-500" />;
      default: return <Minus className="w-4 h-4" />;
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

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="w-4 h-4 text-yellow-500" />;
      case 2: return <Trophy className="w-4 h-4 text-gray-500" />;
      case 3: return <Medal className="w-4 h-4 text-orange-500" />;
      default: return <Target className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* LLM Selection and Current Brand Position */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-6">Ranking de Marcas Competidoras por LLM</h3>
        <BentoGrid className="grid-cols-1 md:grid-cols-8 min-h-[280px]">
          {/* LLM Selector */}
          <BentoGridItem
            title="Seleccionar Modelo"
            description="Elige el LLM para ver el ranking competitivo"
            icon={<Filter className="w-6 h-6" />}
            size="medium"
            className="col-span-2 min-h-[260px]"
            gradient="from-indigo-500 to-indigo-500/30"
          >
            <div className="mt-4 space-y-2">
              {competitorData.map((llmData) => (
                <button
                  key={llmData.llmName}
                  onClick={() => setSelectedLLM(llmData.llmName)}
                  className={`w-full p-3 rounded-lg border transition-all text-left ${
                    selectedLLM === llmData.llmName
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border/50 hover:border-primary/50 bg-muted/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={getLLMLogoUrl(llmData.llmName)} 
                      alt={`${llmData.llmName} logo`}
                      className="w-6 h-6 object-contain"
                    />
                    <div>
                      <div className="font-medium">{llmData.llmName}</div>
                      <div className="text-xs text-muted-foreground">
                        {llmData.totalBrands} marcas analizadas
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </BentoGridItem>

          {/* Current Brand Position */}
          <BentoGridItem
            title={`Tu Posición en ${selectedLLM}`}
            description={`${currentBrand} en "${query}"`}
            icon={<Building className="w-6 h-6" />}
            size="large"
            className="col-span-4 min-h-[260px]"
            gradient="from-primary to-primary/30"
          >
            {currentBrandData ? (
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-center">
                  <div className={`px-4 py-2 rounded-full text-lg font-bold border ${getPositionBadge(currentBrandData.position)}`}>
                    #{currentBrandData.position}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-foreground">{currentBrandData.mentions}</div>
                    <div className="text-xs text-muted-foreground">Menciones</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{currentBrandData.marketShare}%</div>
                    <div className="text-xs text-muted-foreground">Market Share</div>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${currentBrandData.growth > 0 ? 'text-green-500' : currentBrandData.growth < 0 ? 'text-red-500' : 'text-yellow-500'}`}>
                      {currentBrandData.growth > 0 ? '+' : ''}{currentBrandData.growth}%
                    </div>
                    <div className="text-xs text-muted-foreground">Crecimiento</div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  {getTrendIcon(currentBrandData.trend)}
                  <span className="text-sm font-medium text-muted-foreground">
                    Tendencia {currentBrandData.trend === 'up' ? 'Positiva' : currentBrandData.trend === 'down' ? 'Negativa' : 'Estable'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="mt-4 text-center text-muted-foreground">
                Tu marca no aparece en el top 5 de {selectedLLM}
              </div>
            )}
          </BentoGridItem>

          {/* Market Overview */}
          <BentoGridItem
            title="Vista General del Mercado"
            description={`Análisis competitivo en ${selectedLLM}`}
            icon={<BarChart3 className="w-6 h-6" />}
            size="medium"
            className="col-span-2 min-h-[260px]"
            gradient="from-teal-500 to-teal-500/30"
          >
            <div className="mt-4 space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-500">{currentLLMData.totalBrands}</div>
                <div className="text-xs text-muted-foreground">Marcas Total</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Posición Promedio</span>
                  <span className="text-sm font-semibold text-foreground">
                    {currentLLMData.avgPosition}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Dominancia</span>
                  <span className="text-sm font-semibold text-foreground">
                    {currentLLMData.marketDominance}%
                  </span>
                </div>
              </div>
            </div>
          </BentoGridItem>
        </BentoGrid>
      </div>

      {/* Detailed Competitor Ranking */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-6">Ranking Detallado - {selectedLLM}</h3>
        <BentoGrid className="grid-cols-1 min-h-[400px]">
          <BentoGridItem
            title="Top Competidores"
            description={`Las marcas mejor posicionadas en ${selectedLLM} para "${query}"`}
            icon={<Trophy className="w-6 h-6" />}
            size="large"
            className="col-span-1 min-h-[380px]"
            gradient="from-gradient-start to-gradient-end"
          >
            <div className="mt-6 space-y-3">
              {currentLLMData.competitors.map((competitor, index) => {
                const isCurrentBrand = competitor.name === currentBrand;
                const isExpanded = expandedCompetitor === competitor.name;
                
                return (
                  <motion.div
                    key={competitor.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border transition-all ${
                      isCurrentBrand 
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                        : 'border-border/50 bg-muted/20 hover:bg-muted/40'
                    }`}
                  >
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setExpandedCompetitor(isExpanded ? null : competitor.name)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {getPositionIcon(competitor.position)}
                          <div className={`px-2 py-1 rounded text-xs font-bold border ${getPositionBadge(competitor.position)}`}>
                            #{competitor.position}
                          </div>
                        </div>
                        
                        <div>
                          <div className={`font-semibold ${isCurrentBrand ? 'text-primary' : 'text-foreground'}`}>
                            {competitor.name}
                            {isCurrentBrand && <span className="ml-2 text-xs text-primary">(Tu marca)</span>}
                          </div>
                          <div className="text-sm text-muted-foreground">{competitor.domain}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-semibold text-foreground">{competitor.mentions} menciones</div>
                          <div className="text-sm text-muted-foreground">{competitor.marketShare}% share</div>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          {getTrendIcon(competitor.trend)}
                          <span className={`text-sm font-medium ${
                            competitor.growth > 0 ? 'text-green-500' : 
                            competitor.growth < 0 ? 'text-red-500' : 'text-yellow-500'
                          }`}>
                            {competitor.growth > 0 ? '+' : ''}{competitor.growth}%
                          </span>
                        </div>
                        
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t border-border/50"
                        >
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div className="text-center">
                              <div className="font-semibold text-foreground">{competitor.accuracy}%</div>
                              <div className="text-xs text-muted-foreground">Precisión</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-foreground">{competitor.category}</div>
                              <div className="text-xs text-muted-foreground">Categoría</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-foreground">{competitor.marketShare}%</div>
                              <div className="text-xs text-muted-foreground">Participación</div>
                            </div>
                            <div className="text-center">
                              <div className={`font-semibold ${
                                competitor.trend === 'up' ? 'text-green-500' : 
                                competitor.trend === 'down' ? 'text-red-500' : 'text-yellow-500'
                              }`}>
                                {competitor.trend === 'up' ? 'Creciendo' : 
                                 competitor.trend === 'down' ? 'Bajando' : 'Estable'}
                              </div>
                              <div className="text-xs text-muted-foreground">Estado</div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </BentoGridItem>
        </BentoGrid>
      </div>
    </div>
  );
};

export default AEOCompetitorRanking;