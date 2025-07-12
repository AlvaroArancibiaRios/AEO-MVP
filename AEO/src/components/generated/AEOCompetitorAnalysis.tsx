"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft,
  Users,
  TrendingUp,
  TrendingDown,
  Crown,
  Target,
  Zap,
  Brain,
  Search,
  Eye,
  Trophy,
  Sword,
  Shield,
  Radar,
  BarChart3,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Plus,
  Info,
  AlertTriangle,
  CheckCircle,
  X,
  Sparkles,
  Bot,
  MessageSquare,
  Globe,
  Star,
  Activity
} from 'lucide-react';

interface QueryData {
  brand: string;
  query: string;
  website: string;
  screenshot?: string;
}

interface AEOCompetitorAnalysisProps {
  queryData: QueryData;
  onBack: () => void;
}

interface CompetitorMetrics {
  name: string;
  website: string;
  logo?: string;
  overall_score: number;
  llm_presence: {
    chatgpt_mentions: number;
    claude_coverage: number;
    gemini_ranking: number;
    perplexity_citations: number;
  };
  brand_strength: {
    entity_recognition: number;
    knowledge_graph: number;
    citation_quality: number;
    factual_consistency: number;
  };
  content_optimization: {
    answer_format: number;
    snippet_potential: number;
    voice_readiness: number;
    structured_data: number;
  };
  market_position: 'leader' | 'challenger' | 'follower' | 'niche';
  competitive_advantages: string[];
  weaknesses: string[];
  opportunities_vs_us: string[];
}

interface CompetitiveLandscape {
  your_brand: CompetitorMetrics;
  competitors: CompetitorMetrics[];
  market_insights: {
    total_market_mentions: number;
    your_market_share: number;
    growth_trend: 'up' | 'down' | 'stable';
    key_battlegrounds: string[];
    emerging_threats: string[];
    white_space_opportunities: string[];
  };
  recommendations: {
    immediate_actions: string[];
    strategic_moves: string[];
    defensive_strategies: string[];
  };
}

const AEOCompetitorAnalysis: React.FC<AEOCompetitorAnalysisProps> = ({ queryData, onBack }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<CompetitiveLandscape | null>(null);
  const [activeView, setActiveView] = useState<'overview' | 'detailed' | 'opportunities'>('overview');
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null);

  useEffect(() => {
    startCompetitiveAnalysis();
  }, [queryData]);

  const startCompetitiveAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate comprehensive competitive intelligence
    setTimeout(() => {
      const mockResult: CompetitiveLandscape = {
        your_brand: {
          name: queryData.brand,
          website: queryData.website,
          overall_score: 78,
          llm_presence: {
            chatgpt_mentions: 85,
            claude_coverage: 72,
            gemini_ranking: 80,
            perplexity_citations: 68
          },
          brand_strength: {
            entity_recognition: 82,
            knowledge_graph: 75,
            citation_quality: 88,
            factual_consistency: 90
          },
          content_optimization: {
            answer_format: 70,
            snippet_potential: 85,
            voice_readiness: 65,
            structured_data: 72
          },
          market_position: 'challenger',
          competitive_advantages: [
            'Fuerte presencia en ChatGPT',
            'Alta calidad de citaciones',
            'Consistencia factual superior',
            'Buen potencial para snippets'
          ],
          weaknesses: [
            'Menor presencia en búsquedas por voz',
            'Structured data incompleto',
            'Cobertura limitada en Perplexity'
          ],
          opportunities_vs_us: []
        },
        competitors: [
          {
            name: queryData.brand === 'Tesla' ? 'BMW' : 'Apple',
            website: queryData.brand === 'Tesla' ? 'bmw.com' : 'apple.com',
            overall_score: 92,
            llm_presence: {
              chatgpt_mentions: 95,
              claude_coverage: 88,
              gemini_ranking: 92,
              perplexity_citations: 90
            },
            brand_strength: {
              entity_recognition: 95,
              knowledge_graph: 92,
              citation_quality: 90,
              factual_consistency: 88
            },
            content_optimization: {
              answer_format: 85,
              snippet_potential: 90,
              voice_readiness: 88,
              structured_data: 92
            },
            market_position: 'leader',
            competitive_advantages: [
              'Líder en todas las plataformas LLM',
              'Structured data completo',
              'Excelente para voice search',
              'Presencia dominante en knowledge graphs'
            ],
            weaknesses: [
              'Sobresaturación en algunos contextos',
              'Menos agilidad en trending topics'
            ],
            opportunities_vs_us: [
              'Superar en calidad de citaciones',
              'Mejor consistencia factual',
              'Más ágil en tendencias emergentes'
            ]
          },
          {
            name: queryData.brand === 'Tesla' ? 'Mercedes' : 'Microsoft',
            website: queryData.brand === 'Tesla' ? 'mercedes-benz.com' : 'microsoft.com',
            overall_score: 85,
            llm_presence: {
              chatgpt_mentions: 78,
              claude_coverage: 85,
              gemini_ranking: 88,
              perplexity_citations: 82
            },
            brand_strength: {
              entity_recognition: 88,
              knowledge_graph: 85,
              citation_quality: 82,
              factual_consistency: 85
            },
            content_optimization: {
              answer_format: 80,
              snippet_potential: 85,
              voice_readiness: 90,
              structured_data: 88
            },
            market_position: 'challenger',
            competitive_advantages: [
              'Excelente para búsquedas por voz',
              'Fuerte en Claude',
              'Buen structured data'
            ],
            weaknesses: [
              'Menor presencia en ChatGPT',
              'Oportunidades perdidas en trending'
            ],
            opportunities_vs_us: [
              'Superar en ChatGPT',
              'Mejor en trending topics',
              'Mayor consistencia factual'
            ]
          },
          {
            name: queryData.brand === 'Tesla' ? 'Ford' : 'Google',
            website: queryData.brand === 'Tesla' ? 'ford.com' : 'google.com',
            overall_score: 72,
            llm_presence: {
              chatgpt_mentions: 65,
              claude_coverage: 70,
              gemini_ranking: 85,
              perplexity_citations: 68
            },
            brand_strength: {
              entity_recognition: 75,
              knowledge_graph: 80,
              citation_quality: 70,
              factual_consistency: 72
            },
            content_optimization: {
              answer_format: 68,
              snippet_potential: 75,
              voice_readiness: 70,
              structured_data: 78
            },
            market_position: 'follower',
            competitive_advantages: [
              'Fuerte en Gemini (ventaja casa)',
              'Presencia sólida en knowledge graph'
            ],
            weaknesses: [
              'Menor calidad de citaciones',
              'Presencia débil en ChatGPT y Claude',
              'Contenido menos optimizado'
            ],
            opportunities_vs_us: [
              'Superar en todas las métricas principales',
              'Mejor calidad de contenido',
              'Mayor presencia cross-platform'
            ]
          }
        ],
        market_insights: {
          total_market_mentions: 12500,
          your_market_share: 18.5,
          growth_trend: 'up',
          key_battlegrounds: [
            `Definición y explicación de "${queryData.query}"`,
            'Comparaciones directas de productos',
            'Recomendaciones y mejores opciones',
            'Casos de uso y aplicaciones prácticas'
          ],
          emerging_threats: [
            'Nuevos competidores con mejor structured data',
            'Brands con partnerships directos con LLMs',
            'Contenido optimizado específicamente para IA'
          ],
          white_space_opportunities: [
            'Voice search optimization sin explotar',
            'Contenido técnico detallado para developers',
            'Integration con emerging AI platforms',
            'Real-time data feeds para LLMs'
          ]
        },
        recommendations: {
          immediate_actions: [
            'Implementar structured data completo para superar al líder',
            'Optimizar contenido para voice search',
            'Crear partnerships con plataformas emergentes de IA',
            'Desarrollar FAQ específica para trending queries'
          ],
          strategic_moves: [
            'Establecer programa de content partnerships con LLMs',
            'Crear API pública para acceso directo de IA',
            'Desarrollar contenido exclusivo para cada plataforma LLM',
            'Implementar real-time data feeds'
          ],
          defensive_strategies: [
            'Monitorear menciones de competidores en LLMs',
            'Crear alertas para nuevos players en el espacio',
            'Mantener actualizada la información factual',
            'Desarrollar content moats difíciles de replicar'
          ]
        }
      };
      
      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getPositionIcon = (position: string) => {
    switch (position) {
      case 'leader': return <Crown className="w-4 h-4 text-yellow-500" />;
      case 'challenger': return <Sword className="w-4 h-4 text-blue-500" />;
      case 'follower': return <Shield className="w-4 h-4 text-gray-500" />;
      case 'niche': return <Target className="w-4 h-4 text-purple-500" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

  const getPositionLabel = (position: string) => {
    switch (position) {
      case 'leader': return 'Líder de Mercado';
      case 'challenger': return 'Retador';
      case 'follower': return 'Seguidor';
      case 'niche': return 'Especialista';
      default: return position;
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
            Análisis Competitivo en Progreso
          </h2>
          <p className="text-muted-foreground mb-4">
            Analizando el landscape competitivo de "{queryData.brand}" en ecosistemas LLM...
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <Radar className="w-4 h-4 text-primary" />
              <span>Identificando competidores principales</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              <span>Comparando métricas AEO</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <span>Detectando oportunidades estratégicas</span>
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
            <h1 className="text-3xl font-bold text-foreground">Análisis Competitivo AEO</h1>
            <p className="text-muted-foreground">
              Intelligence competitiva en ecosistemas LLM para "{queryData.brand}"
            </p>
          </div>
        </div>

        {/* Market Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-card to-card/50 rounded-2xl p-8 mb-8 border"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {analysisResult.market_insights.your_market_share}%
              </div>
              <div className="text-sm text-muted-foreground">Market Share LLM</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-3xl font-bold text-foreground">
                  {analysisResult.market_insights.total_market_mentions.toLocaleString()}
                </span>
                {getTrendIcon(analysisResult.market_insights.growth_trend)}
              </div>
              <div className="text-sm text-muted-foreground">Menciones Totales</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-2">
                #{analysisResult.competitors.findIndex(c => c.overall_score < analysisResult.your_brand.overall_score) + 2}
              </div>
              <div className="text-sm text-muted-foreground">Ranking General</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                {getPositionIcon(analysisResult.your_brand.market_position)}
                <span className="text-lg font-bold text-foreground">
                  {getPositionLabel(analysisResult.your_brand.market_position)}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">Posición de Mercado</div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'overview', label: 'Panorama Competitivo', icon: Radar },
            { id: 'detailed', label: 'Análisis Detallado', icon: BarChart3 },
            { id: 'opportunities', label: 'Oportunidades', icon: Target }
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
              {/* Your Brand vs Competition */}
              <div className="bg-card rounded-xl p-6 border">
                <h4 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Positioning Competitivo
                </h4>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Your Brand */}
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-foreground">{analysisResult.your_brand.name}</h5>
                        <div className="flex items-center gap-2">
                          {getPositionIcon(analysisResult.your_brand.market_position)}
                          <span className="text-sm text-muted-foreground">
                            {getPositionLabel(analysisResult.your_brand.market_position)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-auto">
                        <div className={`text-2xl font-bold ${getScoreColor(analysisResult.your_brand.overall_score)}`}>
                          {analysisResult.your_brand.overall_score}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <h6 className="font-medium text-green-600 text-sm">Fortalezas Clave:</h6>
                      {analysisResult.your_brand.competitive_advantages.slice(0, 3).map((advantage, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{advantage}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Competitor */}
                  <div className="bg-card border rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                        <Crown className="w-5 h-5 text-yellow-500" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-foreground">{analysisResult.competitors[0].name}</h5>
                        <div className="flex items-center gap-2">
                          {getPositionIcon(analysisResult.competitors[0].market_position)}
                          <span className="text-sm text-muted-foreground">
                            {getPositionLabel(analysisResult.competitors[0].market_position)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-auto">
                        <div className={`text-2xl font-bold ${getScoreColor(analysisResult.competitors[0].overall_score)}`}>
                          {analysisResult.competitors[0].overall_score}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <h6 className="font-medium text-blue-600 text-sm">Ventajas del Líder:</h6>
                      {analysisResult.competitors[0].competitive_advantages.slice(0, 3).map((advantage, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{advantage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Competitive Matrix */}
              <div className="bg-card rounded-xl p-6 border">
                <h4 className="text-xl font-semibold text-foreground mb-6">Matrix Competitiva LLM</h4>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-foreground">Marca</th>
                        <th className="text-center py-3 px-4 font-medium text-foreground">Score AEO</th>
                        <th className="text-center py-3 px-4 font-medium text-foreground">ChatGPT</th>
                        <th className="text-center py-3 px-4 font-medium text-foreground">Claude</th>
                        <th className="text-center py-3 px-4 font-medium text-foreground">Gemini</th>
                        <th className="text-center py-3 px-4 font-medium text-foreground">Posición</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[analysisResult.your_brand, ...analysisResult.competitors]
                        .sort((a, b) => b.overall_score - a.overall_score)
                        .map((competitor, index) => (
                        <tr key={competitor.name} className={`border-b border-border/50 ${
                          competitor.name === analysisResult.your_brand.name ? 'bg-primary/5' : ''
                        }`}>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              {competitor.name === analysisResult.your_brand.name && (
                                <Star className="w-4 h-4 text-primary" />
                              )}
                              <div>
                                <div className="font-medium text-foreground">{competitor.name}</div>
                                <div className="text-sm text-muted-foreground">{competitor.website}</div>
                              </div>
                            </div>
                          </td>
                          <td className="text-center py-4 px-4">
                            <span className={`text-lg font-bold ${getScoreColor(competitor.overall_score)}`}>
                              {competitor.overall_score}
                            </span>
                          </td>
                          <td className="text-center py-4 px-4">
                            <span className="text-sm">{competitor.llm_presence.chatgpt_mentions}</span>
                          </td>
                          <td className="text-center py-4 px-4">
                            <span className="text-sm">{competitor.llm_presence.claude_coverage}</span>
                          </td>
                          <td className="text-center py-4 px-4">
                            <span className="text-sm">{competitor.llm_presence.gemini_ranking}</span>
                          </td>
                          <td className="text-center py-4 px-4">
                            <div className="flex items-center justify-center gap-1">
                              {getPositionIcon(competitor.market_position)}
                              <span className="text-sm text-muted-foreground">#{index + 1}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
              {/* Battlegrounds */}
              <div className="bg-card rounded-xl p-6 border">
                <h4 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Sword className="w-5 h-5 text-primary" />
                  Campos de Batalla Clave
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysisResult.market_insights.key_battlegrounds.map((battleground, index) => (
                    <div key={index} className="bg-background/50 rounded-lg p-4 border border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-primary" />
                        <span className="font-medium text-foreground">{battleground}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Área de alta competencia donde las marcas luchan por visibilidad
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Threats & Opportunities */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card rounded-xl p-6 border">
                  <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    Amenazas Emergentes
                  </h4>
                  <ul className="space-y-3">
                    {analysisResult.market_insights.emerging_threats.map((threat, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{threat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-6 border">
                  <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-green-500" />
                    Espacios en Blanco
                  </h4>
                  <ul className="space-y-3">
                    {analysisResult.market_insights.white_space_opportunities.map((opportunity, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Sparkles className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{opportunity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'opportunities' && (
            <motion.div
              key="opportunities"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Strategic Recommendations */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-card rounded-xl p-6 border">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-green-500" />
                    Acciones Inmediatas
                  </h4>
                  <ul className="space-y-3">
                    {analysisResult.recommendations.immediate_actions.map((action, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-6 border">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-500" />
                    Movimientos Estratégicos
                  </h4>
                  <ul className="space-y-3">
                    {analysisResult.recommendations.strategic_moves.map((move, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        {move}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-6 border">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-500" />
                    Estrategias Defensivas
                  </h4>
                  <ul className="space-y-3">
                    {analysisResult.recommendations.defensive_strategies.map((strategy, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        {strategy}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Opportunities vs Competitors */}
              <div className="bg-card rounded-xl p-6 border">
                <h4 className="text-xl font-semibold text-foreground mb-6">Oportunidades vs Competidores</h4>
                
                <div className="space-y-4">
                  {analysisResult.competitors.map((competitor, index) => (
                    <div key={competitor.name} className="bg-background/50 rounded-lg p-4 border border-border/50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h5 className="font-medium text-foreground">{competitor.name}</h5>
                          {getPositionIcon(competitor.market_position)}
                          <span className={`text-sm font-medium ${getScoreColor(competitor.overall_score)}`}>
                            Score: {competitor.overall_score}
                          </span>
                        </div>
                        <button
                          onClick={() => setSelectedCompetitor(
                            selectedCompetitor === competitor.name ? null : competitor.name
                          )}
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          {selectedCompetitor === competitor.name ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                      </div>
                      
                      <AnimatePresence>
                        {selectedCompetitor === competitor.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-3"
                          >
                            <div>
                              <h6 className="font-medium text-green-600 text-sm mb-2">Cómo Superarlos:</h6>
                              <ul className="space-y-1">
                                {competitor.opportunities_vs_us.map((opp, oppIndex) => (
                                  <li key={oppIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <ArrowUpRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    {opp}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h6 className="font-medium text-red-600 text-sm mb-2">Sus Debilidades:</h6>
                              <ul className="space-y-1">
                                {competitor.weaknesses.map((weakness, weakIndex) => (
                                  <li key={weakIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <ArrowDownRight className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                    {weakness}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={startCompetitiveAnalysis}
            className="px-6 py-3 border border-border rounded-xl text-foreground hover:bg-muted/50 transition-colors"
          >
            Reanalizar Competencia
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors">
            <Activity className="w-4 h-4" />
            Exportar Intelligence Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AEOCompetitorAnalysis;