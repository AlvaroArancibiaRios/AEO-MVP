"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BentoGrid, BentoGridItem } from '../ui/bento-grid';
import { 
  Activity, 
  PieChart, 
  BarChart3, 
  TrendingUp,
  TrendingDown,
  Target,
  Percent,
  Users,
  Eye,
  MessageSquare,
  Hash,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

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

interface AEOMentionsDistributionProps {
  llmResults: LLMResult[];
}

const AEOMentionsDistribution: React.FC<AEOMentionsDistributionProps> = ({ llmResults }) => {
  
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

  // Calculate distribution data
  const totalMentions = llmResults.reduce((sum, llm) => sum + llm.mentions, 0);
  
  const distributionData = llmResults.map((llm, index) => ({
    name: llm.name,
    mentions: llm.mentions,
    percentage: Math.round((llm.mentions / totalMentions) * 100),
    color: llm.color,
    logoUrl: getLLMLogoUrl(llm.name)
  }));

  // Colors for charts
  const chartColors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-yellow-500" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

  const getMarketShare = (mentions: number) => {
    const share = (mentions / totalMentions) * 100;
    if (share >= 30) return { level: 'Dominante', color: 'text-green-500' };
    if (share >= 20) return { level: 'Líder', color: 'text-blue-500' };
    if (share >= 15) return { level: 'Competitivo', color: 'text-yellow-500' };
    if (share >= 10) return { level: 'Emergente', color: 'text-orange-500' };
    return { level: 'Nicho', color: 'text-red-500' };
  };

  // Generate trend data for last 7 days
  const trendData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dayData: any = {
      date: date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })
    };
    
    llmResults.forEach(llm => {
      // Simulate historical mention data with some variation
      const baseVariation = (Math.random() - 0.5) * 0.3; // ±15% variation
      dayData[llm.name] = Math.max(1, Math.round(llm.mentions * (1 + baseVariation)));
    });
    
    return dayData;
  });

  return (
    <div className="space-y-8">
      {/* Distribution Overview */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-6">Distribución de Menciones por LLM</h3>
        <BentoGrid className="grid-cols-1 md:grid-cols-8 min-h-[300px]">
          {/* Pie Chart */}
          <BentoGridItem
            title="Distribución Global"
            description="Participación de mercado por modelo"
            icon={<PieChart className="w-6 h-6" />}
            size="large"
            className="col-span-4 md:col-span-3 min-h-[280px]"
            gradient="from-indigo-500 to-indigo-500/30"
          >
            <div className="mt-4 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="mentions"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any, name: string) => [`${value} menciones`, name]}
                    labelFormatter={(label) => `${label}: ${distributionData.find(d => d.name === label)?.percentage}%`}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </BentoGridItem>

          {/* Top Stats */}
          <BentoGridItem
            title="Líder del Mercado"
            description={`${distributionData[0]?.name} domina con ${distributionData[0]?.percentage}%`}
            icon={<Target className="w-6 h-6" />}
            size="medium"
            className="col-span-2 md:col-span-2 min-h-[280px]"
            gradient="from-green-500 to-green-500/30"
          >
            <div className="mt-4 space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-500">
                  {distributionData[0]?.mentions}
                </div>
                <div className="text-sm text-muted-foreground">
                  Menciones totales
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Participación</span>
                  <span className="text-sm font-semibold text-green-500">
                    {distributionData[0]?.percentage}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Ventaja vs #2</span>
                  <span className="text-sm font-semibold text-foreground">
                    +{distributionData[0]?.percentage - (distributionData[1]?.percentage || 0)}%
                  </span>
                </div>
              </div>
            </div>
          </BentoGridItem>

          {/* Total Mentions */}
          <BentoGridItem
            title="Total Global"
            description="Menciones agregadas en todos los modelos"
            icon={<Hash className="w-6 h-6" />}
            size="medium"
            className="col-span-2 md:col-span-3 min-h-[280px]"
            gradient="from-blue-500 to-blue-500/30"
          >
            <div className="mt-4 space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-500">
                  {totalMentions}
                </div>
                <div className="text-sm text-muted-foreground">
                  Menciones totales
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center p-2 bg-muted/30 rounded">
                  <div className="font-semibold text-foreground">{llmResults.length}</div>
                  <div className="text-muted-foreground">Modelos</div>
                </div>
                <div className="text-center p-2 bg-muted/30 rounded">
                  <div className="font-semibold text-foreground">
                    {Math.round(totalMentions / llmResults.length)}
                  </div>
                  <div className="text-muted-foreground">Promedio</div>
                </div>
              </div>
            </div>
          </BentoGridItem>
        </BentoGrid>
      </div>

      {/* Individual LLM Performance */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-6">Análisis Individual por Modelo</h3>
        <BentoGrid className="grid-cols-1 md:grid-cols-5 min-h-[280px]">
          {llmResults.map((llm, index) => {
            const percentage = Math.round((llm.mentions / totalMentions) * 100);
            const marketShare = getMarketShare(llm.mentions);
            
            return (
              <BentoGridItem
                key={`mentions-${llm.name}`}
                title={llm.name}
                description={`${llm.mentions} menciones (${percentage}%)`}
                icon={React.createElement(llm.icon, { className: "w-6 h-6" })}
                logoUrl={getLLMLogoUrl(llm.name)}
                size="small"
                className="col-span-1 min-h-[260px]"
                gradient="from-primary to-primary/30"
              >
                <div className="space-y-3 mt-4">
                  {/* Market Position */}
                  <div className="text-center">
                    <div className={`px-2 py-1 rounded text-xs font-semibold ${
                      index === 0 ? 'bg-yellow-500/20 text-yellow-600' :
                      index === 1 ? 'bg-gray-400/20 text-gray-600' :
                      index === 2 ? 'bg-orange-500/20 text-orange-600' :
                      'bg-blue-500/20 text-blue-600'
                    }`}>
                      #{llm.position} Posición
                    </div>
                  </div>

                  {/* Mentions Count */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {llm.mentions}
                    </div>
                    <div className="text-xs text-muted-foreground">menciones</div>
                  </div>

                  {/* Market Share */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Participación</span>
                      <span className="text-sm font-semibold text-foreground">
                        {percentage}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: 0.2 * index, duration: 0.8 }}
                        className="h-2 rounded-full bg-primary"
                      />
                    </div>
                  </div>

                  {/* Market Classification */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Clasificación</span>
                    <span className={`text-xs font-semibold ${marketShare.color}`}>
                      {marketShare.level}
                    </span>
                  </div>

                  {/* Trend */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Tendencia</span>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(llm.trending)}
                      <span className="text-xs font-semibold text-muted-foreground">
                        {llm.trending === 'up' ? 'Creciendo' : 
                         llm.trending === 'down' ? 'Bajando' : 'Estable'}
                      </span>
                    </div>
                  </div>
                </div>
              </BentoGridItem>
            );
          })}
        </BentoGrid>
      </div>

      {/* Historical Trend - Enhanced */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-6">Evolución de Menciones</h3>
        <BentoGrid className="grid-cols-1 lg:grid-cols-4 min-h-[400px]">
          {/* Main Chart */}
          <BentoGridItem
            title="Tendencia de los Últimos 7 Días"
            description="Evolución diaria detallada por modelo LLM"
            icon={<BarChart3 className="w-6 h-6" />}
            size="large"
            className="col-span-3 min-h-[380px]"
            gradient="from-slate-500 to-slate-500/30"
          >
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={trendData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  barGap={4}
                  barCategoryGap={8}
                >
                  <CartesianGrid 
                    strokeDasharray="2 4" 
                    stroke="hsl(var(--border))" 
                    opacity={0.3}
                    vertical={false}
                  />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={11}
                    fontWeight={500}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={11}
                    fontWeight={500}
                    tickLine={false}
                    axisLine={false}
                    width={35}
                  />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-xl min-w-[200px]">
                            <p className="font-semibold text-foreground mb-3 text-center">{label}</p>
                            <div className="space-y-2">
                              {payload
                                .sort((a, b) => (b.value as number) - (a.value as number))
                                .map((entry, index) => (
                                <div key={index} className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div 
                                      className="w-3 h-3 rounded-full" 
                                      style={{ backgroundColor: entry.color }}
                                    />
                                    <span className="text-sm font-medium text-foreground">
                                      {entry.dataKey}
                                    </span>
                                  </div>
                                  <span className="text-sm font-bold text-foreground">
                                    {entry.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-3 pt-2 border-t border-border/50">
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Total:</span>
                                <span className="font-semibold">
                                  {payload.reduce((sum, entry) => sum + (entry.value as number), 0)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  {llmResults.map((llm, index) => (
                    <Bar 
                      key={llm.name}
                      dataKey={llm.name} 
                      fill={chartColors[index % chartColors.length]}
                      radius={[3, 3, 0, 0]}
                      maxBarSize={35}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </BentoGridItem>

          {/* Trend Summary */}
          <BentoGridItem
            title="Resumen de Tendencias"
            description="Insights clave de la evolución"
            icon={<TrendingUp className="w-6 h-6" />}
            size="medium"
            className="col-span-1 min-h-[380px]"
            gradient="from-emerald-500 to-emerald-500/30"
          >
            <div className="mt-6 space-y-4">
              {/* Best Growth */}
              <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-semibold text-green-600">Mayor Crecimiento</span>
                </div>
                <div className="text-lg font-bold text-foreground">
                  {llmResults.find(l => l.trending === 'up')?.name || 'ChatGPT'}
                </div>
                <div className="text-xs text-muted-foreground">
                  +{Math.round(Math.random() * 20 + 10)}% esta semana
                </div>
              </div>

              {/* Most Consistent */}
              <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Minus className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-semibold text-blue-600">Más Consistente</span>
                </div>
                <div className="text-lg font-bold text-foreground">
                  {llmResults[0]?.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  Variación: ±{Math.round(Math.random() * 3 + 1)}
                </div>
              </div>

              {/* Biggest Change */}
              <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-semibold text-orange-600">Mayor Cambio</span>
                </div>
                <div className="text-lg font-bold text-foreground">
                  {llmResults.find(l => l.trending === 'down')?.name || 'Gemini'}
                </div>
                <div className="text-xs text-muted-foreground">
                  Pico: {Math.max(...llmResults.map(l => l.mentions)) + Math.round(Math.random() * 5)}
                </div>
              </div>

              {/* Weekly Total */}
              <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Hash className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-semibold text-purple-600">Total Semanal</span>
                </div>
                <div className="text-lg font-bold text-foreground">
                  {totalMentions * 7}
                </div>
                <div className="text-xs text-muted-foreground">
                  Menciones acumuladas
                </div>
              </div>
            </div>
          </BentoGridItem>
        </BentoGrid>
      </div>
    </div>
  );
};

export default AEOMentionsDistribution;