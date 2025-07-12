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

      {/* Enhanced Competitor Ranking */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-6">Ranking Detallado - {selectedLLM}</h3>
        
        {/* Podium Top 3 */}
        <div className="mb-8">
          <div className="flex items-end justify-center gap-6 mb-8">
            {/* Second Place */}
            {currentLLMData.competitors[1] && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="w-24 h-20 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-lg flex items-center justify-center relative mb-4">
                  <div className="absolute -top-8 w-16 h-16 bg-card border-4 border-gray-400 rounded-full flex items-center justify-center shadow-lg">
                    <img 
                      src={getLLMLogoUrl('ChatGPT')} 
                      alt="Logo"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div className="absolute bottom-2 text-white font-bold text-lg">2</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-foreground text-sm">
                    {currentLLMData.competitors[1].name === currentBrand ? 'Tu Marca' : currentLLMData.competitors[1].name}
                  </div>
                  <div className="text-xs text-muted-foreground">{currentLLMData.competitors[1].mentions} menciones</div>
                  <div className="text-xs font-medium text-gray-500">{currentLLMData.competitors[1].marketShare}% share</div>
                </div>
              </motion.div>
            )}

            {/* First Place */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="w-28 h-24 bg-gradient-to-t from-yellow-500 to-yellow-400 rounded-t-lg flex items-center justify-center relative mb-4">
                <div className="absolute -top-10 w-20 h-20 bg-card border-4 border-yellow-500 rounded-full flex items-center justify-center shadow-xl">
                  <Crown className="w-10 h-10 text-yellow-500" />
                </div>
                <div className="absolute bottom-2 text-white font-bold text-xl">1</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-foreground">
                  {currentLLMData.competitors[0].name === currentBrand ? 'Tu Marca' : currentLLMData.competitors[0].name}
                </div>
                <div className="text-sm text-muted-foreground">{currentLLMData.competitors[0].mentions} menciones</div>
                <div className="text-sm font-medium text-yellow-600">{currentLLMData.competitors[0].marketShare}% share</div>
              </div>
            </motion.div>

            {/* Third Place */}
            {currentLLMData.competitors[2] && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-16 bg-gradient-to-t from-orange-600 to-orange-500 rounded-t-lg flex items-center justify-center relative mb-4">
                  <div className="absolute -top-6 w-14 h-14 bg-card border-4 border-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Medal className="w-7 h-7 text-orange-500" />
                  </div>
                  <div className="absolute bottom-2 text-white font-bold">3</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-foreground text-sm">
                    {currentLLMData.competitors[2].name === currentBrand ? 'Tu Marca' : currentLLMData.competitors[2].name}
                  </div>
                  <div className="text-xs text-muted-foreground">{currentLLMData.competitors[2].mentions} menciones</div>
                  <div className="text-xs font-medium text-orange-600">{currentLLMData.competitors[2].marketShare}% share</div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Enhanced Cards Layout */}
        <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-[400px]">
          {currentLLMData.competitors.map((competitor, index) => {
            const isCurrentBrand = competitor.name === currentBrand;
            const isExpanded = expandedCompetitor === competitor.name;
            
            return (
              <motion.div
                key={competitor.name}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.15, duration: 0.4 }}
                className="col-span-1"
              >
                <BentoGridItem
                  title=""
                  description=""
                  icon={<span />}
                  size="medium"
                  className={`min-h-[320px] cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                    isCurrentBrand ? 'ring-2 ring-primary/50 bg-primary/5' : ''
                  } ${isExpanded ? 'shadow-lg' : ''}`}
                  gradient={isCurrentBrand ? "from-primary/20 to-primary/5" : "from-slate-500/20 to-slate-500/5"}
                  onClick={() => setExpandedCompetitor(isExpanded ? null : competitor.name)}
                >
                  <div className="h-full flex flex-col">
                    {/* Header with Position */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold border-2 ${getPositionBadge(competitor.position)}`}>
                          {getPositionIcon(competitor.position)}
                        </div>
                        <div className="text-2xl font-bold text-muted-foreground">
                          #{competitor.position}
                        </div>
                      </div>
                      
                      {isCurrentBrand && (
                        <div className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full border border-primary/30">
                          Tu Marca
                        </div>
                      )}
                    </div>

                    {/* Brand Info */}
                    <div className="mb-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-2xl flex items-center justify-center border-2 border-border/50">
                        <Building className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className={`text-lg font-bold mb-1 ${isCurrentBrand ? 'text-primary' : 'text-foreground'}`}>
                        {competitor.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{competitor.domain}</p>
                    </div>

                    {/* Main Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-muted/20 rounded-xl">
                        <div className="text-2xl font-bold text-foreground">{competitor.mentions}</div>
                        <div className="text-xs text-muted-foreground">Menciones</div>
                      </div>
                      <div className="text-center p-3 bg-muted/20 rounded-xl">
                        <div className="text-2xl font-bold text-foreground">{competitor.marketShare}%</div>
                        <div className="text-xs text-muted-foreground">Market Share</div>
                      </div>
                    </div>

                    {/* Market Share Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-muted-foreground mb-2">
                        <span>Participación de Mercado</span>
                        <span>{competitor.marketShare}%</span>
                      </div>
                      <div className="w-full bg-muted/30 rounded-full h-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${competitor.marketShare}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                          className={`h-2 rounded-full ${
                            competitor.position === 1 ? 'bg-yellow-500' :
                            competitor.position === 2 ? 'bg-gray-400' :
                            competitor.position === 3 ? 'bg-orange-500' :
                            isCurrentBrand ? 'bg-primary' : 'bg-slate-500'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Trend */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground">Tendencia</span>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(competitor.trend)}
                        <span className={`text-sm font-semibold ${
                          competitor.growth > 0 ? 'text-green-500' : 
                          competitor.growth < 0 ? 'text-red-500' : 'text-yellow-500'
                        }`}>
                          {competitor.growth > 0 ? '+' : ''}{competitor.growth}%
                        </span>
                      </div>
                    </div>

                    {/* Expand Button */}
                    <div className="mt-auto pt-4 border-t border-border/50">
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <span>{isExpanded ? 'Menos detalles' : 'Ver detalles'}</span>
                        {isExpanded ? 
                          <ChevronUp className="w-4 h-4" /> : 
                          <ChevronDown className="w-4 h-4" />
                        }
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-border/50 space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="text-center p-2 bg-card/50 rounded-lg">
                                <div className="text-lg font-bold text-foreground">{competitor.accuracy}%</div>
                                <div className="text-xs text-muted-foreground">Precisión</div>
                              </div>
                              <div className="text-center p-2 bg-card/50 rounded-lg">
                                <div className="text-sm font-semibold text-foreground">{competitor.category}</div>
                                <div className="text-xs text-muted-foreground">Categoría</div>
                              </div>
                            </div>
                            
                            <div className="text-center p-3 bg-gradient-to-r from-muted/20 to-muted/10 rounded-lg">
                              <div className="text-xs text-muted-foreground mb-1">Estado Competitivo</div>
                              <div className={`font-semibold ${
                                competitor.trend === 'up' ? 'text-green-500' : 
                                competitor.trend === 'down' ? 'text-red-500' : 'text-yellow-500'
                              }`}>
                                {competitor.trend === 'up' ? '🚀 En crecimiento' : 
                                 competitor.trend === 'down' ? '📉 Perdiendo terreno' : '➡️ Posición estable'}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </BentoGridItem>
              </motion.div>
            );
          })}
        </BentoGrid>
      </div>
    </div>
  );
};

export default AEOCompetitorRanking;